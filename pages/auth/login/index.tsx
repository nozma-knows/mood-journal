import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SessionContext } from "../../../components/context/SessionContext";
import * as cookie from "cookie";
import { FieldValues } from "react-hook-form";
import LoginForm from "../../../components/ui/forms/auth/LoginForm";
import { useMutation } from "@apollo/client";
import { CREATE_SESSION } from "../../../components/graph/mutations";
import { Session } from "../../../src/__generated__/graphql";
import AuthPage from "../../../components/ui/pages/AuthPage";

export function getServerSideProps(context: any) {
  if (context.req.headers.cookie) {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    const sessionCookie = JSON.parse(parsedCookies.session);
    const { token } = sessionCookie;
    if (token) {
      return {
        redirect: {
          destination: "/home",
        },
      };
    }
    return { props: {} };
  }
  return { props: {} };
}

export default function Login() {
  const session: any = useContext(SessionContext);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();

  const [createSession, { loading, error }] = useMutation(CREATE_SESSION, {
    onCompleted: (data: { login: Session }) => onCompleted(data),
    onError: (error) => setErrorMessage(error.message),
  });

  const onCompleted = (data: { login: Session }) => {
    session.setData(data.login);
    session.setCookie("session", JSON.stringify(data.login), {
      path: "/",
    });
    router.push("/home");
  };

  const onSubmit = async (data: FieldValues) => {
    createSession({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <AuthPage
      title="Log in"
      loading={loading}
      onSubmit={onSubmit}
      Form={LoginForm}
      error={error}
      errorMessage={errorMessage}
    />
  );
}

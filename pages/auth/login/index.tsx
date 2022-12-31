import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SessionContext } from "../../../components/context/SessionContext";
import * as cookie from "cookie";
import { FieldValues } from "react-hook-form";
import LoginForm from "../../../components/ui/forms/auth/LoginForm";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { Session } from "../../../src/__generated__/graphql";

const CREATE_SESSION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
      token
      expiry
    }
  }
`;

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
  console.log("auth/login - session: ", session);
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
    <div>
      <LoginForm loading={loading} onSubmit={onSubmit} />
      {error && <div>{`${errorMessage}`}</div>}
    </div>
  );
}

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CREATE_LOGIN } from "../../../components/graph/mutations";
import { FieldValues } from "react-hook-form";
import SignupForm from "../../../components/ui/forms/auth/SignupForm";
import AuthPage from "../../../components/ui/pages/AuthPage";

export default function Signup() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();

  const [createLogin, { loading, error }] = useMutation(CREATE_LOGIN, {
    onCompleted: () => {
      router.push("/auth/login");
    },
    onError: (error) => setErrorMessage(error.message),
  });

  const onSubmit = (data: FieldValues) => {
    createLogin({
      variables: {
        input: data,
      },
    });
  };

  return (
    <AuthPage
      title="Sign up"
      loading={loading}
      onSubmit={onSubmit}
      Form={SignupForm}
      error={error}
      errorMessage={errorMessage}
    />
  );
}

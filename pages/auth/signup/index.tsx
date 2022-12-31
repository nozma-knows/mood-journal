import React, { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { FieldValues } from "react-hook-form";
import SignupForm from "../../../components/ui/forms/auth/SignupForm";

const CREATE_LOGIN = gql`
  mutation CreateLogin($input: CreateLoginInput!) {
    createLogin(input: $input) {
      id
      email
    }
  }
`;

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
    console.log("Signup onSubmit - data: ", data);
    createLogin({
      variables: {
        input: data,
      },
    });
  };

  return (
    <div>
      <SignupForm loading={loading} onSubmit={onSubmit} />
      {error && <div>{`${errorMessage}`}</div>}
    </div>
  );
}

import React from "react";
import { ApolloError } from "@apollo/client";
import { FieldValues } from "react-hook-form";
import { FormProps } from "../forms/auth/FormProps";

interface AuthPageProps {
  title: string;
  loading: boolean;
  onSubmit: (data: FieldValues) => void;
  Form: ({ loading, onSubmit }: FormProps) => JSX.Element;
  error: ApolloError | undefined;
  errorMessage: string | undefined;
}

export default function AuthPage({
  title,
  loading,
  onSubmit,
  Form,
  error,
  errorMessage,
}: AuthPageProps) {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center gap-8">
      <div className="text-4xl sm:text-5xl">{title}</div>
      <div className="w-4/5 md:w-2/3 max-w-[720px]">
        <Form loading={loading} onSubmit={onSubmit} />
      </div>
      {error && <div>{`${errorMessage}`}</div>}
    </div>
  );
}

import React, { forwardRef } from "react";
import {
  FieldValues,
  FieldErrors,
  Control,
  Controller,
  Validate,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TextField as MUITextField } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./FormTheme";

// TextField Props
interface TextFieldProps {
  control: Control<FieldValues>;
  name: string;
  type: string;
  placeholder: string;
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  autocomplete?: string;
  validate?: Validate<any>;
  disabled?: boolean;
  errors: FieldErrors;
}

export default function TextField({
  control,
  name,
  type,
  placeholder,
  required,
  pattern,
  validate,
  disabled = false,
  errors,
}: TextFieldProps) {
  return (
    // <ThemeProvider theme={theme}>
    <div className={`w-full ${errors[`${name}`] ? "" : "pb-5"}`}>
      <Controller
        name={name}
        control={control}
        rules={{ required, pattern, validate }}
        render={({ field }) => {
          return (
            <MUITextField
              className="flex w-full"
              {...field}
              type={type}
              placeholder={`${placeholder}${required ? "*" : ""}`}
              disabled={disabled}
            />
          );
        }}
      />
      <div className="self-end w-full">
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <div className="flex justify-end w-full text-red-500 text-sm font-bold">
              {message}
            </div>
          )}
        />
      </div>
    </div>
    // </ThemeProvider>
  );
}

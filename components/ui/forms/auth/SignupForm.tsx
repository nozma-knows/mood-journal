import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Box, Grid } from "@mui/material";
import TextField from "./../../../ui/form-fields/TextField";
import Button from "../../buttons/Button";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../../../utils/regex/Regex";

interface SignupFormProps {
  loading: boolean;
  onSubmit: SubmitHandler<FieldValues>;
}

export default function SignupForm({ loading, onSubmit }: SignupFormProps) {
  // React Hook Form variables
  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FieldValues>();

  const watchPassword = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              control={control}
              name="firstName"
              type="text"
              placeholder="First name"
              required="First name is required."
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              control={control}
              name="lastName"
              type="text"
              placeholder="Last name"
              required="Last name is required."
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              control={control}
              name="email"
              type="text"
              placeholder="Email address"
              required="Email address is required."
              pattern={{
                value: REGEX_EMAIL,
                message: "Please enter a valid email address",
              }}
              errors={errors}
            />
          </Grid>
          {/* <Grid item xs={12} sm={12}>
            <PhoneNumberField
              control={control}
              setValue={setValue}
              name="phone"
              placeholder="Phone number"
              required="Phone number is required."
              errors={errors}
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              control={control}
              name="password"
              type="password"
              placeholder="Create a password"
              required="Password is required."
              pattern={{
                value: REGEX_PASSWORD,
                message: "Password is invalid",
              }}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              control={control}
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm password"
              required="Password confirmation is required."
              validate={(value) =>
                value === watchPassword || "Passwords must match"
              }
              errors={errors}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} className="pt-6">
            <div className="flex justify-center">
              <Button label="Get Started" loading={loading} />
            </div>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

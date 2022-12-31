import { gql } from "@apollo/client";

export const CREATE_SESSION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
      token
      expiry
    }
  }
`;

export const CREATE_LOGIN = gql`
  mutation CreateLogin($input: CreateLoginInput!) {
    createLogin(input: $input) {
      id
      email
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation logout($input: LogoutInput!) {
    logout(input: $input) {
      id
      token
    }
  }
`;

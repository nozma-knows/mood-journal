import React, { useContext } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { SessionContext } from "../../context/SessionContext";
import { Session } from "../../../src/__generated__/graphql";

const DELETE_SESSION = gql`
  mutation logout($input: LogoutInput!) {
    logout(input: $input) {
      id
      token
    }
  }
`;

export default function LogoutButton() {
  const router = useRouter();
  const session = useContext(SessionContext);
  console.log("session: ", session);

  const [deleteSession, { data, loading, error }] = useMutation(
    DELETE_SESSION,
    {
      onCompleted: (data: { login: Session }) => {
        console.log("onCompleted: ", data);
        session.removeCookie("session", {
          path: "/",
        });
        router.push("/auth/login");
      },
      // onError: (error) => setErrorMessage(error.message),
    }
  );

  const onSubmit = async (data: any) => {
    deleteSession({
      variables: {
        input: {
          sessionId: session.cookie.session.id,
        },
      },
    });
  };

  return <button onClick={onSubmit}>Logout</button>;
}

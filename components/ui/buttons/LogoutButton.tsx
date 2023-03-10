import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { DELETE_SESSION } from "../../graph/mutations";
import { SessionContext } from "../../context/SessionContext";
import { Session } from "../../../src/__generated__/graphql";

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

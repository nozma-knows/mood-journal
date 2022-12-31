import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { CookiesProvider } from "react-cookie";
import client from "../apollo-client";
import { SessionContextProvider } from "../components/context/SessionContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <SessionContextProvider>
          <Component {...pageProps} />
        </SessionContextProvider>
      </CookiesProvider>
    </ApolloProvider>
  );
}

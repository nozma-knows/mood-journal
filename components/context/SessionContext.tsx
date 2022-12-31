import React, { useState, createContext } from "react";
import { Session } from "../../src/__generated__/graphql";

import { useCookies } from "react-cookie";

const SessionContext = createContext();

interface SessionContextProviderProps {
  children: JSX.Element;
}

export interface SessionContextProps {
  data: Session;
  setData: (data: Session) => void;
  cookie: any;
  setCookie: (cookie: any) => void;
  removeCookie: (cookie: any) => void;
}

const SessionContextProvider = ({ children }: SessionContextProviderProps) => {
  const [data, setData] = useState<Session>();
  const [cookie, setCookie, removeCookie] = useCookies(["session"]);
  return (
    <SessionContext.Provider
      value={{ data, setData, cookie, setCookie, removeCookie }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionContextProvider };

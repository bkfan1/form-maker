import { createContext, useEffect, useState } from "react";

export const AccountNameContext = createContext();

export const AccountNameProvider = ({ children }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const ls = localStorage;

    const accountName = ls.getItem("account-name");

    if (accountName) {
      setName(accountName);
      return;
    }
  }, []);

  useEffect(() => {
    const ls = localStorage;

    ls.setItem("account-name", name);
  }, [name]);

  return (
    <>
      <AccountNameContext.Provider value={{ name, setName }}>
        {children}
      </AccountNameContext.Provider>
    </>
  );
};

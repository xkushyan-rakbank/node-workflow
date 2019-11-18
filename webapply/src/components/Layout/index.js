import React, { createContext, useState, useMemo } from "react";

export const LayoutContext = createContext({
  accountType: null,
  islamicBanking: false,
  changeAccountType: () => {},
  setIslamicBanking: () => {}
});

export const Layout = ({ children }) => {
  const [islamicBanking, setIslamicBanking] = useState(false);
  const [accountType, changeAccountType] = useState(null);

  const context = useMemo(
    () => ({
      accountType,
      islamicBanking,
      changeAccountType,
      setIslamicBanking
    }),
    [accountType, islamicBanking]
  );

  return <LayoutContext.Provider value={context}>{children}</LayoutContext.Provider>;
};

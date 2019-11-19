import React, { createContext, useState, useMemo } from "react";

export const LayoutContext = createContext({
  accountType: null,
  changeAccountType: () => {}
});

export const Layout = ({ children }) => {
  const [accountType, changeAccountType] = useState(null);

  const context = useMemo(
    () => ({
      accountType,
      changeAccountType
    }),
    [accountType]
  );

  return <LayoutContext.Provider value={context}>{children}</LayoutContext.Provider>;
};

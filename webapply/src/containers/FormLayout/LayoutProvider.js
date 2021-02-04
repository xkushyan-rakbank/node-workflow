import React, { useState, useEffect } from "react";

export const LayoutContext = React.createContext({});

export let setValues;

export const LayoutProvider = ({ children }) => {
  //ro-assist header missing issue fix
  const [contextValue, setContextValues] = useState([]);
  setValues = setContextValues;

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
};

export const useLayoutParams = (
  isDisplayHeader = false,
  isDisplayScreeningError = false,
  hasVerticalPagination = false
) => {
  const params = [isDisplayHeader, isDisplayScreeningError, hasVerticalPagination];

  useEffect(() => {
    if (setValues) {
      setValues(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...params]);
};

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const LayoutContext = React.createContext({});

export let setValues;

export const LayoutProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [contextValue, setContextValues] = useState([]);
  setValues = setContextValues;

  useEffect(() => {
    contextValue.length && setContextValues([]);
  }, [pathname]);

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

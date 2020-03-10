import React, { useState, useEffect } from "react";

export const FormNavigationContext = React.createContext({});

let setValues;

export const FormNavigationProvider = ({ children }) => {
  const [contextValue, setContextValues] = useState([false, false, []]);
  setValues = setContextValues;

  return (
    <FormNavigationContext.Provider value={contextValue}>{children}</FormNavigationContext.Provider>
  );
};

export const useFormNavigation = params => {
  useEffect(() => {
    if (setValues) {
      setValues(params);
    }
  }, [params]);
};

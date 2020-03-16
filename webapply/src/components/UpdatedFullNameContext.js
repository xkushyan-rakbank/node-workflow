import React, { useState, useEffect } from "react";

export const UpdatedFullNameContext = React.createContext({});

let setValues;

export const UpdatedFullNameProvider = ({ children }) => {
  const [contextValue, setContextValues] = useState({});
  setValues = setContextValues;
  return (
    <UpdatedFullNameContext.Provider value={contextValue}>
      {children}
    </UpdatedFullNameContext.Provider>
  );
};

export const useFormNavigation = params => {
  useEffect(() => {
    if (setValues) {
      setValues(params);
    }
  }, [params]);
};

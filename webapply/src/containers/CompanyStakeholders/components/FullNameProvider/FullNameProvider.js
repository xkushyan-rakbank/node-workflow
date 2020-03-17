import React, { useState } from "react";

export const FullNameContext = React.createContext([]);

let setValues;
let stakeholders = [];

export const FullNameCompanyStakeholdersProvider = ({ children }) => {
  const [contextValue, setContextValues] = useState([]);
  setValues = setContextValues;
  return <FullNameContext.Provider value={contextValue}>{children}</FullNameContext.Provider>;
};

export const changeFullName = ({ firstName, lastName, middleName, id }) => {
  const index = stakeholders.findIndex(e => e.id === id);
  if (index === -1) {
    stakeholders.push({ firstName, lastName, middleName, id });
  } else {
    stakeholders[index] = { firstName, lastName, middleName, id };
  }

  setValues(stakeholders);
};

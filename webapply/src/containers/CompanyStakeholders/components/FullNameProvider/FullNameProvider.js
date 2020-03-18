import React, { useState } from "react";

export const StakeholdersNamesContext = React.createContext([]);

let setValues;
let stakeholders = [];

export const FullNameCompanyStakeholdersProvider = ({ children }) => {
  const [contextValue, setContextValues] = useState([]);
  setValues = setContextValues;
  return (
    <StakeholdersNamesContext.Provider value={contextValue}>
      {children}
    </StakeholdersNamesContext.Provider>
  );
};

export const changeFullName = item => {
  const index = stakeholders.findIndex(elem => elem.id === item.id);
  if (index === -1) {
    stakeholders.push(item);
  } else {
    stakeholders[index] = item;
  }
  if (setValues) {
    setValues([...stakeholders]);
  }
};

export const deleteStakeholderContext = id => {
  stakeholders = stakeholders.filter(e => e.id !== id);

  if (setValues) {
    setValues([...stakeholders]);
  }
};

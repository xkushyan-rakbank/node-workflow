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
  const index = stakeholders.findIndex(e => e.id === item.id);
  if (index === -1) {
    stakeholders.push(item);
  } else {
    stakeholders[index] = item;
  }

  setValues(stakeholders);
};

export const deleteStakeholderFromContext = id => {
  const index = stakeholders.findIndex(e => e.id === id);
  if (index !== -1) {
    stakeholders.splice(index, 1);
  }

  setValues(stakeholders);
};

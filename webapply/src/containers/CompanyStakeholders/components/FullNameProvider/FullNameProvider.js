import React, { useState } from "react";
import pick from "lodash/pick";

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
  const data = pick(item, ["firstName", "middleName", "lastName", "id"]);
  const index = stakeholders.findIndex(e => e.id === data.id);
  if (index === -1) {
    stakeholders.push(data);
  } else {
    stakeholders[index] = data;
  }

  setValues([...stakeholders]);
};

export const deleteStakeholderFromContext = id => {
  stakeholders = stakeholders.filter(e => e.id !== id);

  setValues(stakeholders);
};

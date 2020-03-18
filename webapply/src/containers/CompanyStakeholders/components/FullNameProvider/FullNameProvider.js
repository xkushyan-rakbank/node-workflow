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

export const setInitialStakeholdersContext = stakeholders => {
  if (setValues) {
    setValues([...stakeholders]);
  }
};

export const changeFullName = item => {
  const data = pick(item, ["firstName", "middleName", "lastName", "id"]);
  const index = stakeholders.findIndex(elem => elem.id === data.id);
  if (index === -1) {
    stakeholders.push(data);
  } else {
    stakeholders[index] = data;
  }

  if (setValues) {
    setValues([...stakeholders]);
  }
};

export const deleteStakeholderContext = id => {
  stakeholders = stakeholders.filter(item => item.id !== id);

  if (setValues) {
    setValues([...stakeholders]);
  }
};

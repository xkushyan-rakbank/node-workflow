import React, { useState } from "react";
import pick from "lodash/pick";

const FIELDS = ["firstName", "middleName", "lastName", "id"];
const pickFields = item => pick(item, FIELDS);

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

export const setFullNames = data => {
  stakeholders = data.map(pickFields);
  setValues && setValues(stakeholders);
};

export const changeFullName = item => {
  const data = pickFields(item);
  const index = stakeholders.findIndex(elem => elem.id === data.id);
  if (index === -1) {
    stakeholders.push(data);
  } else {
    stakeholders[index] = data;
  }

  setValues && setValues([...stakeholders]);
};

export const deleteFullName = id => {
  stakeholders = stakeholders.filter(item => item.id !== id);

  setValues && setValues(stakeholders);
};

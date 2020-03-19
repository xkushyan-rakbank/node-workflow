import React, { useReducer, useCallback, useMemo } from "react";

let StakeholdersManager = [];
const StakeholdersNamesContext = React.createContext(StakeholdersManager);

const stakeholderReducer = (store, { type, stakeholder }) => {
  switch (type) {
    case "init":
      return store.concat(stakeholder);
    case "change":
      return changeStakeholderName(store, stakeholder);
    case "remove":
      return store.filter(item => item.id !== stakeholder.id);

    default:
      return store;
  }
};

const FullNameCompanyStakeholdersProvider = ({ children }) => {
  const [stakeholders, dispatch] = useReducer(stakeholderReducer, []);
  const deleteFullName = useCallback(stakeholder => dispatch({ type: "remove", stakeholder }), [
    dispatch
  ]);
  const changeFullName = useCallback(stakeholder => dispatch({ type: "change", stakeholder }), [
    dispatch
  ]);
  const setFullNames = useCallback(stakeholder => dispatch({ type: "init", stakeholder }), [
    dispatch
  ]);
  StakeholdersManager = useMemo(
    () => ({
      deleteFullName,
      changeFullName,
      stakeholders,
      setFullNames
    }),
    [deleteFullName, changeFullName, stakeholders, setFullNames]
  );
  return (
    <StakeholdersNamesContext.Provider value={StakeholdersManager}>
      {children}
    </StakeholdersNamesContext.Provider>
  );
};

const changeStakeholderName = (stakeholders, item) => {
  const index = stakeholders.findIndex(elem => elem.id === item.id);
  if (index === -1) {
    stakeholders.push(item);
  } else {
    stakeholders[index] = item;
  }

  return stakeholders;
};

export { StakeholdersNamesContext, FullNameCompanyStakeholdersProvider };

import React, { useReducer, useCallback, useMemo } from "react";
import pick from "lodash/pick";

const FIELDS = ["firstName", "middleName", "lastName", "id"];
const pickFields = item => pick(item, FIELDS);

let StakeholdersManager = [];
const StakeholdersNamesContext = React.createContext(StakeholdersManager);

const stakeholderReducer = (store, { type, stakeholder }) => {
  switch (type) {
    case "init":
      // const stakeholders = stakeholder.map(pickFields);
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
  const removeStakeholder = useCallback(
    stakeholder => dispatch({ type: "remove", id: stakeholder.id }),
    [dispatch]
  );
  const changeFullName = useCallback(stakeholder => dispatch({ type: "change", stakeholder }), [
    dispatch
  ]);
  const setFullNames = useCallback(stakeholder => dispatch({ type: "init", stakeholder }), [
    dispatch
  ]);
  StakeholdersManager = useMemo(
    () => ({
      removeStakeholder,
      changeFullName,
      stakeholders,
      setFullNames
    }),
    [removeStakeholder, changeFullName, stakeholders, setFullNames]
  );
  return (
    <StakeholdersNamesContext.Provider value={StakeholdersManager}>
      {children}
    </StakeholdersNamesContext.Provider>
  );
};

const changeStakeholderName = (stakeholders, item) => {
  const data = pickFields(item);
  const index = stakeholders.findIndex(elem => elem.id === data.id);
  if (index === -1) {
    stakeholders.push(data);
  } else {
    stakeholders[index] = data;
  }

  return stakeholders;
};

export { StakeholdersNamesContext, FullNameCompanyStakeholdersProvider };

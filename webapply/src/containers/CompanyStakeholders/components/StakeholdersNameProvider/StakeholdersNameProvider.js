import React, { useReducer, useCallback, useMemo } from "react";
import pick from "lodash/pick";

const FIELDS = ["firstName", "middleName", "lastName", "id"];
const pickFields = item => pick(item, FIELDS);

export let StakeholdersNameManager = {};
export const StakeholdersNamesContext = React.createContext(StakeholdersNameManager);

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

export const StakeholdersNameProvider = ({ children }) => {
  const [stakeholdersName, dispatch] = useReducer(stakeholderReducer, []);
  const deleteStakeholderFullName = useCallback(
    stakeholder => dispatch({ type: "remove", stakeholder }),
    [dispatch]
  );
  const changeStakeholderFullName = useCallback(
    stakeholder => dispatch({ type: "change", stakeholder }),
    [dispatch]
  );
  const setStakeholderFullNames = useCallback(
    stakeholder => {
      const pickedFieldsStakeholders = stakeholder.map(pickFields);
      dispatch({ type: "init", stakeholder: pickedFieldsStakeholders });
    },
    [dispatch]
  );
  StakeholdersNameManager = useMemo(
    () => ({
      deleteStakeholderFullName,
      changeStakeholderFullName,
      stakeholdersName,
      setStakeholderFullNames
    }),
    [
      deleteStakeholderFullName,
      changeStakeholderFullName,
      stakeholdersName,
      setStakeholderFullNames
    ]
  );
  return (
    <StakeholdersNamesContext.Provider value={StakeholdersNameManager}>
      {children}
    </StakeholdersNamesContext.Provider>
  );
};

const changeStakeholderName = (stakeholders, item) => {
  const stakeholdersName = [...stakeholders];
  const data = pickFields(item);
  const index = stakeholdersName.findIndex(elem => elem.id === data.id);
  if (index === -1) {
    stakeholdersName.push(data);
  } else {
    stakeholdersName[index] = data;
  }

  return stakeholdersName;
};

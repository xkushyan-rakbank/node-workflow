import React, { useReducer, useCallback, useMemo } from "react";
import pick from "lodash/pick";
import { handleActions } from "../../../../utils/redux-utils";

import { FIELDS, INIT, CHANGE, REMOVE } from "./constants";

const pickFields = item => pick(item, FIELDS);

export let StakeholdersNameManager = {};
export const StakeholdersNamesContext = React.createContext(StakeholdersNameManager);

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

const stakeholderReducer = handleActions({
  [INIT]: (state, { stakeholder }) => {
    const pickedFieldsStakeholders = stakeholder.map(pickFields);
    return state.concat(pickedFieldsStakeholders);
  },
  [CHANGE]: (state, { stakeholder }) => changeStakeholderName(state, stakeholder),
  [REMOVE]: (state, { stakeholder }) => state.filter(item => item.id !== stakeholder.id)
});

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
      dispatch({ type: "init", stakeholder });
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

import React, { useReducer, useCallback, useMemo } from "react";
import pick from "lodash/pick";
import { handleActions } from "../../../../utils/redux-utils";

import { FIELDS, INIT, CHANGE, REMOVE } from "./constants";

const pickFields = item => pick(item, FIELDS);

export let StakeholdersNameManager = {};
export const StakeholdersNamesContext = React.createContext(StakeholdersNameManager);

const stakeholderReducer = handleActions({
  [INIT]: (state, { stakeholder }) => {
    const pickedFieldsStakeholders = stakeholder.map(pickFields);
    return state.concat(pickedFieldsStakeholders);
  },
  [CHANGE]: (state, { stakeholder }) => {
    const stakeholdersName = [...state];
    const item = pickFields(stakeholder);
    const index = stakeholdersName.findIndex(elem => elem.id === item.id);
    if (index === -1) {
      stakeholdersName.push(item);
    } else {
      stakeholdersName[index] = item;
    }

    return stakeholdersName;
  },
  [REMOVE]: (state, { stakeholder }) => state.filter(item => item.id !== stakeholder.id)
});

export const StakeholdersNameProvider = ({ children }) => {
  const [stakeholdersName, dispatch] = useReducer(stakeholderReducer, []);
  const deleteStakeholderFullName = useCallback(
    stakeholder => dispatch({ type: REMOVE, stakeholder }),
    [dispatch]
  );
  const changeStakeholderFullName = useCallback(
    stakeholder => dispatch({ type: CHANGE, stakeholder }),
    [dispatch]
  );
  const setStakeholderFullNames = useCallback(
    stakeholder => dispatch({ type: INIT, stakeholder }),
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

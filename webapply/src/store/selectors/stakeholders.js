import { createSelector } from "reselect";
import get from "lodash/get";
import { getSignatories } from "./appConfig";

export const getStakeholdersState = state => state.stakeholders;
export const getEditableStakeholder = state => getStakeholdersState(state).editableStakeholder;
export const getStakeholdersIds = state => getStakeholdersState(state).stakeholdersIds;

export const stakeholdersSelector = createSelector(
  getSignatories,
  getStakeholdersIds,
  (stakeholders, stakeholdersIds) =>
    stakeholders.map((item, index) => ({
      ...item,
      id: (stakeholdersIds[index] || {}).id
    }))
);

export const percentageSelector = state => {
  const stakeholdersList = getSignatories(state);
  return stakeholdersList.reduce(
    (previousValue, currentValue) =>
      previousValue + +currentValue.kycDetails.shareHoldingPercentage,
    0
  );
};

export const percentageSelectorWithoutCurrentStakeholder = (state, index) => {
  const signatories = [...getSignatories(state)];
  signatories.splice(index, 1);

  return signatories.reduce(
    (acc, item) => acc + Number(get(item, "kycDetails.shareHoldingPercentage", 0)),
    0
  );
};

export const checkIsHasSignatories = state =>
  stakeholdersSelector(state).some(stakeholder => get(stakeholder, "kycDetails.isSignatory"));

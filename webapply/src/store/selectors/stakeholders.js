import { createSelector } from "reselect";
import get from "lodash/get";
import { getSignatories } from "./appConfig";

export const getStakeholdersState = state => state.stakeholders;

export const getEditableStakeholder = state => getStakeholdersState(state).editableStakeholder;

export const getStakeholdersIds = state => getStakeholdersState(state).stakeholdersIds;

export const getStakeholders = createSelector(
  getSignatories,
  getStakeholdersIds,
  (stakeholders, stakeholdersIds) =>
    stakeholders.map((item, index) => ({
      ...item,
      id: (stakeholdersIds[index] || {}).id
    }))
);

export const getPercentage = state => {
  const stakeholdersList = getSignatories(state);
  return stakeholdersList.reduce(
    (previousValue, currentValue) =>
      previousValue + Number(get(currentValue, "kycDetails.shareHoldingPercentage", 0)),
    0
  );
};

export const getPercentageWithoutCurrentStakeholder = (state, index) => {
  const signatories = [...getSignatories(state)];
  signatories.splice(index, 1);

  return signatories.reduce(
    (acc, item) => acc + Number(get(item, "kycDetails.shareHoldingPercentage", 0)),
    0
  );
};

export const checkIsHasSignatories = state =>
  getStakeholders(state).some(stakeholder => get(stakeholder, "kycDetails.isSignatory"));

import { createSelector } from "reselect";
import get from "lodash/get";
import { getSignatories } from "./appConfig";

export const stakeholders = state => get(state, "appConfig.prospect.signatoryInfo", []);
export const stakeholdersState = state => state.stakeholders;
export const stakeholdersIds = state => state.stakeholders.stakeholdersIds;

export const stakeholdersSelector = createSelector(
  stakeholders,
  stakeholdersIds,
  (stakeholders, stakeholdersIds) =>
    stakeholders.map((item, index) => ({
      ...item,
      id: stakeholdersIds[index]
    }))
);

export const percentageSelector = state => {
  const stakeholdersList = stakeholders(state);
  return stakeholdersList.reduce(
    (previousValue, currentValue) =>
      previousValue + +currentValue.kycDetails.shareHoldingPercentage,
    0
  );
};

export const percentageSelectorWithoutCurrentStakeholder = (state, index) => {
  const signatories = getSignatories(state);
  return signatories.reduce(
    (acc, item, idx) =>
      acc + idx === index ? 0 : Number(get(item, "kycDetails.shareHoldingPercentage", 0)),
    0
  );
};

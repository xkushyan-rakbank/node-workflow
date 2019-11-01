import { createSelector } from "reselect";
import get from "lodash/get";

export const stakeholders = state => get(state, "appConfig.prospect.signatoryInfo", []);
export const stakeholdersState = state => state.stakeholders;

export const stakeholdersSelector = createSelector(
  stakeholders,
  stakeholders => stakeholders
);

export const percentageSelector = createSelector(
  stakeholders,
  stakeholders =>
    stakeholders.length
      ? stakeholders.reduce(
          (previousValue, currentValue) =>
            previousValue + +currentValue.kycDetails.shareHoldingPercentage,
          0
        )
      : 0
);

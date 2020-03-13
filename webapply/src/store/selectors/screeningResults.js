import get from "lodash/get";
import { createSelector } from "reselect";
import { getOverviewOrganizationInfo, getOverviewApplicationInfo } from "./searchProspect";
import { RISK_RATING } from "../../constants";

export const getOrganizationScreeningResults = state =>
  get(getOverviewOrganizationInfo(state), "screeningInfo.screeningResults", []);

export const getProspectRiskScore = state => getOverviewApplicationInfo(state).riskScore || "0.0";

export const screeningResults = state => getOrganizationScreeningResults(state);
const riskScore = state => getProspectRiskScore(state);

export const getCompanyChecks = createSelector(
  screeningResults,
  riskScore,
  (screeningResults, riskScore) => [
    ...screeningResults,
    {
      ...RISK_RATING,
      screeningReason: riskScore
    }
  ]
);

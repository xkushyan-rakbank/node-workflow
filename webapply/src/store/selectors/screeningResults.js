import get from "lodash/get";
import { createSelector } from "reselect";
import { getOrganizationInfo, getApplicationInfo } from "./appConfig";
import { RISK_RATING, COMPANY_CHECK_NAMES } from "../../constants";

export const getOrganizationScreeningResults = state =>
  get(getOrganizationInfo(state), "screeningInfo.screeningResults", []);

export const getProspectRiskScore = state => getApplicationInfo(state).riskScore || "0.0";

const screeningResults = state => getOrganizationScreeningResults(state);
const riskScore = state => getProspectRiskScore(state);

export const getCompanyChecks = createSelector(
  screeningResults,
  riskScore,
  (screeningResults, riskScore) => [
    ...COMPANY_CHECK_NAMES.map(check => ({
      ...check,
      ...(screeningResults.find(s => s.screeningType === check.screeningType) || {})
    })),
    {
      ...RISK_RATING,
      screeningReason: riskScore
    }
  ]
);

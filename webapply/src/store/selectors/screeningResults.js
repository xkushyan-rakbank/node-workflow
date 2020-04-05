import get from "lodash/get";
import { createSelector } from "reselect";
import { getOverviewOrganizationInfo, getOverviewApplicationInfo } from "./searchProspect";
import { COMPANY_CHECK_NAMES } from "../../constants";

export const getOrganizationScreeningResults = state =>
  get(getOverviewOrganizationInfo(state), "screeningInfo.screeningResults", []);

export const getProspectRiskScore = state => getOverviewApplicationInfo(state).riskScore;

export const getCompanyChecks = createSelector(
  getOrganizationScreeningResults,
  getProspectRiskScore,
  (screeningResults, riskScore) => [
    ...COMPANY_CHECK_NAMES.map(check => ({
      ...check,
      ...(screeningResults.find(s => s.screeningType === check.screeningType) || {})
    })),
    {
      screeningType: "Risk Rating",
      screeningLabel: "Risk Rating",
      screeningStatus: riskScore ? "Completed" : "Not completed",
      screeningReason: riskScore
    }
  ]
);

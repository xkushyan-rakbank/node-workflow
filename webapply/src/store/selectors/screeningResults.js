import get from "lodash/get";
import { createSelector } from "reselect";
import { getOverviewOrganizationInfo, getOverviewApplicationInfo } from "./searchProspect";

export const getOrganizationScreeningResults = state =>
  get(getOverviewOrganizationInfo(state), "screeningInfo.screeningResults", []);

export const getProspectRiskScore = state => getOverviewApplicationInfo(state).riskScore;

export const getCompanyChecks = createSelector(
  getOrganizationScreeningResults,
  getProspectRiskScore,
  (screeningResults, riskScore) => [
    ...screeningResults,
    {
      screeningType: "Risk Rating",
      screeningLabel: "Risk Rating",
      screeningStatus: riskScore ? "Completed" : "Not completed",
      screeningReason: riskScore
    }
  ]
);

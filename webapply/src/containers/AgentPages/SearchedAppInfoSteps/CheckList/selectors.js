import { createSelector } from "reselect";
import { COMPANY_CHECK_NAMES, RISK_RATING } from "./constants";

import {
  getOrganizationScreeningResults,
  getProspectRiskScore
} from "../../../../store/selectors/appConfig";

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

import get from "lodash/get";
import { getOrganizationInfo, getApplicationInfo } from "./appConfig";

export const getOrganizationScreeningResults = state =>
  get(getOrganizationInfo(state), "screeningInfo.screeningResults", []);

export const getProspectRiskScore = state => getApplicationInfo(state).riskScore || "0.0";

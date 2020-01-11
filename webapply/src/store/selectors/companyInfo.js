import get from "lodash/get";
import { differenceInCalendarMonths } from "date-fns";
import { accountsNames, UAE } from "./../../constants";

import { getOrgKYCDetails, getOrganizationInfo, getApplicationInfo } from "./appConfig";

export const getIsEligible = state => {
  const { licenseIssueDate } = getOrganizationInfo(state);
  const accountType = getApplicationInfo(state).accountType;
  let isEligible = false;

  if (licenseIssueDate) {
    const isIssuanceDateCorrect = differenceInCalendarMonths(new Date(), licenseIssueDate) < 12;
    isEligible = !isIssuanceDateCorrect && accountType === accountsNames.starter;
  }

  return isEligible;
};

export const getIsForeignCompany = state => {
  const { countryOfIncorporation } = getOrganizationInfo(state);

  return countryOfIncorporation && countryOfIncorporation !== UAE;
};

export const getIsVirtualCurrency = state => {
  const { getIndustryMultiSelect } = getOrgKYCDetails(state);

  return get(getIndustryMultiSelect, "[0].industry", []).includes("Virtual currency");
};

import get from "lodash/get";
import { differenceInCalendarMonths } from "date-fns";
import { accountsNames, UAE } from "./../../constants";

import { getOrgKYCDetails, getOrganizationInfo, getApplicationInfo } from "./appConfig";

export const getCompanyInfoStatuses = state => {
  const { licenseIssueDate, countryOfIncorporation } = getOrganizationInfo(state);
  const { getIndustryMultiSelect } = getOrgKYCDetails(state);
  const accountType = getApplicationInfo(state).accountType;
  const isForeignCompany = countryOfIncorporation && countryOfIncorporation !== UAE;
  const isVirtualCurrency = get(getIndustryMultiSelect, "[0].industry", []).includes(
    "Virtual currency"
  );
  let isEligible = false;
  if (licenseIssueDate) {
    const isIssuanceDateCorrect = differenceInCalendarMonths(new Date(), licenseIssueDate) < 12;
    isEligible = !isIssuanceDateCorrect && accountType === accountsNames.starter;
  }

  return {
    isEligible,
    isForeignCompany,
    isVirtualCurrency
  };
};

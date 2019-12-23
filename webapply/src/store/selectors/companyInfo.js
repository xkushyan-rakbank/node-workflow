import { getOrgKYCDetails } from "./appConfig";

export const getVirtualCurrency = state => {
  const getIndustryMultiSelect = getOrgKYCDetails(state).industryMultiSelect || [];
  const isVC =
    getIndustryMultiSelect.length > 0 &&
    getIndustryMultiSelect[0].industry.includes("Virtual currency");

  return isVC;
};

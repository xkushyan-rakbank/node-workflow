import get from "lodash/get";
import { getOrgKYCDetails } from "./appConfig";

export const getIsVirtualCurrency = state => {
  const getIndustryMultiSelect = getOrgKYCDetails(state).industryMultiSelect || [];
  const industry = get(getIndustryMultiSelect, "[0].industry", []);

  return getIndustryMultiSelect.length > 0 && industry.includes("Virtual currency");
};

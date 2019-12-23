import get from "lodash/get";

import { getOrgKYCDetails } from "./appConfig";

export const getIsVirtualCurrency = state => {
  const { getIndustryMultiSelect } = getOrgKYCDetails(state);

  return get(getIndustryMultiSelect, "[0].industry", []).includes("Virtual currency");
};

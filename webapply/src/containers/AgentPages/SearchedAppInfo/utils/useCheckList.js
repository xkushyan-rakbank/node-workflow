import { useSelector } from "react-redux";

import {
  getCompanyChecks,
  getOrganizationScreeningResults
} from "../../../../store/selectors/screeningResults";

export const useCheckList = () => ({
  companyChecks: useSelector(getCompanyChecks),
  companyInfo: useSelector(getOrganizationScreeningResults)
});

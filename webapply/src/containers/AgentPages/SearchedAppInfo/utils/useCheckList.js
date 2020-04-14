import { useSelector } from "react-redux";

import { getFilledOverviewSignatories } from "../../../../store/selectors/searchProspect";
import {
  getCompanyChecks,
  getOrganizationScreeningResults
} from "../../../../store/selectors/screeningResults";

export const useCheckList = () => ({
  signatoryInfo: useSelector(getFilledOverviewSignatories),
  companyChecks: useSelector(getCompanyChecks),
  companyInfo: useSelector(getOrganizationScreeningResults)
});

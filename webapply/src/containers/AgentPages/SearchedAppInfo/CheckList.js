import React from "react";
import { useSelector } from "react-redux";

import {
  getCompanyAdditionalScreeningResults,
  getCompanyChecks,
  getOrganizationScreeningResults
} from "../../../store/selectors/screeningResults";

import { CheckList as CheckListStep } from "./components/CheckList";

export const CheckList = props => {
  const companyChecks = useSelector(getCompanyChecks);
  const companyInfo = useSelector(getOrganizationScreeningResults);
  const companyAdditionalInfo = useSelector(getCompanyAdditionalScreeningResults);

  return (
    <CheckListStep
      companyChecks={companyChecks}
      companyInfo={companyInfo}
      companyAdditionalInfo={companyAdditionalInfo}
      {...props}
    />
  );
};

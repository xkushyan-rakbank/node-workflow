import React from "react";
import { useSelector } from "react-redux";

import {
  getCompanyChecks,
  getOrganizationScreeningResults
} from "../../../store/selectors/screeningResults";

import { CheckList as CheckListStep } from "./components/CheckList";

export const CheckList = props => {
  const companyChecks = useSelector(getCompanyChecks);
  const companyInfo = useSelector(getOrganizationScreeningResults);

  return <CheckListStep companyChecks={companyChecks} companyInfo={companyInfo} {...props} />;
};

import React from "react";
import get from "lodash/get";

import { signingInfo } from "../../../constants";

import { Divider } from "../../Divider";

import { ReactComponent as Brief } from "../../../../../assets/icons/brief.svg";

import { useStyles } from "./styled";

import { getTitleForAccountType } from "../../../../MyApplications/utils";

export const CompanyCard = ({
  companyName = "Company name",
  applicationInfo,
  signatoryInfo,
  account
}) => {
  const classes = useStyles();
  const accountType = get(applicationInfo, "accountType");
  const rakValuePackage = get(applicationInfo, "rakValuePackage");

  const currencies = get(account, "accountCurrencies", []).join(" & ");
  const isDebitCardApplied = get(account, "debitCardApplied");
  const isChequeBookApplied = get(account, "chequeBookApplied");
  const isOnlineBankingApplied = get(account, "eStatements");

  const accountSignInType = get(signatoryInfo[0], "accountSigningInfo.accountSigningType");

  return (
    <div className={classes.card}>
      <div className={classes.icon}>
        <Brief alt="brief" width={24} height={24} />
      </div>
      <div className={classes.mainTitle}>{companyName}</div>
      <div className={classes.grayText}>{getTitleForAccountType(accountType)}</div>

      <Divider classes={{ divider: classes.divider }} />

      {signatoryInfo.length ? (
        <div className={classes.indent}>
          <div className={classes.secondaryTitle}>Company Stakeholders</div>

          {signatoryInfo.map(stakeholder => (
            <div key={stakeholder.fullName} className={classes.grayText}>
              {stakeholder.fullName}
            </div>
          ))}
        </div>
      ) : null}

      <div className={classes.secondaryTitle}>Services selected</div>
      <div className={classes.grayText}>{currencies}</div>

      <div className={classes.grayText}>{signingInfo[accountSignInType]}</div>
      {isDebitCardApplied && (
        <div className={classes.grayText}>Business debit cards for all signatories</div>
      )}
      {isChequeBookApplied && <div className={classes.grayText}>Cheque book for the company</div>}
      {isOnlineBankingApplied ? (
        <div className={classes.grayText}>Online bank statements</div>
      ) : (
        <div className={classes.grayText}>Paper statements</div>
      )}
      <div className={classes.grayText}>{rakValuePackage}</div>
    </div>
  );
};

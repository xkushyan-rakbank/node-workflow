import React from "react";
import get from "lodash/get";

import { ACCOUNTS_SIGNING_NAME_OTHER, signingInfo } from "../../../constants";

import { Divider } from "../../Divider";

import brief from "../../../../../assets/icons/brief.png";
import { useStyles } from "./styled";

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
  let accountSignInMsg;
  if (accountSignInType !== ACCOUNTS_SIGNING_NAME_OTHER) {
    accountSignInMsg = signingInfo[accountSignInType];
  }

  return (
    <div className={classes.card}>
      <div className={classes.icon}>
        <img src={brief} alt="brief" width={24} height={24} />
      </div>
      <div className={classes.mainTitle}>{companyName}</div>
      <div className={classes.grayText}>{accountType}</div>

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

      <div className={classes.grayText}>{accountSignInMsg}</div>
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

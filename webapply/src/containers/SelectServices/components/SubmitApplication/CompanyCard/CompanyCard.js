import React from "react";
import get from "lodash/get";

import { ACCOUNTS_SIGNING_NAME_ALL } from "../../../constants";

import Divider from "../../../../../components/Divider";

import brief from "../../../../../assets/icons/brief.png";
import { styles } from "./styled";

export const CompanyCard = ({
  companyName = "Company name",
  applicationInfo,
  signatoryInfo,
  account
}) => {
  const classes = styles();
  const accountType = get(applicationInfo, "accountType");
  const rakValuePackage = get(applicationInfo, "rakValuePackage");

  const currencies = get(account, "accountCurrencies");
  const isDebitCardApplied = get(account, "debitCardApplied");
  const isChequeBookApplied = get(account, "chequeBookApplied");
  const isOnlineBankingApplied = get(account, "eStatements");

  const accntSignInType = get(signatoryInfo[0], "accountSigningInfo.accountSigningType");
  let accntSignInMsg;
  if (accntSignInType === ACCOUNTS_SIGNING_NAME_ALL) {
    accntSignInMsg = "Any of you can sign";
  }

  return (
    <div className={classes.card}>
      <div className={classes.icon}>
        <img src={brief} alt="brief" width={24} height={24} />
      </div>
      <div className={classes.mainTitle}>{companyName}</div>
      <div className={classes.grayText}>{accountType}</div>

      <Divider classes={{ divider: classes.divider }} />
      {/* TODO refactor signatoryInfo.length > 0*/}
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

      <div className={classes.grayText}>{accntSignInMsg}</div>
      {isDebitCardApplied && (
        <div className={classes.grayText}>Debit cards for all signatories</div>
      )}
      {isChequeBookApplied && <div className={classes.grayText}>Cheque book for the company</div>}
      {isOnlineBankingApplied && <div className={classes.grayText}>Online bank statements</div>}
      <div className={classes.grayText}>{rakValuePackage}</div>
    </div>
  );
};

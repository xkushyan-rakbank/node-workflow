import React from "react";

import brief from "../../../../../assets/icons/brief.png";

import Divider from "../../../../../components/Divider";

import { styles } from "./styled";
// TODO refactor accept props
export const CompanyCard = ({
  companyName,
  accountType,
  signatoryInfo,
  accntSignInMsg,
  isDebitCardApplied,
  isChequeBookApplied,
  isOnlineBankingApplied,
  rakValuePackage,
  currencies
}) => {
  const classes = styles();
  return (
    <div className={classes.card}>
      <div className={classes.icon}>
        <img src={brief} alt="brief" width={24} height={24} />
      </div>
      <div className={classes.mainTitle}>{companyName}</div>
      <div className={classes.grayText}>{accountType}</div>

      <Divider classes={{ divider: classes.divider }} />
      {/* TODO refactor signatoryInfo.length > 0*/}
      {signatoryInfo.length > 0 && (
        <div className={classes.indent}>
          <div className={classes.secondaryTitle}>Company Stakeholders</div>

          {signatoryInfo.map(stakeholder => (
            <div key={stakeholder.fullName} className={classes.grayText}>
              {stakeholder.fullName}
            </div>
          ))}
        </div>
      )}

      <div className={classes.secondaryTitle}>Services selected</div>
      <div className={classes.grayText}>{currencies}</div>
      {/* TODO not implemented yet */}
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

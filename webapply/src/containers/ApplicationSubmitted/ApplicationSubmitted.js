import React from "react";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { InfoNote } from "../../components/InfoNote";
import * as accountInfoSelector from "../../store/selectors/appConfig";

import dotsBg from "../../assets/images/dots_bg.png";
import docChecked from "../../assets/icons/docChecked.png";
import bankingClock from "../../assets/icons/bankingClock.png";
import { useStyles } from "./styled";

const ApplicationSubmittedComponent = ({ AccountSubmittedInfo }) => {
  const classes = useStyles();

  return AccountSubmittedInfo && AccountSubmittedInfo.length > 0 ? (
    <div className={classes.container}>
      <div className={classes.title}>
        <img src={docChecked} alt="checked" />
        <SectionTitleWithInfo title="Meet the brand new accounts for Designit Arabia" />
      </div>
      <div
        className={cx(classes.accountsNumbers, {
          [classes.accountsNumbersRow]: AccountSubmittedInfo.length % 2 === 0,
          [classes.accountsNumbersColumn]: AccountSubmittedInfo.length % 2 !== 0
        })}
      >
        {AccountSubmittedInfo.map(accountData => (
          <div
            className={cx(classes.accountNumber, {
              [classes.accountNumberRow]: AccountSubmittedInfo.length
            })}
            key={accountData.id}
          >
            <img src={dotsBg} className={classes.docCheckedIcon} alt="background" />

            <span className="info">Your AED account number</span>
            <div className="mainInfo">
              <span className="number">{accountData.accountNo}</span>
              <span className="typeAccount">{accountData.accountCurrency}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.infoBottom}>
        <InfoNote
          text="Account numbers are provisional and subject to internal approvals. You will be able to make transactions on the accounts once they get activated."
          style={{ marginTop: "20px", position: "static" }}
        />
      </div>
      <div className={classes.divider}>{""}</div>
      <div className={classes.result}>
        <img className={classes.waitCallIcon} src={bankingClock} alt="wait call" />
        <Typography align="center" classes={{ root: classes.resultNextStep }}>
          What happens now
        </Typography>
        <Typography align="center" classes={{ root: classes.resultNextStepInfo }}>
          We will call you back very soon to sign your application. Hold tight.
        </Typography>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = state => {
  return {
    AccountSubmittedInfo: accountInfoSelector.getAccountSubmittedInfo(state)
  };
};

export const ApplicationSubmitted = connect(mapStateToProps)(ApplicationSubmittedComponent);

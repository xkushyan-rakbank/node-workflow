import React from "react";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { InfoNote } from "../../components/InfoNote";
import { getOrganizationInfo, getAccountNumbers } from "../../store/selectors/appConfig";

import dotsBg from "../../assets/images/dots_bg.png";
import bankingClock from "../../assets/icons/bankingClock.png";
import { useStyles } from "./styled";
import { useIconsByAccount } from "../../utils/useIconsByAccount";

const ApplicationSubmittedComponent = ({ accountNumbers, organizationInfo }) => {
  const classes = useStyles();
  const { submitted } = useIconsByAccount();

  return accountNumbers.length > 0 ? (
    <div className={classes.container}>
      <div className={classes.title}>
        <img src={submitted} alt="checked" />
        <SectionTitleWithInfo
          title={`Meet the brand new accounts for ${organizationInfo.companyName}`}
        />
      </div>
      <div
        className={cx(classes.accountsNumbers, {
          [classes.accountsNumbersRow]: accountNumbers.length % 2 === 0,
          [classes.accountsNumbersColumn]: accountNumbers.length % 2 !== 0
        })}
      >
        {accountNumbers.map(accountData => (
          <div
            className={cx(classes.accountNumber, {
              [classes.accountNumberRow]: accountNumbers.length
            })}
            key={accountData.accountNumber}
          >
            <img src={dotsBg} className={classes.docCheckedIcon} alt="background" />

            <span className="info">{`Your ${accountData.currency} account number`}</span>
            <div className="mainInfo">
              <span className="number">{accountData.accountNo}</span>
              <span className="typeAccount">{accountData.currency}</span>
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
    accountNumbers: getAccountNumbers(state),
    organizationInfo: getOrganizationInfo(state)
  };
};

export const ApplicationSubmitted = connect(mapStateToProps)(ApplicationSubmittedComponent);

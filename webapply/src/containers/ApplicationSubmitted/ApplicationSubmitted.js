import React from "react";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { InfoNote } from "../../components/InfoNote";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useIconsByAccount } from "../../utils/useIconsByAccount";
import { getOrganizationInfo } from "../../store/selectors/appConfig";
import { formStepper } from "../../constants";

import { useStyles } from "./styled";

import { ReactComponent as DotsBg } from "../../assets/images/dots_bg.svg";
import { getAccountNumbers } from "../../store/selectors/accountNumbers";

const ApplicationSubmittedComponent = ({ accountNumbers, organizationInfo }) => {
  const classes = useStyles();
  const { submitted, bankingClock: BankingClock } = useIconsByAccount();
  useFormNavigation([true, true, formStepper]);

  return accountNumbers.length > 0 ? (
    <div className={classes.container}>
      <div className={classes.title}>
        <img width={120} height={125} src={submitted} alt="checked" />
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
            <DotsBg className={classes.dottedBg} alt="background" />

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
          text="Account numbers are provisional and subject to internal approvals. You will only be able to make transactions on the accounts once they get activated."
          className={classes.infoNote}
        />
      </div>
      <div className={classes.divider}>{""}</div>
      <div className={classes.result}>
        <BankingClock className={classes.waitCallIcon} alt="wait call" />
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

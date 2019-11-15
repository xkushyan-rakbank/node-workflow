import React from "react";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { submitApplication } from "../../../../constants/index";
import * as appConfigSelectors from "../../../../store/selectors/appConfig";
import routes from "../../../../routes";

import Checkbox from "../../../../components/InputField/Checkbox";
import Button from "../../../../components/Buttons/SubmitButton";
import BackLink from "../../../../components/Buttons/BackLink";
import FormTitle from "../../../../components/FormTitle";
import ErrorMessage from "../../../../components/ErrorMessage";

import { CompanyCard } from "./CompanyCard/CompanyCard";

// TODO refactor styles
const style = {
  checkboxesWrapper: {
    "&>label": {
      marginBottom: "20px"
    }
  },
  listItem: {
    display: "block"
  },
  grayText: {
    fontSize: "14px",
    lineHeight: 1.29,
    color: "#86868b"
  }
};

class SubmitApplication extends React.Component {
  state = {
    isInformationProvided: false,
    areTermsAgreed: false,
    needCommunication: false,
    isTncClicked: false,
    isTermsEnrolmentClicked: false,
    isError: false
  };

  handleChange = ({ currentTarget }) => {
    const name = currentTarget.name;
    const { isTncClicked, isTermsEnrolmentClicked } = this.state;
    if (name === "areTermsAgreed") {
      return isTncClicked && isTermsEnrolmentClicked
        ? this.setState({ [name]: !this.state[name], isError: false })
        : this.setState({ isError: true });
    } else {
      this.setState({ [name]: !this.state[name] });
    }
  };

  handleClick = () => {
    const { history } = this.props;
    history.push(routes.ApplicationSubmitted);
  };

  chkIsError = () => {
    const { isTncClicked, isTermsEnrolmentClicked } = this.state;
    return isTncClicked && isTermsEnrolmentClicked ? this.setState({ isError: false }) : null;
  };

  tncClicked = () => {
    this.setState({ isTncClicked: true }, () => {
      this.chkIsError();
    });
  };

  termsEnrolmentClicked = () => {
    this.setState({ isTermsEnrolmentClicked: true }, () => {
      this.chkIsError();
    });
  };

  render() {
    const {
      classes,
      applicationInfo,
      accountInfo,
      signatoryInfo,
      organizationInfo,
      isAgentLoggedIn
    } = this.props;
    const [account] = accountInfo;
    const companyName = organizationInfo.companyName || "Company name";
    const accountType = applicationInfo.accountType || "Account type";
    //const currencies = accountInfo.length && account.accountCurrencies.join(" & ");
    const currencies = accountInfo.length && accountInfo[0].accountCurrencies;
    const stakeholders = signatoryInfo.map(stakeholder => (
      <div key={stakeholder.fullName} className={classes.grayText}>
        {stakeholder.fullName}
      </div>
    ));
    const accntSignInType =
      signatoryInfo[0] &&
      signatoryInfo[0].accountSigningInfo &&
      signatoryInfo[0].accountSigningInfo.accountSigningType;
    let accntSignInMsg;
    if (accntSignInType === "ALL") {
      accntSignInMsg = "Any of you can sign";
    }
    const isDebitCardApplied = accountInfo.length && account.debitCardApplied;
    const isChequeBookApplied = accountInfo.length && account.chequeBookApplied;
    const isOnlineBankingApplied = accountInfo.length && account.eStatements;
    const rakValuePackage = applicationInfo.rakValuePackage || "RAKvalue package";
    const { isInformationProvided, areTermsAgreed, needCommunication, isError } = this.state;
    const chkboxErrorMessage = `Please click the ${submitApplication.termCondition} 
      and ${submitApplication.termsOfEnrolment}`;

    return (
      <>
        <FormTitle title={submitApplication.formTitle} info={submitApplication.formInfo} />
        {/* TODO refactor props*/}
        <CompanyCard
          companyName={companyName}
          accountType={accountType}
          signatoryInfo={signatoryInfo}
          stakeholders={stakeholders}
          currencies={currencies}
          accntSignInMsg={accntSignInMsg}
          isDebitCardApplied={isDebitCardApplied}
          isChequeBookApplied={isChequeBookApplied}
          isOnlineBankingApplied={isOnlineBankingApplied}
          rakValuePackage={rakValuePackage}
        />

        {isAgentLoggedIn && (
          <div className={classes.checkboxesWrapper}>
            <Checkbox
              value={isInformationProvided}
              name="isInformationProvided"
              label={submitApplication.trueNdCompleteAcknldgelabel}
              className={classes.listItem}
              onChange={this.handleChange}
            />
            <Checkbox
              value={areTermsAgreed}
              name="areTermsAgreed"
              label={
                <span>
                  I agree with RakBank’s{" "}
                  <a
                    href={submitApplication.termConditionUrl}
                    onClick={this.tncClicked}
                    // eslint-disable-next-line react/jsx-no-target-blank
                    target="_blank"
                  >
                    terms and conditions
                  </a>{" "}
                  &{" "}
                  <a
                    href={submitApplication.termOfEnrolmentUrl}
                    onClick={this.termsEnrolmentClicked}
                    // eslint-disable-next-line react/jsx-no-target-blank
                    target="_blank"
                  >
                    terms and enrollment
                  </a>
                </span>
              }
              className={classes.listItem}
              onChange={this.handleChange}
            />
            <Checkbox
              value={needCommunication}
              name="needCommunication"
              label={submitApplication.needCommunicationLabel}
              className={classes.listItem}
              onChange={this.handleChange}
            />
          </div>
        )}

        {isError && <ErrorMessage error={chkboxErrorMessage} />}

        <div className="linkContainer">
          <BackLink path={routes.selectServices} />
          <Button
            disabled={!(isInformationProvided && areTermsAgreed)}
            label="Submit"
            justify="flex-end"
            handleClick={this.handleClick}
          />
        </div>
      </>
    );
  }
}
// TODO MOVE TO INDEX
const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state),
  accountInfo: appConfigSelectors.getAccountInfo(state),
  signatoryInfo: appConfigSelectors.getSignatories(state),
  organizationInfo: appConfigSelectors.getOrganizationInfo(state),
  isAgentLoggedIn: appConfigSelectors.getIsAgentLoggedIn(state)
});
// TODO MOVE TO INDEX
export default compose(
  connect(mapStateToProps),
  withStyles(style),
  withRouter
)(SubmitApplication);

import React from "react";

import { submitApplication } from "../../../../constants/index";
import routes from "../../../../routes";

import Button from "../../../../components/Buttons/SubmitButton";
import BackLink from "../../../../components/Buttons/BackLink";
import FormTitle from "../../../../components/FormTitle";
import ErrorMessage from "../../../../components/ErrorMessage";

import { CompanyCard } from "./CompanyCard/CompanyCard";
import { BlockConfirm } from "./BlockConfirm/BlockConfirm";

export default class SubmitApplication extends React.Component {
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
      applicationInfo,
      accountInfo,
      signatoryInfo,
      organizationInfo,
      isAgentLoggedIn
    } = this.props;

    const [account] = accountInfo;
    const companyName = organizationInfo.companyName || "Company name";
    const accountType = applicationInfo.accountType || "Account type";

    const currencies = accountInfo.length && accountInfo[0].accountCurrencies;
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
          currencies={currencies}
          accntSignInMsg={accntSignInMsg}
          isDebitCardApplied={isDebitCardApplied}
          isChequeBookApplied={isChequeBookApplied}
          isOnlineBankingApplied={isOnlineBankingApplied}
          rakValuePackage={rakValuePackage}
        />
        {/* TODO refactor props*/}
        <BlockConfirm
          isAgentLoggedIn={isAgentLoggedIn}
          isInformationProvided={isInformationProvided}
          onChange={this.handleChange}
          tncClicked={this.tncClicked}
          areTermsAgreed={areTermsAgreed}
          termsEnrolmentClicked={this.termsEnrolmentClicked}
          needCommunication={needCommunication}
        />
        {isError && <ErrorMessage error={chkboxErrorMessage} />}
        {/*TODO replace linkContainer*/}
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

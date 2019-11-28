import React, { useState } from "react";

import routes from "../../../../routes";
import { submitApplication } from "../../../../constants/index";

import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { BackLink } from "../../../../components/Buttons/BackLink";
import FormTitle from "../../../../components/FormTitle";
import { ErrorMessage } from "../../../../components/Notifications";
import { CompanyCard } from "./CompanyCard";
import { BlockConfirm } from "./BlockConfirm";

export const SubmitApplicationComponent = props => {
  const [checkBoxValues, setIsInformationProvided] = useState({
    isInformationProvided: false,
    areTermsAgreed: false,
    needCommunication: false
  });
  const [isTncClicked, setIsTncClicked] = useState(false);
  const [isTermsEnrolmentClicked, setIsTermsEnrolmentClicked] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = ({ currentTarget }) => {
    const { name } = currentTarget;
    const updateState = name => {
      const newValue = !checkBoxValues[name];
      setIsInformationProvided({
        ...checkBoxValues,
        [name]: newValue
      });
      setIsError(false);
    };
    if (name === "areTermsAgreed") {
      return isTncClicked && isTermsEnrolmentClicked ? updateState(name) : setIsError(true);
    } else {
      updateState(name);
    }
  };

  const handleClick = () => {
    const { history } = props;
    history.push(routes.ApplicationSubmitted);
  };

  const chkIsError = () => (isTncClicked && isTermsEnrolmentClicked ? setIsError(false) : null);
  const tncClicked = () => {
    setIsTncClicked(true);
    chkIsError();
  };
  const termsEnrolmentClicked = () => {
    setIsTermsEnrolmentClicked(true);
    chkIsError();
  };

  const { applicationInfo, accountInfo, signatoryInfo, organizationInfo, isAgentLoggedIn } = props;
  const [account] = accountInfo;

  const chkboxErrorMessage = `Please click the ${submitApplication.termCondition}
    and ${submitApplication.termsOfEnrolment}`;

  return (
    <>
      <FormTitle title={submitApplication.formTitle} info={submitApplication.formInfo} />
      <CompanyCard
        companyName={organizationInfo.companyName}
        applicationInfo={applicationInfo}
        signatoryInfo={signatoryInfo}
        account={account}
      />

      {!isAgentLoggedIn.loginStatus && (
        <BlockConfirm
          isAgentLoggedIn={isAgentLoggedIn}
          checkBoxValues={checkBoxValues}
          onChange={handleChange}
          tncClicked={tncClicked}
          areTermsAgreed={checkBoxValues.areTermsAgreed}
          termsEnrolmentClicked={termsEnrolmentClicked}
        />
      )}
      {isError && <ErrorMessage error={chkboxErrorMessage} />}

      <div className="linkContainer">
        <BackLink path={routes.selectServices} />
        <SubmitButton
          disabled={!(checkBoxValues.isInformationProvided && checkBoxValues.areTermsAgreed)}
          label="Submit"
          justify="flex-end"
          handleClick={handleClick}
        />
      </div>
    </>
  );
};

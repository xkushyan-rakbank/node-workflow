import React, { useState, useCallback } from "react";

import routes from "../../../../routes";
import { submitApplication } from "../../../../constants/index";

import { BackLink } from "../../../../components/Buttons/BackLink";
import { FormTitle } from "../FormTitle";
import { CompanyCard } from "./CompanyCard";
import { BlockConfirm } from "./BlockConfirm";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { SUBMIT, NEXT } from "../../../../constants";

export const SubmitApplicationComponent = ({
  history,
  accountInfo: [account],
  signatoryInfo,
  isAgentLoggedIn,
  applicationInfo,
  organizationInfo: { companyName },
  sendProspectToAPI,
  updateActionType,
  updateSaveType
}) => {
  const [formFieldsValues, setFormFields] = useState({});

  const handleSubmit = useCallback(() => {
    updateActionType(SUBMIT);
    updateSaveType(NEXT);
    sendProspectToAPI().then(() => history.push(routes.ApplicationSubmitted));
  });

  return (
    <>
      <FormTitle title={submitApplication.formTitle} info={submitApplication.formInfo} />
      <CompanyCard
        companyName={companyName}
        applicationInfo={applicationInfo}
        signatoryInfo={signatoryInfo}
        account={account}
      />

      {!isAgentLoggedIn.loginStatus && <BlockConfirm setFormFields={setFormFields} />}

      <div className="linkContainer">
        <BackLink path={routes.selectServices} />
        <SubmitButton
          disabled={!(formFieldsValues.isInformationProvided && formFieldsValues.areTermsAgreed)}
          label="Submit"
          justify="flex-end"
          handleClick={handleSubmit}
        />
      </div>
    </>
  );
};

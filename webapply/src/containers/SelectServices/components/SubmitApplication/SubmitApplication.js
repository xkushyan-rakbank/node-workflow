import React, { useState } from "react";

import routes from "../../../../routes";
import { submitApplication } from "../../../../constants/index";

import { BackLink } from "../../../../components/Buttons/BackLink";
import { FormTitle } from "../FormTitle";
import { CompanyCard } from "./CompanyCard";
import { BlockConfirm } from "./BlockConfirm";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { SUBMIT, NEXT } from "../../../../constants";
import { ServerRequestLoadingScreen } from "../../../../components/ServerRequestLoadingScreen/ServerRequestLoadingScreen";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";

export const SubmitApplicationComponent = ({
  history,
  accountInfo: [account],
  signatoryInfo,
  isAgentLoggedIn,
  applicationInfo,
  organizationInfo: { companyName },
  sendProspectToAPI,
  updateActionType,
  updateSaveType,
  isApplyEditApplication
}) => {
  const pushHistory = useTrackingHistory();
  const [formFieldsValues, setFormFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = isApplyEditApplication ? routes.companyInfo : routes.ApplicationSubmitted;
  const handleSubmit = () => {
    setIsSubmitting(true);
    updateActionType(SUBMIT);
    updateSaveType(NEXT);
    sendProspectToAPI()
      .then(() => pushHistory(pathname))
      .finally(() => setIsSubmitting(false));
  };

  if (isSubmitting) {
    return <ServerRequestLoadingScreen />;
  }

  return (
    <>
      <FormTitle title={submitApplication.formTitle} info={submitApplication.formInfo} />
      <CompanyCard
        companyName={companyName}
        applicationInfo={applicationInfo}
        signatoryInfo={signatoryInfo}
        account={account}
      />

      {!isAgentLoggedIn && <BlockConfirm setFormFields={setFormFields} />}

      <div className="linkContainer">
        <BackLink path={routes.selectServices} />
        <SubmitButton
          disabled={
            !(formFieldsValues.isInformationProvided && formFieldsValues.areTermsAgreed) ||
            isSubmitting
          }
          label="Submit"
          justify="flex-end"
          handleClick={handleSubmit}
        />
      </div>
    </>
  );
};

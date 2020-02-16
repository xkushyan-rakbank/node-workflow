import React, { useState } from "react";

import routes, { smeBaseName } from "../../../../routes";
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
  accountInfo: [account],
  signatoryInfo,
  applicationInfo,
  organizationInfo: { companyName },
  sendProspectToAPI,
  updateActionType,
  updateSaveType,
  isApplyEditApplication,
  updateProspect
}) => {
  const pushHistory = useTrackingHistory();
  const [formFieldsValues, setFormFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = isApplyEditApplication ? routes.companyInfo : routes.ApplicationSubmitted;
  const isSubmitButtonEnable =
    isApplyEditApplication ||
    (formFieldsValues.isInformationProvided && formFieldsValues.areTermsAgreed);
  const handleSubmit = () => {
    if (isSubmitButtonEnable) {
      updateProspect({
        ["prospect.applicationInfo.viewId"]: routes.ApplicationSubmitted.replace(smeBaseName, "")
      });
    }
    setIsSubmitting(true);
    updateActionType(SUBMIT);
    updateSaveType(NEXT);
    sendProspectToAPI()
      .then(() => pushHistory(pathname), () => {})
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

      {!isApplyEditApplication && <BlockConfirm setFormFields={setFormFields} />}

      <div className="linkContainer">
        <BackLink path={routes.selectServices} />
        <SubmitButton
          disabled={!isSubmitButtonEnable || isSubmitting}
          label="Submit"
          justify="flex-end"
          handleClick={handleSubmit}
        />
      </div>
    </>
  );
};

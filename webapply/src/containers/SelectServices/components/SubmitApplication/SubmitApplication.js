import React, { useState, useEffect } from "react";

import routes, { smeBaseName } from "../../../../routes";
import { submitApplication, PROSPECT_STATUSES } from "../../../../constants/index";

import { BackLink } from "../../../../components/Buttons/BackLink";
import { FormTitle } from "../FormTitle";
import { CompanyCard } from "./CompanyCard";
import { BlockConfirm } from "./BlockConfirm/index";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { ServerRequestLoadingScreen } from "../../../../components/ServerRequestLoadingScreen/ServerRequestLoadingScreen";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { NEXT, SUBMIT, notificationOptions } from "../../../../constants";
import { NotificationsManager } from "../../../../components/Notification";

export const SubmitApplicationComponent = ({
  accountInfo: [account],
  signatoryInfo,
  applicationInfo,
  organizationInfo: { companyName },
  sendProspectToAPI,
  isApplyEditApplication,
  updateViewId,
  currentProspectStatus
}) => {
  const pushHistory = useTrackingHistory();
  const [formFieldsValues, setFormFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isROSubmit =
    isApplyEditApplication && currentProspectStatus === PROSPECT_STATUSES.ASSESSING;
  const pathname = isROSubmit ? routes.ApplicationSubmitted : routes.SubmitApplication;

  const isSubmitButtonEnable =
    isApplyEditApplication ||
    (formFieldsValues.isInformationProvided && formFieldsValues.areTermsAgreed);

  useEffect(() => NotificationsManager.add(notificationOptions), [NotificationsManager]);

  const handleSubmit = () => {
    updateViewId(pathname.replace(smeBaseName, ""), false);
    setIsSubmitting(true);
    sendProspectToAPI(NEXT, null, SUBMIT).then(
      () => pushHistory(routes.ApplicationSubmitted, true),
      () => setIsSubmitting(false)
    );
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

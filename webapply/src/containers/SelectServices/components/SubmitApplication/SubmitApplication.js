import React, { useState, useEffect, useCallback } from "react";

import routes, { smeBaseName } from "../../../../routes";
import { submitApplication, PROSPECT_STATUSES } from "../../../../constants/index";

import { FormTitle } from "../FormTitle";
import { CompanyCard } from "./CompanyCard";
import { BlockConfirm } from "./BlockConfirm/index";
import { ServerRequestLoadingScreen } from "../../../../components/ServerRequestLoadingScreen/ServerRequestLoadingScreen";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { NEXT, SUBMIT } from "../../../../constants";
import { trustMessageContent } from "./constants";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => NotificationsManager.add(trustMessageContent), []);

  const isROSubmit =
    isApplyEditApplication && currentProspectStatus === PROSPECT_STATUSES.ASSESSING;
  const pathname = isROSubmit ? routes.ApplicationSubmitted : routes.SubmitApplication;

  const handleSubmit = useCallback(() => {
    updateViewId(pathname.replace(smeBaseName, ""), false);
    setIsSubmitting(true);
    sendProspectToAPI(NEXT, null, SUBMIT).then(
      () => pushHistory(routes.ApplicationSubmitted, true),
      () => setIsSubmitting(false)
    );
  }, [updateViewId, sendProspectToAPI, setIsSubmitting, pushHistory, pathname]);

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

      <BlockConfirm
        isCustomer={!isApplyEditApplication}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

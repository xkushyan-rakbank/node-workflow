import React, { useEffect, useCallback, useState } from "react";

import routes, { smeBaseName } from "../../../../routes";
import { PROSPECT_STATUSES } from "../../../../constants";

import { FormTitle } from "../FormTitle";
import { CompanyCard } from "./CompanyCard";
import { BlockConfirm } from "./BlockConfirm";
import { ServerRequestLoadingScreen } from "../../../../components/ServerRequestLoadingScreen/ServerRequestLoadingScreen";
import { NotificationsManager } from "../../../../components/Notification";
import { useLayoutParams } from "../../../FormLayout";
import { useViewId } from "../../../../utils/useViewId";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { NEXT, SUBMIT, formStepper } from "../../../../constants";
import { trustMessageContent, submitApplication } from "./constants";
import { useFormNavigation } from "../../../../components/FormNavigation/FormNavigationProvider";

export const SubmitApplicationComponent = ({
  accountInfo: [account],
  signatoryInfo,
  applicationInfo,
  organizationInfo: { companyName },
  sendProspectToAPI,
  updateViewId,
  currentProspectStatus,
  currentProspectStatusReason,
  isAgent
}) => {
  useViewId(true);
  useLayoutParams(true, true);
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, true, formStepper]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    !isAgent && NotificationsManager.add(trustMessageContent);
  }, [isAgent]);
  const isROSubmit =
    isAgent &&
    (currentProspectStatus === PROSPECT_STATUSES.ASSESSING ||
      currentProspectStatusReason === PROSPECT_STATUSES.ASSESSING);
  const pathname = isROSubmit ? routes.ApplicationSubmitted : routes.SubmitApplication;

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    updateViewId(pathname.replace(smeBaseName, ""), false);
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

      <BlockConfirm handleSubmit={handleSubmit} isAgent={isAgent} />
    </>
  );
};

import React, { useEffect, useCallback } from "react";

import routes, { smeBaseName } from "../../../../routes";
import { PROSPECT_STATUSES } from "../../../../constants";

import { FormTitle } from "../FormTitle";
import { CompanyCard } from "./CompanyCard";
import { BlockConfirm } from "./BlockConfirm";
import { NotificationsManager } from "../../../../components/Notification";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { NEXT, SUBMIT } from "../../../../constants";
import { trustMessageContent, submitApplication } from "./constants";

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

  useEffect(() => NotificationsManager.add(trustMessageContent), []);

  const isROSubmit =
    isApplyEditApplication && currentProspectStatus === PROSPECT_STATUSES.ASSESSING;
  const pathname = isROSubmit ? routes.ApplicationSubmitted : routes.SubmitApplication;

  const handleSubmit = useCallback(() => {
    updateViewId(pathname.replace(smeBaseName, ""), false);
    return sendProspectToAPI(NEXT, null, SUBMIT).then(
      () => pushHistory(routes.ApplicationSubmitted, true),
      () => {}
    );
  }, [updateViewId, sendProspectToAPI, pushHistory, pathname]);

  return (
    <>
      <FormTitle title={submitApplication.formTitle} info={submitApplication.formInfo} />
      <CompanyCard
        companyName={companyName}
        applicationInfo={applicationInfo}
        signatoryInfo={signatoryInfo}
        account={account}
      />

      <BlockConfirm isCustomer={!isApplyEditApplication} handleSubmit={handleSubmit} />
    </>
  );
};

import React, { useEffect, useState } from "react";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { UploadDocumentsComponent } from "./components/UploadDocuments/UploadDocuments";
import { formStepper, NEXT } from "../../constants";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";

import { DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS } from "./constants";

export const UploadDocuments = ({
  companyDocuments,
  stakeholdersDocuments,
  companyName,
  signatories,
  isRequiredDocsUploaded,
  isLoadingDocuments,
  prospectStatusInfo,
  isApplyEditApplication,
  retrieveDocDetails,
  sendProspectToAPI
}) => {
  const pushHistory = useTrackingHistory();
  const [isLoading, setIsLoading] = useState(false);
  useFormNavigation([false, true, formStepper]);

  useEffect(() => {
    retrieveDocDetails();
  }, [retrieveDocDetails]);

  const goToSelectService = () => {
    setIsLoading(true);
    sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) pushHistory(routes.selectServices, true);
      },
      () => setIsLoading(false)
    );
  };

  const isDisabledNextStep =
    !(
      isApplyEditApplication && DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS.includes(prospectStatusInfo)
    ) && !isRequiredDocsUploaded;

  return (
    <UploadDocumentsComponent
      isLoadingDocuments={isLoadingDocuments}
      companyDocuments={companyDocuments}
      stakeholdersDocuments={stakeholdersDocuments}
      isDisabledNextStep={isDisabledNextStep}
      isLoading={isLoading}
      goToSelectService={goToSelectService}
      signatories={signatories}
      companyName={companyName}
    />
  );
};

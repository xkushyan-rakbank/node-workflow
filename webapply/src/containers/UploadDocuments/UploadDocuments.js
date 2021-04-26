import React, { useEffect, useState } from "react";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { UploadDocumentsComponent } from "./components/UploadDocuments/UploadDocuments";
import { UploadLimitComponent } from "./components/UploadLimit/UploadLimit";
import { useLayoutParams } from "../FormLayout";
import { formStepper, NEXT } from "../../constants";
import { useViewId } from "../../utils/useViewId";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";

import { DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS } from "./constants";

export const UploadDocuments = ({
  companyDocuments,
  companyBankStatements,
  companyAddressProof,
  companyInvoices,
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
  const [docUploadLimit, setDocUploadLimit] = useState(1);
  const [currentUplCnt, setCurrentUplCnt] = useState(0);
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(true, true);
  useViewId();

  useEffect(() => {
    retrieveDocDetails();
  }, [retrieveDocDetails]);

  useEffect(() => {
    if (typeof companyDocuments[0] !== "undefined") {
      setDocUploadLimit(companyDocuments[0].DocumentUploadCnt);
      setCurrentUplCnt(companyDocuments[0].DocumentUplTotalCnt);
    }
  }, [companyDocuments]);

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
    <>
      {docUploadLimit > currentUplCnt ? (
        <UploadDocumentsComponent
          isLoadingDocuments={isLoadingDocuments}
          companyDocuments={companyDocuments}
          companyBankStatements={companyBankStatements}
          companyAddressProof={companyAddressProof}
          companyInvoices={companyInvoices}
          stakeholdersDocuments={stakeholdersDocuments}
          isDisabledNextStep={isDisabledNextStep}
          isLoading={isLoading}
          goToSelectService={goToSelectService}
          signatories={signatories}
          companyName={companyName}
        />
      ) : (
        <UploadLimitComponent />
      )}
    </>
  );
};

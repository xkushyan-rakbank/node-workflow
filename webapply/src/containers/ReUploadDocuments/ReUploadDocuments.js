import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import nanoid from "nanoid";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { ReUploadDocumentsComponent } from "./components/ReUploadDocuments/ReUploadDocuments";
import { useLayoutParams } from "../FormLayout/LayoutProvider";
import { useViewId } from "../../utils/useViewId";
import {
  addOtherDocument,
  cancelDocUpload,
  deleteOtherDocument,
  docUpload,
  retrieveDocDetails
} from "../../store/actions/uploadDocuments";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { getProgress, getUploadErrors } from "../../store/selectors/uploadDocuments";
import { getOtherDocuments, getCompanyDocuments } from "../../store/selectors/appConfig";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { NEXT, OTHER_DOCUMENTS, SUBMIT, UPLOADED } from "../../constants";
import routes from "../../routes";
import { UploadLimitComponent } from "../UploadDocuments/components/UploadLimit/UploadLimit";

export const ReUploadDocuments = () => {
  const [docUploadLimit, setDocUploadLimit] = useState(1);
  const [currentUplCnt, setCurrentUplCnt] = useState(0);
  const dispatch = useDispatch();
  const otherDocuments = useSelector(getOtherDocuments);
  const companyDocuments = useSelector(getCompanyDocuments);
  const progress = useSelector(getProgress);
  const uploadErrors = useSelector(getUploadErrors);
  const pushHistory = useTrackingHistory();

  useFormNavigation([true, false]);
  useLayoutParams(true);
  useViewId();

  useEffect(() => {
    dispatch(retrieveDocDetails());
  }, [dispatch]);

  useEffect(() => {
    if (typeof companyDocuments[0] !== "undefined") {
      setDocUploadLimit(companyDocuments[0].DocumentUploadCnt);
      setCurrentUplCnt(companyDocuments[0].DocumentUplTotalCnt);
    }
  }, [companyDocuments]);

  const isSubmitButtonActive =
    !!otherDocuments.length && otherDocuments.every(doc => doc.uploadStatus === UPLOADED);

  const uploadDocument = useCallback(
    file => {
      const documentKey = nanoid();
      const documentType = "Others";

      dispatch(
        addOtherDocument({
          documentType,
          documentKey,
          fileName: null,
          fileData: null,
          fileFormat: null,
          fileSize: file.size,
          fileDescription: file.name,
          submittedBy: null,
          submittedDt: null,
          uploadStatus: "NotUploaded"
        })
      );

      const data = new FormData();
      data.append("fileInfo", JSON.stringify({ documentKey, documentType }));
      data.append("file", file);

      const successfulUploadProps = {
        uploadStatus: UPLOADED,
        submittedDt: file.lastModifiedDate,
        fileFormat: file.type
      };

      dispatch(
        docUpload({
          data,
          docProps: successfulUploadProps,
          docOwner: OTHER_DOCUMENTS,
          userFileName: file.name,
          documentType,
          documentKey
        })
      );
      setTimeout(
        () => dispatch(sendProspectToAPIPromisify(NEXT, null, SUBMIT)).then(() => {}, () => {}),
        500
      );
    },
    [dispatch]
  );

  const removeDocument = useCallback(
    documentKey => {
      dispatch(cancelDocUpload(documentKey));
      dispatch(deleteOtherDocument(documentKey));
    },
    [dispatch]
  );

  const submitForm = useCallback(() => {
    dispatch(sendProspectToAPIPromisify(NEXT, null, SUBMIT)).then(
      () => pushHistory(routes.MyApplications),
      () => {}
    );
  }, [dispatch, pushHistory]);

  return (
    <>
      {docUploadLimit > currentUplCnt ? (
        <ReUploadDocumentsComponent
          uploadDocument={uploadDocument}
          isSubmitButtonActive={isSubmitButtonActive}
          otherDocuments={otherDocuments}
          progress={progress}
          removeDocument={removeDocument}
          submitForm={submitForm}
          uploadErrors={uploadErrors}
        />
      ) : (
        <UploadLimitComponent />
      )}
    </>
  );
};

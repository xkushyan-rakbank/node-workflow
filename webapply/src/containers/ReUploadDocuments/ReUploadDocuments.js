import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import nanoid from "nanoid";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useViewId } from "../../utils/useViewId";
import { ReUploadDocumentsComponent } from "./components/ReUploadDocuments/ReUploadDocuments";
import {
  addOtherDocument,
  cancelDocUpload,
  deleteOtherDocument,
  docUpload,
  retrieveDocDetails
} from "../../store/actions/uploadDocuments";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { getProgress, getUploadErrors } from "../../store/selectors/uploadDocuments";
import { getOtherDocuments } from "../../store/selectors/appConfig";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { NEXT, OTHER_DOCUMENTS, SUBMIT, UPLOADED } from "../../constants";
import routes from "../../routes";

export const ReUploadDocuments = () => {
  const dispatch = useDispatch();
  const otherDocuments = useSelector(getOtherDocuments);
  const progress = useSelector(getProgress);
  const uploadErrors = useSelector(getUploadErrors);
  const pushHistory = useTrackingHistory();

  useFormNavigation([true, false]);
  useViewId();

  useEffect(() => {
    dispatch(retrieveDocDetails());
  }, [dispatch]);

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
    <ReUploadDocumentsComponent
      uploadDocument={uploadDocument}
      isSubmitButtonActive={isSubmitButtonActive}
      otherDocuments={otherDocuments}
      progress={progress}
      removeDocument={removeDocument}
      submitForm={submitForm}
      uploadErrors={uploadErrors}
    />
  );
};

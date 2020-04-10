import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DocumentRowComponent } from "./components/DocumentRow/DocumentRow";
import {
  getIsEditableStatusSearchInfo,
  getProspectStatus
} from "../../store/selectors/searchProspect";
import { updateProspect } from "../../store/actions/appConfig";
import { cancelDocUpload, docUpload } from "../../store/actions/uploadDocuments";
import { getProgress, getUploadErrors } from "../../store/selectors/uploadDocuments";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";
import { COMPANY_DOCUMENTS, STAKEHOLDER_DOCUMENTS, UPLOADED } from "../../constants";
import { DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS } from "./constants";

export const DocumentRow = ({ document, type: docOwner, index, stakeholderIndex }) => {
  const dispatch = useDispatch();
  const isApplyEditApplication = useSelector(getIsEditableStatusSearchInfo);
  const prospectStatusInfo = useSelector(getProspectStatus);
  const uploadErrors = useSelector(getUploadErrors);
  const progress = useSelector(getProgress);

  const [selectedFile, setSelectedFile] = useState(null);
  const isDisabledUploadForRO =
    isApplyEditApplication && DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS.includes(prospectStatusInfo);
  const { documentKey, documentType = "" } = document;
  const isUploaded = document.uploadStatus === UPLOADED;

  const uploadDocument = useCallback(
    file => {
      const fileInfo = JSON.stringify({ documentKey, documentType });
      const docProps = {
        uploadStatus: UPLOADED,
        fileSize: file.size,
        submittedDt: file.lastModifiedDate,
        fileFormat: file.type
      };
      const data = new FormData();
      data.append("fileInfo", fileInfo);
      data.append("file", file);

      dispatch(
        docUpload({
          data,
          docProps,
          docOwner,
          documentType,
          documentKey,
          index,
          userFileName: file.name,
          stakeholderIndex
        })
      );
      setSelectedFile(file);
    },
    [documentKey, documentType, docOwner, dispatch, index, stakeholderIndex]
  );

  const fileUploadCancel = useCallback(() => {
    if (docOwner === COMPANY_DOCUMENTS) {
      dispatch(
        updateProspect({
          [`prospect.documents[${COMPANY_DOCUMENTS}][${index}].uploadStatus`]: "NotUploaded"
        })
      );
    } else if (docOwner === STAKEHOLDER_DOCUMENTS) {
      dispatch(
        updateProspect({
          [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}].documents[${index}].uploadStatus`]: "NotUploaded"
        })
      );
    }
    dispatch(cancelDocUpload(documentKey));
    setSelectedFile(null);
    dispatch(sendProspectToAPI());
  }, [dispatch, docOwner, documentKey, index, stakeholderIndex]);

  const reUploadHandler = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <DocumentRowComponent
      isUploadError={uploadErrors[documentKey]}
      isUploaded={isUploaded}
      isUploading={!!selectedFile && !isUploaded}
      percentComplete={isUploaded ? 100 : progress[documentKey] || 0}
      selectedFile={selectedFile}
      uploadDocument={uploadDocument}
      isDisabledUploadForRO={isDisabledUploadForRO}
      reUploadHandler={reUploadHandler}
      cancelHandler={fileUploadCancel}
      document={document}
    />
  );
};

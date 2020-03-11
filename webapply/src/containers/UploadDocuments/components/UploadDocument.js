import React, { useState, useRef, useCallback } from "react";
import cx from "classnames";

import { documentValidationSchema } from "./../../../utils/validation";

import { ReactComponent as FileIcon } from "../../../assets/icons/file.svg";
import { useStyles } from "./styled";
import { ICONS, Icon } from "../../../components/Icons/Icon";
import { COMPANY_DOCUMENTS, STAKEHOLDER_DOCUMENTS, BYTES_IN_MEGABYTE } from "./../../../constants";
import { DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS } from "../constants";
import { DocumentUploadError } from "../../../components/DocumentUploadError/DocumentUploadError";

export const UploadDocuments = ({
  document,
  type: docOwner,
  docUpload,
  index,
  stakeholderIndex,
  uploadErrorMessage,
  progress,
  cancelDocUpload,
  updateProspect,
  isApplyEditApplication,
  prospectStatusInfo,
  sendProspectToAPI
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const classes = useStyles();
  const inputEl = useRef(null);
  const isDisabledUploadForRO =
    isApplyEditApplication && DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS.includes(prospectStatusInfo);
  const { documentKey, documentType = "" } = document;
  const isUploaded = document.uploadStatus === "Uploaded";
  const isUploading = selectedFile && !isUploaded;
  const isUploadError = uploadErrorMessage[documentKey];
  const percentComplete = isUploaded ? 100 : progress[documentKey] || 0;
  const fileUploadClick = event => (event.target.value = null);
  const fileUploadChange = useCallback(() => {
    const file = inputEl.current.files[0];

    try {
      documentValidationSchema.validateSync({ file }, { abortEarly: false });
    } catch (error) {
      return setErrorMessage(error.message);
    }

    const fileInfo = JSON.stringify({ documentKey, documentType });
    const docProps = {
      uploadStatus: "Uploaded",
      fileSize: file.size,
      submittedDt: file.lastModifiedDate,
      fileFormat: file.type
    };
    const data = new FormData();
    data.append("fileInfo", fileInfo);
    data.append("file", file);

    docUpload({
      data,
      docProps,
      docOwner,
      documentType,
      documentKey,
      index,
      userFileName: file.name,
      stakeholderIndex
    });
    setErrorMessage(null);
    setSelectedFile(file);
  }, [documentKey, documentType, docOwner, docUpload, index, stakeholderIndex]);

  const fileUploadCancel = useCallback(() => {
    if (docOwner === COMPANY_DOCUMENTS) {
      updateProspect({
        [`prospect.documents[${COMPANY_DOCUMENTS}][${index}].uploadStatus`]: "NotUploaded"
      });
    } else if (docOwner === STAKEHOLDER_DOCUMENTS) {
      updateProspect({
        [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}].documents[${index}].uploadStatus`]: "NotUploaded"
      });
    }
    cancelDocUpload(documentKey);
    setSelectedFile(null);
    sendProspectToAPI();
  }, [
    cancelDocUpload,
    docOwner,
    documentKey,
    index,
    stakeholderIndex,
    updateProspect,
    sendProspectToAPI
  ]);

  const reUploadHandler = useCallback(() => {
    inputEl.current.click();
    setSelectedFile(null);
  }, []);

  const renderDocumentTitle = () => {
    if (isUploading) {
      return `Uploading ${document.documentTitle}`;
    } else if (isUploaded && selectedFile) {
      return selectedFile.name;
    } else if (isUploaded && document.fileDescription) {
      return document.fileDescription;
    } else {
      return document.documentTitle;
    }
  };

  return (
    <div
      className={cx(classes.fileUploadPlaceholder, {
        [classes.disabled]: isDisabledUploadForRO
      })}
    >
      <input
        className={classes.defaultInput}
        name="file"
        type="file"
        onChange={fileUploadChange}
        onClick={fileUploadClick}
        ref={inputEl}
      />

      {(selectedFile || isUploaded) && <FileIcon width="20" height="26" alt="companyIconSvg" />}

      <div className={classes.ContentBox}>
        <p className={classes.uploadedFileName}>
          {renderDocumentTitle}

          {selectedFile && (
            <span className={classes.signatoryRights}>
              {(selectedFile.size / BYTES_IN_MEGABYTE).toFixed(1)} MB
            </span>
          )}
        </p>

        <div className={classes.fileSizeMessage}>
          {isUploading && (
            <div className={classes.uploadFileName}>
              <div id="Progress_Status">
                <div className={classes.myProgressBar} style={{ width: `${percentComplete}%` }} />
              </div>
              <div className={classes.progressStatus}>{percentComplete}%</div>
            </div>
          )}

          {isUploadError && <DocumentUploadError tryAgainHandler={reUploadHandler} />}

          {!selectedFile && !isUploaded && !errorMessage && (
            <p>Supported formats are PDF, JPG and PNG | 5MB maximum size</p>
          )}
        </div>

        {errorMessage && <p className={classes.errorExplanation}>{errorMessage}</p>}
      </div>

      {!isDisabledUploadForRO && (
        <>
          {selectedFile || isUploaded ? (
            <Icon
              name={ICONS.close}
              className={classes.cancel}
              onClick={fileUploadCancel}
              alt="cancel upload"
            />
          ) : (
            <p
              className={classes.ControlsBox}
              justify="flex-end"
              onClick={() => inputEl.current.click()}
            >
              Upload
            </p>
          )}
        </>
      )}
    </div>
  );
};

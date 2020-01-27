import React, { useState, useRef, useCallback, useMemo } from "react";
import nanoid from "nanoid";
import * as Yup from "yup";

import { FILE_SIZE, SUPPORTED_FORMATS } from "./../../../utils/validation";
import companyIconSvg from "../../../assets/icons/file.png";
import { useStyles } from "./styled";
import { COMPANY_DOCUMENTS, STAKEHOLDER_DOCUMENTS } from "./../../../constants";
import { ICONS, Icon } from "../../../components/Icons/Icon";

const validationFileSchema = Yup.object().shape({
  file: Yup.mixed()
    .test("size", "File size exceeded (5Mb maximum)", value => value && value.size <= FILE_SIZE)
    .test(
      "type",
      "Supported formats are PDF, JPG and PNG",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
});

export const UploadDocuments = ({
  document,
  type: docOwner,
  docUpload,
  icon,
  index,
  stakeholderIndex,
  uploadErrorMessage,
  progress,
  cancelDocUpload,
  updateProspect
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const classes = useStyles();
  const inputEl = useRef(null);
  const documentKey = useMemo(() => nanoid(), []);
  const isUploaded = document.uploadStatus === "Uploaded";
  const isUploadError = Object.keys(uploadErrorMessage).length && uploadErrorMessage[documentKey];
  const isUploading = selectedFile && !isUploaded;

  const fileUploadClick = event => (event.target.value = null);

  const fileUploadChange = useCallback(() => {
    const file = inputEl.current.files[0];

    try {
      validationFileSchema.validateSync({ file }, { abortEarly: false });
    } catch (error) {
      return setErrorMessage(error.message);
    }

    const fileInfo = JSON.stringify({
      documentKey,
      documentType: document.documentType || ""
    });
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
      documentType: document.documentType,
      documentKey,
      index,
      stakeholderIndex
    });
    setErrorMessage(null);
    setSelectedFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);

  const fileUploadCancel = useCallback(() => {
    if (docOwner === COMPANY_DOCUMENTS) {
      updateProspect({
        [`prospect.documents[${COMPANY_DOCUMENTS}][${index}].uploadStatus`]: "NotUploaded"
      });
    } else if (docOwner === STAKEHOLDER_DOCUMENTS) {
      updateProspect({
        [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}].d
  ocuments[${index}].uploadStatus`]: "NotUploaded"
      });
    }
    cancelDocUpload(documentKey);
    setSelectedFile(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reUploadHandler = useCallback(() => {
    inputEl.current.click();
    setSelectedFile(null);
  });

  const uploadingProress = () => {
    const percentComplete = isUploaded ? 100 : progress[documentKey] || 0;
    return (
      <div className={classes.uploadFileName}>
        <div id="Progress_Status">
          <div className={classes.myProgressBar} style={{ width: `${percentComplete}%` }}></div>
        </div>
        <div className={classes.progressStatus}>{percentComplete}%</div>
      </div>
    );
  };

  const uploadingError = () => (
    <p className={classes.ErrorExplanation}>
      <Icon name={ICONS.infoRed} alt="upload error" />
      Oops! We couldn’t upload the document.
      <span className={classes.tryAgain} onClick={reUploadHandler}>
        Please try again.
      </span>
    </p>
  );

  const uploadingStatus = () => {
    switch (true) {
      case isUploading:
        return uploadingProress();
      case isUploadError:
        return uploadingError();
      case isUploaded:
        return null;
    }
  };

  return (
    <div className={classes.fileUploadPlaceholder}>
      <input
        className={classes.defaultInput}
        name="file"
        type="file"
        onChange={fileUploadChange}
        onClick={fileUploadClick}
        ref={inputEl}
      />

      {(selectedFile || isUploaded) && <img src={companyIconSvg} alt="companyIconSvg" />}

      <div className={classes.ContentBox}>
        <p className={classes.uploadedFileName}>
          {isUploading
            ? `Uploading ${document.documentType}`
            : isUploaded
            ? document.fileName
            : document.documentType}

          {selectedFile && (
            <span className={classes.signatoryRights}>{selectedFile.size} Bytes</span>
          )}
        </p>

        <div className={classes.fileSizeMessage}>
          {selectedFile || isUploaded ? (
            uploadingStatus()
          ) : (
            <p>Supported formats are PDF, JPG and PNG | 5MB maximum size</p>
          )}
        </div>

        {errorMessage && <p className={classes.ErrorExplanation}>{errorMessage}</p>}
      </div>

      {selectedFile || isUploaded ? (
        <p className={classes.cancel} onClick={fileUploadCancel}>
          x
        </p>
      ) : (
        <p
          className={classes.ControlsBox}
          justify="flex-end"
          onClick={() => inputEl.current.click()}
        >
          Upload
        </p>
      )}
    </div>
  );
};

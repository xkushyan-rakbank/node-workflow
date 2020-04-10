import React, { useCallback, useRef, useState } from "react";
import cx from "classnames";
import { BYTES_IN_MEGABYTE } from "../../../../constants";
import { DocumentUploadError } from "../../../../components/DocumentUploadError/DocumentUploadError";
import { documentValidationSchema } from "../../../../utils/validation";
import { Icon, ICONS } from "../../../../components/Icons";

import { useStyles } from "../styled";

import { ReactComponent as FileIcon } from "../../../../assets/icons/file.svg";

export const DocumentRowComponent = ({
  isDisabledUploadForRO,
  isUploaded,
  selectedFile,
  isUploading,
  percentComplete,
  reUploadHandler,
  cancelHandler,
  isUploadError,
  uploadDocument,
  document
}) => {
  const classes = useStyles();
  const inputEl = useRef(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const fileUploadClick = event => (event.target.value = null);
  const fileUploadChange = useCallback(() => {
    const file = inputEl.current.files[0];

    try {
      setErrorMessage(null);
      documentValidationSchema.validateSync({ file }, { abortEarly: false });
      uploadDocument(file);
    } catch (error) {
      return setErrorMessage(error.message);
    }
  }, [uploadDocument]);

  const tryAgain = () => {
    inputEl.current.click();
    reUploadHandler();
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
          {(() => {
            if (isUploading) {
              return `Uploading ${document.documentTitle}`;
            } else if (isUploaded && selectedFile) {
              return selectedFile.name;
            } else if (isUploaded && document.fileDescription) {
              return document.fileDescription;
            } else {
              return document.documentTitle;
            }
          })()}

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

          {isUploadError && <DocumentUploadError tryAgainHandler={tryAgain} />}

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
              onClick={cancelHandler}
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

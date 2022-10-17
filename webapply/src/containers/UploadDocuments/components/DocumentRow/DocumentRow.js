import React, { useCallback, useRef, useState } from "react";
import cx from "classnames";
import { BYTES_IN_MEGABYTE } from "../../../../constants";
import { DocumentUploadError } from "../../../../components/DocumentUploadError/DocumentUploadError";
import { documentValidationSchema } from "../../../../utils/validation";
import { Icon, ICONS } from "../../../../components/Icons";

import { useStyles } from "../styled";

import { ReactComponent as FileIcon } from "../../../../assets/icons/file.svg";
import { OverwriteAlert } from "../OverwriteAlert/OverwriteAlert";
import { ContexualHelp } from "../../../../components/Notifications";

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
  required = false,
  document,
  docRemoveWarning = true,
  infoMessage = "",
  multiDoc = false
}) => {
  const classes = useStyles();
  const inputEl = useRef(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [removeAlert, setRemoveAlert] = useState(false);
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

  const cancelUpload = () => {
    cancelHandler();
    setRemoveAlert(false);
    if (docRemoveWarning) inputEl.current.click();
  };

  return (
    <>
      <div
        className={cx(
          classes.fileUploadPlaceholder,
          {
            [classes.disabled]: isDisabledUploadForRO
          },
          { [classes.multiFileUploadPlaceholder]: !docRemoveWarning }
        )}
      >
        <input
          className={classes.defaultInput}
          name="file"
          type="file"
          onChange={fileUploadChange}
          onClick={fileUploadClick}
          ref={inputEl}
        />

        {(selectedFile || isUploaded) && (
          <FileIcon className={classes.fileIcon} height="26" alt="companyIconSvg" />
        )}

        <div className={classes.ContentBox}>
          <p className={classes.uploadedFileName}>
            {(() => {
              if (isUploading) {
                return `Uploading ${document.documentTitle}`;
              } else if (isUploaded && selectedFile && !multiDoc) {
                return selectedFile.name;
              } else if (isUploaded && document.fileDescription) {
                return (
                  <span>
                    {document.documentTitle && document.documentTitle === ""
                      ? ""
                      : document.documentTitle.slice(document.documentTitle.indexOf(" "))}{" "}
                    <br />
                    {document.fileDescription}
                  </span>
                );
              } else {
                const requiredLabel = required ? " * " : "";
                return requiredLabel + document.documentTitle;
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
            {/* ro-assist-brd2-1 */}
            {infoMessage && !isUploaded && (
              <ContexualHelp title={infoMessage} placement="right" isDisableHoverListener={false}>
                <div className={classes.uploadInfo}>
                  <Icon name={ICONS.question} alt="question" className={classes.questionIcon} />
                  <p>Need more information ?</p>
                </div>
              </ContexualHelp>
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
                onClick={() => (docRemoveWarning ? setRemoveAlert(true) : cancelUpload())}
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
      {removeAlert && (
        <OverwriteAlert
          message="We can see that you are about to re-upload a document. Keep in mind that this will replace your previous upload"
          handleClose={() => setRemoveAlert(false)}
          isOpen={removeAlert}
          handleConfirm={cancelUpload}
        />
      )}
    </>
  );
};

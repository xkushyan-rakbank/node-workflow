import React from "react";
import { BYTES_IN_MEGABYTE, UPLOADED } from "../../../../constants";
import { useStyles } from "./styled";

import { ReactComponent as FileIcon } from "../../../../assets/icons/file.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import { DocumentUploadError } from "../../../../components/DocumentUploadError/DocumentUploadError";

export const DocumentRow = ({
  fileDescription,
  fileSize,
  uploadStatus,
  error,
  documentProgress,
  removeDocument
}) => {
  const isUploaded = uploadStatus === UPLOADED;
  const classes = useStyles({ isUploaded });
  const isUploading = typeof documentProgress === "number" && !isUploaded;

  return (
    <div className={classes.uploadedFile}>
      <FileIcon className={classes.fileIcon} width="20" height="26" />
      <div className={classes.contentBox}>
        <div className={classes.uploadFileName}>
          {isUploading && "Uploading"} {fileDescription}
          <span className={classes.fileSize}>{(fileSize / BYTES_IN_MEGABYTE).toFixed(1)} MB</span>
        </div>
        {isUploading && (
          <div className={classes.progressContainer}>
            <div className={classes.progressBar}>
              <div className={classes.progressInner} style={{ width: `${documentProgress}%` }} />
            </div>
            <div className={classes.progressStatus}>{documentProgress}%</div>
          </div>
        )}
        {error && <DocumentUploadError tryAgainHandler={removeDocument} />}
      </div>
      <CloseIcon width={24} height={24} className={classes.cancelIcon} onClick={removeDocument} />
    </div>
  );
};

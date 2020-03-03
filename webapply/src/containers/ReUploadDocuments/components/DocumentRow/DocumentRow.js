import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelDocUpload,
  deleteOtherDocument
} from "../../../../store/actions/getProspectDocuments";
import { getProgress, getUploadErrors } from "../../../../store/selectors/getProspectDocuments";
import { BYTES_IN_MEGABYTE } from "../../../../constants";
import { useStyles } from "./styled";

import { ReactComponent as FileIcon } from "../../../../assets/icons/file.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import { ReactComponent as AlertIcon } from "../../../../assets/icons/alert.svg";

export const DocumentRow = ({ fileDescription, fileSize, documentKey, uploadStatus }) => {
  const isUploaded = uploadStatus === "Uploaded";
  const classes = useStyles({ isUploaded });
  const dispatch = useDispatch();
  const progress = useSelector(getProgress);
  const uploadErrors = useSelector(getUploadErrors);
  const error = uploadErrors[documentKey];
  const percentComplete = progress[documentKey];
  const isUploading = typeof percentComplete === "number" && percentComplete !== 100;

  const removeFile = () => {
    if (isUploading) {
      dispatch(cancelDocUpload(documentKey));
    }
    dispatch(deleteOtherDocument(documentKey));
  };

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
              <div className={classes.progressInner} style={{ width: `${percentComplete}%` }} />
            </div>
            <div className={classes.progressStatus}>{percentComplete}%</div>
          </div>
        )}
        {error && (
          <span className={classes.error}>
            <AlertIcon className={classes.alertIcon} />
            Oops! We couldn&apos;t upload the document. Please
            <span className={classes.errorLink} onClick={removeFile}>
              try again.
            </span>
          </span>
        )}
      </div>
      <CloseIcon width={24} height={24} className={classes.cancelIcon} onClick={removeFile} />
    </div>
  );
};

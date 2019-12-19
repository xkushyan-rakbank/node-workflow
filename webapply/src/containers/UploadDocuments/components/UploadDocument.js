import React, { useState, useRef, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import nanoid from "nanoid";
import * as Yup from "yup";

import {
  retrieveDocDetails,
  docUpload,
  cancelDocUpload
} from "../../../store/actions/getProspectDocuments";
import { FILE_SIZE, SUPPORTED_FORMATS } from "./../../../utils/validation";
import companyIconSvg from "../../../assets/icons/file.png";
import { useStyles } from "./styled";

const validationFileSchema = Yup.object().shape({
  file: Yup.mixed()
    .test("size", "File size exceeded (5Mb maximum)", value => value && value.size <= FILE_SIZE)
    .test(
      "type",
      "Supported formats are PDF, JPG and PNG",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
});

const UploadDocumentsComponent = ({
  document,
  type: docOwner,
  docUpload,
  icon,
  uploadErrorMessage,
  propgress,
  cancelDocUpload
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const classes = useStyles();
  const inputEl = useRef(null);
  const documentKey = useMemo(() => nanoid(), []);

  const fileUploadHandler = useCallback(() => {
    const file = inputEl.current.files[0];

    try {
      validationFileSchema.validateSync({ file }, { abortEarly: false });
    } catch (error) {
      return setErrorMessage(error.message);
    }

    const fileInfo = JSON.stringify({ documentKey });
    const docProps = {
      uploadStatus: "Uploaded",
      fileName: file.name,
      fileSize: file.size,
      submittedDt: file.lastModifiedDate,
      fileFormat: file.type
    };
    const data = new FormData();
    data.append("fileInfo", fileInfo);
    data.append("file", file);

    docUpload({ data, docProps, docOwner, documentType: document.documentType, documentKey });
    setErrorMessage(null);
    setSelectedFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);

  const fileUploadCancel = useCallback(() => {
    cancelDocUpload(documentKey);
    setSelectedFile(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (document.uploadStatus === "NotUploaded") {
    return null;
  }

  return (
    <div className={classes.fileUploadPlaceholder}>
      <input
        className={classes.defaultInput}
        name="file"
        type="file"
        onChange={fileUploadHandler}
        ref={inputEl}
        multiple
      />

      <>
        {!selectedFile && (
          <div className={classes.ContentBox}>
            {!selectedFile && <p className={classes.uploadedFileName}>{document.documentType}</p>}
            {errorMessage && <p className={classes.ErrorExplanation}>{errorMessage}</p>}
            {!errorMessage && !selectedFile && (
              <p className={classes.fileSizeMessage}>
                Supported formats are PDF, JPG and PNG | 5MB maximum size
              </p>
            )}
            {uploadErrorMessage && (
              <p className={classes.ErrorExplanation}>Error while uploading</p>
            )}
          </div>
        )}
        {!selectedFile && (
          <p
            className={classes.ControlsBox}
            justify="flex-end"
            onClick={() => inputEl.current.click()}
          >
            Upload
          </p>
        )}
      </>
      <>
        {selectedFile && (
          <>
            <div>{icon || <img src={companyIconSvg} alt="companyIconSvg" />}</div>
            <div className={classes.contentBox}>
              <div className={classes.uploadFileName}>
                {selectedFile.name}
                <span className={classes.signatoryRights}>{selectedFile.size} Bytes</span>
              </div>
              <div className={classes.uploadFileName}>
                <div id="Progress_Status">
                  <div className={classes.myProgressBar} style={{ width: `${propgress}%` }}></div>
                </div>
                <div className={classes.progressStatus}>{propgress}%</div>
              </div>
            </div>
            <p className={classes.cancel} onClick={fileUploadCancel}>
              x
            </p>
          </>
        )}
      </>
    </div>
  );
};

const mapStateToProps = state => ({
  propgress: state.uploadDocuments.propgress
});

const mapDispatchToProps = {
  retrieveDocDetails,
  docUpload,
  cancelDocUpload
};

export const UploadDocuments = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocumentsComponent);

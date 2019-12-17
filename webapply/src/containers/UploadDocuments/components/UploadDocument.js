import React, { useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import nanoid from "nanoid";
import * as Yup from "yup";

import { retrieveDocDetails, docUpload } from "../../../store/actions/getProspectDocuments";
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

const UploadDocumentsComponent = props => {
  const { documents, type: docOwner, docUpload, icon, uploadErrorMessage } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [percentCompleted, setPercentCompleted] = useState(0);
  const classes = useStyles();
  const inputEl = useRef(null);
  const NotUploaded = documents.uploadStatus !== "NotUploaded";

  const fileUploadHandler = useCallback(() => {
    const file = inputEl.current.files[0];

    try {
      const isValid = validationFileSchema.validateSync({ file }, { abortEarly: false });

      if (isValid) {
        const fileInfo = JSON.stringify({
          documentKey: nanoid()
        });

        const docProps = {
          uploadStatus: "Uploaded",
          fileName: file.name,
          fileSize: file.size,
          submittedDt: file.lastModifiedDate,
          fileFormat: file.type
        };

        const docType = documents.documentType;

        const data = new FormData();
        data.append("fileInfo", fileInfo);
        data.append("file", file);
        docUpload(data, docProps, docOwner, docType);
        setErrorMessage(null);
        setSelectedFile(file);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  });

  const fileUploadCancel = () => {
    setSelectedFile(null);
  };

  return (
    <>
      {NotUploaded && (
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
                {!selectedFile && (
                  <p className={classes.uploadedFileName}>{documents.documentType}</p>
                )}
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
                      <div className={classes.myProgressBar} style={{ width: "100%" }}></div>
                    </div>
                    <div className={classes.progressStatus}>100%</div>
                  </div>
                </div>
                <p className={classes.cancel} onClick={fileUploadCancel}>
                  x
                </p>
              </>
            )}
          </>
        </div>
      )}
      <></>
    </>
  );
};
const mapDispatchToProps = {
  retrieveDocDetails,
  docUpload
};

export const UploadDocuments = connect(
  null,
  mapDispatchToProps
)(UploadDocumentsComponent);

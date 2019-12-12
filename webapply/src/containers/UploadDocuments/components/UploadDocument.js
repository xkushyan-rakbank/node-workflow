import React, { useState, useRef } from "react";
import { connect } from "react-redux";

import { retrieveDocDetails, docUpload } from "../../../store/actions/getProspectDocuments";
import { getProspectId, getProspectErrorMessage } from "../../../store/selectors/appConfig";
import companyIconSvg from "../../../assets/icons/file.png";
import { useStyles } from "./styled";

const UploadDocumentsComponent = props => {
  const { documents, docUpload, prospectID, icon, uploadErrorMessage, index } = props;
  const classes = useStyles();
  const inputEl = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const uploadFileSizeMax = 5;

  const fileValidation = file => {
    const types = ["image/png", "image/jpeg", "application/pdf", "application/txt"];
    if (types.indexOf(file.type) < 0) {
      setErrorMessage("Supported formats are PDF, JPG and PNG");
      return false;
    } else if (file.size >= uploadFileSizeMax * 1048576) {
      setErrorMessage("File size exceeded (5Mb maximum)");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };
  const fileUploadHandler = () => {
    if (fileValidation(inputEl.current.files[0])) {
      let docKey;
      if (documents.signatoryName) {
        docKey =
          documents.documentType +
          documents.signatoryName +
          Math.floor(Math.random() * 100000 + 1000);
      } else {
        docKey = documents.documentType + Math.floor(Math.random() * 100000 + 1000);
      }
      docKey = docKey.replace(/\s/g, "");
      let fileInfo = {
        documentKey: docKey
      };

      fileInfo = JSON.stringify(fileInfo);
      const data = new FormData();
      data.append("fileInfo", fileInfo);
      data.append("file", inputEl.current.files[0]);
      docUpload(props, inputEl.current.files[0], data, prospectID || "COSME0017");
      setSelectedFile(inputEl.current.files[0]);
    }
  };
  const fileUploadCancel = () => {
    setSelectedFile(null);
  };

  return (
    <>
      {documents.uploadStatus !== "NotUploaded" && (
        <div className={classes.fileUploadPlaceholder}>
          <input
            className={classes.defaultInput}
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
                    Supported formats are PDF, JPG and PNG | {uploadFileSizeMax}MB maximum size
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
                      <div className={classes.myProgressBar} id={`myProgressBar${index}`}></div>
                    </div>
                    <div className={classes.progressStatus} id={`progressStatus${index}`}></div>
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

const mapStateToProps = state => ({
  prospectID: getProspectId(state),
  uploadErrorMessage: getProspectErrorMessage(state)
});

export const UploadDocuments = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocumentsComponent);

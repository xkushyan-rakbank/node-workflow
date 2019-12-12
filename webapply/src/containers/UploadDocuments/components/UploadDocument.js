import React, { useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { retrieveDocDetails, docUpload } from "../../../store/actions/getProspectDocuments";
import companyIconSvg from "../../../assets/icons/file.png";
import * as appConfigSelectors from "../../../store/selectors/appConfig";

const style = {
  fileUploadPlaceholder: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    padding: "0 25px",
    borderTop: "solid 1px rgba(230, 230, 230, 0.5)",
    cursor: "pointer"
  },
  contentBox: {
    alignItems: "center",
    flexGrow: "1",
    paddingLeft: "18px"
  },

  uploadedFileName: {
    fontSize: "12px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: ".6",
    letterSpacing: "normal",
    color: "#373737",
    display: "block"
  },

  fileSizeMessage: {
    color: "#888888",
    fontSize: "12px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: ".6",
    letterSpacing: "normal"
  },
  controlsBox: {
    width: "130px",
    height: "32px",
    borderRadius: "21px",
    border: "solid 1px #373737",
    fontSize: "14px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#373737",
    cursor: "pointer",
    lineHeight: "2.2"
  },
  UploadedContentBox: {
    display: "flex",
    alignItems: "center",
    flexGrow: "1",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  uploadFileName: {
    fontSize: "12px",
    fontWeight: "600",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.17",
    letterSpacing: "normal",
    color: "#373737",
    paddingLeft: "5px"
  },
  SignatoryRights: {
    width: "39px",
    height: "14px",
    fontSize: "12px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.17",
    letterSpacing: "normal",
    color: "#888888",
    paddingLeft: "9px"
  },
  SignatoryRightsCopy: {
    width: "25px",
    height: "18px",
    fontSize: "12px",
    fontWeight: "600",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "right",
    color: "#373737",
    paddingLeft: "11px"
  },
  ErrorExplanation: {
    fontSize: "12px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: ".6",
    letterSpacing: "normal",
    color: "#ea2925"
  },

  cancel: {
    borderRadius: "25px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    padding: "0 6px",
    justify: "flex-end"
  },
  defaultInput: {
    display: "none"
  },
  myProgressBar: {
    height: "4px",
    borderRadius: "3px",
    textAlign: "center",
    lineHeight: "32px",
    color: "black"
  },
  progressStatus: {
    display: "inline-block",
    paddingLeft: "11px"
  }
};

const UploadDocuments = props => {
  const { classes, documents, docUpload, prospectID, icon, uploadErrorMessage, index } = props;
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
      //verify the file type
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

      // storing the uploaded file details into form data

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
              <div className={classes.contentBox}>
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
                className={classes.controlsBox}
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
                    <span className={classes.SignatoryRights}>{selectedFile.size} Bytes</span>
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
  prospectID: appConfigSelectors.getProspectId(state),
  uploadErrorMessage: appConfigSelectors.getProspectErrorMessage(state)
});

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UploadDocuments)
);

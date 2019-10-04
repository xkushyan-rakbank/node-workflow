import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import companyIconSvg from "../../assets/icons/file.png";

const CancelToken = axios.CancelToken;
let call;
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
    lineHeight: "1.33",
    letterSpacing: "normal",
    color: "#ea2925"
  },
  cancel: {
    width: "14px",
    border: "solid 1.5px #373737",
    textAlign: "center",
    borderRadius: "66px",
    display: "inline-block",
    float: "right"
  }
};

class UploadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      enableUpload: true,
      fileError: false,
      isUploadSucess: false
    };
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.fileUploadCancel = this.fileUploadCancel.bind(this);
  }

  fileUploadHandler(event) {
    call = "";
    call = call + this.props.companyDoc.documentType + this.props.companyDoc.signatoryId;
    call = call.replace(/\s/g, "");
    console.log("call$$$ ", call);
    this.call = CancelToken.source();

    this.setState(
      {
        selectedFile: event.target.files[0],
        enableUpload: false,
        isUploadSucess: false
      },
      () => {
        let config = {
          onUploadProgress: ProgressEvent => {
            let progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
            let element = document.getElementById("myprogressBar");
            let progressPercentage = document.getElementById("progressStatus");
            let width = progress;
            element.style.width = width + "%";
            progressPercentage.innerHTML = progress + "%";
          }
        };

        let fileDetails = {
          documentType: this.props.companyDoc.documentType,
          signatoryId: "",
          signatoryName: this.props.companyDoc.signatoryName,
          documentTitle: this.props.companyDoc.documentType,
          fileName: this.state.selectedFile.name,
          filePath: "",
          url: "",
          fileData: this.state.selectedFile.type,
          fileFormat: this.state.selectedFile.type,
          fileSize: this.state.selectedFile.size,
          fileDescription: this.props.companyDoc.documentType,
          submittedBy: "",
          submittedDt: this.state.selectedFile.lastModifiedDate,
          updatedBy: "",
          updatedDt: this.state.selectedFile.lastModifiedDate,
          avsCheckDt: "",
          avsCheck: false,
          verified: false,
          verifiedBy: "",
          isEncrypted: false,
          encryptionDetails: "",
          uploadStatus: ""
        };
        const fd = new FormData();
        fd.append("file", fileDetails);
        setTimeout(() => {
          axios
            .post(
              "http://10.86.81.7:8080/docUploader/banks/RAK/prospects/700/documents",
              fd,
              config,
              {
                cancelToken: this.call.token
              }
            )
            .catch(function(thrown) {
              if (axios.isCancel(thrown)) {
                this.setState({
                  fileError: true,
                  enableUpload: true
                });
                console.log("Request canceled", thrown.message);
              } else {
                this.setState({
                  enableUpload: false,
                  isUploadSucess: false
                });
                console.log("Request success", thrown.message);
              }
            });
        }, 10000);
      }
    );
  }

  fileUploadCancel(e) {
    call = e;
    call = call.replace(/\s/g, "");
    console.log("call### ", call);
    this.call.cancel("Operation canceled by the user.");
  }

  render() {
    const docType = this.props.companyDoc;
    return (
      <div className={this.props.classes.fileUploadPlaceholder}>
        <input
          style={{ display: "none" }}
          type="file"
          onChange={this.fileUploadHandler}
          ref={fileInput => (this.fileInput = fileInput)}
          multiple
        />
        {this.state.enableUpload ? (
          <>
            <div className={this.props.classes.contentBox}>
              <p className={this.props.classes.uploadedFileName}>{docType.documentType}</p>
              {this.state.fileError ? (
                <p className={this.props.classes.ErrorExplanation}>Error explanation goes here</p>
              ) : (
                <p className={this.props.classes.fileSizeMessage}>
                  Supported formats are PDF, JPG and PNG | 3MB maximum size
                </p>
              )}
            </div>
            <p
              className={this.props.classes.controlsBox}
              justify="flex-end"
              onClick={() => this.fileInput.click()}
            >
              Upload
            </p>
          </>
        ) : (
          <>
            <div>{this.props.icon || <img src={companyIconSvg} alt="companyIconSvg" />}</div>
            <div className={this.props.classes.contentBox}>
              <div className={this.props.classes.uploadFileName}>
                {this.state.selectedFile.name}
                <span className={this.props.classes.SignatoryRights}>
                  {this.state.selectedFile.size} Bytes
                </span>
              </div>
              {this.state.isUploadSucess ? null : (
                <div className={this.props.classes.uploadFileName}>
                  <div id="Progress_Status">
                    <div id="myprogressBar"></div>
                  </div>
                  <div id="progressStatus"></div>
                  <div
                    className={this.props.classes.cancel}
                    onClick={() =>
                      this.fileUploadCancel(
                        this.props.companyDoc.documentType + this.props.companyDoc.signatoryId
                      )
                    }
                  >
                    {" "}
                    X{" "}
                  </div>
                </div>
              )}
            </div>
            {this.state.isUploadSucess ? (
              <p
                className={this.props.classes.controlsBox}
                justify="flex-end"
                onClick={() => this.fileInput.click()}
              >
                Upload
              </p>
            ) : null}
          </>
        )}
      </div>
    );
  }
}

export default withStyles(style)(UploadDocuments);

// const fd = new FormData();
// // fd.append("file", this.state.selectedFile, fileDetails);
// fd.append("file", fileDetails);
// axios
//   // .post("http://10.86.81.7:8080/docUploader/banks/RAK/prospects/700/documents", fd, config)
//   .then(res => {
//     this.setState({
//       enableUpload: false,
//       isUploadSucess: false
//     });
//     console.log(res);
//   })
//   .catch(error => {
//     console.log(error);
//     this.setState({
//       fileError: true,
//       enableUpload: true
//     });
//   });

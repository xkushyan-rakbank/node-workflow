import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { connect } from "react-redux";
import { retrieveDocDetails, docUploadSuccess } from "../../store/actions/getProspectDocuments";
import companyIconSvg from "../../assets/icons/file.png";
import * as appConfigSelectors from "../../store/selectors/appConfig";

const CancelToken = axios.CancelToken;
let call;
let uploadDocUri;

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
    padding: "0 6px"
  }
};

class UploadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      enableUpload: true,
      fileError: false,
      isUploadSucess: false,
      isExcedeed: false,
      defaultMsg: true
    };
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.fileUploadCancel = this.fileUploadCancel.bind(this);
  }

  fileUploadHandler(event) {
    call = "";
    call = call + this.props.documents.documentType + this.props.documents.signatoryId;
    call = call.replace(/\s/g, "");
    this.call = CancelToken.source();

    this.setState(
      {
        selectedFile: event.target.files[0],
        enableUpload: false,
        isUploadSucess: false,
        defaultMsg: false
      },

      () => {
        //checking the file size

        let fileSize = this.state.selectedFile.size;
        if (fileSize <= 3145728) {
          //generating dynamic document keys

          let docKey;
          if (this.props.documents.signatoryName) {
            docKey =
              this.props.documents.documentType +
              this.props.documents.signatoryName +
              Math.floor(Math.random() * 100000 + 1000);
          } else {
            docKey = this.props.documents.documentType + Math.floor(Math.random() * 100000 + 1000);
          }
          docKey = docKey.replace(/\s/g, "");
          let fileInfo = {
            documentKey: docKey
          };

          // storing the uploaded file details into form data

          fileInfo = JSON.stringify(fileInfo);
          const data = new FormData();
          data.append("fileInfo", fileInfo);
          data.append("file", this.state.selectedFile);
          axios({
            method: "post",
            url: uploadDocUri,
            data,
            onUploadProgress: ProgressEvent => {
              let progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
              let element = document.getElementById("myprogressBar");
              let progressPercentage = document.getElementById("progressStatus");
              let width = progress;
              element.style.width = width + "%";
              element.style.backgroundColor = "#373737";
              progressPercentage.innerHTML = progress + "%";
            },
            cancelToken: this.call.token
          })
            .then(response => {
              this.setState({
                enableUpload: false,
                isUploadSucess: false
              });
              this.props.docUploadSuccess(this.props);
            })
            .catch(thrown => {
              if (axios.isCancel(thrown)) {
                this.setState({
                  enableUpload: true,
                  isUploadSucess: false,
                  defaultMsg: true
                });
                console.log("Request canceled", thrown.message);
              } else if (thrown.message === "Network Error") {
                this.setState({
                  fileError: true,
                  enableUpload: true
                });
              } else {
                this.setState({
                  enableUpload: false,
                  isUploadSucess: false
                });
              }
            });
        } else {
          this.setState({
            isExcedeed: true,
            enableUpload: true,
            defaultMsg: false
          });
        }
      }
    );
  }

  fileUploadCancel(e) {
    this.setState({
      enableUpload: true,
      isUploadSucess: false,
      defaultMsg: true
    });
    call = e;
    call = call.replace(/\s/g, "");
    this.call.cancel("Operation canceled by the user.");
  }

  render() {
    let endPoint = "/webapply/api/v1/prospects/" + this.props.prospectID + "/documents";
    uploadDocUri = this.props.uploadDocsEndpoints;
    uploadDocUri = uploadDocUri.baseUrl + endPoint;
    const docType = this.props.documents;
    if (docType.uploadStatus === "Not Uploaded" || docType.uploadStatus === "") {
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
                  <p className={this.props.classes.ErrorExplanation}>Error while uploading</p>
                ) : null}
                {this.state.isExcedeed ? (
                  <p className={this.props.classes.ErrorExplanation}>
                    File in a multipart request was exceeded
                  </p>
                ) : null}
                {this.state.defaultMsg ? (
                  <p className={this.props.classes.fileSizeMessage}>
                    Supported formats are PDF, JPG and PNG | 3MB maximum size
                  </p>
                ) : null}
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
                  </div>
                )}
              </div>

              <p
                className={this.props.classes.cancel}
                justify="flex-end"
                onClick={() =>
                  this.fileUploadCancel(
                    this.props.documents.documentType + this.props.documents.signatoryId
                  )
                }
              >
                X
              </p>
            </>
          )}
        </div>
      );
    } else {
      return <></>;
    }
  }
}

const mapDispatchToProps = {
  retrieveDocDetails,
  docUploadSuccess
};

const mapStateToProps = state => ({
  uploadDocsEndpoints: appConfigSelectors.getEndpoints(state),
  prospectID: appConfigSelectors.getProspectId(state)
});

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UploadDocuments)
);

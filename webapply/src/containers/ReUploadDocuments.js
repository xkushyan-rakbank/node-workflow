import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TagManager from "react-gtm-module";
import { connect } from "react-redux";
import closeBtn from "../assets/images/close.png";
import companyIconSvg from "../assets/icons/file.png";
import {
  retrieveDocDetails,
  extraDocUploadSuccess,
  deleteExtraDocUploadSuccess
} from "../store/actions/getProspectDocuments";
import * as appConfigSelectors from "./../store/selectors/appConfig";

const uploadFileSizeMax = 5;
const maxExtraDocUpload = 7;
const style = {
  sectionContainer: {
    padding: "23px",
    margin: "20px 0",
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff"
  },
  sectionContainerTitle: {
    verticalAlign: "super",
    paddingLeft: "29px"
  },
  title: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.33",
    letterSpacing: "normal",
    color: "#373737"
  },
  BtnSubmit: {
    width: "239px",
    height: "56px",
    borderRadius: "28px",
    border: "solid 2px #000000",
    backgroundColor: "#000000",
    fontSize: "18px",
    fontWeight: "600",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.33",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#ffffff",
    marginTop: "22px",
    outline: "transparent",
    cursor: "pointer"
  },
  BtnSubmitDisable: {
    width: "239px",
    height: "56px",
    borderRadius: "28px",
    backgroundColor: "#c6c6cc",
    fontSize: "18px",
    fontWeight: "600",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.33",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#ffffff",
    marginTop: "22px",
    outline: "transparent"
  },
  BtnBack: {
    fontSize: "14px",
    fontWeight: "600",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.29",
    letterSpacing: "normal",
    color: "#373737",
    background: "transparent",
    border: "transparent",
    marginTop: "22px",
    marginRight: "20px",
    outline: "transparent",
    cursor: "pointer",
    verticalAlign: "middle"
  },
  backIcon: {
    verticalAlign: "middle"
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
  contentBox: {
    alignItems: "center",
    flexGrow: "1",
    paddingLeft: "18px"
  },
  fileUploadPlaceholder: {
    display: "flex",
    alignItems: "center",
    padding: "23px",
    cursor: "pointer",
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    marginBottom: "20px"
  },
  cancel: {
    borderRadius: "25px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    padding: "0 6px"
  },
  fileSize: {
    paddingLeft: "23px"
  }
};

// GTM tag manager data layers

const tagManagerArgs = {
  dataLayer: {
    ProductName: "Barca Credit Card",
    event: "MobilePage"
  }
};

class EditApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      isExcedeed: false
    };
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.fileUploadCancel = this.fileUploadCancel.bind(this);
  }

  componentDidMount() {
    TagManager.dataLayer(tagManagerArgs);
    this.props.retrieveDocDetails();
  }
  // code for file uploader

  fileUploadHandler(event) {
    this.setState(
      {
        selectedFile: event.target.files[0]
      },

      () => {
        // update uploaded file details

        let fileDetails = {
          documentType: "others",
          signatoryId: "",
          documentTitle: "",
          fileName: this.state.selectedFile.name,
          filePath: "",
          url: "",
          fileData: "",
          fileFormat: this.state.selectedFile.type,
          fileSize: this.state.selectedFile.size,
          fileDescription: "",
          submittedBy: "",
          submittedDt: "",
          updatedBy: "",
          updatedDt: Date(),
          avsCheckDt: "",
          avsCheck: false,
          verified: false,
          verifiedBy: "",
          isEncrypted: false,
          required: "",
          encryptionDetails: "",
          uploadStatus: "Uploaded"
        };

        //checking the file size
        let fileSize = this.state.selectedFile.size;
        if (fileSize <= uploadFileSizeMax * 1048576) {
          //verify the file type
          if (
            this.state.selectedFile.type === "image/png" ||
            this.state.selectedFile.type === "image/jpeg" ||
            this.state.selectedFile.type === "application/pdf" ||
            this.state.selectedFile.type === "application/txt"
          ) {
            this.props.extraDocUploadSuccess(fileDetails);
          }
        }
      }
    );
  }

  fileUploadCancel(index) {
    this.props.deleteExtraDocUploadSuccess(index);
  }

  render() {
    let otherDocuments, companyDocumentLength;
    if (this.props.documents) {
      let companyDocument = this.props.documents.companyDocuments;
      if (companyDocument) {
        companyDocumentLength = Object.keys(companyDocument).length;
        otherDocuments = companyDocument.map((documents, index) => {
          if (documents.documentType === "others") {
            return (
              <div className={this.props.classes.fileUploadPlaceholder} key={index} id={index}>
                <div>{this.props.icon || <img src={companyIconSvg} alt="companyIconSvg" />}</div>
                <div className={this.props.classes.contentBox}>
                  <div className={this.props.classes.uploadFileName}>
                    {" "}
                    {documents.fileName}
                    <span className={this.props.classes.fileSize}>{documents.fileSize} Bytes </span>
                  </div>
                  <div className={this.props.classes.uploadFileName}>
                    <div id="Progress_Status">
                      <div id="myProgressBar"></div>
                    </div>
                    <div id="progressStatus"></div>
                  </div>
                  {/* )} */}
                </div>
                <div
                  className={this.props.classes.cancel}
                  justify="flex-end"
                  onClick={() => this.fileUploadCancel(index)}
                >
                  X
                </div>
              </div>
            );
          } else {
            return null;
          }
        });
      }
    }

    return (
      <>
        {/* file uploader button */}
        <input
          style={{ display: "none" }}
          type="file"
          onChange={this.fileUploadHandler}
          ref={fileInput => (this.fileInput = fileInput)}
          multiple
        />
        <h3 className={this.props.classes.heading}>Almost done! We need a few extra documents</h3>
        <p className="formDescription">
          One our agents asked you for some more documents? Please upload them here.
        </p>
        {otherDocuments}
        {companyDocumentLength < maxExtraDocUpload ? (
          <div className={this.props.classes.sectionContainer}>
            <img src={closeBtn} alt="closeBtn" onClick={() => this.fileInput.click()} />
            <span className={this.props.classes.sectionContainerTitle}>
              {companyDocumentLength === 0 ? <> Add another document</> : <>Upload document</>}
            </span>
          </div>
        ) : null}
        <div className="linkContainer">
          {/* <button className={this.props.classes.BtnSubmit} justify="flex-end" disabled={true}>
            Submit documents
          </button> */}
          <button
            className={this.props.classes.BtnSubmitDisable}
            justify="flex-end"
            disabled={true}
          >
            Submit documents
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    documents: appConfigSelectors.getProspectDocuments(state)
  };
};

const mapDispatchToProps = {
  retrieveDocDetails,
  extraDocUploadSuccess,
  deleteExtraDocUploadSuccess
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditApplication)
);

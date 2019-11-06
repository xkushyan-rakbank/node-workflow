import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import arrowBack from "../assets/icons/backArrow.png";
import { Link } from "react-router-dom";
import TagManager from "react-gtm-module";
import closeBtn from "../assets/images/close.png";
import companyIconSvg from "../assets/icons/file.png";

const uploadFileSizeMax = 5;

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
    backgroundColor: "#ffffff"
  },
  cancel: {
    borderRadius: "25px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    padding: "0 6px"
  }
};

// GTM tag manager data layers

const tagManagerArgs = {
  dataLayer: {
    userId: "001",
    userProject: "ReUploadDocument",
    page: "ReUploadDocuments"
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
  }

  // code for file uploader

  fileUploadHandler(event) {
    // GTM datalayer
    TagManager.dataLayer(tagManagerArgs);

    this.setState(
      {
        selectedFile: event.target.files[0]
      },

      () => {
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
            console.log("validation validated");
          }
        } else {
          this.setState({
            isExcedeed: true
          });
        }
      }
    );
  }

  render() {
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
        <div className={this.props.classes.fileUploadPlaceholder}>
          <div>{this.props.icon || <img src={companyIconSvg} alt="companyIconSvg" />}</div>
          <div className={this.props.classes.contentBox}>
            <div className={this.props.classes.uploadFileName}>
              {/* {this.state.selectedFile.name} */} bla bla
              <span className={this.props.classes.SignatoryRights}>
                {/* {this.state.selectedFile.size} */}
                Bytes
              </span>
            </div>
            {/* {this.state.isUploadSucess ? null : ( */}
            <div className={this.props.classes.uploadFileName}>
              <div id="Progress_Status">
                <div id="myprogressBar"></div>
              </div>
              <div id="progressStatus"></div>
            </div>
            {/* )} */}
          </div>
          <div className={this.props.classes.cancel} justify="flex-end">
            {" "}
            X{" "}
          </div>
        </div>

        <div className={this.props.classes.sectionContainer}>
          <img src={closeBtn} alt="closeBtn" onClick={() => this.fileInput.click()} />
          <span className={this.props.classes.sectionContainerTitle}>
            {this.state.selectedFile ? <> Add another document</> : <>Upload document</>}
          </span>
        </div>
        <div className="linkContainer">
          <Link to="">
            <button className={this.props.classes.BtnBack} justify="flex-end">
              <img className={this.props.classes.backIcon} src={arrowBack} alt="back" />
              Back to Applications
            </button>
          </Link>
          <button className={this.props.classes.BtnSubmit} justify="flex-end" disabled={true}>
            Submit documents
          </button>
        </div>
      </>
    );
  }
}

export default withStyles(style)(EditApplication);

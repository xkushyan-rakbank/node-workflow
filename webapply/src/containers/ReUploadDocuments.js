import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import arrowBack from "../assets/icons/backArrow.png";
import { Link } from "react-router-dom";
import TagManager from "react-gtm-module";
import closeBtn from "../assets/images/close.png";

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
  Rectangle: {
    width: "622px",
    height: "940px"
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
      selectedFile: null
    };
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  componentDidMount() {
    TagManager.dataLayer(tagManagerArgs);
  }

  // code for file uploader

  fileUploadHandler(event) {
    this.setState(
      {
        selectedFile: event.target.files[0]
      },

      () => {
        //checking the file size
        console.log(this.state.selectedFile);
        // let fileSize = this.state.selectedFile.size;
        //verify the file type
        if (
          this.state.selectedFile.type === "image/png" ||
          this.state.selectedFile.type === "image/jpeg" ||
          this.state.selectedFile.type === "application/pdf" ||
          this.state.selectedFile.type === "application/txt"
        ) {
          console.log("validation validated");
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
        {this.state.selectedFile ? (
          <div className={this.props.classes.sectionContainer}>
            <img src={closeBtn} alt="closeBtn" onClick={() => this.fileInput.click()} />
            <span className={this.props.classes.sectionContainerTitle}>Add another document</span>
          </div>
        ) : (
          <div className={this.props.classes.sectionContainer}>
            <img src={closeBtn} alt="closeBtn" onClick={() => this.fileInput.click()} />
            <span className={this.props.classes.sectionContainerTitle}>Upload document</span>
          </div>
        )}

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

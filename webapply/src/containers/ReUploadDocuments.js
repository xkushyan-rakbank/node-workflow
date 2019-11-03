import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CompanyDocuments from "../components/UploadDocument/CompanyDocument";
import SignatoriesDocuments from "../components/UploadDocument/SignatoriesDocuments";
import SectionTitle from "../components/SectionTitle";
import { retrieveDocDetails } from "../store/actions/getProspectDocuments";
import * as appConfigSelectors from "../store/selectors/appConfig";
import arrowBack from "../assets/icons/backArrow.png";
import { Link } from "react-router-dom";
import TagManager from "react-gtm-module";

const style = {
  sectionContainer: {
    marginBottom: "40px"
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

const tagManagerArgs = {
  dataLayer: {
    userId: "001",
    userProject: "ReUploadDocument",
    page: "ReUploadDocuments"
  }
};

class EditApplication extends Component {
  componentDidMount() {
    this.props.retrieveDocDetails();
    TagManager.dataLayer(tagManagerArgs);
  }

  render() {
    const DocDetails = this.props;
    let companyOdcLength, StakeholdersDocLength, UploadDocCount, campus;
    let uploadedDocsCount = 0;
    if (this.props.documents) {
      let companyDocument = this.props.documents.companyDocuments;
      if (companyDocument) {
        companyOdcLength = Object.keys(companyDocument).length;
        UploadDocCount = +companyOdcLength;
        // to check which documents uploaded
        companyDocument.map((documents, index) => {
          if (documents.uploadStatus === "Updated") {
            return (uploadedDocsCount = uploadedDocsCount + 1);
          } else {
            return null;
          }
        });
      }
      let StakeholdersDoc = this.props.documents.stakeholdersDocuments;
      if (StakeholdersDoc) {
        StakeholdersDocLength = Object.keys(StakeholdersDoc)
          .map(campusName => {
            campus = StakeholdersDoc[campusName];
            // to check which documents uploaded
            campus.map((docUploaded, index) => {
              if (docUploaded.uploadStatus === "Updated") {
                return (uploadedDocsCount = uploadedDocsCount + 1);
              } else {
                return null;
              }
            });
            return Object.keys(campus).length;
          })
          .reduce((p, c) => p + c, 0);
        UploadDocCount = UploadDocCount + StakeholdersDocLength;
      }
    }

    return (
      <>
        <h3 className={this.props.classes.heading}>Almost done! We need a few extra documents</h3>
        <p className="formDescription">
          Some of the documents were not valid. Please take a look and reupload.
        </p>
        {this.props.documents ? (
          <>
            <div className={this.props.classes.sectionContainer}>
              <SectionTitle title="Company documents" className={this.props.classes.title} />
              <CompanyDocuments DocDetails={DocDetails} />
            </div>
            {this.props.documents.stakeholdersDocuments ? (
              <div className={this.props.classes.sectionContainer}>
                <SectionTitle title="Stakeholders documents" />
                <SignatoriesDocuments DocDetails={DocDetails} />
              </div>
            ) : null}
          </>
        ) : null}
        <div className="linkContainer">
          <Link to="">
            <button className={this.props.classes.BtnBack} justify="flex-end">
              <img className={this.props.classes.backIcon} src={arrowBack} alt="back" />
              Back to Applications
            </button>
          </Link>
          {UploadDocCount === uploadedDocsCount ? (
            <>
              <button className={this.props.classes.BtnSubmit} justify="flex-end">
                Submit documents
              </button>
            </>
          ) : (
            <button className={this.props.classes.BtnSubmit} justify="flex-end" disabled={true}>
              Submit documents
            </button>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    getSignatories: appConfigSelectors.getSignatories(state),
    documents: appConfigSelectors.getProspectDocuments(state)
  };
};

const mapDispatchToProps = {
  retrieveDocDetails
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditApplication)
);

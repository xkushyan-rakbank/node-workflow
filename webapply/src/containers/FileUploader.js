import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SectionTitle from "../components/SectionTitle";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import routes from "../routes";
import SubmitButton from "../components/Buttons/SubmitButton";
import CompanyDocuments from "../components/UploadDocument/CompanyDocument";
import SignatoriesDocuments from "../components/UploadDocument/SignatoriesDocuments";
import { retrieveDocDetails } from "../store/actions/getProspectDocuments";
import * as appConfigSelectors from "./../store/selectors/appConfig";

import BackLink from "../components/Buttons/BackLink";
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
  buttonWrap: {
    marginTop: "0"
  }
};
class FileUploader extends React.Component {
  componentDidMount() {
    this.props.retrieveDocDetails();
  }

  render() {
    const DocDetails = this.props;
    const { classes } = this.props;

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
              }
            });
            return Object.keys(campus).length;
          })
          .reduce((p, c) => p + c, 0);
        UploadDocCount = UploadDocCount + StakeholdersDocLength;
      }
    }

    console.log(uploadedDocsCount);

    return (
      <>
        <h2>Upload your documents</h2>
        <p className="formDescription">
          Remember we asked you to have the papers ready? Now it’s time to upload them.
        </p>
        {this.props.documents ? (
          <>
            <div className={classes.sectionContainer}>
              <SectionTitle title="Company documents" className={classes.title} />
              <CompanyDocuments DocDetails={DocDetails} />
            </div>
            {this.props.documents.stakeholdersDocuments ? (
              <div className={classes.sectionContainer}>
                <SectionTitle title="Stakeholders documents" />
                <SignatoriesDocuments DocDetails={DocDetails} />
              </div>
            ) : null}
          </>
        ) : null}

        <div className="linkContainer">
          <BackLink path={routes.finalQuestions} />
          {UploadDocCount === uploadedDocsCount ? (
            <SubmitButton label="Next Step" justify="flex-end" disabled={true} />
          ) : (
            <Link to={routes.selectServices}>
              <SubmitButton
                label="Next Step"
                justify="flex-end"
                classes={{ buttonWrap: classes.buttonWrap }}
              />
            </Link>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    documents: appConfigSelectors.getProspectDocuments(state),
    getSignatories: appConfigSelectors.getSignatories(state),
    endpoints: appConfigSelectors.getEndpoints(state)
  };
};

const mapDispatchToProps = {
  retrieveDocDetails
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FileUploader)
);

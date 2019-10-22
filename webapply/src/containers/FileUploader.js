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
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false
    };
  }

  componentDidMount() {
    this.props.retrieveDocDetails();
  }

  render() {
    const DocDetails = this.props;
    console.log(this.props.getSignatories);
    const { classes } = this.props;
    let companyOdcLength;
    let StakeholdersDocLength;
    let UploadDocCount;
    if (this.props.uploadedDoc.companyDocuments) {
      let companyDocument = this.props.uploadedDoc.companyDocuments;
      companyOdcLength = Object.keys(companyDocument).length;
      UploadDocCount = +companyOdcLength;
    }
    if (this.props.uploadedDoc.stakeholdersDocuments) {
      let StakeholdersDoc = this.props.uploadedDoc.companyDocuments;
      StakeholdersDocLength = StakeholdersDoc.length;
      UploadDocCount = UploadDocCount + StakeholdersDocLength;
    }

    console.log(UploadDocCount);

    return (
      <>
        <h2>Upload your documents</h2>
        <p className="formDescription">
          Remember we asked you to have the papers ready? Now it’s time to upload them.
        </p>
        <div className={classes.sectionContainer}>
          <SectionTitle title="Company documents" className={classes.title} />
          <CompanyDocuments DocDetails={DocDetails} />
        </div>
        <div className={classes.sectionContainer}>
          <SectionTitle title="Stakeholders documents" />
          <SignatoriesDocuments DocDetails={DocDetails} />
        </div>
        <div className="linkContainer">
          <BackLink path={routes.finalQuestions} />
          {this.state.isDisabled ? (
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
    uploadedDoc: state.uploadedDocs.docs,
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

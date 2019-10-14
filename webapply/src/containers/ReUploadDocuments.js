import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CompanyDocuments from "../components/UploadDocument/CompanyDocument";
import SignatoriesDocuments from "../components/UploadDocument/SignatoriesDocuments";
import SectionTitle from "../components/SectionTitle";
import { retrieveDocDetails } from "../store/actions/getProspectDocuments";
import * as appConfigSelectors from "../store/selectors/appConfig";

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

class EditApplication extends Component {
  componentDidMount() {
    this.props.retrieveDocDetails();
  }

  render() {
    const DocDetails = this.props;
    return (
      <>
        <h3 className={this.props.classes.heading}>Almost done! We need a few extra documents</h3>
        <p className="formDescription">
          Some of the documents were not valid. Please take a look and reupload.
        </p>
        <div className={this.props.classes.sectionContainer}>
          <SectionTitle title="Company documents" className={this.props.classes.title} />
          <CompanyDocuments DocDetails={DocDetails} />
        </div>
        <div className={this.props.classes.sectionContainer}>
          <SectionTitle title="Signatories documents" />
          <SignatoriesDocuments DocDetails={DocDetails} />
        </div>
        <div className="linkContainer">
          <button className={this.props.classes.BtnBack} justify="flex-end">
            {/* <img className={this.props.classes.backIcon} src={arrowBack} alt="back" /> */}
            Back to Applications
          </button>
          <button className={this.props.classes.BtnSubmit} justify="flex-end">
            Submit documents
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    getSignatories: appConfigSelectors.getSignatories(state),
    uploadedDoc: state.uploadedDocs.docs
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

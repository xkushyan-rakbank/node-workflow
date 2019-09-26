import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SectionTitle from "../components/SectionTitle";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import routes from "../routes";
import SubmitButton from "../components/Buttons/SubmitButton";
import CompanyDocuments from "../components/UploadDocument/CompanyDocument";
import SignatoriesDocuments from "../components/UploadDocument/SignatoriesDocuments";
import { docUpload } from "../store/actions/uploadDocActions";
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
  }
};

class FileUploader extends React.Component {
  static defaultProps = {
    signatories: []
  };

  componentWillMount() {
    this.props.docUpload();
  }

  render() {
    const authUsers = this.props;
    return (
      <>
        <h2>Upload your documents</h2>
        <p className="formDescription">
          Remember we asked you to have the papers ready? Now it’s time to upload them.
        </p>
        <div className={this.props.classes.sectionContainer}>
          <SectionTitle title="Company documents" className={this.props.classes.title} />
          <CompanyDocuments />
        </div>
        <div className={this.props.classes.sectionContainer}>
          <SectionTitle title="Signatories documents" />
          <SignatoriesDocuments authUsers={authUsers} />
        </div>
        <div className="linkContainer">
          <Link to={routes.finalQuestions}>
            <p className="formGoback">Go Back</p>
          </Link>
          <Link to={routes.selectServices}>
            <SubmitButton label="Next Step" justify="flex-end" />
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUsers: state.users.authUsers,
    uploadedDoc: state.uploadedDocs.docs
  };
};

const mapDispatchToProps = {
  docUpload
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FileUploader)
);

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
import BackLink from "../components/Buttons/BackLink";
import rightArrowWhite from "../assets/icons/whiteArrow.png";
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
  BtnSubmit: {
    width: "192px",
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
    outline: "transparent",
    cursor: "pointer"
  },
  BtnSubmitImg: {
    verticalAlign: "middle",
    marginLeft: "30px"
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
    this.props.docUpload();
    if (this.state.uploadDocCount === 6) {
      console.log(this.props.uploadDocCount);
      this.setState({
        isDisabled: false
      });
    }
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
          <BackLink path={routes.finalQuestions} />
          {this.state.isDisabled ? (
            <SubmitButton label="Next Step" justify="flex-end" disabled={true} />
          ) : (
            <Link to={routes.selectServices}>
              <button className={this.props.classes.BtnSubmit} justify="flex-end">
                Next Step
                <img className={this.props.classes.BtnSubmitImg} src={rightArrowWhite} alt="icon" />
              </button>
            </Link>
          )}
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

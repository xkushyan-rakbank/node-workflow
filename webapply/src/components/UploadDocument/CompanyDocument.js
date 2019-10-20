import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import companyIconSvg from "../../assets/icons/brief.png";
import UploadDocument from "./UploadDocument";
import { getInputValueById } from "../../store/selectors/input";
import { connect } from "react-redux";

const style = {
  container: {
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff"
  },
  header: {
    display: "flex",
    paddingTop: "32px",
    paddingBottom: "32px",
    paddingLeft: "15px",
    paddingRight: "32px"
  },
  companyDocuments: {
    display: "flex",
    paddingTop: "10px",
    paddingBottom: "30px",
    paddingLeft: "24px",
    paddingRight: "10px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    borderTop: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff"
  },
  companyIconWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    border: "solid 1px #e9e9ed",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    "&>img": {
      height: "unset",
      width: "20px"
    }
  },
  fileIconWarp: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#ffffff"
  },
  contentBox: {
    display: "flex",
    alignItems: "center",
    flexGrow: "1",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  label: {
    margin: "0",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "1.2",
    color: "#373737"
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
  }
};

class CompanyDocuments extends Component {
  render() {
    let companyDocuments = this.props.DocDetails.uploadedDoc;
    const companyName = this.props.companyName;
    let companyDocument;
    if (companyDocuments.companyDocuments) {
      companyDocument = companyDocuments.companyDocuments.map((documents, index) => {
        return <UploadDocument key={index} documents={documents} />;
      });
    }

    return (
      <div className={this.props.classes.container}>
        <header className={this.props.classes.header}>
          <div className={this.props.classes.companyIconWrap}>
            {this.props.icon || <img src={companyIconSvg} alt="companyIconSvg" />}
          </div>
          <div className={this.props.classes.contentBox}>
            <h3 className={this.props.classes.label}>{companyName}</h3>
          </div>
        </header>
        {companyDocument}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    companyName: getInputValueById(state, "Org.companyName") || "Designit Arabia"
  };
};

export default withStyles(style)(connect(mapStateToProps)(CompanyDocuments));

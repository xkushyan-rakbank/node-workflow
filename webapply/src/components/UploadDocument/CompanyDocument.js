import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import companyIconSvg from "../../assets//images/company-icon.svg";
import UploadDocument from "./UploadDocument";

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
    border: "solid 1px #16216a",
    borderRadius: "50%",
    backgroundColor: "#ffffff"
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
    return (
      <div className={this.props.classes.container}>
        <header className={this.props.classes.header}>
          <div className={this.props.classes.companyIconWrap}>
            {this.props.icon || <img src={companyIconSvg} alt="companyIconSvg" />}
          </div>
          <div className={this.props.classes.contentBox}>
            <h3 className={this.props.classes.label}>Designit Arabia</h3>
          </div>
        </header>
        {/* company documents need to put nside a map function */}
        <UploadDocument />
      </div>
    );
  }
}

export default withStyles(style)(CompanyDocuments);

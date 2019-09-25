import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "../../components/Avatar";
import UploadDocuments from "../../components/UploadDocument/UploadDocument";
const style = {
  container: {
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    marginTop: "20px"
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    height: "62px",
    margin: "20px 35px 20px 25px"
  },
  greenAvatar: {
    backgroundColor: "#166a2c",
    width: "40px",
    fontSize: "14px",
    fontWeight: 600
  },
  nameField: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#373737"
  },
  signatoryField: {
    fontSize: "14px",
    lineHeight: "1.71",
    color: "#517085"
  },
  shareholdingField: {
    opacity: 0.5,
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#263d4c"
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "0 16px"
  },
  SignatoryRights: {
    fontSize: "14px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.29",
    letterSpacing: "normal",
    color: "#373737"
  }
};

class SignatoriesDocuments extends Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        <div>
          <div className={this.props.classes.contentWrapper}>
            <Avatar firstName="Bhakta" lastName="Dash" />
            <div className={this.props.classes.userInfo}>
              <div className={this.props.classes.nameField}>Bhakta Dash</div>
              <div className={this.props.classes.SignatoryRights}>Board Resolution</div>
              <div className={this.props.classes.shareholdingField}> Shareholding 51% </div>
            </div>
          </div>
        </div>
        {/* company documents need to put nside a map function */}

        <UploadDocuments />
      </div>
    );
  }
}

export default withStyles(style)(SignatoriesDocuments);

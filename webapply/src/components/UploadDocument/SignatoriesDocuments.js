import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Avatar from "../../components/Avatar";
import UploadDocuments from "../../components/UploadDocument/UploadDocument";
import { getInputValueById } from "../../store/selectors/input";

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
    let docUploadDetails = this.props.authUsers.uploadedDoc;
    const authUsers = this.props.authUsers.authUsers;
    const userList = authUsers.map((authUser, index) => {
      if (this.props.authUsers.uploadedDoc.stakeholdersDocuments) {
        docUploadDetails = this.props.authUsers.uploadedDoc.stakeholdersDocuments[
          index + "_" + authUser.fullName
        ];
      }
      return (
        <div className={this.props.classes.container} key={authUser.id}>
          <div className={this.props.classes.contentWrapper}>
            <Avatar firstName={authUser.fullName} lastName={authUser.fullName} />
            <div className={this.props.classes.userInfo}>
              <div className={this.props.classes.nameField}>{authUser.fullName}</div>
              <div className={this.props.classes.SignatoryRights}>{authUser.roles}</div>
              <div className={this.props.classes.shareholdingField}>
                Shareholding {authUser.Shareholding}
              </div>
            </div>
          </div>
          {docUploadDetails.map((companyDoc, index) => {
            if (authUser.fullName === companyDoc.signatoryName) {
              return <UploadDocuments key={index} companyDoc={companyDoc} />;
            }
          })}
        </div>
      );
    });
    return <>{userList}</>;
  }
}

const mapStateToProps = state => ({
  // TODO: remove default value "Designit Arabia"
  companyName: getInputValueById(state, "Org.companyName") || "Designit Arabia"
});

export default withStyles(style)(connect(mapStateToProps)(SignatoriesDocuments));

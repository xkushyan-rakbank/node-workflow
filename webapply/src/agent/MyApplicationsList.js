import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ContainedButton from "../components/Buttons/ContainedButton";
import { getProspectInfo } from "../store/actions/retrieveApplicantInfo";
import * as prospectInfo from "../store/selectors/retrieveApplicantInfo";

export const StyledWhiteContainedButton = props => {
  const Button = withStyles(() => ({
    buttonStyle: {
      boxShadow: "none",
      border: "solid 1px #373737",
      backgroundColor: "#fff",
      width: 160,
      height: 32,
      padding: "0 10px",
      "@media only screen and (max-width: 991px)": {
        width: "130px"
      },
      "&:hover": {
        backgroundColor: "#000",
        "& span": {
          color: "#fff"
        }
      }
    },
    labelStyle: {
      color: "#373737",
      fontSize: 14,
      justifyContent: "center",
      "@media only screen and (max-width: 991px)": {
        fontSize: 12
      }
    }
  }))(ContainedButton);

  return <Button {...props} />;
};

const style = {
  wrapper: {
    marginTop: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    width: "100%"
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      border: "none"
    },
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "center",
    padding: "24px 20px 19px 30px"
  },
  companyName: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: 1,
    color: "#263d4c"
  },
  account: {
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#86868b",
    marginTop: 5
  },
  status: {
    borderRadius: "4px",
    backgroundColor: "#e9e9ed",
    fontSize: "12px",
    color: "#373737",
    padding: "3px 5px"
  },
  action: {
    fontSize: "14px",
    fontStyle: "italic",
    lineHeight: 1.14,
    textAlign: "center",
    color: "#b5b5bb"
  }
};

class MyApplicationsList extends React.Component {
  getProspectDetails = prospectId => {
    this.props.getProspectInfo(prospectId);
  };

  render() {
    const { classes, applicantInfo = {} } = this.props;
    let info;
    if (Object.entries(applicantInfo).length !== 0) {
      info = applicantInfo.map((applications, index) => {
        const cmpName = applications.organizationInfo.companyName;
        return (
          <div className={classes.wrapper} key={index}>
            <div className={classes.applicationRow}>
              {cmpName ? (
                <div>
                  <div className={classes.companyName}>
                    {applications.organizationInfo.companyName}
                  </div>
                  <div className={classes.account}>{applications.organizationInfo.companyName}</div>
                </div>
              ) : (
                <div>
                  <div className={classes.companyName}>{applications.applicantInfo.fullName}</div>
                  <div className={classes.account}>{applications.applicantInfo.email}</div>
                </div>
              )}
              <div>
                <span className={classes.status}>{applications.status.statusNotes}</span>
              </div>
              <div className={classes.action}>
                {applications.status.statusType ? (
                  <StyledWhiteContainedButton
                    label={applications.status.statusType}
                    handleClick={() => this.getProspectDetails(applications.prospectId)}
                  />
                ) : (
                  <span>{applications.status.statusNotes}</span>
                )}
              </div>
            </div>
          </div>
        );
      });
    }

    return <>{info}</>;
  }
}
const mapStateToProps = state => ({
  searchResults: prospectInfo.getApplicantProspectInfo(state)
});
const mapDispatchToProps = {
  getProspectInfo
};
export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyApplicationsList)
);

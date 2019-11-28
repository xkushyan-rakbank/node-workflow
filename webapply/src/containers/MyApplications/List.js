import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { ContainedButton } from "./../../components/Buttons/ContainedButton";
import { getProspectInfo } from "./../../store/actions/retrieveApplicantInfo";
import { useStyles } from "./styled";

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

const ApplicationList = ({ getProspectInfo, applicantInfo = [] }) => {
  const classes = useStyles();

  const getProspectDetails = prospectId => {
    getProspectInfo(prospectId);
  };

  let info;
  if (Object.entries(applicantInfo).length) {
    info = applicantInfo.map(applications => {
      return (
        <div className={classes.wrapper} key={applications.prospectId}>
          <div className={classes.applicationRow}>
            {applications.organizationInfo.companyName ? (
              <div>
                <div className={classes.companyName}>
                  {applications.organizationInfo.companyName}
                </div>
                <div className={classes.listAccount}>
                  {applications.organizationInfo.companyName}
                </div>
              </div>
            ) : (
              <div>
                <div className={classes.companyName}>{applications.applicantInfo.fullName}</div>
                <div className={classes.listAccount}>{applications.applicantInfo.email}</div>
              </div>
            )}
            <div>
              <span className={classes.listStatus}>{applications.status.statusNotes}</span>
            </div>
            <div className={classes.action}>
              {applications.status.statusType ? (
                <StyledWhiteContainedButton
                  label={applications.status.statusType}
                  handleClick={() => getProspectDetails(applications.prospectId)}
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
};

const mapDispatchToProps = {
  getProspectInfo
};
export default connect(
  null,
  mapDispatchToProps
)(ApplicationList);

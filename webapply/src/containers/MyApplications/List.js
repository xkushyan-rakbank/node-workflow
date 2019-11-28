import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { ContainedButton } from "./../../components/Buttons/ContainedButton";
import { getProspectInfo } from "./../../store/actions/retrieveApplicantInfo";
import { useStyles } from "./styled";
import { ctaStatus, ctaWaterText, withoutCtaStatus, withoutCtaWaterText } from "./constants";

export const StyledWhiteContainedButton = withStyles(() => ({
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

const ApplicationList = ({ getProspectInfo, applicantInfo = [] }) => {
  const classes = useStyles();

  const getProspectDetails = prospectId => {
    getProspectInfo(prospectId);
  };

  return (
    <>
      {applicantInfo.length &&
        applicantInfo.map(applications => {
          return (
            <div className={classes.wrapper} key={applications.prospectId}>
              <div className={classes.applicationRow}>
                {applications.organizationInfo.companyName ? (
                  <div>
                    <div className={classes.companyName}>
                      {applications.organizationInfo.companyName}
                    </div>
                    <div className={classes.listAccount}>
                      {`${applications.applicationInfo.accountType} ${
                        applications.applicationInfo.islamicBanking ? "islamic" : ""
                      }`}
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
                  {ctaStatus.includes(applications.status.statusNotes) ? (
                    <StyledWhiteContainedButton
                      label={ctaWaterText[ctaStatus.indexOf(applications.status.statusNotes)]}
                      handleClick={() => getProspectDetails(applications.prospectId)}
                      disabled={
                        applications.applicationInfo.lastModifiedBy.trim().length ? true : false
                      }
                    />
                  ) : (
                    <span>
                      {withoutCtaStatus.includes(applications.status.statusNotes) &&
                        withoutCtaWaterText[
                          withoutCtaStatus.indexOf(applications.status.statusNotes)
                        ]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

const mapDispatchToProps = {
  getProspectInfo
};
export default connect(
  null,
  mapDispatchToProps
)(ApplicationList);

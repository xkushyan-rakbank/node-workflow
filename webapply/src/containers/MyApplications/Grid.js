import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { StyledWhiteContainedButton } from "./List";
import waves_background from "./../../assets/images/waves_bg.png";
import { getProspectInfo } from "./../../store/actions/retrieveApplicantInfo";
import { useStyles } from "./styled";

const ApplicationGrid = ({ getProspectInfo, applicantInfo = [] }) => {
  const classes = useStyles();

  const getProspectDetails = prospectId => {
    getProspectInfo(prospectId);
  };

  let info;
  if (Object.entries(applicantInfo).length) {
    info = applicantInfo.map(applications => {
      return (
        <div className={classes.gridContainer} key={applications.prospectId}>
          <div className={classes.application}>
            <img src={waves_background} className={classes.containerBg} alt="waves background" />
            {applications.organizationInfo.companyName ? (
              <>
                <Typography variant="h6" component="span" classes={{ root: classes.title }}>
                  {applications.organizationInfo.companyName}
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="span"
                  classes={{ root: classes.account }}
                >
                  {applications.organizationInfo.companyName}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h6" component="span" classes={{ root: classes.title }}>
                  {applications.applicantInfo.fullName}
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="span"
                  classes={{ root: classes.account }}
                >
                  {applications.applicantInfo.email}
                </Typography>
              </>
            )}
            <div>
              <span className={classes.status}>{applications.status.statusNotes}</span>
            </div>
            <div className={classes.blockAction}>
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
    return <>{info}</>;
  }
};

const mapDispatchToProps = {
  getProspectInfo
};
export default connect(
  null,
  mapDispatchToProps
)(ApplicationGrid);

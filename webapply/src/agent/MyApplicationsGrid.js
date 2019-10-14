import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { StyledWhiteContainedButton } from "./MyApplicationsList";
import waves_background from "../assets/images/waves_bg.png";
import { getProspectInfo } from "../store/actions/retrieveApplicantInfo";
import * as prospectInfo from "../store/selectors/retrieveApplicantInfo";

const styles = {
  gridContainer: {
    flex: "0 0 50%",
    height: "263px"
  },
  containerBg: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 0
  },
  application: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 8,
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    backgroundImage: "linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0))",
    padding: "37px 20px 10px",
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  title: {
    fontWeight: "600",
    color: "#263d4c",
    lineHeight: "1.7",
    zIndex: 1
  },
  account: {
    color: "#86868b",
    zIndex: 1
  },
  status: {
    borderRadius: 4,
    backgroundColor: "#e9e9ed",
    fontSize: "12px",
    color: "#373737",
    padding: "1px 5px",
    marginTop: 40,
    zIndex: 1
  },
  blockAction: {
    marginTop: 40,
    zIndex: "1"
  }
};

class MyApplicationsGrid extends React.Component {
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
          <div className={classes.gridContainer} key={index}>
            <div className={classes.application}>
              <img src={waves_background} className={classes.containerBg} alt="waves background" />
              {cmpName ? (
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
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyApplicationsGrid)
);

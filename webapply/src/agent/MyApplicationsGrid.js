import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { StyledWhiteContainedButton } from "./MyApplicationsList";
import waves_background from "../assets/images/waves_bg.png";

const styles = {
  gridContainer: {
    marginTop: 4,
    marginRight: "-20px",
    marginLeft: "-20px",
    position: "relative",
    paddingBottom: "20px",
    display: "flex",
    flexWrap: "wrap"
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
    width: "380px",
    maxWidth: "380px",
    height: 263,
    borderRadius: 8,
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    backgroundImage: "linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0))",
    padding: "37px 20px 10px",
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px 0 0 20px",
    "@media only screen and (max-width: 1360px)": {
      flexGrow: "1",
      maxWidth: "46%"
    },
    "@media only screen and (max-width: 991px)": {
      padding: "20px 10px 5px",
      height: "230px"
    },
    "@media only screen and (max-width: 860px)": {
      padding: "20px 10px 5px",
      height: "230px",
      width: "190px"
    }
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

const MyApplicationsGrid = ({ classes, currentApplications }) => (
  <div className={classes.gridContainer}>
    {currentApplications.map((application, index) => (
      <div className={classes.application} key={index}>
        <img src={waves_background} className={classes.containerBg} alt="waves background" />

        <Typography variant="h6" component="span" classes={{ root: classes.title }}>
          {application.companyName}
        </Typography>
        <Typography variant="subtitle2" component="span" classes={{ root: classes.account }}>
          {application.account}
        </Typography>
        <span className={classes.status}>{application.status}</span>

        <div className={classes.blockAction}>
          {application.action.status ? (
            <StyledWhiteContainedButton label={application.action.text} />
          ) : (
            application.action.text
          )}
        </div>
      </div>
    ))}
  </div>
);

export default withStyles(styles)(MyApplicationsGrid);

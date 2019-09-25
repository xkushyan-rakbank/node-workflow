import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { StyledWhiteContainedButton } from "./MyApplicationsList";

const styles = {
  gridContainer: {
    marginTop: 4,
    boxSizing: "bored-box",
    marginRight: "-20px"
  },
  application: {
    width: 380,
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
    margin: "20px 20px 0 0"
  },
  title: {
    fontWeight: "600",
    color: "#263d4c",
    lineHeight: "1.7"
  },
  account: {
    color: "#86868b"
  },
  status: {
    borderRadius: 4,
    backgroundColor: "#e9e9ed",
    fontSize: "12px",
    color: "#373737",
    padding: "1px 5px",
    marginTop: 40
  },
  blockAction: {
    marginTop: 40
  }
};

const MyApplicationsGrid = ({ classes, currentApplications }) => (
  <div className={classes.gridContainer}>
    {currentApplications.map((application, index) => (
      <div className={classes.application} key={index}>
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

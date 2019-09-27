import React from "react";
import { withStyles } from "@material-ui/core";
import regularIcon from "./../assets/gif/callback_regular.gif";
import declineIcon from "./../assets/gif/declined_regular.gif";
import { applicationStatus } from "../constants";

const styles = {
  appStatus: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    borderRadius: 8,
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    "& > img": {
      marginBottom: "60px",
      width: "350px"
    },
    "& > p": {
      textAlign: "center",
      color: "#373737",
      fontSize: 20,
      padding: "0 80px 40px"
    }
  }
};

class ApplicationStatus extends React.Component {
  render() {
    const { classes, errorReason, serverError } = this.props;

    return (
      <div className={classes.appStatus}>
        <img src={serverError ? declineIcon : regularIcon} alt="error" />
        <p>{serverError ? applicationStatus.serverError.reason : errorReason.screeningReason}</p>
      </div>
    );
  }
}

export default withStyles(styles)(ApplicationStatus);

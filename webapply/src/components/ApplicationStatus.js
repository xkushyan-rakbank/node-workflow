import React from "react";
import { withStyles } from "@material-ui/core";
import regularIcon from "./../assets/gif/callback_regular.gif";
import declined from "./../assets/gif/declined_regular.gif";

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
      marginBottom: "10px",
      width: "350px"
    }
  },
  message: {
    textAlign: "center",
    color: "#373737",
    fontSize: 20,
    padding: "0 80px 40px",
    "& > p": {
      fontSize: "16px"
    }
  }
};

class ApplicationStatus extends React.Component {
  render() {
    const { classes, errorReason, uiError } = this.props;
    const icon = uiError ? declined : regularIcon;

    return (
      <div className={classes.appStatus}>
        <img src={icon} alt="error" />
        <div className={classes.message}>
          {uiError ? (
            <>
              <h3>Oops...</h3>
              <p>
                It`s our fault, not yours. We`ve have been notified of the problem. In the meantime,
                try refreshing or see the JavaScript console for technical details.
              </p>
            </>
          ) : (
            <p>{errorReason.screeningReason}</p>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ApplicationStatus);

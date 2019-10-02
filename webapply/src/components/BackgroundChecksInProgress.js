import React from "react";
import { withStyles } from "@material-ui/core";
import paperplane from "./../assets/gif/paperplane_regular.gif";

const styles = {
  progressContainer: {
    dispay: "flex",
    "& img": {
      width: "100%"
    }
  }
};

class BackgroundChecksInProgress extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.progressContainer}>
        <img src={paperplane} alt="in progress" />
      </div>
    );
  }
}

export default withStyles(styles)(BackgroundChecksInProgress);

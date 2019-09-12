import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ApplicationOverviewFirstStep from "./ApplicationOverviewFirstStep";
import ApplicationOverviewSecondStep from "./ApplicationOverviewSecondStep";

const style = {
  appOverviewWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  }
};

class ApplicationOverviewContainer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appOverviewWrapper}>
        <ApplicationOverviewFirstStep />
        <ApplicationOverviewSecondStep />
      </div>
    );
  }
}

export default withStyles(style)(ApplicationOverviewContainer);

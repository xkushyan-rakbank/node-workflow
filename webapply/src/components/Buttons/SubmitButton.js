import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContainedButton from "./ContainedButton";

const styles = {
  buttonWrap: {
    margin: "42px 0 0 "
  },
  buttonWrapWithBackLink: {},
  nextButton: {
    width: "192px",
    fontWeight: 600,
    letterSpacing: "normal",
    "&:disabled": {
      color: "#ffffff"
    }
  }
};

const SubmitButton = props => {
  const { classes, justify, containerExtraStyles, ...rest } = props;
  return (
    <Grid
      container
      direction="row"
      justify={justify}
      alignItems="center"
      className={classes.buttonWrap}
      style={containerExtraStyles}
    >
      <ContainedButton type="submit" withRightArrow className={classes.nextButton} {...rest} />
    </Grid>
  );
};

export default withStyles(styles)(SubmitButton);

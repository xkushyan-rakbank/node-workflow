import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import { ContainedButton } from "./ContainedButton";

const styles = {
  buttonWrap: {
    margin: "42px 0 0 "
  },
  nextButton: {
    fontWeight: 600,
    letterSpacing: "normal",
    "&:disabled": {
      color: "#ffffff"
    }
  }
};

const SubmitButton = props => {
  const { disabled = false, classes, label = "Search" } = props;
  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      className={classes.buttonWrap}
    >
      <ContainedButton
        type="submit"
        disabled={disabled}
        label={label}
        className={classes.nextButton}
      />
    </Grid>
  );
};

export default withStyles(styles)(SubmitButton);

import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContainedButton from "./ContainedButton";

const styles = {
  nextButton: {
    margin: "42px 0 0 ",
    fontWeight: 600,
    letterSpacing: "normal",
    "&:disabled": {
      color: "#ffffff"
    }
  }
};

const SubmitButton = props => {
  const { disabled = false, classes } = props;
  return (
    <Grid container direction="row" justify="flex-end" alignItems="center">
      <ContainedButton
        type="submit"
        disabled={disabled}
        label="Next Step"
        className={classes.nextButton}
      />
    </Grid>
  );
};

export default withStyles(styles)(SubmitButton);

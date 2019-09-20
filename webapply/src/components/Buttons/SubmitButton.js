import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import cx from "classnames";
import ContainedButton from "./ContainedButton";
import createMixins from "@material-ui/core/styles/createMixins";

const styles = {
  buttonWrap: {
    margin: "42px 0 0 "
  },
  buttonWrapWithBackLink: {},
  nextButton: {
    fontWeight: 600,
    letterSpacing: "normal",
    "&:disabled": {
      color: "#ffffff"
    }
  }
};

const SubmitButton = props => {
  const {
    disabled = false,
    classes,
    label,
    handleClick,
    justify,
    containerExtraStyles
  } = props;
  return (
    <Grid
      container
      direction="row"
      justify={justify}
      alignItems="center"
      className={classes.buttonWrap}
      style={containerExtraStyles}
    >
      <ContainedButton
        type="submit"
        withRightArrow
        disabled={disabled}
        label={label}
        className={classes.nextButton}
        handleClick={handleClick}
      />
    </Grid>
  );
};

export default withStyles(styles)(SubmitButton);

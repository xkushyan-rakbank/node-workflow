import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import cx from "classnames";
import ContainedButton from "./ContainedButton";
import BackButton from "./BackButton";
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
    containerExtraStyles,
    withBackButton
  } = props;
  const buttonWrap = !!withBackButton
    ? cx(classes.buttonWrap, classes.buttonWrapWithBackLink)
    : classes.buttonWrap;
  return (
    <Grid
      container
      direction="row"
      justify={justify}
      alignItems="center"
      className={buttonWrap}
      style={containerExtraStyles}
    >
      {!!withBackButton && <BackButton />}

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

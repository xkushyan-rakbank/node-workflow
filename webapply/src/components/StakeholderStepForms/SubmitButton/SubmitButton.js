import React from "react";
import ContinueButton from "../../Buttons/ContinueButton";
import { useStyles } from "./styled";

export const SubmitButton = props => {
  const classes = useStyles();
  return (
    <div className={classes.buttonWrapper}>
      <ContinueButton type="submit" />
    </div>
  );
};

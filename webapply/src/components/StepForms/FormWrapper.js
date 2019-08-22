import React from "react";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";

const styles = {
  formWrapper: {
    margin: "0 20px"
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "8px 0 40px"
  }
};

const FormWrapper = props => {
  return (
    <form className={props.classes.formWrapper}>
      {props.children}
      <div className={props.classes.buttonWrapper}>
        <ContinueButton handleClick={props.handleContinue} />
      </div>
    </form>
  );
};

export default withStyles(styles)(FormWrapper);

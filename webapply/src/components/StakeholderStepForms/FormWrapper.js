import React from "react";
import { withStyles } from "@material-ui/core";
import cx from "classnames";
import ContinueButton from "../Buttons/ContinueButton";
import validateForm from "../../utils/validate";

const styles = {
  formWrapper: {
    margin: "0 20px"
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "40px 0"
  }
};

const FormWrapper = props => {
  const hideContinue = props.hideContinue ? props.hideContinue : false;

  const submitForm = event => {
    event.preventDefault();
    const errorList = validateForm(event);

    if (!errorList.length) {
      props.handleContinue();
    }
  };
  return (
    <form
      noValidate
      className={cx(props.classes.formWrapper, props.className)}
      onSubmit={submitForm}
    >
      {props.children}
      {!hideContinue && (
        <div className={props.classes.buttonWrapper}>
          <ContinueButton type="submit" />
        </div>
      )}
    </form>
  );
};

export default withStyles(styles)(FormWrapper);

import React from "react";
import { withStyles } from "@material-ui/core";
import cx from "classnames";
import { connect } from "react-redux";
import { compose } from "recompose";
import ContinueButton from "../Buttons/ContinueButton";
import { validateForm } from "../../utils/validate";
import { updateValidationErrors } from "../../store/actions/validationErrors";

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
  const isContinueDisabled = !!props.isContinueDisabled;

  const submitForm = event => {
    event.preventDefault();
    const errorList = validateForm(event);

    props.updateValidationErrors(errorList);

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
          <ContinueButton disabled={isContinueDisabled} type="submit" />
        </div>
      )}
    </form>
  );
};

const mapDispatchToProps = {
  updateValidationErrors
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(FormWrapper);

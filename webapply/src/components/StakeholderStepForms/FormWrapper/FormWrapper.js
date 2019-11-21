import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { compose } from "redux";
import { ContinueButton } from "../../Buttons/ContinueButton";
import { validateForm } from "../../../utils/validate";
import { updateValidationErrors } from "../../../store/actions/validationErrors";
import { useStyles } from "./styled";

const FormWrapper = props => {
  const classes = useStyles();
  const hideContinue = props.hideContinue ? props.hideContinue : false;

  const submitForm = event => {
    event.preventDefault();
    const errorList = validateForm(event);

    props.updateValidationErrors(errorList);

    if (!errorList.length) {
      props.handleContinue();
    }
  };
  return (
    <form noValidate className={cx(classes.formWrapper, props.className)} onSubmit={submitForm}>
      {props.children}
      {!hideContinue && (
        <div className={classes.buttonWrapper}>
          <ContinueButton disabled={!!props.isContinueDisabled} type="submit" />
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
  )
)(FormWrapper);

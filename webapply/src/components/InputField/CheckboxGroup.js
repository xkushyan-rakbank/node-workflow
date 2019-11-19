import React from "react";
import { withStyles } from "@material-ui/core";
import cx from "classnames";
import { compose } from "recompose";
import FormControl from "@material-ui/core/FormControl";
import { ErrorMessage } from "./../Notifications";
import CustomCheckbox from "./CustomCheckbox";
import { InfoTitle } from "./../Notifications";
import { Field } from "formik";

const style = {
  formControl: {
    display: "block"
  }
};

const CheckboxGroup = props => {
  const { classes = {}, id, options, name, title } = props;
  return (
    <FormControl component="fieldset" classes={{ root: classes.formControl }}>
      <div className={cx("box-group-grid", classes.checkboxesWrapper)}>
        {options.map(option => (
          <Field
            id={id}
            name={name}
            key={option.key}
            value={option.value}
            label={option.displayText}
            component={CustomCheckbox}
          />
        ))}
      </div>

      {props.errors && <ErrorMessage error={props.errors} />}
      {!!title && <InfoTitle title={title} />}
    </FormControl>
  );
};

export default compose(withStyles(style))(CheckboxGroup);

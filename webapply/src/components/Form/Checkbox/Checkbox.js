import React from "react";
import { getIn } from "formik";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import { CustomCheckbox } from "./CustomCheckbox";
import { InfoTitle } from "../../Notifications/index";
import { ErrorMessage } from "../../Notifications/index";

const useStyles = makeStyles({
  root: {
    margin: "12px 0 24px",
    width: "100%",
    display: "flex"
  }
});

export const Checkbox = ({
  infoTitle,
  label = "",
  value = true,
  field,
  form: { errors, touched },
  formControlClasses,
  ...rest
}) => {
  const errorMessage = getIn(errors, field.name);
  const hasError = errorMessage && getIn(touched, field.name);
  const classes = useStyles();

  return (
    <FormControl className={classes.root} classes={formControlClasses}>
      <CustomCheckbox
        {...field}
        {...rest}
        label={label}
        value={value}
        checked={field.value === value}
      />

      {hasError && <ErrorMessage error={errorMessage} />}
      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};

import React from "react";
import { getIn } from "formik";
import FormControl from "@material-ui/core/FormControl";

import { CustomCheckbox } from "./CustomCheckbox";
import { InfoTitle } from "../../Notifications/index";
import { ErrorMessage } from "../../Notifications/index";
import { useStyles } from "./styled";

export const Checkbox = ({
  infoTitle,
  label = "",
  value = true,
  field,
  form: { errors, touched },
  ...rest
}) => {
  const classes = useStyles();
  const errorMessage = getIn(errors, field.name);
  const hasError = errorMessage && getIn(touched, field.name);

  return (
    <FormControl className="formControl">
      <CustomCheckbox
        {...field}
        {...rest}
        label={label}
        className={classes.checkbox}
        value={value}
        checked={field.value === value}
      />

      {hasError && <ErrorMessage error={errorMessage} />}
      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};

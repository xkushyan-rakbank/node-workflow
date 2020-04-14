import React from "react";
import { getIn } from "formik";
import FormControl from "@material-ui/core/FormControl";

import { ErrorMessage } from "../../Notifications";
import { CustomRadioButton } from "./CustomRadioButton";
import { InfoTitle } from "../../InfoTitle";

export const RadioButton = ({
  infoTitle,
  label = "",
  value = true,
  field,
  form: { errors, touched },
  ...rest
}) => {
  const errorMessage = getIn(errors, field.name);
  const hasError = errorMessage && getIn(touched, field.name);

  return (
    <FormControl className="formControl">
      <CustomRadioButton
        {...field}
        label={label}
        value={value}
        checked={field.value === value}
        {...rest}
      />

      {hasError && <ErrorMessage error={errorMessage} />}
      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};

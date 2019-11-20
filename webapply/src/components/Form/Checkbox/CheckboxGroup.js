import React from "react";
import FormControl from "@material-ui/core/FormControl";

import { CustomCheckbox } from "./CustomCheckbox";
import { InfoTitle } from "../../Notifications/index";
import { ErrorMessage } from "../../Notifications/index";

import { useStyles } from "./styled";

export const CheckboxGroup = ({
  id,
  options,
  infoTitle,
  field,
  form,
  form: { errors, touched }
}) => {
  const classes = useStyles();
  const isError = errors[field.name] && touched[field.name];

  return (
    <FormControl className={classes.formControl}>
      <div className={classes.checkboxesWrapper}>
        {options.map(({ key, value, displayText }) => (
          <CustomCheckbox key={key} value={value} label={displayText} {...field} />
        ))}
      </div>

      {isError && <ErrorMessage error={errors[field.name]} />}
      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};

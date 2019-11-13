import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, InfoTitle } from "./../../Notifications";
import { styles } from "./styled";

function InputComponent({
  classes,
  disabled,
  placeholder,
  label,
  field,
  infoTitle,
  form: { errors, touched },
  ...props
}) {
  const error = errors[field.name] && touched[field.name];

  return (
    <>
      <FormControl className="formControl">
        <TextField
          {...field}
          {...props}
          label={label}
          variant="outlined"
          className={classes.textField}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
        />

        {error && <ErrorMessage error={errors[field.name]} />}

        {infoTitle && <InfoTitle title={infoTitle} />}
      </FormControl>
    </>
  );
}

export const Input = withStyles(styles)(InputComponent);

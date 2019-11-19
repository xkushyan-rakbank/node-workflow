import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage, InfoTitle, ContexualHelp } from "./../../Notifications";

import { useStyles } from "./styled";

export const Input = ({
  contexualHelpText,
  placement,
  disabled,
  placeholder,
  label,
  field,
  infoTitle,
  form: { errors, touched },
  ...props
}) => {
  const classes = useStyles();
  const error = errors[field.name] && touched[field.name];

  return (
    <>
      <FormControl className="formControl">
        <ContexualHelp title={contexualHelpText} placement={placement}>
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
        </ContexualHelp>

        {error && <ErrorMessage error={errors[field.name]} />}

        {infoTitle && <InfoTitle title={infoTitle} />}
      </FormControl>
    </>
  );
};

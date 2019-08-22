import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InfoTitle from "./../InfoTitle";
import ErrorMessage from "./../ErrorMessage";
import validate from "./../../utils/validate";

const inputData = {
  maxlength: 10,
  minlength: 2,
  max: 10
};

const style = {
  textField: {
    width: "100%",
    display: "flex !important",
    "& fieldset": {
      borderRadius: "8px !important",
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    }
  }
};

const Input = props => {
  const {
    field,
    type,
    label,
    placeholder,
    infoTitle,
    classes,
    required = false,
    ...rest
  } = props;

  return (
    <FormControl className="formControl">
      <TextField
        {...field}
        {...rest}
        required={required}
        type={type}
        placeholder={placeholder}
        InputLabelProps={{ shrink: true, required: required }}
        label={label}
        variant="outlined"
        className={classes.textField}
      />

      {!!infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};

export default withStyles(style)(Input);

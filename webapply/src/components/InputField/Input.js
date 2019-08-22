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
  const [values, setValue] = useState({ name: "" }); // remove it
  const [error, setErrors] = useState(""); // remove it

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

  // remove it
  const validation = event => {
    const { name, value } = event.target;
    setValue({ [name]: value });

    const errors = validate(event);
    setErrors(errors);
  };
  // remove it

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
        value={values.name} // remove it
        error={!!error}
        onChange={event => validation(event)} // remove it
      />

      {!!infoTitle && <InfoTitle title={infoTitle} />}

      {!!error && <ErrorMessage error={error} />}
    </FormControl>
  );
};

export default withStyles(style)(Input);

import React, { useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { digitRegExp } from "../../constants";
import { useStyles } from "./styled";

export const OtpVerification = ({ onChange, code }) => {
  const classes = useStyles();
  const inputRefs = code.map(() => null);

  const bindNodeRef = useCallback(
    index => node => {
      inputRefs[index] = node;
    },
    [inputRefs]
  );

  const handleInputFocus = useCallback(event => {
    event.target.select();
  }, []);

  const handleChange = useCallback(
    event => {
      const { value, name } = event.target;
      const newCodeIndex = parseInt(name, 10);
      const newCode = code.map((item, index) => (newCodeIndex === index ? value : item));
      const isValid = newCode.every(value => digitRegExp.test(value));

      onChange({ isValid, code: newCode });
      if (value && inputRefs[newCodeIndex + 1]) {
        inputRefs[newCodeIndex + 1].focus();
      }
    },
    [code, inputRefs, onChange]
  );

  return code.map((value, index) => (
    <Grid key={index} className={classes.squareInput}>
      <TextField
        type="text"
        name={`${index}`}
        variant="outlined"
        inputProps={{
          maxLength: 1,
          ref: bindNodeRef(index)
        }}
        onFocus={handleInputFocus}
        onChange={handleChange}
        value={value}
      />
    </Grid>
  ));
};

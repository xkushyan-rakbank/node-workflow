import React, { useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { useStyles } from "./styled";

const inputRefs = [];
const bindNodeRef = index => node => {
  inputRefs[index] = node;
};

export const OtpVerification = ({ onChange, code }) => {
  const classes = useStyles();

  const handleInputFocus = useCallback(event => {
    event.target.select();
  }, []);

  const handleChange = useCallback(
    event => {
      const { value, name } = event.target;
      const newCodeIndex = parseInt(name, 10);
      const newCode = code.map((item, index) => (newCodeIndex === index ? value : item));

      onChange(newCode);
      if (value && inputRefs[newCodeIndex + 1]) {
        inputRefs[newCodeIndex + 1].focus();
      }
    },
    [code, onChange]
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

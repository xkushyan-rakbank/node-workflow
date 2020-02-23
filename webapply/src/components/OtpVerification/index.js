import React, { useCallback, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { useStyles } from "./styled";

const BACKSPACE_KEY = 8;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

const inputRefs = [];
const bindNodeRef = index => node => {
  inputRefs[index] = node;
};

export const OtpVerification = ({ onChange, code, isResetFocus }) => {
  const classes = useStyles();

  useEffect(() => {
    if (isResetFocus) {
      inputRefs[0].focus();
    }
  }, [isResetFocus]);

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

  const handleKeyUp = event => {
    const { keyCode, target } = event;
    const inputIndex = parseInt(target.name, 10);
    const prevInput = inputRefs[inputIndex - 1];
    const nextInput = inputRefs[inputIndex + 1];
    switch (keyCode) {
      case BACKSPACE_KEY:
      case LEFT_ARROW_KEY:
        prevInput && prevInput.focus();
        return;

      case RIGHT_ARROW_KEY:
        nextInput && nextInput.focus();
        return;
      default:
        return;
    }
  };

  return code.map((value, index) => (
    <Grid key={index} className={classes.squareInput}>
      <TextField
        autoFocus={index === 0}
        type="text"
        name={`${index}`}
        variant="outlined"
        inputProps={{ maxLength: 1, ref: bindNodeRef(index) }}
        onFocus={handleInputFocus}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={value}
      />
    </Grid>
  ));
};

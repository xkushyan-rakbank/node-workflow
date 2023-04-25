import React, { useCallback, useImperativeHandle, forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { isNumeric } from "../../../../utils/validation";

import { useStyles } from "./styled";

const BACKSPACE_KEY = 8;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

const inputRefs = [];
const bindNodeRef = index => node => {
  inputRefs[index] = node;
};

const InputBase = ({ onChange, code, inputProps = {} }, ref) => {
  const classes = useStyles();

  useImperativeHandle(ref, () => ({
    resetFocus: () => inputRefs[0].focus()
  }));

  const handleInputFocus = event => event.target.select();

  const handleChange = useCallback(
    event => {
      const { value, name } = event.target;
      if (!value || (isNumeric(value) && value < 10)) {
        const newCodeIndex = parseInt(name, 10);
        const newCode = code.map((item, index) => (newCodeIndex === index ? value : item));

        onChange(newCode);
        if (value && inputRefs[newCodeIndex + 1]) {
          inputRefs[newCodeIndex + 1].focus();
        }
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
        type="number"
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

export const Input = forwardRef(InputBase);

import React, { useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { digitRegExp } from "../../constants";
import Input from "../../components/InputField/Input";
import { useStyles } from "./styled";

const OtpVerification = onChange => {
  const classes = useStyles();

  const [code, setCode] = useState(Array(6).fill(""));
  const [invalid, setInvalid] = useState(false);
  const inputRefs = [];

  const bindNodeRef = useCallback(
    index => node => {
      inputRefs[index] = node;
    },
    [inputRefs]
  );

  const handleInputFocus = useCallback(
    index => {
      inputRefs[index] && inputRefs[index].select();
    },
    [inputRefs]
  );

  const jumpToNextInput = useCallback(
    name => {
      const index = Number(name);
      inputRefs[index] && inputRefs[index].blur();
      inputRefs[index + 1] && inputRefs[index + 1].focus();
    },
    [inputRefs]
  );

  const handleChange = useCallback(
    event => {
      const { value, name } = event.target;
      const newValue = value.trim();
      const newState = { invalid };
      if (digitRegExp.test(value) || (code[name] && !newValue)) {
        const newCode = code;
        newCode[name] = newValue;
        newState.code = newCode;
        if (newValue) {
          jumpToNextInput(name);
        }
      }

      const isValid = code.every(value => digitRegExp.test(value));
      //onChange = () => onChange({ isValid, code: code });
      onChange({ isValid, code });

      setCode(newState.code);
      setInvalid(newState.invalid);
    },
    [setCode, setInvalid, jumpToNextInput, code, invalid, onChange]
  );

  return (
    <>
      {code.map((value, index) => {
        return (
          <Grid
            key={`code-${index}`}
            className={classes.squareInput}
            classes={{ root: classes.rootSquareInput }}
          >
            <Input
              key={`code-${index}`}
              name={index.toString()}
              inputProps={{
                maxLength: 1,
                ref: bindNodeRef(index)
              }}
              onFocus={handleInputFocus(index)}
              onChange={handleChange}
              value={value}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default OtpVerification;

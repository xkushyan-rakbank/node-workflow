import React, { useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { digitRegExp } from "../../constants";
import Input from "../../components/InputField/Input";
import { useStyles } from "./styled";

const OtpVerification = ({ onChange, isValidCode, code }) => {
  const classes = useStyles();
  const inputRefs = code.map(() => null);

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

  const handleChange = useCallback(
    event => {
      const { value, name } = event.target;
      const newCodeIndex = parseInt(name, 10);
      const newCode = code.map((item, index) => (newCodeIndex === index ? value : item));

      if (inputRefs[newCodeIndex + 1]) {
        inputRefs[newCodeIndex + 1].focus();
      }

      const isValid = newCode.every(value => digitRegExp.test(value));
      onChange({ isValid, code: newCode });
    },
    [code, inputRefs, onChange]
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

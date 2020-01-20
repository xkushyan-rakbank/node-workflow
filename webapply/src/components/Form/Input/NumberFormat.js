import React from "react";
import BaseNumberFormat from "react-number-format";

export const NumberFormat = ({ inputRef, onChange, ...props }) => (
  <BaseNumberFormat
    getInputRef={inputRef}
    onValueChange={({ value }) => {
      onChange({
        target: {
          name: props.name,
          value
        }
      });
    }}
    isNumericString
    {...props}
  />
);

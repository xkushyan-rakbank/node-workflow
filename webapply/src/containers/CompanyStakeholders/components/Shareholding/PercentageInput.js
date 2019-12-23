import React from "react";
import NumberFormat from "react-number-format";

export const PercentageInput = ({ inputRef, onChange, ...props }) => (
  <NumberFormat
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
    decimalSeparator="."
    decimalScale={2}
    {...props}
  />
);

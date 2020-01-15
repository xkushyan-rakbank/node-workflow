import React from "react";
import NumberFormat from "react-number-format";

export const NumberFormatInput = ({ inputRef, onChange, ...props }) => (
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
    {...props}
  />
);

export const PercentageInput = props => (
  <NumberFormatInput decimalSeparator="." decimalScale={2} {...props} />
);

import React from "react";
import BaseNumberFormat from "react-number-format";

export const NumberFormat = ({ inputRef, onChange, ...props }) => (
  <BaseNumberFormat
    data-testid={props["data-testid"]}
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

export const POBoxNumberInput = props => (
  <NumberFormat allowNegative={false} decimalSeparator={false} {...props} />
);

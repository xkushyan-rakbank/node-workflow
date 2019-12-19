import MaskedInput from "react-text-mask";
import React from "react";

export function EmiratesIDMaskComponent(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "7",
        "8",
        "4",
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/
      ]}
      guide={false}
    />
  );
}

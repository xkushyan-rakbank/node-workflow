//ro-assist-brd3-15
import React from "react";
import MaskedInput from "react-text-mask";

import { Input } from "./Input";

// prettier-ignore
const MASK = [/[A-z,0-9]/, /[A-z,0-9]/, /[A-z,0-9]/, /[A-z,0-9]/, /[A-z,0-9]/, /[A-z,0-9]/, ".", /[A-z,0-9]/, /[A-z,0-9]/, /[A-z,0-9]/, /[A-z,0-9]/, /[A-z,0-9]/, ".", /[A-z,0-9]/, /[A-z,0-9]/, ".", /[A-z,0-9]/, /[A-z,0-9]/, /[A-z,0-9]/];

const TextMask = ({ inputRef, ...rest }) => (
  <MaskedInput
    ref={ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={MASK}
    guide={false}
    {...rest}
  />
);
export const GlobalIntermediaryID = props => (
  <Input
    label="Global Intermediary Identification No."
    placeholder="XXXXXX.XXXXX.XX.XXX"
    InputProps={{ inputComponent: TextMask }}
    {...props}
  />
);

import React from "react";
import MaskedInput from "react-text-mask";

import { Input } from "./Input";

// prettier-ignore
const MASK = ["7","8","4","-",/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/];

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

export const EmiratesID = props => (
  <Input
    label="Emirates ID"
    placeholder="784-XXXX-XXXXXXX-X"
    InputProps={{ inputComponent: TextMask }}
    {...props}
  />
);

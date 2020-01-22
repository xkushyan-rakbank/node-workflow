import React from "react";
import MaskedInput from "react-text-mask";

import { Input } from "./Input";
import { ContexualHelp } from "../../Notifications";

// eslint-disable-next-line prettier/prettier
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

export const EmiratesID = ({ contextualHelpText, contextualHelpProps = {}, ...props }) => (
  <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
    <Input
      label="Emirates ID"
      placeholder="784195012345678"
      InputProps={{ inputComponent: TextMask }}
      {...props}
    />
  </ContexualHelp>
);

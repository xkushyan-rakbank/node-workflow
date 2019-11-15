import React from "react";

import { accountSigningNameOther, inputIdIndex } from "../../../constants";

import RadioGroup from "../../../../../components/InputField/RadioGroupButtons";
import TextArea from "../../../../../components/InputField/TextArea";

const SigningTransactions = ({ accountSigningType }) => (
  <RadioGroup
    indexes={inputIdIndex}
    id="SigAcntSig.accountSigningType"
    helpMessage="text help TODO replace text"
  >
    {accountSigningType.value === accountSigningNameOther && (
      <TextArea id="SigAcntSig.accountSigningInstn" indexes={inputIdIndex} />
    )}
  </RadioGroup>
);

export default SigningTransactions;

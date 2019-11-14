import React from "react";

import { accountSigningNameOther } from "../../../constants";

import RadioGroup from "../../../../../components/InputField/RadioGroupButtons";
import TextArea from "../../../../../components/InputField/TextArea";

const SigningTransactions = ({ accountSigningType }) => {
  const indexes = [0];

  return (
    <RadioGroup
      indexes={indexes}
      id="SigAcntSig.accountSigningType"
      helpMessage="text help TODO replace text"
    >
      {accountSigningType.value === accountSigningNameOther && (
        <TextArea id="SigAcntSig.accountSigningInstn" indexes={indexes} />
      )}
    </RadioGroup>
  );
};

export default SigningTransactions;

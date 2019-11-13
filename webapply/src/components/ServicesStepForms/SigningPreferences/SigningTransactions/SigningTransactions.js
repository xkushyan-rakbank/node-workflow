import React from "react";

import { accountSigningNameOther } from "../SigningPreferences";
import RadioGroup from "../../../InputField/RadioGroupButtons";
import TextArea from "../../../InputField/TextArea";

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

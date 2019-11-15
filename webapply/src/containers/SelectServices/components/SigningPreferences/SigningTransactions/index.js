import React from "react";

import { ACCOUNTS_SIGNING_NAME_OTHER, INPUT_ID_INDEX } from "../../../constants";

import RadioGroup from "../../../../../components/InputField/RadioGroupButtons";
import TextArea from "../../../../../components/InputField/TextArea";

export const SigningTransactions = ({ accountSigningType }) => (
  <RadioGroup
    indexes={INPUT_ID_INDEX}
    id="SigAcntSig.accountSigningType"
    helpMessage="text help TODO replace text"
  >
    {accountSigningType.value === ACCOUNTS_SIGNING_NAME_OTHER && (
      <TextArea id="SigAcntSig.accountSigningInstn" indexes={INPUT_ID_INDEX} />
    )}
  </RadioGroup>
);

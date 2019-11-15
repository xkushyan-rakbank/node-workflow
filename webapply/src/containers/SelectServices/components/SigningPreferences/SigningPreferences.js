import React, { useEffect } from "react";
import get from "lodash/get";

import { ACCOUNTS_SIGNING_NAME_OTHER } from "../../constants";

import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper";
import AddButton from "../../../../components/Buttons/AddButton";
import Divider from "../../../../components/Divider";
import ConfirmingTransactions from "./ConfirmingTransactions/ConfirmingTransactions";
import SigningTransactions from "./SigningTransactions/SigningTransactions";
import { ContactGroup } from "./ContactGroup";

import { styles } from "./styled";

export const SigningPreferences = props => {
  const {
    signatoryInfo,
    accountSigningType,
    accountSigningInstn,
    goToNext,
    updateProspect
  } = props;
  const classes = styles();

  const authorityToSignType = get(props, "accountSigningType.value");
  useEffect(() => {
    if (authorityToSignType !== ACCOUNTS_SIGNING_NAME_OTHER) {
      updateProspect({ [accountSigningInstn.name]: "" });
    }
  }, [authorityToSignType, updateProspect, accountSigningInstn.name]);

  const handleAddPerson = () => {
    const { signInfoFullNameInput } = props;
    const signatoriesTotal = signatoryInfo.length;

    if (signatoriesTotal === 1) {
      const path = signInfoFullNameInput.config.name.replace("*", signatoriesTotal);
      updateProspect({ [path]: "" });
    }
  };

  return (
    <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
      <SigningTransactions accountSigningType={accountSigningType} />

      <Divider />
      <ConfirmingTransactions />

      <ContactGroup signatoryInfo={signatoryInfo} />
      <AddButton
        title="Add another person"
        onClick={handleAddPerson}
        className={classes.addButton}
      />
    </FormWrapper>
  );
};

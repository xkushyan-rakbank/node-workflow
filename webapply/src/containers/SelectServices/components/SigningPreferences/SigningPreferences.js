import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import get from "lodash/get";

import * as appConfigSelectors from "../../../../store/selectors/appConfig";
import { getGeneralInputProps } from "../../../../store/selectors/input";
import { updateProspect } from "../../../../store/actions/appConfig";

import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper";
import AddButton from "../../../../components/Buttons/AddButton";
import Divider from "../../../../components/Divider";
import ConfirmingTransactions from "./ConfirmingTransactions/ConfirmingTransactions";
import ContactGroup from "./ContactGroup";
import SigningTransactions from "./SigningTransactions/SigningTransactions";

import { styled } from "./styled";

export const accountSigningNameOther = "Others";

const SigningPreferences = props => {
  const {
    classes,
    signatoryInfo,
    accountSigningType,
    accountSigningInstn,
    goToNext,
    updateProspect
  } = props;
  const authorityToSignType = get(props, "accountSigningType.value");

  useEffect(() => {
    if (authorityToSignType !== accountSigningNameOther) {
      updateProspect({ [accountSigningInstn.name]: "" });
    }
  }, [authorityToSignType, updateProspect, accountSigningInstn.name]);

  const getValueInput = (index, signatoryInfo) => get(signatoryInfo[index], "fullName", "");

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

      {signatoryInfo.length ? (
        signatoryInfo.map((person, index) => (
          <ContactGroup
            key={index}
            index={index}
            isRequired={getValueInput(index, signatoryInfo)}
          />
        ))
      ) : (
        <ContactGroup index={0} />
      )}

      <AddButton
        title="Add another person"
        onClick={handleAddPerson}
        className={classes.addButton}
      />
    </FormWrapper>
  );
};

const mapStateToProps = state => ({
  signatoryInfo: appConfigSelectors.getSignatories(state),
  signInfoFullNameInput: getGeneralInputProps(state, "Sig.fullName", [0]),
  accountSigningType: getGeneralInputProps(state, "SigAcntSig.accountSigningType", [0]),
  accountSigningInstn: getGeneralInputProps(state, "SigAcntSig.accountSigningInstn", [0])
});

const mapDispatchToProps = {
  updateProspect
};

export default compose(
  withStyles(styled),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SigningPreferences);

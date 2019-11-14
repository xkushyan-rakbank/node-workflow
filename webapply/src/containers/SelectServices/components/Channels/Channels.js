import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import get from "lodash/get";
import RadioGroup from "@material-ui/core/RadioGroup";

import Subtitle from "../../../../components/Subtitle";
import Checkbox from "../../../../components/InputField/RefactoredCheckbox";
import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper";
import InfoTitle from "../../../../components/InfoTitle";
import RadioButton from "../../../../components/InputField/RadioButton";
import Divider from "../../../../components/Divider";
import SignatoriesList from "./SignatoriesList";

import { getInputValueById } from "../../../../store/selectors/input";
import { getGeneralInputProps } from "../../../../store/selectors/input";
import { updateProspect } from "../../../../store/actions/appConfig";
import * as appConfigSelectors from "../../../../store/selectors/appConfig";
import { stakeholders as stakeholdersSelector } from "../../../../store/selectors/stakeholder";
import { getSelectedTypeCurrency } from "../../../../utils/SelectServices";

import { styled } from "./styled";

const updateValueCheckBox = (name, prevValue, newValue, updateProspect) => {
  if (newValue !== prevValue) {
    updateProspect({ [name]: newValue });
  }
};

const getStatusChequeBookApplied = props => {
  const {
    primaryMobCountryCode,
    primaryPhoneCountryCode,
    chequeBook: { name, value },
    accountCurrencies,
    updateProspect
  } = props;

  const { isSelectForeignCurrencyAndLocal, isSelectOnlyForeignCurrency } = getSelectedTypeCurrency(
    accountCurrencies
  );

  const mobCountryCode = "971";
  const basedMobileNumberForCompany = new Set([primaryMobCountryCode, primaryPhoneCountryCode]);
  const isSelectedLocalMobilePhone = basedMobileNumberForCompany.has(mobCountryCode);

  if (isSelectForeignCurrencyAndLocal || isSelectedLocalMobilePhone) {
    updateValueCheckBox(name, value, true, updateProspect);
    return { isDisabledChequeBook: true };
  }

  if (isSelectOnlyForeignCurrency || !isSelectedLocalMobilePhone) {
    return { isDisabledChequeBook: false };
  }

  return { isDisabledChequeBook: false };
};

const getStatusDebitCardApplied = props => {
  const {
    accountSigningInfo: { accountSigningType, authorityType },
    debitCardApplied: { name, value },
    accountCurrencies,
    updateProspect
  } = props;
  const selectedSigningTypesAny = "Any of us";
  const authorityTypeSP = "SP";

  const accountSigningTypeAnyOfUs = accountSigningType === selectedSigningTypesAny;

  const { isSelectForeignCurrencyAndLocal, isSelectOnlyForeignCurrency } = getSelectedTypeCurrency(
    accountCurrencies
  );

  if (isSelectOnlyForeignCurrency || !accountSigningTypeAnyOfUs) {
    updateValueCheckBox(name, value, false, updateProspect);
    return { isDisabledDebitCard: true };
  }

  if (authorityType === authorityTypeSP || isSelectForeignCurrencyAndLocal) {
    updateValueCheckBox(name, value, true, updateProspect);
    return { isDisabledDebitCard: true };
  }

  updateValueCheckBox(name, value, accountSigningTypeAnyOfUs, updateProspect);
  return { isDisabledDebitCard: accountSigningTypeAnyOfUs };
};

const AccountDetails = props => {
  const { classes, goToNext, stakeholders, eStatements, mailStatements, updateProspect } = props;
  const [selectedTypeStatementsID, setSelectedTypeStatementsID] = useState("");

  const { isDisabledDebitCard } = getStatusDebitCardApplied(props);
  const { isDisabledChequeBook } = getStatusChequeBookApplied(props);

  const isHasSignatories = stakeholders.some(stakeholder =>
    get(stakeholder, "kycDetails.isSignatory")
  );

  const onChangeBankStatements = e => {
    const { id } = e.target;
    updateProspect({ [selectedTypeStatementsID]: false });
    updateProspect({ [id]: true });
    setSelectedTypeStatementsID(id);
  };
  const inputIdIndex = [0];

  return (
    <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
      <div className={classes.contactsTitle}>
        <Subtitle title="Debit Cards" />
      </div>
      <Checkbox
        id="Acnt.debitCardApplied"
        indexes={inputIdIndex}
        classes={{ labelWrapper: classes.cardAppliedCheckbox }}
        disabled={isDisabledDebitCard}
      />

      {isHasSignatories && <SignatoriesList stakeholders={stakeholders} />}

      <Divider classes={{ divider: classes.divider }} />

      <div className={classes.contactsTitle}>
        <Subtitle title="Cheque book" />
      </div>
      <Checkbox
        id="Acnt.chequeBookApplied"
        indexes={inputIdIndex}
        disabled={isDisabledChequeBook}
      />

      <Divider classes={{ divider: classes.divider }} />

      <Subtitle title="Bank statements" />
      <RadioGroup name="BankStatements" onChange={onChangeBankStatements}>
        <RadioButton
          value={eStatements.value}
          checked={eStatements.value}
          label={eStatements.config.label}
          id={eStatements.name}
        />
        <RadioButton
          value={mailStatements.value}
          checked={mailStatements.value}
          label={mailStatements.config.label}
          id={mailStatements.name}
        />
      </RadioGroup>

      <InfoTitle
        title="These will be mailed by courier to your preferred address"
        classes={{ wrapper: classes.infoTitle }}
      />
    </FormWrapper>
  );
};

const mapStateToProps = state => ({
  ...appConfigSelectors.getSignatories(state)[0],
  accountCurrencies: getInputValueById(state, "Acnt.accountCurrencies", [0]),
  debitCardApplied: getGeneralInputProps(state, "Acnt.debitCardApplied", [0]),
  chequeBook: getGeneralInputProps(state, "Acnt.chequeBookApplied", [0]),
  eStatements: getGeneralInputProps(state, "Acnt.eStatements", [0]),
  mailStatements: getGeneralInputProps(state, "Acnt.mailStatements", [0]),
  stakeholders: stakeholdersSelector(state),
  primaryMobCountryCode: getInputValueById(state, "OrgCont.primaryMobCountryCode"),
  primaryPhoneCountryCode: getInputValueById(state, "OrgCont.primaryPhoneCountryCode")
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styled)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountDetails)
);

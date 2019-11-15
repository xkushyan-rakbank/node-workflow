import React, { useState } from "react";
import get from "lodash/get";
import RadioGroup from "@material-ui/core/RadioGroup";

import Subtitle from "../../../../components/Subtitle";
import Checkbox from "../../../../components/InputField/RefactoredCheckbox";
import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper";
import InfoTitle from "../../../../components/InfoTitle";
import RadioButton from "../../../../components/InputField/RadioButton";
import Divider from "../../../../components/Divider";
import SignatoriesList from "./SignatoriesList";

import { INPUT_ID_INDEX } from "../../constants";
import { getStatusDebitCardApplied, getStatusChequeBookApplied } from "./utils";

import { style } from "./styled";

export const AccountDetails = props => {
  const { goToNext, stakeholders, eStatements, mailStatements, updateProspect } = props;
  const [selectedTypeStatementsID, setSelectedTypeStatementsID] = useState("");
  const classes = style();

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

  return (
    <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
      <div className={classes.contactsTitle}>
        <Subtitle title="Debit Cards" />
      </div>
      <Checkbox
        id="Acnt.debitCardApplied"
        indexes={INPUT_ID_INDEX}
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
        indexes={INPUT_ID_INDEX}
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

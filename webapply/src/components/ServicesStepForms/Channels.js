import React from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import get from "lodash/get";
import RadioGroup from "@material-ui/core/RadioGroup";

import Subtitle from "../Subtitle";
import Checkbox from "../InputField/RefactoredCheckbox";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import InfoTitle from "../InfoTitle";
import TextInput from "../InputField/TextInput";
import RadioButton from "../InputField/RadioButton";
import Divider from "../Divider";

import { getInputValueById } from "../../store/selectors/input";
import { getGeneralInputProps } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";
import * as appConfigSelectors from "../../store/selectors/appConfig";
import { stakeholders as stakeholdersSelector } from "../../store/selectors/stakeholder";

const style = {
  formWrapper: {
    margin: 0,
    position: "relative"
  },
  contactsTitle: {
    display: "flex",
    justifyContent: "space-between"
  },
  signatoryLabel: {
    fontSize: "14px",
    fontWeight: 600,
    marginTop: "40px",
    lineHeight: 2.14,
    color: "#373737"
  },
  signatoryNamesContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "12px",
    "& div + div": {
      marginTop: "20px"
    }
  },
  signatoryName: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& span": {
      fontSize: "14px",
      fontFamily: "Open Sans"
    }
  },
  selectCombined: {
    margin: "0 !important",
    width: "360px",
    "& input": {
      fontWeight: "600"
    }
  }
};

const getStatusDebitCardApplied = props => {
  const {
    accountSigningInfo: { accountSigningType, authorityType },
    accountCurrencies,
    debitCardApplied: { name, value }
  } = props;

  const accountSigningTypeAnyOfUs = accountSigningType === "Any of us";
  const isSelectedLocalCurrency = accountCurrencies.includes("AED");
  const isSelectForeignCurrencyAndLocal =
    isSelectedLocalCurrency || (isSelectedLocalCurrency && accountCurrencies.length > 1);
  const isSelectOnlyForeignCurrency = !isSelectedLocalCurrency && accountCurrencies.length >= 1;

  const updateValue = newValue => {
    if (newValue !== value) {
      props.updateProspect({ [name]: newValue });
    }
  };

  if (isSelectOnlyForeignCurrency || !accountSigningTypeAnyOfUs) {
    updateValue(false);
    return { isDisabled: true };
  }

  if (authorityType === "SP" || isSelectForeignCurrencyAndLocal) {
    updateValue(true);
    return { isDisabled: true };
  }

  updateValue(accountSigningTypeAnyOfUs);
  return { isDisabled: accountSigningTypeAnyOfUs };
};

const AccountDetails = props => {
  const { classes, goToNext, stakeholders } = props;
  const { isDisabled } = getStatusDebitCardApplied(props);
  const isHasSignatories = stakeholders.some(stakeholder =>
    get(stakeholder, "kycDetails.isSignatory")
  );

  return (
    <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
      <div className={classes.contactsTitle}>
        <Subtitle title="Debit Cards" />
      </div>

      <Checkbox
        id="Acnt.debitCardApplied"
        indexes={[0]}
        style={{ marginTop: "10px" }}
        disabled={isDisabled}
      />

      {isHasSignatories && (
        <>
          <div className={classes.signatoryLabel}>Signatory name</div>
          <InfoTitle
            title="Names on debit cards have a limit of 19 characters"
            styles={{ marginTop: "0" }}
          />

          <div className={classes.signatoryNamesContainer}>
            {stakeholders.map((stakeholder, index) => {
              const { firstName, lastName } = stakeholder;
              const isSignatory = get(stakeholder, "kycDetails.isSignatory");

              return isSignatory ? (
                <div className={classes.signatoryName} key={index}>
                  <span>{`${firstName} ${lastName}`}</span>
                  <TextInput
                    id="SigDbtcAuths.nameOnDebitCard"
                    indexes={[index]}
                    classes={{ regularWrapper: classes.selectCombined, input: classes.input }}
                  />
                </div>
              ) : null;
            })}
          </div>
        </>
      )}

      <Divider styles={{ marginBottom: "0" }} />

      <div className={classes.contactsTitle}>
        <Subtitle title="Cheque book" />
      </div>
      <Checkbox id="Acnt.chequeBookApplied" indexes={[0]} />

      <Divider styles={{ marginBottom: "0" }} />

      <Subtitle title="Bank statements" />
      {/*<Checkbox id="Acnt.eStatements" indexes={[0]} />*/}
      {/*<Checkbox id="Acnt.mailStatements" indexes={[0]} />*/}
      <RadioGroup name="Bank statements">
        <RadioButton value="any" label="I want online bank statements" />
        <RadioButton value="any 3" label="I want paper statements (monthly charges apply)" />
      </RadioGroup>

      <InfoTitle
        title="These will be mailed by courier to your preferred address"
        styles={{ position: "absolute", bottom: "11px" }}
      />
    </FormWrapper>
  );
};

const mapStateToProps = state => ({
  ...appConfigSelectors.getSignatories(state)[0],
  accountCurrencies: getInputValueById(state, "Acnt.accountCurrencies", [0]),
  debitCardApplied: getGeneralInputProps(state, "Acnt.debitCardApplied", [0]),
  stakeholders: stakeholdersSelector(state)
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountDetails)
);

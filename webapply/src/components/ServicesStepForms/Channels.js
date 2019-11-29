import React from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import get from "lodash/get";
import RadioGroup from "@material-ui/core/RadioGroup";

import Subtitle from "../Subtitle";
import Checkbox from "../InputField/RefactoredCheckbox";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import { InfoTitle } from "./../Notifications";
import TextInput from "../InputField/TextInput";
import RadioButton from "../InputField/RadioButton";
import Divider from "../Divider";

import { getInputValueById } from "../../store/selectors/input";
import { getGeneralInputProps } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";
import * as appConfigSelectors from "../../store/selectors/appConfig";
import { stakeholders as stakeholdersSelector } from "../../store/selectors/stakeholder";
import { getSelectedTypeCurrency } from "../../store/selectors/SelectServices";

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

const updateValueCheckBox = (name, prevValue, newValue, props) => {
  if (newValue !== prevValue) {
    props.updateProspect({ [name]: newValue });
  }
};

const getStatusChequeBookApplied = props => {
  const {
    primaryMobCountryCode,
    primaryPhoneCountryCode,
    chequeBook: { name, value },
    accountCurrencies
  } = props;

  const { isSelectForeignCurrencyAndLocal, isSelectOnlyForeignCurrency } = accountCurrencies;

  const mobCountryCode = "971";
  const basedMobileNumberForCompany = new Set([primaryMobCountryCode, primaryPhoneCountryCode]);
  const isSelectedLocalMobilePhone = basedMobileNumberForCompany.has(mobCountryCode);

  if (isSelectForeignCurrencyAndLocal || isSelectedLocalMobilePhone) {
    updateValueCheckBox(name, value, true, props);
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
    accountCurrencies
  } = props;

  const accountSigningTypeAnyOfUs = accountSigningType === "Any of us";

  const { isSelectForeignCurrencyAndLocal, isSelectOnlyForeignCurrency } = accountCurrencies;

  if (isSelectOnlyForeignCurrency || !accountSigningTypeAnyOfUs) {
    updateValueCheckBox(name, value, false, props);
    return { isDisabledDebitCard: true };
  }

  if (authorityType === "SP" || isSelectForeignCurrencyAndLocal) {
    updateValueCheckBox(name, value, true, props);
    return { isDisabledDebitCard: true };
  }

  updateValueCheckBox(name, value, accountSigningTypeAnyOfUs, props);
  return { isDisabledDebitCard: accountSigningTypeAnyOfUs };
};

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedTypeStatementsID: "" };
  }

  render() {
    const { classes, goToNext, stakeholders } = this.props;
    const { isDisabledDebitCard } = getStatusDebitCardApplied(this.props);
    const { isDisabledChequeBook } = getStatusChequeBookApplied(this.props);

    const isHasSignatories = stakeholders.some(stakeholder =>
      get(stakeholder, "kycDetails.isSignatory")
    );

    const onChangeBankStatements = e => {
      const { id } = e.target;
      const { selectedTypeStatementsID } = this.state;
      this.props.updateProspect({ [selectedTypeStatementsID]: false });

      this.setState({ selectedTypeStatementsID: id });
      this.props.updateProspect({ [id]: true });
    };

    return (
      <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
        <div className={classes.contactsTitle}>
          <Subtitle title="Debit Cards" />
        </div>

        <Checkbox
          id="Acnt.debitCardApplied"
          indexes={[0]}
          style={{ marginTop: "10px" }}
          disabled={isDisabledDebitCard}
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
        <Checkbox id="Acnt.chequeBookApplied" indexes={[0]} disabled={isDisabledChequeBook} />

        <Divider styles={{ marginBottom: "0" }} />

        <Subtitle title="Bank statements" />

        <RadioGroup name="BankStatements" onChange={onChangeBankStatements}>
          <RadioButton
            value={this.props.eStatements.value}
            checked={this.props.eStatements.value}
            label={this.props.eStatements.config.label}
            id={this.props.eStatements.name}
          />
          <RadioButton
            value={this.props.mailStatements.value}
            checked={this.props.mailStatements.value}
            label={this.props.mailStatements.config.label}
            id={this.props.mailStatements.name}
          />
        </RadioGroup>

        <InfoTitle
          title="These will be mailed by courier to your preferred address"
          styles={{ position: "absolute", bottom: "11px" }}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  ...appConfigSelectors.getSignatories(state)[0],
  accountCurrencies: getSelectedTypeCurrency(state, "Acnt.accountCurrencies", [0]),
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

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountDetails)
);

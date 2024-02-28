import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { isMobile } from "react-device-detect";
import { Field as FormikField } from "formik";
import { ICONS, Icon } from "../../../components/Icons";
import {
  CheckboxGroup,
  AutoSaveField as Field,
  InlineRadioGroup,
  SelectAutocomplete
} from "../../../components/Form";
import { ContexualHelp } from "../../../components/Notifications";
import { yesNoOptions } from "../../../constants/options";
import { ConfirmDialog } from "../../../components/Modals";
import { updateProspect } from "../../../store/actions/appConfig";
import { DisclaimerNote } from "../../../components/InfoNote/DisclaimerNote";
import { useStyles } from "../styled";

export const ServicePreferences = ({ values, setFieldValue, isIslamic }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const createCurrencyLabel = useCallback((code, flagIcon, isDefault = false) => (
    <span key={`${code}_label`} className={classes.currencyWrapper}>
      <span className={isDefault ? classes.defaultCurrencyLabel : ""}>
        <span>{code}</span>
      </span>
      <Icon name={flagIcon} alt={`${code} icon`} className={classes.flagIconStyle} />
      {isDefault && <span className={classes.currencyExtraInfoLabel}>(default)</span>}
    </span>
  ));

  const AcceptedCurrencyOptions = [
    {
      code: "AED",
      key: "AED",
      value: "AED",
      label: createCurrencyLabel("AED", ICONS.aedFlag, true)
    },
    {
      code: "USD",
      key: "USD",
      value: "USD",
      label: createCurrencyLabel("USD", ICONS.usdFlag)
    },
    {
      code: "EUR",
      key: "EUR",
      value: "EUR",
      label: createCurrencyLabel("EUR", ICONS.euroFlag)
    },
    {
      code: "GBP",
      key: "GBP",
      value: "GBP",
      label: createCurrencyLabel("GBP", ICONS.gbpFlag)
    }
  ];

  const accountCurrencyCheckboxFieldHandler = useCallback(event => {
    if (event.target.checked) {
      const valuesToSet = [...values.accountCurrencies, event.target.value];
      setFieldValue("accountCurrencies", valuesToSet);
      dispatch(
        updateProspect({
          "prospect.accountInfo.accountCurrencies": valuesToSet
        })
      );
    } else {
      setSelectedCurrency(event.target.value);
      setIsOpen(true);
    }
  });

  const handleConfirmRemoveCurrency = () => {
    const valuesToSet = values.accountCurrencies.filter(value => value !== selectedCurrency);
    setFieldValue("accountCurrencies", valuesToSet);
    dispatch(
      updateProspect({
        "prospect.accountInfo.accountCurrencies": valuesToSet
      })
    );
    setIsOpen(false);
  };

  const filteredBranches = useCallback(
    options => {
      /* istanbul ignore next */
      return options
        .filter(city => city.code === values.accountEmirateCity)
        .reduce((acc, curr) => (curr.subGroup ? [...acc, ...curr.subGroup] : acc), []);
    },
    [values.accountEmirateCity]
  );

  const handleRecieveInterestChange = useCallback(event => {
    const value = JSON.parse(event.target.value);
    const name = event.target.name;
    setFieldValue(name, value);
    dispatch(
      updateProspect({
        "prospect.accountInfo.receiveInterest": value
      })
    );
  });

  return (
    <div data-testid="servicePreferenceWrapper">
      <div
        className={cx(classes.questionareWrapper, classes.accountCurrenciesWrapper)}
        data-testid="accountCurrenciesWrapper"
      >
        <label className={cx(classes.sectionLabel, classes.accountCurrenciesLabel)}>
          You can also have accounts in other currencies. Select the one(s) you want to open.
        </label>
        <FormikField
          isInlineStyle={!isMobile}
          isTwoCoulmnStyle={true}
          customIcon={true}
          options={AcceptedCurrencyOptions}
          name="accountCurrencies"
          path={"prospect.accountInfo.accountCurrencies"}
          component={CheckboxGroup}
          classes={{
            root: classes.rootCheckbox,
            label: classes.radioLabelRoot
          }}
          radioColor="primary"
          onSelect={accountCurrencyCheckboxFieldHandler}
          dataTestId="accountCurrencies"
          clickHandled={true}
          data-testid="accountCurrencies"
        />
        <DisclaimerNote
          className={classes.noteWrapper}
          text={
            "You will get a separate account number for each currency you select. Note that only AED accounts are eligible for business debit card and cheque book."
          }
        />
      </div>
      <Field
        name="accountEmirateCity"
        path={"prospect.accountInfo.accountEmirateCity"}
        label="Emirate or City"
        placeholder="Emirate or City"
        datalistId="branchCity"
        component={SelectAutocomplete}
        isLoadDefaultValueFromStore={false}
      />
      <Field
        name="branchId"
        path={"prospect.accountInfo.branchId"}
        label="Branch"
        placeholder="Branch"
        datalistId="branchCity"
        component={SelectAutocomplete}
        filterOptions={options => filteredBranches(options)}
      />
      <div className={classes.questionareWrapper} data-testid="receiveInterestFieldWrapper">
        <label className={classes.sectionLabel}>
          {isIslamic
            ? "Do you want to earn profit on your account(s)?"
            : "Do you want to earn interest on your account(s)?"}
          <ContexualHelp
            title={
              "Get the most out of your money. Just maintain\n the minimum account balance to unlock\n competitive interest rates."
            }
            placement="right"
            isDisableHoverListener={false}
            classes={classes.infoIcon}
          >
            <HelpOutlineIcon className={classes.infoIcon} />
          </ContexualHelp>
        </label>
        <Field
          typeRadio
          options={yesNoOptions}
          name="receiveInterest"
          path={"prospect.accountInfo.receiveInterest"}
          component={InlineRadioGroup}
          customIcon={false}
          classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
          radioColor="primary"
          onChange={handleRecieveInterestChange}
        />
        <DisclaimerNote
          className={classes.noteWrapper}
          text={`Note: Only AED and USD currency accounts are eligible to earn ${
            isIslamic ? "profit" : "interest"
          }.`}
        />
      </div>
      <ConfirmDialog
        title={"Are you sure?"}
        isOpen={isOpen}
        handleConfirm={() => handleConfirmRemoveCurrency()}
        handleClose={() => setIsOpen(false)}
        message={
          "Unchecking this currency will remove it from your preferred currencies. Are you sure you want to proceed?"
        }
      />
    </div>
  );
};

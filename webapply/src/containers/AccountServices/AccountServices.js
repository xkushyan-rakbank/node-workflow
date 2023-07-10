import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import cx from "classnames";
import * as Yup from "yup";

import { formStepper } from "../../constants";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { NextStepButton } from "../../components/Buttons/NextStepButton";
import { BackLink } from "../../components/Buttons/BackLink";
import routes from "../../routes";
import { Accordion } from "../../components/Accordion/CustomAccordion";
import { ReactComponent as LetsGoGreen } from "../../assets/icons/letsGoGreenIcon.svg";
import {
  CheckboxGroup,
  AutoSaveField as Field,
  InlineRadioGroup,
  Input,
  SelectAutocomplete
} from "../../components/Form";
import { useStyles } from "./styled";
import {
  PreferredLanguageOptions,
  PreferredNotificationOptions,
  SinglyOptionList,
  yesNoAskMeLaterOptions,
  yesNoOptions
} from "../../constants/options";
import { updateProspect } from "../../store/actions/appConfig";
import { SelectServicePackage } from "./components/SelectServicePackage";
import { getApplicantEditedFullName } from "../../store/selectors/appConfig";
import { getRequiredMessage } from "../../utils/getValidationMessage";
import { MAX_DEBIT_CARD_NAME_LENGTH, MIN_DEBIT_CARD_NAME_LENGTH } from "../CompanyInfo/constants";
import { NAME_REGEX } from "../../utils/validation";

export const AccountServices = () => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  const dispatch = useDispatch();
  const classes = useStyles();
  const signatoryName = useSelector(getApplicantEditedFullName);

  const labelTextForGoGreenOption = (
    <span style={{ display: "flex", alignItems: "center" }}>
      <p style={{ margin: "0px" }}>
        Yes, let’s go green <span style={{ fontSize: "12px" }}>(no additional charge)</span>
      </p>
      <LetsGoGreen style={{ marginLeft: 4 }} />
    </span>
  );

  const labelTextForPreferPaper = (
    <p style={{ margin: "0px" }}>
      I prefer paper <span style={{ fontSize: "12px" }}>(monthly charges apply)</span>
    </p>
  );

  const YesNoListForRecieveStatementMode = [
    {
      code: "Yes",
      key: "Yes",
      value: true,
      label: labelTextForGoGreenOption
    },
    {
      code: "No",
      key: "No",
      value: false,
      label: labelTextForPreferPaper
    }
  ];

  const createAccountServiceRadioHandler = ({ values, setFieldValue }) => async event => {
    const value = JSON.parse(event.target.value);
    setFieldValue("statementsVia", value);
    if (value) {
      dispatch(
        updateProspect({
          "prospect.accountInfo.mailStatements": value,
          "prospect.accountInfo.eStatements": !value
        })
      );
    } else {
      dispatch(
        updateProspect({
          "prospect.accountInfo.eStatements": !value,
          "prospect.accountInfo.mailStatements": value
        })
      );
    }
  };

  const initialValues = {
    rakValuePackage: "",
    accountCurrency: "AED",
    accountEmirateCity: "",
    branchId: "",
    receiveInterest: false,
    signingPreferences: "singly",
    chequeBookApplied: true,
    accountwithoutChequebook: true,
    debitCardApplied: true,
    statementsVia: true,
    preferredLanguage: "EN",
    mobileInstructions: true,
    marketing: "yes",
    marketingChannel: "",
    nameOnDebitCard: "",
    surveys: true
  };

  const accountInfoValidation = Yup.object().shape({
    nameOnDebitCard: Yup.mixed().when("debitCardApplied", {
      is: debitCardApplied => debitCardApplied,
      then: Yup.string()
        .required(getRequiredMessage("Name"))
        .max(MAX_DEBIT_CARD_NAME_LENGTH, "Maximum ${max} characters allowed")
        .min(MIN_DEBIT_CARD_NAME_LENGTH, "Minimum ${max} characters required")
        .matches(NAME_REGEX, "Please remove any special character from your name")
    })
  });

  const selectRadioBoolean = ({ values, setFieldValue }) => event => {
    const value = JSON.parse(event.target.value);
    const name = event.target.name;
    setFieldValue(name, value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <SectionTitleWithInfo
          title={"Finally, let's customise your account"}
          info="Go ahead and select your preferences, from debit cards to extra services"
          smallInfo
        />
        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          validationSchema={accountInfoValidation}
        >
          {({ values, setFieldValue, ...props }) => {
            const accountServiceChangeHandler = createAccountServiceRadioHandler({
              values,
              setFieldValue
            });
            const radioChangeHandler = selectRadioBoolean({
              values,
              setFieldValue
            });
            return (
              <Form>
                <SelectServicePackage setFormFieldValue={setFieldValue} {...props} />
                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={"Preferences of product & services"}
                    id={"productAndServices"}
                    subTitle={"Lorem ipsum dolor sit amet."}
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                  >
                    <Field
                      name="accountCurrency"
                      path={"prospect.accountInfo.accountCurrency"}
                      label="Account currency"
                      placeholder="Account currency"
                      datalistId="accountCurrencies"
                      component={SelectAutocomplete}
                      disabled={true}
                    />
                    <Field
                      name="accountEmirateCity"
                      path={"prospect.accountInfo.accountEmirateCity"}
                      label="Emirate or city"
                      placeholder="Emirate or city"
                      datalistId="emirateCity"
                      component={SelectAutocomplete}
                    />
                    <Field
                      name="branch"
                      path={"prospect.accountInfo.branch"}
                      label="Branch"
                      placeholder="Branch"
                      datalistId="branchCity"
                      component={SelectAutocomplete}
                    />
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        Do you want to earn interest on this account?
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
                        onChange={accountServiceChangeHandler}
                      />
                    </div>
                  </Accordion>
                </div>
                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={"Preferences of authorizations"}
                    id={"authorizations"}
                    subTitle={"Lorem ipsum dolor sit amet."}
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                  >
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>Signing preferences</label>
                      <Field
                        typeRadio
                        options={SinglyOptionList}
                        name="signingPreferences"
                        path={"prospect.accountInfo.signingPreferences"}
                        disabled={true}
                        component={InlineRadioGroup}
                        customIcon={false}
                        classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                        radioColor="primary"
                        onChange={accountServiceChangeHandler}
                      />
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={cx(classes.sectionLabel, classes.sectionLabelWithInfo)}>
                        Do you want a chequebook for your company?
                        <span>Chequebook availability is subject to successful credit checks</span>
                      </label>
                      <Field
                        typeRadio
                        options={yesNoOptions}
                        name="chequeBookApplied"
                        path={"prospect.accountInfo.chequeBookApplied"}
                        component={InlineRadioGroup}
                        onChange={radioChangeHandler}
                        customIcon={false}
                        classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                        radioColor="primary"
                      />
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        Would you still like to open an account if you don't qualify for a
                        chequebook?
                      </label>
                      <Field
                        typeRadio
                        options={yesNoOptions}
                        name="accountwithoutChequebook"
                        path={"prospect.accountInfo.accountwithoutChequebook"}
                        component={InlineRadioGroup}
                        onChange={radioChangeHandler}
                        customIcon={false}
                        classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                        radioColor="primary"
                      />
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={cx(classes.sectionLabel, classes.sectionLabelWithInfo)}>
                        Would you like to apply for a business debit card for {signatoryName}?
                        <span>
                          You can get a card for yourself and/or other people in your company.
                          Business debit cards can only be issued for eligible AED accounts and will
                          be sent by courier to your designated mailing address
                        </span>
                      </label>
                      <Field
                        typeRadio
                        options={yesNoOptions}
                        name="debitCardApplied"
                        path={"prospect.accountInfo.debitCardApplied"}
                        component={InlineRadioGroup}
                        onChange={radioChangeHandler}
                        customIcon={false}
                        classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                        radioColor="primary"
                      />
                      {values.debitCardApplied && (
                        <Field
                          name="nameOnDebitCard"
                          label={"Name on the card"}
                          path={
                            "prospect.signatoryInfo[0].debitCardInfo.authSignatoryDetails.nameOnDebitCard"
                          }
                          placeholder={"Name on the card"}
                          InputProps={{
                            inputProps: { tabIndex: 1 }
                          }}
                          component={Input}
                          classes={{ formControlRoot: classes.customLabel }}
                        />
                      )}
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={cx(classes.sectionLabel, classes.sectionLabelWithInfo)}>
                        Please help us save the environment by recieving your statements through
                        e-mail
                        <span>Help us save the environment going paperless</span>
                      </label>
                      <Field
                        typeRadio
                        options={YesNoListForRecieveStatementMode}
                        name="statementsVia"
                        component={InlineRadioGroup}
                        customIcon={false}
                        classes={{
                          root: classes.radioButtonRoot,
                          label: classes.radioLabelRoot,
                          parent: classes.radioConatiner
                        }}
                        radioColor={!values.statementsVia ? "fff" : "#00CA2C"}
                        onChange={accountServiceChangeHandler}
                      />
                    </div>
                  </Accordion>
                </div>
                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={"Preferences of communication"}
                    id={"communication"}
                    subTitle={"Lorem ipsum dolor sit amet."}
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                  >
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>Select your preferred language</label>
                      <Field
                        typeRadio
                        options={PreferredLanguageOptions}
                        name="preferredLanguage"
                        path={"prospect.accountInfo.preferredLanguage"}
                        component={InlineRadioGroup}
                        customIcon={false}
                        classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                        radioColor="primary"
                        onChange={accountServiceChangeHandler}
                      />
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        Would you like to get transaction notifications on your mobile?
                      </label>
                      <Field
                        typeRadio
                        options={yesNoOptions}
                        name="mobileInstructions"
                        path={"prospect.channelServicesInfo.mobileInstructions"}
                        component={InlineRadioGroup}
                        customIcon={false}
                        classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                        radioColor="primary"
                        onChange={accountServiceChangeHandler}
                      />
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        Would you like to be the first to hear about the latest offers (including
                        from RAKBANK’s authorised third parties)?
                      </label>
                      <Field
                        typeRadio
                        options={yesNoAskMeLaterOptions}
                        name="marketing"
                        path={"prospect.channelServicesInfo.marketing"}
                        component={InlineRadioGroup}
                        customIcon={false}
                        classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                        radioColor="primary"
                        onChange={accountServiceChangeHandler}
                      />
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>Receive notifications via:</label>
                      <Field
                        name="marketingChannel"
                        path={"prospect.channelServicesInfo.marketingChannel"}
                        options={PreferredNotificationOptions}
                        component={CheckboxGroup}
                        customIcon={true}
                        classes={{
                          label: classes.radioLabelRoot
                        }}
                        isInlineStyle={false}
                        radioColor="primary"
                      />
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        Can we contact you for surveys or feedback, either directly or through a
                        third party?
                      </label>
                      <Field
                        typeRadio
                        options={yesNoOptions}
                        name="surveys"
                        path={"prospect.channelServicesInfo.surveys"}
                        component={InlineRadioGroup}
                        customIcon={false}
                        classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                        radioColor="primary"
                        onChange={accountServiceChangeHandler}
                      />
                    </div>
                  </Accordion>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="linkContainer">
        <BackLink path={routes.additionalInfoComponent} />
        <NextStepButton label="Next" justify="flex-end" disabled={false} />
      </div>
    </div>
  );
};

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { accountNames, formStepper } from "../../constants";
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
import { getAccountInfo } from "../../store/selectors/appConfig";
import { getRequiredMessage } from "../../utils/getValidationMessage";
import { MAX_DEBIT_CARD_NAME_LENGTH, MIN_DEBIT_CARD_NAME_LENGTH } from "../CompanyInfo/constants";
import { NAME_REGEX } from "../../utils/validation";
import {
  getAccountType,
  getDatalist,
  getIsIslamicBanking,
  getOrganizationInfo
} from "../../store/selectors/appConfig";
import { ContexualHelp } from "../../components/Notifications";

export const AccountServices = () => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  const dispatch = useDispatch();
  const classes = useStyles();

  const { licenseIssuingAuthority } = useSelector(getOrganizationInfo);
  const {
    emirate: emiratesList,
    licenseIssuingAuthority: licenseIssuingAuthorityList,
    TLIAEmirate: TLIAEmiratesList
  } = useSelector(getDatalist);
  const isIslamic = useSelector(getIsIslamicBanking);
  const accountType = useSelector(getAccountType);

  const accountInfo = useSelector(getAccountInfo);

  const statementsVia = accountInfo.mailStatements;

  const accountEmirateCity = accountInfo.accountEmirateCity;

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
      I prefer paper <span style={{ fontSize: "12px" }}>(monthly charge of AED [xx])</span>
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

  const matchedEmirateList = emiratesList?.filter(
    emirate =>
      TLIAEmiratesList?.find(
        ({ value }) =>
          value ===
          licenseIssuingAuthorityList?.find(({ code }) => code === licenseIssuingAuthority)?.value
      )?.displayText === emirate.value
  );

  const initialValues = {
    rakValuePackage: "",
    accountCurrency: "AED",
    accountEmirateCity:
      accountEmirateCity || (matchedEmirateList && matchedEmirateList[0]?.value) || "",
    branchId: "",
    receiveInterest: "",
    signingPreferences: "singly",
    chequeBookApplied: "",
    accountwithoutChequebook: "true",
    debitCardApplied: true,
    statementsVia,
    preferredLanguage: "",
    mobileInstructions: "",
    marketing: "",
    marketingChannel: "",
    nameOnDebitCard: "",
    surveys: ""
  };

  const accountInfoValidation = Yup.object().shape({
    nameOnDebitCard: Yup.mixed().when("debitCardApplied", {
      is: debitCardApplied => debitCardApplied,
      then: Yup.string()
        .required(getRequiredMessage("Name"))
        .max(MAX_DEBIT_CARD_NAME_LENGTH, "Maximum ${max} characters allowed")
        .min(MIN_DEBIT_CARD_NAME_LENGTH, "Minimum ${max} characters required")
        .matches(NAME_REGEX, "Please remove any special character from your name")
    }),
    accountCurrency: Yup.string().required(getRequiredMessage("Account currency")),
    accountEmirateCity: Yup.string().required(getRequiredMessage("Emirate or city")),
    branchId: Yup.string().required(getRequiredMessage("Branch"))
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
          title={"Now for the finishing touches"}
          info="Set up your account preferences, from packages to communications."
          smallInfo
        />
        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          validationSchema={accountInfoValidation}
          validateOnChange={true}
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
                <SelectServicePackage
                  setFormFieldValue={setFieldValue}
                  isRakStarter={accountType === accountNames.starter}
                  {...props}
                />

                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={"Choose how you want your account set up"}
                    id={"productAndServices"}
                    subTitle={
                      "Check your account’s currency and select the branch that’s most convenient for you."
                    }
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
                      isLoadDefaultValueFromStore={false}
                    />
                    <Field
                      name="branchId"
                      path={"prospect.accountInfo.branch"}
                      label="Branch"
                      placeholder="Branch"
                      datalistId="branchCity"
                      component={SelectAutocomplete}
                      filterOptions={options => {
                        return (
                          options.find(
                            item =>
                              item.displayText ===
                              emiratesList.find(item => item.value === values.accountEmirateCity)
                                ?.displayText
                          )?.subGroup || []
                        );
                      }}
                    />
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        {isIslamic
                          ? "Do you want to earn profit on your account?"
                          : "Do you want to earn interest on this account?"}
                        <ContexualHelp
                          title={
                            "Get the most out of your money. Just maintain\n the minimum account balance to unlock\n competitive interest rates."
                          }
                          placement="right"
                          isDisableHoverListener={false}
                          classes={classes.infoIcon}
                        >
                          <ErrorOutlineIcon className={classes.infoIcon} />
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
                        onChange={radioChangeHandler}
                      />
                    </div>
                  </Accordion>
                </div>
                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={"Specify how you want to use your account"}
                    id={"authorizations"}
                    subTitle={"Customise your account by sharing your preferences for features and services."}
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                  >
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        When signing for the account, whose signature is needed?
                      </label>
                      <Field
                        typeRadio
                        options={SinglyOptionList}
                        name="signingPreferences"
                        path={"prospect.accountInfo.signingPreferences"}
                        component={InlineRadioGroup}
                        customIcon={false}
                        classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                        radioColor="primary"
                        onChange={radioChangeHandler}
                      />
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        Would you like a company chequebook?
                        <ContexualHelp
                          title={
                            "Chequebook availability is subject to\n successful credit checks."
                          }
                          placement="right"
                          isDisableHoverListener={false}
                          classes={classes.infoIcon}
                        >
                          <ErrorOutlineIcon className={classes.infoIcon} />
                        </ContexualHelp>
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
                    <div className={classes.questionareWrapper} style={{ display: "none" }}>
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
                      <label className={classes.sectionLabel}>
                        Would you like to apply for a business debit card?
                        <ContexualHelp
                          title={
                            "You can get a card for yourself and/or\n other people in your company. Business\n debit cards can only be issued for\n eligible AED accounts and will be sent\n by courier to your designated mailing\n address."
                          }
                          placement="right"
                          isDisableHoverListener={false}
                          classes={classes.infoIcon}
                        >
                          <ErrorOutlineIcon className={classes.infoIcon} />
                        </ContexualHelp>
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
                      <label className={classes.sectionLabel}>
                        Would you like to go paperless and help save the environment?
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
                    title={"Manage how you want to be contacted"}
                    id={"communication"}
                    subTitle={
                      "Stay connected with RAKBANK and get access to personalised updates and offers. "
                    }
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                  >
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>Which language do you prefer?</label>
                      <Field
                        typeRadio
                        options={PreferredLanguageOptions}
                        name="preferredLanguage"
                        path={"prospect.accountInfo.preferredLanguage"}
                        component={InlineRadioGroup}
                        customIcon={false}
                        classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                        radioColor="primary"
                        onChange={radioChangeHandler}
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
                        onChange={radioChangeHandler}
                      />
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        Would you like to hear about the latest offers from RAKBANK and authorised
                        third parties?
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
                        onChange={radioChangeHandler}
                      />
                    </div>
                    {values.marketing === "yes" && (
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
                    )}
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        Would you be open to participating in surveys and feedback?
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
                        onChange={radioChangeHandler}
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

import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import { formStepper, NEXT } from "../../constants";
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
import { getAccountInfo, getRakValuePackage } from "../../store/selectors/appConfig";
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
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { useViewId } from "../../utils/useViewId";
import { ConfirmationDialog } from "./components/confirmationModal";
import { Footer } from "../../components/Footer";

export const AccountServices = ({ sendProspectToAPI }) => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  const dispatch = useDispatch();
  const classes = useStyles();
  useViewId(true);

  const pushHistory = useTrackingHistory();

  const { licenseIssuingAuthority } = useSelector(getOrganizationInfo);
  const {
    emirate: emiratesList,
    licenseIssuingAuthority: licenseIssuingAuthorityList,
    TLIAEmirate: TLIAEmiratesList
  } = useSelector(getDatalist);
  const isIslamic = useSelector(getIsIslamicBanking);
  const accountType = useSelector(getAccountType);

  const accountInfo = useSelector(getAccountInfo);
  const rakValuePackage = useSelector(getRakValuePackage);

  const statementsVia = accountInfo.eStatements ? true : false;

  const accountEmirateCity = accountInfo.accountEmirateCity;

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  useEffect(() => {
    dispatch(updateProspect({ "prospect.accountInfo.accountType": accountType }));
  }, [accountType]);

  useEffect(() => {
    dispatch(updateProspect({ "prospect.signatoryInfo[0].debitCardInfo.issueDebitCard": true }));
  }, []);

  const labelTextForGoGreenOption = (
    <span style={{ display: "flex", alignItems: "center" }}>
      <p style={{ margin: "0px" }}>
        Yes, let’s go green <span style={{ fontSize: "12px" }}>(free)</span>
      </p>
      <LetsGoGreen style={{ marginLeft: 4 }} />
    </span>
  );

  const labelTextForPreferPaper = (
    <p style={{ margin: "0px" }}>
      I prefer paper <span style={{ fontSize: "12px" }}>(AED [xx] per month)</span>
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
          "prospect.accountInfo.mailStatements": !value,
          "prospect.accountInfo.eStatements": value
        })
      );
    } else {
      dispatch(
        updateProspect({
          "prospect.accountInfo.eStatements": value,
          "prospect.accountInfo.mailStatements": !value
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
    debitCardApplied: true,
    statementsVia,
    preferredLanguage: "",
    mobileInstructions: "",
    marketing: "",
    marketingChannel: [],
    nameOnDebitCard: "",
    surveys: ""
  };

  const accountInfoValidation = Yup.object().shape({
    debitCardApplied: Yup.boolean().required("This field is required"),
    nameOnDebitCard: Yup.string().when("debitCardApplied", {
      is: debitCardApplied => debitCardApplied,
      then: Yup.string()
        .required(getRequiredMessage("Name"))
        .max(MAX_DEBIT_CARD_NAME_LENGTH, "Maximum ${max} characters allowed")
        .min(MIN_DEBIT_CARD_NAME_LENGTH, "Minimum ${max} characters required")
        .matches(NAME_REGEX, "Please remove any special character from your name")
    }),
    branchId: Yup.string().required(getRequiredMessage("Branch")),
    accountEmirateCity: Yup.string().required(getRequiredMessage("Emirate or city")),
    receiveInterest: Yup.string().required("This field is required"),
    signingPreferences: Yup.string().required("This field is required"),
    chequeBookApplied: Yup.string().required("This field is required"),
    statementsVia: Yup.string().required("This field is required"),
    preferredLanguage: Yup.string().required("This field is required"),
    mobileInstructions: Yup.string().required("This field is required"),
    marketing: Yup.string().required("This field is required"),
    marketingChannel: Yup.array().when("marketing", {
      is: "yes",
      then: Yup.array().required(getRequiredMessage("Marketing Channel"))
    }),
    surveys: Yup.string().required("This field is required")
  });

  const selectRadioBoolean = ({ values, setFieldValue }) => async event => {
    const value = JSON.parse(event.target.value);
    const name = event.target.name;
    await setFieldValue(name, value);
    if (name === "marketing") {
      const marketingChannel =
        values.marketingChannel?.length > 0 ? values["marketingChannel"] : undefined;
      await setFieldValue("marketingChannel", marketingChannel);
    }
    if (name === "debitCardApplied") {
      dispatch(updateProspect({ "prospect.signatoryInfo[0].debitCardInfo.issueDebitCard": value }));
    }
  };

  const handleClickNextStep = useCallback(
    proceedWithoutAddon => {
      if (!rakValuePackage && !proceedWithoutAddon) {
        setShowConfirmationPopup(true);
        return;
      }
      setShowConfirmationPopup(false);
      setIsLoading(true);
      return sendProspectToAPI(NEXT).then(
        isScreeningError => {
          if (!isScreeningError) pushHistory(routes.reviewAndSubmit, true);
        },
        () => setIsLoading(false)
      );
    },
    [pushHistory, sendProspectToAPI]
  );

  const handleGoToPackage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowConfirmationPopup(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <ConfirmationDialog
          title={"Sure you don't want an add-on?"}
          message={
            "Upgrading to a RAKvalue package can save you tons of time and money, making it that much easier to run your business."
          }
          handleContinueWithoutAddon={() => handleClickNextStep(true)}
          handleGoToPackage={handleGoToPackage}
          handleClose={() => setShowConfirmationPopup(false)}
          isOpen={showConfirmationPopup}
        />
        <SectionTitleWithInfo
          title={"Now for the finishing touches"}
          info="Set up your account preferences."
          smallInfo
        />
        <Formik
          initialValues={initialValues}
          onSubmit={() => handleClickNextStep(false)}
          validationSchema={accountInfoValidation}
          validateOnChange={true}
          validateOnMount={true}
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
            const isValidAccountInfoValidation = accountInfoValidation.isValidSync(values);
            return (
              <Form>
                <SelectServicePackage setFormFieldValue={setFieldValue} {...props} />

                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={"Preferences"}
                    showHelperText={
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
                      filterOptions={options =>
                        options
                          .filter(city => city.code === values.accountEmirateCity)
                          .reduce(
                            (acc, curr) => (curr.subGroup ? [...acc, ...curr.subGroup] : acc),
                            []
                          )
                      }
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
                        onChange={radioChangeHandler}
                      />
                    </div>
                  </Accordion>
                </div>
                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={"Account settings"}
                    id={"authorizations"}
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                    showHelperText={
                      "Customise your account by sharing your preferences for features and services."
                    }
                  >
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        Who has signing rights for this account?
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
                          <HelpOutlineIcon className={classes.infoIcon} />
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
                          <HelpOutlineIcon className={classes.infoIcon} />
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
                          label={"Name on card"}
                          path={
                            "prospect.signatoryInfo[0].debitCardInfo.authSignatoryDetails.nameOnDebitCard"
                          }
                          placeholder={"Name on card"}
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
                    title={"Communication preferences"}
                    id={"communication"}
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                    showHelperText={
                      "Stay connected with RAKBANK and get access to personalised updates and offers."
                    }
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
                <Footer>
                  <BackLink path={routes.additionalInfoComponent} isTypeButton={true} />
                  <NextStepButton
                    label="Next"
                    justify="flex-end"
                    disabled={!isValidAccountInfoValidation}
                    isDisplayLoader={isLoading}
                  />
                </Footer>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

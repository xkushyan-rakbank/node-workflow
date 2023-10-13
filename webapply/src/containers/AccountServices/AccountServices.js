import React, { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, Field as FormikField } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import { formStepper, NEXT, TL_COI_FILE_SIZE } from "../../constants";
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
  yesNoMobileInstructionsOptions,
  yesNoOptions
} from "../../constants/options";
import { updateProspect } from "../../store/actions/appConfig";
import { SelectServicePackage } from "./components/SelectServicePackage";
import {
  getAccordionStatuses,
  getAccountInfo,
  getApplicantInfo,
  getDocuments,
  getKycAnnexureDetails,
  getProspect,
  getRakValuePackage,
  getSignatories
} from "../../store/selectors/appConfig";
import {
  getInvalidMessage,
  getRequiredMessage,
  getROInvalidMessage
} from "../../utils/getValidationMessage";
import { MAX_DEBIT_CARD_NAME_LENGTH, MIN_DEBIT_CARD_NAME_LENGTH } from "../CompanyInfo/constants";
import { NAME_REGEX, NUMBER_REGEX, PARTNER_CODE_REGEX } from "../../utils/validation";
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
import { KycAnnexureDetails } from "./components/KycAnnexureDetails";
import { checkLoginStatus, getLoginResponse } from "../../store/selectors/loginSelector";
import { scrollToDOMNode } from "../../components/VerticalPagination";
import { initDocumentUpload } from "../../store/actions/uploadDocuments";
import { useFindDocument } from "../../utils/useFindDocument";
import { DisclaimerNote } from "../../components/InfoNote/DisclaimerNote";
const marketingChannelSelectionHandlers = {
  "all the above": ({ isSelected }) =>
    isSelected ? [["Email", "SMS", "Call", "all the above"], ["Email", "SMS", "Call"]] : [[], []],
  no: ({ isSelected }) => (isSelected ? [["no"], ["no"]] : [[], []]),
  default: ({ option, isSelected, currentValues }) => {
    const newValues = isSelected
      ? [...currentValues.filter(option => option !== "no"), option] //remove "no", on selection of any channel
      : currentValues.filter(item => item !== option);
    const newMarketingOptions = [...newValues];

    // if all marketing channels(Email, Call, SMS) are selected, select all of the above option
    if (newValues.length === 3) {
      newMarketingOptions.push("all the above");
    }
    return [newMarketingOptions, newValues];
  }
};

export const AccountServices = ({ sendProspectToAPI }) => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  const dispatch = useDispatch();
  const classes = useStyles();
  useViewId(true);

  let inCompleteAccordionList = [];

  const pushHistory = useTrackingHistory();

  const refToTopOfAccountService = useRef(null);
  const isAgent = useSelector(checkLoginStatus);

  const { licenseIssuingAuthority } = useSelector(getOrganizationInfo);
  const {
    licenseIssuingAuthority: licenseIssuingAuthorityList,
    TLIAEmirate: TLIAEmiratesList,
    branchCity: branchCityList
  } = useSelector(getDatalist);
  const isIslamic = useSelector(getIsIslamicBanking);
  const accountType = useSelector(getAccountType);

  const accountInfo = useSelector(getAccountInfo);
  const rakValuePackage = useSelector(getRakValuePackage);

  const signatoryNameData = useSelector(getSignatories)[0]?.editedFullName;
  const allianceCodeData = useSelector(getApplicantInfo).allianceCode;
  const roCodeData = useSelector(getLoginResponse).roCode;
  const isROInitited = useSelector(getApplicantInfo).isROInitited;

  const statementsVia = accountInfo.eStatements ? true : false;

  const accountEmirateCity = accountInfo.accountEmirateCity;
  const marketingChannelList = useSelector(getProspect).channelServicesInfo?.marketingChannel;

  const accordionStatuses = useSelector(getAccordionStatuses);
  const { allianceCode } = JSON.parse(accordionStatuses);

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const formRef = useRef(null);
  const packageRef = useRef(null);
  const servicePreferenceRef = useRef(null);
  const authorizationRef = useRef(null);
  const communicationRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    dispatch(updateProspect({ "prospect.accountInfo.accountType": accountType }));
  }, [accountType]);

  useEffect(() => {
    dispatch(initDocumentUpload());
    dispatch(updateProspect({ "prospect.signatoryInfo[0].debitCardInfo.issueDebitCard": true }));
    packageRef.current.click();
  }, []);

  const labelTextForGoGreenOption = (
    <span style={{ display: "flex", alignItems: "center" }}>
      <p style={{ margin: "0px" }}>
        Yes, let’s go green <span style={{ fontSize: "12px" }}>(free)</span>
      </p>
      <LetsGoGreen style={{ marginLeft: 4 }} />
    </span>
  );

  const labelTextForPreferPaper = <p style={{ margin: "0px" }}>No, I prefer paper</p>;

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

  const matchedEmirateList = branchCityList?.filter(
    emirate =>
      TLIAEmiratesList?.find(
        ({ value }) =>
          value ===
          licenseIssuingAuthorityList?.find(({ code }) => code === licenseIssuingAuthority)?.value
      )?.displayText === emirate.value
  );

  const kycAnnexureDocuments = useSelector(getDocuments).kycAnnexureDocuments;
  const kycAnnexureDetails = useSelector(getKycAnnexureDetails);
  const signatoryEIDinfoReportDocs = useFindDocument(
    kycAnnexureDocuments,
    "signatoryEIDinfoReport"
  );

  useEffect(() => {
    if (kycAnnexureDetails && kycAnnexureDetails.visitDetails) {
      kycAnnexureDetails.visitDetails.forEach((item, index) => {
        const sisterCompanyDoc = kycAnnexureDocuments?.filter(doc => {
          let documentKey = `visitDetails[${index}].sisterCompanyTradeLicense-${index}`;
          return doc.documentKey.includes(documentKey);
        });
        const sisDoc = sisterCompanyDoc && sisterCompanyDoc[0];
        if (sisDoc) {
          sisterCompanyDoc[0]["documentKey"] = sisterCompanyDoc[0]?.fileName;
        }
        item.sisterCompanyTradeLicense = sisDoc;
      });
    }
  }, []);

  const getInitialSelectedMarketingChannelOptions = useMemo(() => {
    const checkIfAllMarketingChannelOptionsChecked = ["Email", "SMS", "Call"].every(option => {
      return marketingChannelList ? marketingChannelList.includes(option) : false;
    });
    if (checkIfAllMarketingChannelOptionsChecked) {
      return ["Email", "SMS", "Call", "all the above"];
    } else {
      return marketingChannelList;
    }
  }, []);

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
    marketingChannelOptions: getInitialSelectedMarketingChannelOptions || [],
    nameOnDebitCard: "",
    surveys: "",
    companyCifId: "",
    retailCifId: "",
    workItemNumber: "",
    leadNumber: "",
    sourcingCode: "",
    allianceCode: allianceCodeData || "",
    roCode: roCodeData || "",
    skillBasedCategory: "",
    roName: "",
    businessModel: "",
    signatoryName: signatoryNameData || "",
    ownerAdditionalInfo: "",
    generalRemarksRO: "",
    generalRemarksRM: "",
    audioVideoKycVerification: "NA",
    verificationRemarksRM: "",
    verificationDetails: (kycAnnexureDetails?.verificationDetails?.length > 0 &&
      kycAnnexureDetails?.verificationDetails) || [
      {
        kycVerificationDate: "",
        kycVerificationTime: "",
        verificationConductedBy: "",
        verificationStatus: "SATF",
        verificationRemarks: ""
      }
    ],
    signatoryEIDinfo: "NA",
    signatoryEIDinfoReport: signatoryEIDinfoReportDocs[0] || "",
    isVisitConducted: "NA",
    visitDetails: (kycAnnexureDetails?.visitDetails?.length > 0 &&
      kycAnnexureDetails?.visitDetails) || [
      {
        kycVisitDate: "",
        kycVisitTime: "",
        visitConductedBy: "",
        visitConductedAt: "",
        noticeToCounterfeit: "",
        sisterCompanyTradeLicense: ""
      }
    ]
  };

  const accountInfoValidation = Yup.object().shape({
    debitCardApplied: Yup.boolean().required("This field is required"),
    nameOnDebitCard: Yup.string().when("debitCardApplied", {
      is: debitCardApplied => debitCardApplied,
      then: Yup.string()
        .required(getRequiredMessage("Name"))
        .max(MAX_DEBIT_CARD_NAME_LENGTH, "Maximum ${max} characters allowed")
        .min(MIN_DEBIT_CARD_NAME_LENGTH, "Minimum ${max} characters required")
        .matches(NAME_REGEX, getInvalidMessage("name"))
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
    marketingChannelOptions: Yup.array().required(getRequiredMessage("Marketing Channel")),
    surveys: Yup.string().required("This field is required"),
    allianceCode: Yup.string()
      .nullable()
      .max(50, "Maximum 50 characters allowed")
      .matches(PARTNER_CODE_REGEX, getInvalidMessage("Partner Code")),
    roCode: Yup.string()
      .nullable()
      .max(6, "Maximum 6 characters allowed")
      .matches(NUMBER_REGEX, getROInvalidMessage)
  });

  const kycAnnexureSchema = accountInfoValidation.shape({
    skillBasedCategory: Yup.string()
      .nullable()
      .notRequired(),
    businessModel: Yup.string()
      .nullable()
      .notRequired()
      .matches(/^[a-zA-Z0-9.\-\\\s%]+$/, getInvalidMessage("Business model"))
      .max(5000, "Business model is too long. Please enter upto 5000 characters."),
    signatoryName: Yup.string()
      .nullable()
      .notRequired(),
    ownerAdditionalInfo: Yup.string()
      .nullable()
      .notRequired()
      .matches(/^[a-zA-Z0-9.\-\\\s%]+$/, getInvalidMessage("Additional Information of owner"))
      .max(5000, "Additional Information of owner is too long. Please enter upto 5000 characters."),
    generalRemarksRO: Yup.string()
      .nullable()
      .notRequired()
      .matches(/^[a-zA-Z0-9.\-\\\s%]+$/, getInvalidMessage("General remarks (RO)"))
      .max(5000, "General remarks (RO) is too long. Please enter upto 5000 characters."),
    generalRemarksRM: Yup.string()
      .nullable()
      .notRequired()
      .matches(/^[a-zA-Z0-9.\-\\\s%]+$/, getInvalidMessage("General remarks (RM)"))
      .max(5000, "General remarks (RM) is too long. Please enter upto 5000 characters."),
    verificationRemarksRM: Yup.string()
      .nullable()
      .notRequired()
      .matches(/^[a-zA-Z0-9.\-\\\s%]+$/, getInvalidMessage("Remarks on verification (RM)"))
      .max(5000, "Remarks on verification (RM) is too long. Please enter upto 5000 characters."),
    isVisitConducted: Yup.string()
      .nullable()
      .notRequired(),
    verificationDetails: Yup.array().of(
      Yup.object().shape({
        verificationStatus: Yup.string(),
        verificationRemarks: Yup.string()
          .nullable()
          .notRequired()
          // eslint-disable-next-line no-template-curly-in-string
          .max(5000, "Maximum ${max} characters allowed")
          .matches(/^[a-zA-Z0-9.\-\\\s%]+$/, getInvalidMessage("Verification remarks"))
      })
    ),
    signatoryEIDinfo: Yup.string()
      .nullable()
      .notRequired(),
    signatoryEIDinfoReport: Yup.mixed().test("fileSize", "The file is too large", file => {
      if (file) {
        return (
          file.fileSize >= TL_COI_FILE_SIZE.minSize && file.fileSize <= TL_COI_FILE_SIZE.maxSize
        );
      } else {
        return true;
      }
    }),
    visitDetails: Yup.array().of(
      Yup.object().shape({
        sisterCompanyTradeLicense: Yup.mixed().test("fileSize", "The file is too large", file => {
          if (file) {
            return (
              file.fileSize >= TL_COI_FILE_SIZE.minSize && file.fileSize <= TL_COI_FILE_SIZE.maxSize
            );
          } else {
            return true;
          }
        })
      })
    )
  });
  const selectRadioBoolean = ({ values, setFieldValue }) => async event => {
    const value = JSON.parse(event.target.value);
    const name = event.target.name;
    await setFieldValue(name, value);
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

  const handleGoToPackage = event => {
    setShowConfirmationPopup(false);
    event.preventDefault();
    let isPackageAccordionOpen = packageRef?.current.getAttribute("aria-expanded") === "true";

    if (!isPackageAccordionOpen) {
      packageRef.current.click();
    }
    scrollToDOMNode(refToTopOfAccountService);
  };

  const accordionTitle = title => <span className={classes.accordionTitle}>{title}</span>;

  const marketingChannelCheckboxHandler = ({ values, setFieldValue }) => async event => {
    const value = event.target.value;
    const valuesToSet = (marketingChannelSelectionHandlers[value] ||
      marketingChannelSelectionHandlers.default)({
      option: value,
      isSelected: event.target.checked,
      currentValues: marketingChannelList
    });
    setFieldValue("marketingChannelOptions", valuesToSet[0]);
    dispatch(
      updateProspect({
        "prospect.channelServicesInfo.marketingChannel": valuesToSet[1]
      })
    );
  };

  const handleFormAcordions = (accordionRef, isIncomplete) => {
    let isAccordionOpen = accordionRef?.current.getAttribute("aria-expanded") === "true";

    if (isIncomplete && !isAccordionOpen) {
      accordionRef.current.click();
    }
    inCompleteAccordionList.length > 0 &&
      inCompleteAccordionList[0].parentNode.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleNextClickAction = async () => {
    const validatedFormFields = await formRef.current.validateForm();
    try {
      const servicePreferenceValidation =
        validatedFormFields.hasOwnProperty("branchId") ||
        validatedFormFields.hasOwnProperty("accountEmirateCity") ||
        validatedFormFields.hasOwnProperty("receiveInterest");

      const authorizationValidation =
        validatedFormFields.hasOwnProperty("chequeBookApplied") ||
        validatedFormFields.hasOwnProperty("nameOnDebitCard");

      const communicationValidation =
        validatedFormFields.hasOwnProperty("marketing") ||
        validatedFormFields.hasOwnProperty("mobileInstructions") ||
        validatedFormFields.hasOwnProperty("preferredLanguage") ||
        validatedFormFields.hasOwnProperty("surveys");

      let forms = {
        servicePrerences: {
          accordionRef: servicePreferenceRef,
          isIncomplete: servicePreferenceValidation
        },
        authorization: {
          accordionRef: authorizationRef,
          isIncomplete: authorizationValidation
        },
        communication: {
          accordionRef: communicationRef,
          isIncomplete: communicationValidation
        }
      };
      Object.keys(forms).forEach(formName => {
        const { accordionRef, isIncomplete } = forms[formName];
        handleFormAcordions(accordionRef, isIncomplete);
        if (isIncomplete && inCompleteAccordionList.indexOf(accordionRef.current) === -1) {
          inCompleteAccordionList.push(accordionRef.current);
        }
      });
    } catch (validationError) {
      // console.error(validationError);
    }
  };

  return (
    <div className={classes.container} ref={refToTopOfAccountService}>
      <div className={classes.section}>
        <ConfirmationDialog
          title={"Sure you don't want an add-on?"}
          message={
            "Upgrading to a RAKvalue package can save you tons of time and money, making it that much easier to run your business."
          }
          handleContinueWithoutAddon={() => handleClickNextStep(true)}
          handleGoToPackage={event => handleGoToPackage(event)}
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
          validationSchema={isAgent ? kycAnnexureSchema : accountInfoValidation}
          validateOnChange={true}
          validateOnMount={true}
          innerRef={formRef}
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
            const marketingChannelCheckboxFieldHandler = marketingChannelCheckboxHandler({
              values,
              setFieldValue
            });

            return (
              <Form>
                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={accordionTitle("Select your package")}
                    id={"isSelectPackage"}
                    expandedDescription={
                      "Simplify your banking with an optional package that offers convenience and perks for your business."
                    }
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                    accordionRef={packageRef}
                  >
                    <SelectServicePackage setFormFieldValue={setFieldValue} {...props} />
                  </Accordion>
                </div>

                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={accordionTitle("Service preferences")}
                    expandedDescription={
                      "Check your account’s currency and select the branch that’s most convenient for you."
                    }
                    id={"preferences"}
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                    accordionRef={servicePreferenceRef}
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
                    title={accordionTitle("Authorisation preferences")}
                    id={"authorizations"}
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                    expandedDescription={
                      "Customise your account by sharing your preferences for features and services."
                    }
                    accordionRef={authorizationRef}
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
                            inputProps: { tabIndex: 1, maxLength: 19 }
                          }}
                          component={Input}
                          classes={{ formControlRoot: classes.customLabel }}
                        />
                      )}
                    </div>
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        Would you like to receive your account statements online? It’s a small step
                        towards a greener planet.
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
                        radioColor={!values.statementsVia ? "primary" : "#00CA2C"}
                        onChange={accountServiceChangeHandler}
                      />
                    </div>
                  </Accordion>
                </div>
                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={accordionTitle("Communication preferences")}
                    id={"communication"}
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails
                    }}
                    expandedDescription={
                      "Stay connected with RAKBANK and get access to personalised updates and offers."
                    }
                    accordionRef={communicationRef}
                  >
                    <div className={classes.questionareWrapper}>
                      <label className={classes.sectionLabel}>
                        What language would you prefer for RAKBANK communications?
                      </label>
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
                        You'll automatically get account-related messages (e.g. transactions,
                        service requests, important notifications) by SMS. Would you also like to
                        get them by email?
                      </label>
                      <Field
                        typeRadio
                        options={yesNoMobileInstructionsOptions}
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
                        Unlock unbeatable personalised offers! How do you want to receive your
                        exclusive deals, great discounts, superior cashback promotions, and unique
                        preferential rates?
                      </label>
                      <FormikField
                        name="marketingChannelOptions"
                        options={PreferredNotificationOptions}
                        component={CheckboxGroup}
                        customIcon={true}
                        classes={{
                          label: classes.radioLabelRoot
                        }}
                        isInlineStyle={false}
                        radioColor="primary"
                        onSelect={marketingChannelCheckboxFieldHandler}
                        clickHandled={true}
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
                        onChange={radioChangeHandler}
                      />
                    </div>
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
                    <DisclaimerNote
                      text={
                        "Any service updates you make, including your signed documents and attachments, will be sent to your registered email."
                      }
                    />
                  </Accordion>
                </div>
                <div className={classes.packageSelectionWrapper}>
                  <Accordion
                    title={accordionTitle("Code")}
                    id={"codesBankUse"}
                    expandedDescription={"For bank use only"}
                    classes={{
                      accordionRoot: classes.accountServiceAccordionRoot,
                      accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                      accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                      accordionDetails: classes.accordionDetails,
                      accordionSummaryRoot: classes.accountServiceAccordionSummaryRoot
                    }}
                    accordionRef={codeRef}
                  >
                    <Grid container spacing={3} className={classes.roCodeWrapper}>
                      <Grid item sm={6} xs={12}>
                        <label className={classes.outsideLabel}>
                          Agent code (optional)
                          <ContexualHelp
                            title={
                              "Enter the Agent code of the Bank staff whom you are in touch with"
                            }
                            placement="right"
                            isDisableHoverListener={false}
                          >
                            <HelpOutlineIcon className={classes.helperIcon} />
                          </ContexualHelp>
                        </label>
                        <Field
                          name="roCode"
                          path="prospect.applicantInfo.roCode"
                          label=""
                          component={Input}
                          disabled={isROInitited}
                          InputProps={{
                            inputProps: { tabIndex: 0, maxLength: 6 }
                          }}
                          classes={{
                            formControlRoot: classes.roCodeFormControl,
                            input: classes.inputWithoutLabel
                          }}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <label className={classes.outsideLabel}>
                          Partner code (optional)
                          <ContexualHelp
                            title={
                              "If you were referred by one of our Partners, enter the code shared by them"
                            }
                            placement="bottom"
                            isDisableHoverListener={false}
                          >
                            <HelpOutlineIcon className={classes.helperIcon} />
                          </ContexualHelp>
                        </label>
                        <Field
                          name="allianceCode"
                          path={"prospect.applicantInfo.allianceCode"}
                          component={Input}
                          disabled={isROInitited && allianceCode}
                          InputProps={{
                            inputProps: { tabIndex: 0, maxLength: 50 }
                          }}
                          classes={{
                            formControlRoot: classes.roCodeFormControl,
                            input: classes.inputWithoutLabel
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Accordion>
                </div>
                {isAgent && (
                  <div className={classes.packageSelectionWrapper}>
                    <Accordion
                      title={accordionTitle("KYC Annexure")}
                      id={"KYCAnnexure "}
                      classes={{
                        accordionRoot: classes.accountServiceAccordionRoot,
                        accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                        accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                        accordionDetails: classes.accordionDetails
                      }}
                    >
                      <KycAnnexureDetails
                        values={values}
                        setFieldValue={setFieldValue}
                        {...props}
                      />
                    </Accordion>
                  </div>
                )}
                <Footer>
                  <BackLink path={routes.additionalInfoComponent} isTypeButton={true} />
                  <NextStepButton
                    label="Next"
                    justify="flex-end"
                    onClick={() => handleNextClickAction(props)}
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

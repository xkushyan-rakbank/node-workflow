import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import {
  AutoSaveField as Field,
  CustomSelect,
  Input,
  InputGroup,
  LinkedField,
  SkeletonLoader
} from "../../../components/Form";
import { BackLink } from "../../../components/Buttons/BackLink";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { ErrorBoundaryForReCaptcha } from "../../../components/ReCaptcha/ErrorBoundaryForReCaptcha";
import { ReCaptcha } from "../../../components/ReCaptcha/ReCaptcha";

import { CONVENTIONAL, ISLAMIC, personaSelectionRoutesMap, UAE_CODE } from "../../../constants";
import {
  getInvalidMessage,
  getRequiredMessage,
  getROInvalidMessage
} from "../../../utils/getValidationMessage";
import { NAME_REGEX, NUMBER_REGEX, PARTNER_CODE_REGEX } from "../../../utils/validation";
import { InfoCard } from "./InfoCard";
import { MAX_COMPANY_FULL_NAME_LENGTH } from "../../CompanyInfo/constants";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { ContexualHelp } from "../../../components/Notifications";
import { Footer } from "../../../components/Footer";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import routes from "../../../routes";

const useStyles = makeStyles(theme => ({
  applicantInfoComponentWrapper: {
    display: "flex",
    padding: "20px",
    flexDirection: "column",
    gap: "30px",
    borderRadius: "10px",
    border: "1px solid #CCC",
    [theme.breakpoints.up("sm")]: {
      padding: "30px"
    }
  },
  header: {
    borderBottom: "1px solid #E6E6E6",
    paddingBottom: "24px"
  },
  outsideLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
    color: "#1F1F1F"
  },
  inputWithoutLabel: {
    padding: "20px 12px"
  },
  helperIcon: {
    color: "#525252",
    width: "20px",
    height: "20px"
  },
  roCodeWrapper: {
    marginTop: "24px",
    "& > div": {
      marginBottom: "24px"
    }
  },
  roCodeFormControl: {
    margin: 0,
    marginTop: "8px"
  },
  applicantInfoForm: {
    paddingBottom: "10px"
  },
  trackButtonContainer: {
    marginTop: "16px",
    marginBottom: "20px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "40px",
      marginBottom: "55px"
    }
  },
  trackNSwitchAccountBtn: {
    minWidth: "144px",
    height: "40px",
    borderRadius: "21px",
    border: "1px solid black",
    fontSize: "0.75rem",
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "1rem",
    color: "black",
    textTransform: "none",
    [theme.breakpoints.up("sm")]: {
      width: "229px",
      height: "40px",
      textAlign: "unset",
      fontStyle: "unset",
      borderRadius: "21px",
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "22px",
      color: "#000",
      border: "1px solid #000"
    }
  }
}));

const aplicantInfoSchema = Yup.object({
  fullName: Yup.string()
    .required("Please enter your name")
    .max(50, "Maximum 50 characters allowed")
    .matches(NAME_REGEX, getInvalidMessage("name")),
  companyFullName: Yup.string()
    .required(getRequiredMessage("Company’s full name"))
    // eslint-disable-next-line no-template-curly-in-string
    .max(MAX_COMPANY_FULL_NAME_LENGTH, "Maximum ${max} characters allowed"),
  email: Yup.string()
    .required(getRequiredMessage("Email"))
    .max(50, "Maximum 50 characters allowed")
    .email(getInvalidMessage("email")),
  countryCode: Yup.string().required(getRequiredMessage("Country code")),
  mobileNo: Yup.string()
    .required(getRequiredMessage("Mobile Number"))
    .phoneNo({
      codeFieldName: "countryCode",
      fieldName: "Mobile Number",
      message: getInvalidMessage("mobile number")
    }),
  roCode: Yup.string()
    .max(6, "Maximum 6 characters allowed")
    .matches(NUMBER_REGEX, getROInvalidMessage),
  allianceCode: Yup.string()
    .max(50, "Maximum 50 characters allowed")
    .matches(PARTNER_CODE_REGEX, getInvalidMessage("Partner Code"))
});

//ro-assist-brd3-16
const removeUnWantedKeys = (keys, values) => {
  keys.forEach(element => {
    delete values[element];
  });
  return values;
};

export const ApplicantInfoComponent = ({
  onSubmit,
  isConfigLoading,
  isRecaptchaEnable,
  reCaptchaToken,
  reCaptchaSiteKey,
  handleReCaptchaVerify,
  handleVerifiedFailed,
  isIslamicBanking,
  accountType,
  isLoading,
  partnerInfo,
  roCode,
  isLemniskEnable,
  isDisableNextstep,
  persona: personaFromStore,
  invitationParams
}) => {
  const classes = useStyles();
  //ro-assist-brd3-16
  const allianceCodeFromQuery =
    partnerInfo !== undefined ? partnerInfo.code : invitationParams?.alliancecode;
  const allianceCodeDisplyText = partnerInfo !== undefined ? partnerInfo.displayText : "";
  const [lemniskValue, setLemniskValue] = useState(false);
  const pushHistory = useTrackingHistory();

  const lemniskCall = value => {
    if (isLemniskEnable && !lemniskValue && value) {
      setLemniskValue(true);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        ApplicantInfofilled: (isIslamicBanking ? ISLAMIC : CONVENTIONAL) + " " + accountType
      });
      window.pixel && window.pixel.parse(true);
    }
  };

  const handleRedirection = (path, replaceHistory = false) => {
    const state = { notClearSession: true };
    pushHistory(path, replaceHistory, state);
  };

  const {
    name = "",
    company = "",
    email = "",
    mobile = "",
    rocode = "",
    // roAgentId = allianceCodeFromQuery,
    alliancecodeFromDataList: allianceCodeDisplayText,
    persona = personaFromStore
  } = invitationParams || {};

  return (
    <>
      <div className={classes.trackButtonContainer}>
        <Button
          variant="outlined"
          className={classes.trackNSwitchAccountBtn}
          onClick={() => handleRedirection(routes.comeBackLogin)}
        >
          Track my application
        </Button>
      </div>
      <div className={classes.applicantInfoComponentWrapper}>
        <SectionTitleWithInfo
          title={"Your details"}
          info="Fill in your contact details so we can keep track of your application."
          smallInfo
          className={classes.header}
        />
        <Formik
          initialValues={{
            fullName: name,
            companyFullName: company,
            email,
            countryCode: UAE_CODE,
            mobileNo: mobile,
            roCode: rocode || roCode,
            allianceCode: allianceCodeFromQuery,
            allianceCodeFromDataList: allianceCodeDisplayText,
            persona
          }}
          validationSchema={aplicantInfoSchema}
          validateOnChange={false}
          validateOnMount={true}
          onSubmit={values => onSubmit(removeUnWantedKeys(["allianceCodeFromDataList"], values))}
          className={classes.applicantInfoForm}
        >
          {({ isValid, isSubmitting }) => {
            if (isSubmitting) {
              const el = document.querySelector(".Mui-error");
              const element = el && el.parentElement ? el.parentElement : el;
              element && element.scrollIntoView({ behavior: "smooth", block: "end" });
            }
            return (
              <Form>
                {isConfigLoading ? (
                  <SkeletonLoader />
                ) : (
                  <Field
                    name="fullName"
                    path="prospect.applicantInfo.fullName"
                    label="Your name"
                    placeholder="Your name"
                    component={Input}
                    InputProps={{
                      inputProps: { tabIndex: 0, maxLength: 50 }
                    }}
                    isLemnisk={true}
                    lemniskCall={value => lemniskCall(value)}
                    fieldDescription="Enter your full name as shown on your passport."
                    isLoadDefaultValueFromStore={false}
                  />
                )}
                {isConfigLoading ? (
                  <SkeletonLoader />
                ) : (
                  <Field
                    name="companyFullName"
                    path="prospect.applicantInfo.companyFullName"
                    label="Company’s full name"
                    placeholder="Company’s full name"
                    component={Input}
                    InputProps={{
                      inputProps: { tabIndex: 0, maxLength: 255 }
                    }}
                    isLemnisk={true}
                    lemniskCall={value => lemniskCall(value)}
                    fieldDescription="This should be the same as shown on your trade licence."
                    isLoadDefaultValueFromStore={false}
                    iconWidth={16}
                    iconHeight={16}
                    disabled={invitationParams?.company}
                  />
                )}
                {isConfigLoading ? (
                  <SkeletonLoader />
                ) : (
                  <Field
                    name="email"
                    path="prospect.applicantInfo.email"
                    label="Email"
                    placeholder="Email"
                    component={Input}
                    InputProps={{
                      inputProps: { tabIndex: 0, maxLength: 50 }
                    }}
                    isLemnisk={true}
                    lemniskCall={value => lemniskCall(value)}
                    fieldDescription={
                      "This email will be used to open the account. We'll send a one-time password (OTP) to it for verification."
                    }
                    isLoadDefaultValueFromStore={false}
                    disabled={invitationParams?.email}
                    iconWidth={25}
                    iconHeight={25}
                    contextualHelpText="This email should be unique for a company"
                  />
                )}
                {isConfigLoading ? (
                  <SkeletonLoader />
                ) : (
                  <InputGroup>
                    <LinkedField
                      name="countryCode"
                      disabled
                      linkedFieldName="mobileNo"
                      path="prospect.applicantInfo.countryCode"
                      linkedPath="prospect.applicantInfo.mobileNo"
                      required
                      datalistId="countryCode"
                      component={CustomSelect}
                      shrink={false}
                      inputProps={{ tabIndex: 0 }}
                    />
                    <LinkedField
                      name="mobileNo"
                      linkedFieldName="countryCode"
                      path="prospect.applicantInfo.mobileNo"
                      linkedPath="prospect.applicantInfo.countryCode"
                      label="Mobile number"
                      placeholder="Mobile number"
                      component={Input}
                      contextualHelpText="This number should be unique for a company"
                      InputProps={{
                        inputProps: { tabIndex: 0 }
                      }}
                      isLemnisk={true}
                      lemniskCall={value => lemniskCall(value)}
                      fieldDescription={
                        "This number will be used to open the account. We'll send a one-time password (OTP) to it for verification."
                      }
                      isLoadDefaultValueFromStore={false}
                      iconWidth={25}
                      iconHeight={25}
                    />
                  </InputGroup>
                )}

                {isRecaptchaEnable && (
                  <Grid container>
                    <Box mb="24px">
                      <ErrorBoundaryForReCaptcha className="recaptchaPos">
                        <ReCaptcha
                          onVerify={handleReCaptchaVerify}
                          onExpired={handleVerifiedFailed}
                          onError={handleVerifiedFailed}
                          reCaptchaSiteKey={reCaptchaSiteKey}
                        />
                      </ErrorBoundaryForReCaptcha>
                    </Box>
                  </Grid>
                )}

                <Grid container spacing={3} className={classes.roCodeWrapper}>
                  <Grid item sm={6} xs={12}>
                    <label className={classes.outsideLabel}>
                      Agent code (optional)
                      <ContexualHelp
                        title={"Enter the Agent code of the Bank staff whom you are in touch with"}
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
                      isLoadDefaultValueFromStore={false}
                      disabled={roCode !== "" || invitationParams?.rocode}
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
                      name={
                        allianceCodeFromQuery !== "" ? "allianceCode" : "allianceCodeFromDataList"
                      }
                      path="prospect.applicantInfo.allianceCode"
                      disabled={allianceCodeFromQuery !== "" && allianceCodeFromQuery !== undefined}
                      component={Input}
                      isLoadDefaultValueFromStore={false}
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

                <Grid container direction="row" justify="flex-end" alignItems="center">
                  {/* message */}
                  <Footer>
                    {!invitationParams?.isislamic && (
                      <BackLink
                        isTypeButton={true}
                        path={
                          personaSelectionRoutesMap[accountType][
                            isIslamicBanking ? ISLAMIC : CONVENTIONAL
                          ]
                        }
                      />
                    )}
                    <SubmitButton
                      disabled={(!reCaptchaToken && isRecaptchaEnable) || !isDisableNextstep}
                      isDisplayLoader={isLoading}
                      justify="flex-end"
                      label="Next"
                    />
                  </Footer>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

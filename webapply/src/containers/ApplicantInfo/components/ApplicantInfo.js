import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";

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
import { NAME_REGEX, NUMBER_REGEX, ALPHANUMERIC_REGEX } from "../../../utils/validation";
import { InfoCard } from "./InfoCard";
import { MAX_COMPANY_FULL_NAME_LENGTH } from "../../CompanyInfo/constants";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: "16px",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "40px",
      paddingTop: "40px",
    },
  },
}));

const aplicantInfoSchema = Yup.object({
  fullName: Yup.string()
    .required("Please enter your name")
    .max(100, "Maximum 100 characters allowed")
    .matches(NAME_REGEX, "Please remove any special character from your name"),
  companyFullName: Yup.string()
    .required(getRequiredMessage("Company’s full name"))
    // eslint-disable-next-line no-template-curly-in-string
    .max(MAX_COMPANY_FULL_NAME_LENGTH, "Maximum ${max} characters allowed"),
  email: Yup.string()
    .required(getRequiredMessage("Email"))
    .max(50, "Maximum 50 characters allowed")
    .email("Please enter a valid email address without any special characters"),
  countryCode: Yup.string().required(getRequiredMessage("Country code")),
  mobileNo: Yup.string()
    .required(getRequiredMessage("Mobile Number"))
    .phoneNo({
      codeFieldName: "countryCode",
      fieldName: "Mobile Number",
      message: "Please enter a valid mobile number"
    }),
  roCode: Yup.string()
    .max(6, "Maximum 6 characters allowed")
    .matches(NUMBER_REGEX, getROInvalidMessage),
  allianceCode: Yup.string()
    .max(50, "Maximum 50 characters allowed")
    .matches(ALPHANUMERIC_REGEX, getInvalidMessage("Partner Code"))
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
  const allianceCodeFromQuery = partnerInfo !== undefined ? partnerInfo.code : "";
  const allianceCodeDisplyText = partnerInfo !== undefined ? partnerInfo.displayText : "";
  const [lemniskValue, setLemniskValue] = useState(false);
  const lemniskCall = value => {
    if (isLemniskEnable && !lemniskValue && value) {
      setLemniskValue(true);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        ApplicantInfofilled: (isIslamicBanking ? ISLAMIC : CONVENTIONAL) + " " + accountType
      });
      window.pixel.parse(true);
    }
  };

  const {
    name = "",
    company = "",
    email = "",
    mobile = "",
    rocode = "",
    alliancecode = allianceCodeFromQuery,
    alliancecodeFromDataList: allianceCodeDisplayText,
    persona = personaFromStore
  } = invitationParams || {};

  return (
    <>
      <SectionTitleWithInfo
        title={"Let's kick things off with an intro"}
        info=" Give us a few details so we can keep track of your application"
        smallInfo
        className={classes.header}
      />
      <Formik
        initialValues={{
          fullName: name,
          companyFullName: company,
          email: email,
          countryCode: UAE_CODE,
          mobileNo: mobile,
          roCode: rocode,
          allianceCode: alliancecode,
          allianceCodeFromDataList: allianceCodeDisplayText,
          persona
        }}
        validationSchema={aplicantInfoSchema}
        validateOnChange={false}
        onSubmit={values => onSubmit(removeUnWantedKeys(["allianceCodeFromDataList"], values))}
      >
        {({ isValid }) => (
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
                  inputProps: { tabIndex: 0 }
                }}
                isLemnisk={true}
                lemniskCall={value => lemniskCall(value)}
                fieldDescription={
                  "This email will be used to open the account.\n We'll send a one-time password (OTP) to it for verification."
                }
                isLoadDefaultValueFromStore={false}
                disabled={invitationParams?.mobile}
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
                  contextualHelpText="This number should be unique for a Company"
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  isLemnisk={true}
                  lemniskCall={value => lemniskCall(value)}
                  fieldDescription={
                    "This number will be used to open the account.\nWe'll send a one-time password (OTP) to it for verification."
                  }
                  isLoadDefaultValueFromStore={false}
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

            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                {isConfigLoading ? (
                  <SkeletonLoader />
                ) : (
                  <Field
                    name="roCode"
                    path="prospect.applicantInfo.roCode"
                    label="Agent code (optional)"
                    placeholder="Agent code"
                    contextualHelpText="Enter the Agent code of the Bank staff whom you are in touch with"
                    component={Input}
                    disabled={invitationParams?.rocode || roCode !== ""}
                    InputProps={{
                      inputProps: { tabIndex: 0 }
                    }}
                    isLoadDefaultValueFromStore={false}
                  />
                )}
                {!roCode && (
                  <InfoCard message="You only need to enter this if you have received it from a RAKBANK sales agent." />
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                {isConfigLoading ? (
                  <SkeletonLoader />
                ) : (
                  <>
                    {/* //ro-assist-brd3-16 */}
                    <Field
                      name={
                        allianceCodeFromQuery !== "" ? "allianceCodeFromDataList" : "allianceCode"
                      }
                      path={
                        allianceCodeFromQuery !== "" ? null : "prospect.applicantInfo.allianceCode"
                      }
                      label="Partner code (optional)"
                      placeholder="Partner code"
                      disabled={invitationParams?.alliancecode || allianceCodeFromQuery !== ""}
                      component={Input}
                      contextualHelpText="If you were referred by one of our Partners, enter the code shared by them"
                      InputProps={{
                        inputProps: { tabIndex: 0 }
                      }}
                      isLoadDefaultValueFromStore={false}
                    />
                  </>
                )}
              </Grid>
            </Grid>

            <Grid container direction="row" justify="flex-end" alignItems="center">
              {/* message */}
              <div className="linkContainer">
                {!invitationParams?.isislamic && (
                  <BackLink
                    path={
                      personaSelectionRoutesMap[accountType][
                        isIslamicBanking ? ISLAMIC : CONVENTIONAL
                      ]
                    }
                  />
                )}
                <SubmitButton
                  disabled={
                    !isValid ||
                    (!reCaptchaToken && isRecaptchaEnable) ||
                    !isDisableNextstep
                  }
                  isDisplayLoader={isLoading}
                  justify="flex-end"
                  label="Next"
                />
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

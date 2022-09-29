import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
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

import { applicationOverviewRoutesMap, CONVENTIONAL, ISLAMIC, UAE_CODE } from "../../../constants";
import {
  getInvalidMessage,
  getRequiredMessage,
  getROInvalidMessage
} from "../../../utils/getValidationMessage";
import { NAME_REGEX, NUMBER_REGEX, ALPHANUMERIC_REGEX } from "../../../utils/validation";
import { InfoCard } from "./InfoCard";

const aplicantInfoSchema = Yup.object({
  fullName: Yup.string()
    .required(getRequiredMessage("Your Name"))
    .max(79, "Maximum 79 characters allowed")
    .matches(NAME_REGEX, getInvalidMessage("Your Name")),
  email: Yup.string()
    .required(getRequiredMessage("Your E-mail Address"))
    .max(50, "Maximum 50 characters allowed")
    .email(getInvalidMessage("Your E-mail Address")),
  countryCode: Yup.string().required(getRequiredMessage("Country code")),
  mobileNo: Yup.string()
    .required(getRequiredMessage("Your Mobile Number"))
    .phoneNo({ codeFieldName: "countryCode", fieldName: "Your Mobile Number" }),
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
  isDisableNextstep
}) => {
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

  return (
    <>
      <h2>Let’s Start with the Basics</h2>
      <p className="formDescription">
        First things first, you need a login, so you can come back to the application in case you
        cannot complete it in one go.
      </p>

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          countryCode: UAE_CODE,
          mobileNo: "",
          roCode: "",
          allianceCode: allianceCodeFromQuery,
          allianceCodeFromDataList: allianceCodeDisplyText
        }}
        validationSchema={aplicantInfoSchema}
        validateOnChange={false}
        onSubmit={values => onSubmit(removeUnWantedKeys(["allianceCodeFromDataList"], values))}
      >
        {({ values }) => (
          <Form>
            {isConfigLoading ? (
              <SkeletonLoader />
            ) : (
              <Field
                name="fullName"
                path="prospect.applicantInfo.fullName"
                label="Your Name"
                placeholder="Your Name"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
                isLemnisk={true}
                lemniskCall={value => lemniskCall(value)}
              />
            )}

            {isConfigLoading ? (
              <SkeletonLoader />
            ) : (
              <Field
                name="email"
                path="prospect.applicantInfo.email"
                label="Your E-mail Address"
                placeholder="Email"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
                isLemnisk={true}
                lemniskCall={value => lemniskCall(value)}
              />
            )}

            {isConfigLoading ? (
              <SkeletonLoader />
            ) : (
              <InputGroup>
                <LinkedField
                  name="countryCode"
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
                  label="Your Mobile Number"
                  placeholder="Mobile Number"
                  component={Input}
                  contextualHelpText="This number should be unique for a Company"
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  isLemnisk={true}
                  lemniskCall={value => lemniskCall(value)}
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
                    label="Agent Code (Optional)"
                    placeholder="Agent Code"
                    contextualHelpText="Enter the Agent code of the Bank staff whom you are in touch with"
                    component={Input}
                    disabled={roCode !== ""}
                    InputProps={{
                      inputProps: { tabIndex: 0 }
                    }}
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
                      label="Partner Code (Optional)"
                      placeholder="Partner Code"
                      disabled={allianceCodeFromQuery !== ""}
                      component={Input}
                      contextualHelpText="If you were referred by one of our Partners, enter the code shared by them"
                      InputProps={{
                        inputProps: { tabIndex: 0 }
                      }}
                    />
                  </>
                )}
              </Grid>
            </Grid>

            <Grid container direction="row" justify="flex-end" alignItems="center">
              {/* message */}
              <div className="linkContainer">
                <BackLink
                  path={
                    applicationOverviewRoutesMap[accountType][
                      isIslamicBanking ? ISLAMIC : CONVENTIONAL
                    ]
                  }
                />
                <SubmitButton
                  disabled={
                    !values.fullName ||
                    !values.email ||
                    !values.mobileNo ||
                    (!reCaptchaToken && isRecaptchaEnable) ||
                    !isDisableNextstep
                  }
                  isDisplayLoader={isLoading}
                  justify="flex-end"
                  label="Next Step"
                />
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

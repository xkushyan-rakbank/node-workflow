import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Grid } from "@material-ui/core";

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
import { ErrorBoundaryForReCaptcha } from "../../../components/ErrorBoundaryForReCaptcha";
import { ReCaptcha } from "../../../components/ReCaptcha/ReCaptcha";

import { applicationOverviewRoutesMap, CONVENTIONAL, ISLAMIC, UAE_CODE } from "../../../constants";
import { getInvalidMessage, getRequiredMessage } from "../../../utils/getValidationMessage";
import { NAME_REGEX } from "../../../utils/validation";

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
    .phoneNo({ codeFieldName: "countryCode", fieldName: "Your Mobile Number" })
});

const initialValues = {
  fullName: "",
  email: "",
  countryCode: UAE_CODE,
  mobileNo: ""
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
  isLoading
}) => (
  <>
    <h2>Let’s Start with the Basics</h2>
    <p className="formDescription">
      First things first, you need a login, so you can come back to the application in case you
      cannot complete it in one go.
    </p>

    <Formik
      initialValues={initialValues}
      validationSchema={aplicantInfoSchema}
      validateOnChange={false}
      onSubmit={onSubmit}
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
              />
            </InputGroup>
          )}

          <Grid container direction="row" justify="space-between" alignItems="center">
            {isRecaptchaEnable && (
              <ErrorBoundaryForReCaptcha>
                <ReCaptcha
                  onVerify={handleReCaptchaVerify}
                  onExpired={handleVerifiedFailed}
                  onError={handleVerifiedFailed}
                  reCaptchaSiteKey={reCaptchaSiteKey}
                />
              </ErrorBoundaryForReCaptcha>
            )}
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
                  (!reCaptchaToken && isRecaptchaEnable)
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

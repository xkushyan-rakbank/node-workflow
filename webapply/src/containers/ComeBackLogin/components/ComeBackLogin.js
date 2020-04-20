import React from "react";
import cx from "classnames";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";

import {
  Input,
  CustomSelect,
  InputGroup,
  AutoSaveField as Field,
  SkeletonLoader,
  LinkedField
} from "./../../../components/Form";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { ReCaptcha } from "../../../components/ReCaptcha/ReCaptcha";
import { ErrorBoundaryForReCaptcha } from "../../../components/ReCaptcha/ErrorBoundaryForReCaptcha";
import { getRequiredMessage, getInvalidMessage } from "../../../utils/getValidationMessage";
import { UAE_CODE } from "../../../constants";

import { useStyles } from "./../styled";

export const MAX_LENGTH_EMAIL = 50;

const comebackSchema = Yup.object({
  email: Yup.string()
    .required(getRequiredMessage("Your E-mail Address"))
    .email(getInvalidMessage("Your E-mail Address")),
  countryCode: Yup.string().required(getRequiredMessage("Country code")),
  mobileNo: Yup.string().required(getRequiredMessage("Your Mobile Number"))
});

export const ComeBackLoginComponent = ({
  recaptchaToken,
  isRecaptchaEnable,
  reCaptchaSiteKey,
  isGenerating,
  isConfigLoading,
  submitForm,
  handleReCaptchaVerify,
  handleVerifiedFailed
}) => {
  const classes = useStyles();

  return (
    <div className={classes.centeredContainer}>
      <h3 className={classes.title}>Good to see you back</h3>
      <SectionTitleWithInfo
        title="Wondering about your application? You came to the right place."
        info="Please enter the login you used when you first applied"
      />
      <Formik
        initialValues={{
          email: "",
          countryCode: UAE_CODE,
          mobileNo: ""
        }}
        validationSchema={comebackSchema}
        validateOnChange={false}
        onSubmit={submitForm}
      >
        {({ values }) => (
          <Form className={classes.form}>
            <div>
              {isConfigLoading ? (
                <SkeletonLoader />
              ) : (
                <Field
                  name="email"
                  path="prospect.applicantInfo.email"
                  label="Your E-mail Address"
                  placeholder="Email"
                  component={Input}
                  isLoadDefaultValueFromStore={false}
                  InputProps={{
                    inputProps: { maxLength: MAX_LENGTH_EMAIL, tabIndex: 0 }
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
                    extractLabel={item => item.displayText}
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
                    isLoadDefaultValueFromStore={false}
                    InputProps={{
                      inputProps: { tabIndex: 0 }
                    }}
                  />
                </InputGroup>
              )}
              <Grid container direction="row" justify="flex-start" alignItems="center">
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
              </Grid>
            </div>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <div className={cx(classes.btnWrapper, "linkContainer")}>
                <SubmitButton
                  disabled={
                    !values.email || !values.mobileNo || (isRecaptchaEnable && !recaptchaToken)
                  }
                  isDisplayLoader={isGenerating}
                  justify="flex-end"
                  label="Next Step"
                />
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

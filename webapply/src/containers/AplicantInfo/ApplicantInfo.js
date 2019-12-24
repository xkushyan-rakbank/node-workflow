import React, { useCallback, useEffect } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { Grid } from "@material-ui/core";

import { NAME_REGEX, PHONE_REGEX } from "./../../utils/validation";
import {
  Input,
  CustomSelect,
  InputGroup,
  AutoSaveField as Field,
  SkeletonLoader
} from "./../../components/Form";
import { SubmitButton } from "./../../components/Buttons/SubmitButton";
import { receiveAppConfig } from "./../../store/actions/appConfig";
import { applicantInfoForm } from "../../store/actions/applicantInfoForm";
import { IS_RECAPTCHA_ENABLE, UAE_CODE } from "../../constants";
import { ErrorBoundaryForReCaptcha } from "../../components/ErrorBoundary";
import ReCaptcha from "../../components/ReCaptcha/ReCaptcha";
import { BackLink } from "../../components/Buttons/BackLink";
import { setToken, setVerified } from "../../store/actions/reCaptcha";
import routes from "../../routes";

const aplicantInfoSchema = Yup.object({
  fullName: Yup.string()
    .required("You need to provide name ")
    .matches(NAME_REGEX, "This is not a valid name"),
  email: Yup.string()
    .required("You need to provide Email address")
    .email("This is not a valid Email address"),
  countryCode: Yup.string().required("Select country code"),
  mobileNo: Yup.string()
    .required("You need to provide mobile number")
    .matches(PHONE_REGEX, "This is not a valid phone")
});

const initialValues = {
  fullName: "",
  email: "",
  countryCode: UAE_CODE,
  mobileNo: ""
};

const ApplicantInfoPage = ({
  applicantInfoForm,
  receiveAppConfig,
  setToken,
  setVerified,
  reCaptchaToken,
  isConfigLoading
}) => {
  useEffect(() => {
    receiveAppConfig();
  }, [receiveAppConfig]);

  const onSubmit = useCallback(values => applicantInfoForm(values), [applicantInfoForm]);
  const handleReCaptchaVerify = useCallback(
    token => {
      setToken(token);
    },
    [setToken]
  );
  const handleVerifiedFailed = useCallback(() => {
    setVerified(false);
  }, [setVerified]);

  console.log("IS_RECAPTCHA_ENABLE");
  console.log(IS_RECAPTCHA_ENABLE);
  return (
    <>
      <h2>Let’s Start with the Basics</h2>
      <p className="formDescription">
        First things first, you need a login, so you can come back to the application in case you
        cannot complete it in one go.
      </p>

      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={aplicantInfoSchema}
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
              />
            )}

            {isConfigLoading ? (
              <SkeletonLoader />
            ) : (
              <InputGroup>
                <Field
                  name="countryCode"
                  path="prospect.applicantInfo.countryCode"
                  required
                  datalistId="countryCode"
                  component={CustomSelect}
                  shrink={false}
                />

                <Field
                  name="mobileNo"
                  path="prospect.applicantInfo.mobileNo"
                  label="Your Mobile Number"
                  placeholder="Mobile Number"
                  component={Input}
                />
              </InputGroup>
            )}

            <Grid container direction="row" justify="space-between" alignItems="center">
              {IS_RECAPTCHA_ENABLE && (
                <ErrorBoundaryForReCaptcha>
                  <ReCaptcha
                    onVerify={handleReCaptchaVerify}
                    onExpired={handleVerifiedFailed}
                    onError={handleVerifiedFailed}
                  />
                </ErrorBoundaryForReCaptcha>
              )}
              <div className="linkContainer">
                <BackLink path={routes.accountsComparison} />
                <SubmitButton
                  disabled={
                    !values.fullName ||
                    !values.email ||
                    !values.mobileNo ||
                    (IS_RECAPTCHA_ENABLE && !reCaptchaToken)
                  }
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

const mapStateToProps = state => ({
  reCaptchaToken: state.reCaptcha.token,
  isConfigLoading: state.appConfig.loading
});

const mapDispatchToProps = {
  receiveAppConfig,
  applicantInfoForm,
  setToken,
  setVerified
};

export const ApplicantInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantInfoPage);

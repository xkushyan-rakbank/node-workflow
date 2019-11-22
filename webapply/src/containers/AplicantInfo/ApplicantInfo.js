import React, { useEffect } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX } from "./../../utils/validation";
import { Input, CustomSelect, InputGroup, AutoSaveForm } from "./../../components/Form";
import { countryCodeOptions } from "./../../constants/options";
import { SubmitButton } from "./../../components/Buttons/SubmitButton";
import { prospect } from "./../../constants/config";
import { receiveAppConfig, updateProspect } from "./../../store/actions/appConfig";
import { applicantInfoForm } from "../../store/actions/applicantInfoForm";

const aplicantInfoSchema = Yup.object({
  fullName: Yup.string()
    .required("You need to provide name ")
    .matches(NAME_REGEX, "This is not a valid name"),
  email: Yup.string()
    .required("You need to provide Email address")
    .matches(EMAIL_REGEX, "This is not a valid Email address"),
  countryCode: Yup.string().required("Select country code"),
  mobileNo: Yup.string()
    .required("You need to provide mobile number")
    .matches(PHONE_REGEX, "This is not a valid phone")
});

const ApplicantInfoPage = ({ receiveAppConfig, applicantInfoForm, updateProspect }) => {
  const onSubmit = values => applicantInfoForm(values);

  useEffect(() => {
    receiveAppConfig();
  }, [receiveAppConfig]);

  return (
    <>
      <h2>Let’s Start with the Basics</h2>
      <p className="formDescription">
        First things first, you need a login, so you can come back to your application later.
      </p>

      <Formik
        initialValues={prospect.applicantInfo}
        validationSchema={aplicantInfoSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <AutoSaveForm
            updateProspect={updateProspect}
            mapValues={values => ({
              "prospect.applicantInfo.fullName": values.fullName,
              "prospect.applicantInfo.email": values.email,
              "prospect.applicantInfo.countryCode": values.countryCode,
              "prospect.applicantInfo.mobileNo": values.mobileNo
            })}
          >
            <Form>
              <Field name="fullName" label="Your Name" placeholder="Your Name" component={Input} />

              <Field
                name="email"
                label="Your E-mail Address"
                placeholder="Email"
                component={Input}
              />

              <InputGroup>
                <Field
                  name="countryCode"
                  required
                  options={countryCodeOptions}
                  component={CustomSelect}
                  shrink={false}
                />

                <Field
                  name="mobileNo"
                  label="Your Mobile Number"
                  placeholder="Mobile Number"
                  component={Input}
                />
              </InputGroup>

              <div className="linkContainer">
                <SubmitButton justify="flex-end" label="Next Step" />
              </div>
            </Form>
          </AutoSaveForm>
        )}
      </Formik>
    </>
  );
};

const mapDispatchToProps = {
  receiveAppConfig,
  applicantInfoForm,
  updateProspect
};

export const ApplicantInfo = connect(
  null,
  mapDispatchToProps
)(ApplicantInfoPage);

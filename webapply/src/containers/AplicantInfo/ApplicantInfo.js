import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, CustomSelect } from "./../../components/Form";
import { EMAIL_REGEX, NAME_REGEX } from "./../../utils/validation";
import { countryCodeOptions } from "./../../constants/options";
import SubmitButton from "./../../components/Buttons/SubmitButton";
import { prospect } from "./../../constants/config";
import { receiveAppConfig } from "./../../store/actions/appConfig";
import { applicantInfoForm } from "../../store/actions/applicantInfoForm";

const AplicantInfoSchema = Yup.object({
  fullName: Yup.string()
    .required("You need to provide name ")
    .matches(NAME_REGEX, "This is not a valid name"),
  email: Yup.string()
    .required("You need to provide Email address")
    .matches(EMAIL_REGEX, "This is not a valid Email address"),
  countryCode: Yup.string().required("Select country code"),
  mobileNo: Yup.string().required("You need to provide mobile number")
});

const ApplicantInfoPage = props => {
  const { receiveAppConfig, applicantInfoForm } = props;

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
        validationSchema={AplicantInfoSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <Field name="fullName" label="Your Name" placeholder="Your Name" component={Input} />

            <Field name="email" label="Your E-mail Address" placeholder="Email" component={Input} />

            <Field name="countryCode" options={countryCodeOptions} component={CustomSelect} />

            <Field
              name="mobileNo"
              label="Your Mobile Number"
              placeholder="Mobile Number"
              component={Input}
            />

            <div className="linkContainer">
              <SubmitButton justify="flex-end" label="Next" />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapDispatchToProps = {
  receiveAppConfig,
  applicantInfoForm
};

export const ApplicantInfo = connect(
  null,
  mapDispatchToProps
)(ApplicantInfoPage);

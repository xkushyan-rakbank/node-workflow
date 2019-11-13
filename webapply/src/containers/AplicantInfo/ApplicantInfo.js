import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, CustomSelect } from "./../../components/Form";
import { emailRegex, nameRegex } from "./../../utils/validation";
import { countryCodeOptions } from "./../../constants/options";
import SubmitButton from "./../../components/Buttons/SubmitButton";

const AplicantInfoSchema = Yup.object({
  fullName: Yup.string()
    .required("You need to provide name ")
    .matches(nameRegex, "This is not a valid name"),
  email: Yup.string()
    .required("You need to provide Email address")
    .matches(emailRegex, "This is not a valid Email address"),
  countryCode: Yup.string().required("Select country code")
});

const initialValues = {
  fullName: "",
  email: "",
  countryCode: []
};

export const ApplicantInfo = () => {
  const onSubmit = values => {
    console.log("values", values);
  };

  return (
    <>
      <h2>Let’s Start with the Basics</h2>
      <p className="formDescription">
        First things first, you need a login, so you can come back to your application later.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={AplicantInfoSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <Field name="fullName" placeholder="Your Name" label="Your Name" component={Input} />

            <Field name="email" placeholder="Your E-mail Address" label="Email" component={Input} />

            <Field name="countryCode" options={countryCodeOptions} component={CustomSelect} />

            <div className="linkContainer">
              <SubmitButton label="Next Step" justify="flex-end" />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

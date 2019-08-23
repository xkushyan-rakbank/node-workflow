import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import { withStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import Input from "../components/InputField/Input";
import SelectCombined from "../components/InputField/SelectCombined";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import CustomCheckbox from "../components/InputField/Checkbox";
import SubmitButton from "../components/Buttons/SubmitButton";
import { codes } from "./../constants";

const styles = {
  baseForm: {
    maxWidth: "612px"
  },
  reCaptchaContainer: {
    display: "flex",
    paddingTop: "10px",
    justifyContent: "flex-end"
  }
};

const initialValues = {
  name: "",
  email: "",
  phoneCode: "",
  phoneCode2: codes[0].value,
  phone: "",
  apply: false,
  date: null
};

const BasicsForm = ({ classes }) => {
  const [token, setToken] = useState("");

  const handleRecaptchaVerify = token => {
    setToken(token);
  };

  const handleRecaptchaExpired = () => {
    setToken("");
  };

  useEffect(() => {
    console.log("RECaptcha verify token:", token);
  }, [token]);

  const handleSubmit = values => {
    console.log("values", JSON.stringify(values, null, 2));
  };

  return (
    <div className={classes.baseForm}>
      <h2>Let’s Start with the Basics</h2>
      <p className="formDescription">
        We know from experience users may get scared when asked for details. We
        need a trust-creating message, to explain why we need them (autosave and
        finish at a later stage)
      </p>

      {/*
      Just for this screen Formik is used -  https://jaredpalmer.com/formik/docs/overview
      aproach to validate inputs with formik - https://jaredpalmer.com/formik/docs/guides/validation#docsNav
      */}
      <Formik
        validateOnBlur
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleBlur }) => (
          <Form noValidate>
            <Field
              required
              type="text"
              name="name"
              label="Your name"
              placeholder="Name"
              component={Input}
            />

            <Field
              required
              type="email"
              name="email"
              placeholder="ivan@gmail.com"
              label="Your email"
              component={Input}
            />

            <FormGroup className="selectCombined">
              <Field
                name="phoneCode2"
                options={codes}
                component={SelectCombined}
              />
              <Field
                required
                type="tel"
                name="phone"
                label="Your phone"
                placeholder="Your Mobile Number*"
                component={Input}
              />
            </FormGroup>

            <Field
              name="apply"
              label="I am applying on behalf of someone’s company "
              component={CustomCheckbox}
            />

            <ErrorBoundary className={classes.reCaptchaContainer}>
              <ReCaptcha
                onVerify={handleRecaptchaVerify}
                onExpired={handleRecaptchaExpired}
                onError={handleRecaptchaExpired}
              />
            </ErrorBoundary>

            <Link to="/confirm">
              <SubmitButton />
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withStyles(styles)(BasicsForm);

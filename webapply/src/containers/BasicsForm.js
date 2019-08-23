import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Formik, Field, Form } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import { withStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import Input from "../components/InputField/Input";
import SelectCombined from "../components/InputField/SelectCombined";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import SelectCombined2 from "../components/InputField/SelectCombined.v2";
import CustomCheckbox from "../components/InputField/Checkbox";
import SubmitButton from "../components/Buttons/SubmitButton";
import { reciveUiConfig } from "./../store/actions/uiConfig";
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

const BasicsForm = props => {
  const { classes } = props;

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

  useEffect(() => {
    console.log(props);
    props.reciveUiConfig();
  });

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

            <Field
              name="phoneCode2"
              options={codes}
              component={SelectCombined2}
              inputType="text"
              inputName="phone"
              inputPlaceholder="Your Mobile Number"
              inputLabel="Your Phone"
            />

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

const mapStateToProps = state => {};

const mapDispatchToProps = {
  reciveUiConfig
};

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps
  )
)(BasicsForm);

import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { InfoTitle } from "./../Notifications";
import { SubmitButton } from "./SubmitButton/SubmitButton";
import { AutoSaveField as Field, CustomSelect, Input, InputGroup } from "../Form";
import { EMAIL_REGEX, PHONE_REGEX } from "../../utils/validation";
import { countryCodeOptions } from "../../constants/options";

const getPreferredContactInformationSchema = isSignatory =>
  Yup.object().shape({
    primaryEmail: Yup.string().when("", {
      is: isSignatory,
      then: Yup.string()
        .required("You need to provide Email address")
        .matches(EMAIL_REGEX, "This is not a valid Email address")
    }),
    primaryMobCountryCode: Yup.string().when("", {
      is: isSignatory,
      then: Yup.string().required("Select country code")
    }),
    primaryMobileNo: Yup.string().when("", {
      is: isSignatory,
      then: Yup.string()
        .required("You need to provide mobile number")
        .matches(PHONE_REGEX, "This is not a valid phone")
    }),
    primaryPhoneNo: Yup.string().matches(PHONE_REGEX, "This is not a valid phone")
  });

const PreferredContactInformationStep = props => {
  const { isSignatory, index, handleContinue } = props;
  return (
    <Formik
      initialValues={{
        primaryEmail: "",
        primaryMobCountryCode: "",
        primaryMobileNo: "",
        primaryPhoneCountryCode: "",
        primaryPhoneNo: ""
      }}
      onSubmit={handleContinue}
      validationSchema={() => getPreferredContactInformationSchema(isSignatory)}
    >
      <Form>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Field
              name="primaryEmail"
              path={`prospect.signatoryInfo[${index}].contactDetails.primaryEmail`}
              label="E-mail Address"
              placeholder="E-mail Address"
              component={Input}
              disabled={!isSignatory}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={3}>
          <Grid item md={6} sm={12}>
            <InputGroup>
              <Field
                name="primaryMobCountryCode"
                path={`prospect.signatoryInfo[${index}].contactDetails.primaryMobCountryCode`}
                options={countryCodeOptions}
                component={CustomSelect}
                shrink={false}
                disabled={!isSignatory}
              />

              <Field
                name="primaryMobileNo"
                path={`prospect.signatoryInfo[${index}].contactDetails.primaryMobileNo`}
                label="Mobile Number"
                placeholder="Mobile Number"
                component={Input}
                disabled={!isSignatory}
              />
            </InputGroup>
          </Grid>
          <Grid item md={6} sm={12}>
            <InputGroup>
              <Field
                name="primaryPhoneCountryCode"
                path={`prospect.signatoryInfo[${index}].contactDetails.primaryPhoneCountryCode`}
                options={countryCodeOptions}
                component={CustomSelect}
                shrink={false}
                disabled={!isSignatory}
              />

              <Field
                name="primaryPhoneNo"
                path={`prospect.signatoryInfo[${index}].contactDetails.primaryPhoneNo`}
                label="Landline number (optional)"
                placeholder="Landline number (optional)"
                component={Input}
                disabled={!isSignatory}
              />
            </InputGroup>
          </Grid>
        </Grid>
        <InfoTitle title="Heads up! We can only issue chequebooks if you use a phone number from the UAE." />

        <SubmitButton />
      </Form>
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  isSignatory: true //getInputValueById(state, "SigKycd.isSignatory", [index])
});

export const PreferredContactInformation = connect(mapStateToProps)(
  PreferredContactInformationStep
);

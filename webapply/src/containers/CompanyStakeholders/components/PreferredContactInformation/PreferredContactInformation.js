import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { SubmitButton } from "./../SubmitButton/SubmitButton";
import {
  AutoSaveField as Field,
  CustomSelect,
  Input,
  InputGroup
} from "../../../../components/Form";
import { withCompanyStakeholder } from "../withCompanyStakeholder";
import { getInputValueById } from "../../../../store/selectors/input";
import {
  UAE_MOBILE_PHONE_REGEX,
  UAE_LANDLINE_PHONE_REGEX,
  NUMBER_REGEX,
  MIN_NON_UAE_PHONE_LENGTH,
  MAX_NON_UAE_PHONE_LENGTH
} from "../../../../utils/validation";
import { UAE_CODE } from "../../../../constants";

const preferredContactInformationSchema = Yup.object().shape({
  primaryEmail: Yup.string()
    .required("You need to provide Email address")
    .email("This is not a valid Email address")
    .max(50, "Maximum 50 characters allowed"),
  primaryMobCountryCode: Yup.string().required("Select country code"),
  primaryMobileNo: Yup.string()
    .required("You need to provide mobile number")
    .when("primaryMobCountryCode", {
      is: primaryMobCountryCode => primaryMobCountryCode === UAE_CODE,
      then: Yup.string().matches(UAE_MOBILE_PHONE_REGEX, "This is not a valid phone"),
      otherwise: Yup.string()
        .matches(NUMBER_REGEX, "This is not a valid phone not number (wrong characters)")
        .min(MIN_NON_UAE_PHONE_LENGTH, "This is not a valid phone (min length is not reached)")
        .test("length validation", "This is not a valid phone (max length exceeded)", function() {
          const { primaryMobCountryCode = "", primaryMobileNo = "" } = this.parent;
          return primaryMobCountryCode.length + primaryMobileNo.length <= MAX_NON_UAE_PHONE_LENGTH;
        })
    }),
  primaryPhoneNo: Yup.string().when("primaryPhoneCountryCode", {
    is: primaryPhoneCountryCode => primaryPhoneCountryCode === UAE_CODE,
    then: Yup.string().matches(UAE_LANDLINE_PHONE_REGEX, "This is not a valid phone"),
    otherwise: Yup.string()
      .matches(NUMBER_REGEX, "This is not a valid phone not number (wrong characters)")
      .min(MIN_NON_UAE_PHONE_LENGTH, "This is not a valid phone (min length is not reached)")
      .test("length validation", "This is not a valid phone (max length exceeded)", function() {
        const { primaryPhoneCountryCode = "", primaryPhoneNo = "" } = this.parent;
        return primaryPhoneCountryCode.length + primaryPhoneNo.length <= MAX_NON_UAE_PHONE_LENGTH;
      })
  })
});

const PreferredContactInformationStep = ({ isSignatory, index, handleContinue }) => (
  <Formik
    initialValues={{
      primaryEmail: "",
      primaryMobCountryCode: "",
      primaryMobileNo: "",
      primaryPhoneCountryCode: "",
      primaryPhoneNo: ""
    }}
    onSubmit={handleContinue}
    validationSchema={isSignatory && preferredContactInformationSchema}
    validateOnChange={false}
  >
    {withCompanyStakeholder(index, () => (
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
                component={CustomSelect}
                shrink={false}
                disabled={!isSignatory}
                datalistId="countryCode"
              />

              <Field
                name="primaryMobileNo"
                path={`prospect.signatoryInfo[${index}].contactDetails.primaryMobileNo`}
                label="Mobile Number"
                placeholder="55xxxxxxx"
                shrink={true}
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
                component={CustomSelect}
                shrink={false}
                disabled={!isSignatory}
                datalistId="countryCode"
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

        <SubmitButton />
      </Form>
    ))}
  </Formik>
);

const mapStateToProps = (state, { index }) => ({
  isSignatory: getInputValueById(state, "SigKycd.isSignatory", [index])
});

export const PreferredContactInformation = connect(mapStateToProps)(
  PreferredContactInformationStep
);

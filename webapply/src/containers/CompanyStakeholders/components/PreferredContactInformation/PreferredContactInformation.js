import React, { useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import get from "lodash/get";

import { SubmitButton } from "./../SubmitButton/SubmitButton";
import {
  AutoSaveField as Field,
  CustomSelect,
  Input,
  InputGroup
} from "../../../../components/Form";
import { withCompanyStakeholder } from "../withCompanyStakeholder";
import { getSignatories } from "../../../../store/selectors/appConfig";
import {
  UAE_MOBILE_PHONE_REGEX,
  UAE_LANDLINE_PHONE_REGEX,
  NUMBER_REGEX,
  MIN_NON_UAE_PHONE_LENGTH,
  MAX_NON_UAE_PHONE_LENGTH
} from "../../../../utils/validation";
import { UAE_CODE, MAX_EMAIL_LENGTH } from "../../../../constants";
import { getInvalidMessage, getRequiredMessage } from "../../../../utils/getValidationMessage";

const preferredContactInformationSchema = Yup.object().shape({
  primaryEmail: Yup.string()
    .required(getRequiredMessage("E-mail address"))
    .email(getInvalidMessage("E-mail address"))
    .max(50, getInvalidMessage("E-mail address")),
  primaryMobCountryCode: Yup.string().required(getRequiredMessage("Country code")),
  primaryMobileNo: Yup.string()
    .required(getRequiredMessage("Mobile number"))
    .when("primaryMobCountryCode", {
      is: primaryMobCountryCode => primaryMobCountryCode === UAE_CODE,
      then: Yup.string().matches(UAE_MOBILE_PHONE_REGEX, getInvalidMessage("Mobile number")),
      otherwise: Yup.string()
        .matches(NUMBER_REGEX, getInvalidMessage("Mobile number"))
        .min(MIN_NON_UAE_PHONE_LENGTH, "Field Mobile number is invalid (min length is not reached)")
        .test(
          "length validation",
          "Field Mobile number is invalid (max length exceeded)",
          function() {
            const { primaryMobCountryCode = "", primaryMobileNo = "" } = this.parent;
            return (
              primaryMobCountryCode.length + primaryMobileNo.length <= MAX_NON_UAE_PHONE_LENGTH
            );
          }
        )
    }),
  primaryPhoneNo: Yup.string().when("primaryPhoneCountryCode", {
    is: primaryPhoneCountryCode => primaryPhoneCountryCode === UAE_CODE,
    then: Yup.string().matches(UAE_LANDLINE_PHONE_REGEX, "Field Landline number is invalid"),
    otherwise: Yup.string()
      .matches(NUMBER_REGEX, getInvalidMessage("Landline number"))
      .min(MIN_NON_UAE_PHONE_LENGTH, "Field Landline number is invalid (min length is not reached)")
      .test(
        "length validation",
        "Field Landline number is invalid (max length exceeded)",
        function() {
          const { primaryPhoneCountryCode = "", primaryPhoneNo = "" } = this.parent;
          return primaryPhoneCountryCode.length + primaryPhoneNo.length <= MAX_NON_UAE_PHONE_LENGTH;
        }
      )
  })
});

const PreferredContactInformationStep = ({ isSignatory, index, handleContinue }) => {
  const handleContinueGA = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <Formik
      initialValues={{
        primaryEmail: "",
        primaryMobCountryCode: "",
        primaryMobileNo: "",
        primaryPhoneCountryCode: "",
        primaryPhoneNo: ""
      }}
      onSubmit={handleContinueGA}
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
                label="E-mail address"
                placeholder="E-mail address"
                component={Input}
                disabled={!isSignatory}
                InputProps={{
                  inputProps: { maxLength: MAX_EMAIL_LENGTH, tabIndex: 0 }
                }}
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
                  inputProps={{ tabIndex: 0 }}
                />

                <Field
                  name="primaryMobileNo"
                  path={`prospect.signatoryInfo[${index}].contactDetails.primaryMobileNo`}
                  label="Mobile Number"
                  placeholder="55xxxxxxx"
                  component={Input}
                  disabled={!isSignatory}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
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
                  inputProps={{ tabIndex: 0 }}
                />

                <Field
                  name="primaryPhoneNo"
                  path={`prospect.signatoryInfo[${index}].contactDetails.primaryPhoneNo`}
                  label="Landline number (optional)"
                  placeholder="Landline number (optional)"
                  component={Input}
                  disabled={!isSignatory}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                />
              </InputGroup>
            </Grid>
          </Grid>

          <SubmitButton />
        </Form>
      ))}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  isSignatory: get(getSignatories(state)[index], "kycDetails.isSignatory", false)
});

export const PreferredContactInformation = connect(mapStateToProps)(
  PreferredContactInformationStep
);

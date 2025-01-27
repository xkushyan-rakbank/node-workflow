import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { differenceInYears, format, isValid } from "date-fns";
import cx from "classnames";

import {
  Input,
  DatePicker,
  AutoSaveField as Field,
  NumberFormat,
  SelectAutocomplete
} from "../../../components/Form";
import { ContinueButton } from "../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../components/InfoTitle";
import { MAX_LICENSE_NUMBER_LENGTH, MAX_YEARS_IN_BUSINESS_LENGTH } from "../constants";
import { UAE, DATE_FORMAT } from "../../../constants";
import {
  getRequiredMessage,
  getInvalidMessage,
  getMinDateMessage
} from "../../../utils/getValidationMessage";
import { useStyles } from "./styled";
import { LICENSE_NUMBER_REGEX } from "../../../utils/validation";

const initialValues = {
  licenseNumber: "",
  licenseIssueDate: "",
  licenseIssuingAuthority: "",
  countryOfIncorporation: UAE,
  dateOfIncorporation: "",
  yearsInBusiness: ""
};

const licenseInformationSchema = () =>
  Yup.object({
    licenseNumber: Yup.string()
      .required(getRequiredMessage("License number"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_LICENSE_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(LICENSE_NUMBER_REGEX, getInvalidMessage("License number")),
    licenseIssueDate: Yup.date()
      .nullable()
      .min(new Date(1900, 0, 1), getMinDateMessage("License issuing date"))
      .max(new Date(), getInvalidMessage("License issuing date"))
      .typeError(getInvalidMessage("License issuing date"))
      .required(getRequiredMessage("License issuing date")),
    countryOfIncorporation: Yup.string().required(getRequiredMessage("Country of incorporation")),
    licenseIssuingAuthority: Yup.string().required(getRequiredMessage("License issuing authority")),
    dateOfIncorporation: Yup.date()
      .nullable()
      .min(new Date(1900, 0, 1), getMinDateMessage("Date of incorporation"))
      .max(new Date(), getInvalidMessage("Date of incorporation"))
      .typeError(getInvalidMessage("Date of incorporation"))
      .required(getRequiredMessage("Date of incorporation")),
    yearsInBusiness: Yup.number()
      .min(0, "Must be more than 0")
      .typeError(getInvalidMessage("Years in business"))
      .integer(getInvalidMessage("Years in business"))
  });

const changeDateProspectHandler = (_, value, path) =>
  isValid(value) && { [path]: format(value, DATE_FORMAT) };

export const LicenseInformation = ({ handleContinue, createFormChangeHandler }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={licenseInformationSchema}
      onSubmit={handleContinue}
    >
      {createFormChangeHandler(({ setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Field
                name="licenseNumber"
                label="License number"
                path="prospect.organizationInfo.licenseNumber"
                component={Input}
                InputProps={{
                  inputProps: { maxLength: MAX_LICENSE_NUMBER_LENGTH, tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="licenseIssueDate"
                label="License issuing date"
                path="prospect.organizationInfo.licenseIssueDate"
                component={DatePicker}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
                changeProspect={changeDateProspectHandler}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Field
                name="licenseIssuingAuthority"
                label="License issuing authority"
                path="prospect.organizationInfo.licenseIssuingAuthority"
                datalistId="licenseIssuingAuthority"
                isSearchable
                component={SelectAutocomplete}
                tabIndex="0"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="countryOfIncorporation"
                label="Country of incorporation"
                path="prospect.organizationInfo.countryOfIncorporation"
                datalistId="countryOfIncorporation"
                contextualHelpText="This should be same as in Trade License. If the Company does not hold an UAE Trade License, please share company registration details as per other company documents"
                contextualHelpProps={{ isDisableHoverListener: false }}
                isSearchable
                component={SelectAutocomplete}
                tabIndex="0"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Field
                name="dateOfIncorporation"
                label="Date of incorporation"
                path="prospect.organizationInfo.dateOfIncorporation"
                contextualHelpText="This should be same as in Trade License. If the Company does not hold an UAE Trade License, please share company registration details as per other company documents"
                contextualHelpProps={{ isDisableHoverListener: false }}
                component={DatePicker}
                onChange={value => {
                  setFieldValue("dateOfIncorporation", value);
                  setFieldValue("yearsInBusiness", differenceInYears(new Date(), value));
                }}
                changeProspect={changeDateProspectHandler}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="yearsInBusiness"
                label="Years in business (optional)"
                path="prospect.orgKYCDetails.yearsInBusiness"
                contextualHelpText="The number of years the company has been in business"
                contextualHelpProps={{ isDisableHoverListener: false }}
                component={Input}
                InputProps={{
                  inputComponent: NumberFormat,
                  inputProps: {
                    maxLength: MAX_YEARS_IN_BUSINESS_LENGTH,
                    tabIndex: 0,
                    allowNegative: false,
                    decimalScale: 0
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            className={cx(classes.continueButton, classes.continueButtonContainer)}
          >
            <InfoTitle title="These details be the same as in your Trade License" />
            <span className={classes.continueBtn}>
              <ContinueButton type="submit" />
            </span>
          </Grid>
        </Form>
      ))}
    </Formik>
  );
};

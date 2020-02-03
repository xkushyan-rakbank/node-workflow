import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { differenceInYears, format, isValid } from "date-fns";

import {
  Input,
  DatePicker,
  AutoSaveField as Field,
  NumberFormat,
  SelectAutocomplete
} from "../../../components/Form";
import { ContinueButton } from "../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../components/Notifications";
import { ALPHANUMERIC_WITH_HYPHEN_REGEX } from "../../../utils/validation";
import { MAX_LICENSE_NUMBER_LENGTH } from "../constants";
import { UAE, DATE_FORMAT } from "../../../constants";
import { getRequiredMessage, getInvalidMessage } from "../../../utils/getValidationMessage";
import { useStyles } from "../styled";

const initialValues = {
  licenseNumber: "",
  licenseIssueDate: "",
  licenseIssuingAuthority: "",
  countryOfIncorporation: UAE,
  dateOfIncorporation: "",
  yearsInBusiness: ""
};

const licenseInformationSchema = Yup.object({
  licenseNumber: Yup.string()
    .required(getRequiredMessage("License number"))
    .matches(ALPHANUMERIC_WITH_HYPHEN_REGEX, getInvalidMessage("License number")),
  licenseIssueDate: Yup.date().required(getRequiredMessage("License issuing date")),
  countryOfIncorporation: Yup.string().required(getRequiredMessage("Country of incorporation")),
  licenseIssuingAuthority: Yup.string().required(getRequiredMessage("License issuing authority")),
  dateOfIncorporation: Yup.date().required(getRequiredMessage("Date of incorporation")),
  yearsInBusiness: Yup.number()
    .typeError("Not valid number")
    .min(0, "Must be more than 0")
    .max(999, "Must be less than 1000")
    .integer(getInvalidMessage("Years in business"))
});

const changeDateProspectHandler = (_, value, path) =>
  isValid(value) && { [path]: format(value, DATE_FORMAT) };

export const LicenseInformation = ({ handleContinue }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={licenseInformationSchema}
      onSubmit={handleContinue}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <Field
                name="licenseNumber"
                label="License number"
                path="prospect.organizationInfo.licenseNumber"
                contextualHelpText="If License Number contains hyphen (-), oblique (/), spaces or any other special character please enter only alphabets and numbers.Example CN-123/2018/456 to be entered as CN1232018456"
                component={Input}
                InputProps={{
                  inputProps: { maxLength: MAX_LICENSE_NUMBER_LENGTH, tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
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
            <Grid item md={6} sm={12}>
              <Field
                name="licenseIssuingAuthority"
                label="License issuing authority"
                path="prospect.organizationInfo.licenseIssuingAuthority"
                datalistId="licenseIssuingAuthority"
                isSearchable={false}
                component={SelectAutocomplete}
                inputProps={{ tabIndex: 0 }}
                otherProps={{ menuFullWidth: true, sinleValueWrap: true }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="countryOfIncorporation"
                label="Country of incorporation"
                path="prospect.organizationInfo.countryOfIncorporation"
                datalistId="countryOfIncorporation"
                contextualHelpText="This should be the same as in Trade License. If the Company does not hold an UAE Trade License, please share company registration details as per other company documents"
                contextualHelpProps={{ isDisableHoverListener: false }}
                isSearchable
                component={SelectAutocomplete}
                inputProps={{ tabIndex: 0 }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <Field
                name="dateOfIncorporation"
                label="Date of incorporation"
                path="prospect.organizationInfo.dateOfIncorporation"
                contextualHelpText="This should be the same as in Trade License. If the Company does not hold an UAE Trade License, please share company registration details as per other company documents"
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
            <Grid item md={6} sm={12}>
              <Field
                name="yearsInBusiness"
                label="Years in business (Optional)"
                path="prospect.orgKYCDetails.yearsInBusiness"
                contextualHelpText="The number of years the company has been in business"
                contextualHelpProps={{ isDisableHoverListener: false }}
                component={Input}
                InputProps={{
                  inputComponent: NumberFormat,
                  inputProps: { tabIndex: 0, allowNegative: false, decimalScale: 0 }
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            className={classes.continueButton}
          >
            <InfoTitle title="These details be the same as in your Trade License" />
            <ContinueButton type="submit" />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

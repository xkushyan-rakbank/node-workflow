import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { Input, DatePicker, CustomSelect, AutoSaveField as Field } from "../../../components/Form";
import { ContinueButton } from "../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../components/Notifications";
import { ALPHANUMERIC_REGEX } from "../../../utils/validation";
import { UAE } from "../../../constants";

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
    .required("You need to provide license number")
    .max(20, "Maximum 20 characters allowed")
    .matches(ALPHANUMERIC_REGEX, "This is not a valid trade license number"),
  licenseIssueDate: Yup.date().required("You need to provide issue date"),
  countryOfIncorporation: Yup.string().required("You need to provide country incorporation"),
  licenseIssuingAuthority: Yup.string().required("You need to provide license issuing authority"),
  dateOfIncorporation: Yup.date().required("You need to provide issue date")
});

export const LicenseInformation = ({ handleContinue }) => (
  <Formik
    initialValues={initialValues}
    validateOnChange={false}
    validationSchema={licenseInformationSchema}
    onSubmit={handleContinue}
  >
    {() => (
      <Form>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Field
              name="licenseNumber"
              label="License number"
              path="prospect.organizationInfo.licenseNumber"
              contexualHelpText="If License Number contains hyphen (-), oblique (/), spaces or any other special character please enter only alphabets and numbers.Example CN-123/2018/456 to be entered as CN1232018456"
              component={Input}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <Field
              name="licenseIssueDate"
              label="License issuing date"
              path="prospect.organizationInfo.licenseIssueDate"
              component={DatePicker}
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
              component={CustomSelect}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <Field
              name="countryOfIncorporation"
              label="Country of incorporation"
              path="prospect.organizationInfo.countryOfIncorporation"
              datalistId="countryOfIncorporation"
              contexualHelpText="This should be the same as in Traву License. If the Company does not hold  an UAE Trade License, please share company registration details as per other company documents"
              contexualHelpProps={{ isDisableHoverListener: false }}
              component={CustomSelect}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Field
              name="dateOfIncorporation"
              label="Date of incorporation"
              path="prospect.organizationInfo.dateOfIncorporation"
              contexualHelpText="This should be the same as in Traву License. If the Company does not hold  an UAE Trade License, please share company registration details as per other company documents"
              contexualHelpProps={{ isDisableHoverListener: false }}
              component={DatePicker}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <Field
              name="yearsInBusiness"
              label="Years in business (Optional)"
              path="prospect.orgKYCDetails.yearsInBusiness"
              component={Input}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-between" style={{ padding: 20 }}>
          <Grid item xs={9}>
            <InfoTitle title="These details be the same as in your Trade License" />
          </Grid>
          <Grid item xs={3}>
            <ContinueButton type="submit" />
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>
);

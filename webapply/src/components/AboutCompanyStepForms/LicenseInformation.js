import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import pick from "lodash/pick";
import Grid from "@material-ui/core/Grid";

import { Input, DatePicker, CustomSelect, AutoSaveField as Field } from "../../components/Form";
import { ContinueButton } from "./../Buttons/ContinueButton";
import { InfoTitle } from "./../Notifications";
import { prospect } from "./../../constants/config";
import { licenseIssuingAuthority, countryOfIncorporation } from "./../../constants/options";
import { NUMBER_REGEX } from "./../../utils/validation";

const initialValues = pick(prospect.organizationInfo, [
  "licenseNumber",
  "licenseIssueDate",
  "licenseIssuingAuthority",
  "countryOfIncorporation",
  "dateOfIncorporation",
  "yearsInBusiness"
]);

const licenseInformationSchema = Yup.object({
  licenseNumber: Yup.string()
    .required("You need to provide license number")
    .matches(NUMBER_REGEX, "This is not a valid license number")
});

export const LicenseInformation = ({ handleContinue }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={licenseInformationSchema}
    onSubmit={handleContinue}
  >
    {({ values, setFieldValue }) => (
      <Form>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Field
              name="licenseNumber"
              label="License number"
              path="prospect.organizationInfo.licenseNumber"
              component={Input}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <Field
              name="licenseIssueDate"
              label="Date of lisence issuing"
              path="prospect.organizationInfo.licenseIssueDate"
              component={DatePicker}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Field
              name="licenseIssuingAuthority"
              label="Lisence Issuing authority"
              path="prospect.organizationInfo.licenseIssuingAuthority"
              options={licenseIssuingAuthority}
              component={CustomSelect}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <Field
              name="countryOfIncorporation"
              label="Country of incorporation"
              path="prospect.organizationInfo.countryOfIncorporation"
              options={countryOfIncorporation}
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

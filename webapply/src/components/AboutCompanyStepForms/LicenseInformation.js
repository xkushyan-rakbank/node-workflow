import React from "react";
import { Formik, Form } from "formik";
import pick from "lodash/pick";
import Grid from "@material-ui/core/Grid";

import { Input, DatePicker, CustomSelect, AutoSaveField as Field } from "../../components/Form";
import { ContinueButton } from "./../Buttons/ContinueButton";
import { InfoTitle } from "./../Notifications";
import { prospect } from "./../../constants/config";
import { licenseIssuingAuthority, countryOfIncorporation } from "./../../constants/options";

const initialValues = pick(prospect.organizationInfo, [
  "licenseNumber",
  "licenseIssueDate",
  "licenseIssuingAuthority",
  "countryOfIncorporation",
  "dateOfIncorporation",
  "yearsInBusiness"
]);

const licenseInformationSchema = {};

export const LicenseInformation = ({ handleContinue }) => {
  // const maxYearsInBusiness = new Date().getFullYear();

  return (
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
                label="License issue date"
                path="prospect.organizationInfo.licenseIssueDate"
                component={DatePicker}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <Field
                name="licenseIssuingAuthority"
                label="License Issuing Authority"
                path="prospect.organizationInfo.licenseIssuingAuthority"
                options={licenseIssuingAuthority}
                component={CustomSelect}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="countryOfIncorporation"
                label="Country Of Incorporation"
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
                label="Date Of Incorporation"
                path="prospect.organizationInfo.dateOfIncorporation"
                component={DatePicker}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="yearsInBusiness"
                label="Years In Business"
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
};

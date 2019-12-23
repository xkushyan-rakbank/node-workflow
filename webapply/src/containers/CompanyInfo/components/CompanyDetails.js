import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { Input, SelectAutocomplete, AutoSaveField as Field } from "../../../components/Form";
import { ContinueButton } from "../../../components/Buttons/ContinueButton";
import { COMPANY_NAME_REGEX, VAT_REGISTRATION_NUMBER } from "../../../utils/validation";

const initialValues = {
  companyName: "",
  vatRegistrationNumber: "",
  numberOfEmployees: "",
  companyCategory: ""
};

const companyDetailsSchema = Yup.object({
  companyName: Yup.string()
    .required("You need to provide company name")
    .matches(COMPANY_NAME_REGEX, "This is not a valid company name"),
  vatRegistrationNumber: Yup.string().matches(
    VAT_REGISTRATION_NUMBER,
    "Not allowed special characters"
  ),
  numberOfEmployees: Yup.number()
    .min(0, "must be more than 0")
    .max(1000, "must be less than or equal to 1000"),
  companyCategory: Yup.string()
});

export const CompanyDetails = ({ handleContinue }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={companyDetailsSchema}
    onSubmit={handleContinue}
  >
    {() => (
      <Form>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Field
              name="companyName"
              label="Company Name"
              path="prospect.organizationInfo.companyName"
              contexualHelpText="if the Company's name is more than 30 characters long, than an abbreviation needs to be entered and that this abbreviation will appear in all Bank records including Cheque Books."
              infoTitle="This should be the same as in your Trade License"
              component={Input}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <Field
              name="companyCategory"
              label="Company Category"
              path="prospect.orgKYCDetails.companyCategory"
              datalistId="companyCategory"
              component={SelectAutocomplete}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Field
              name="vatRegistrationNumber"
              label="VAT registration number (Optional)"
              path="prospect.organizationInfo.vatRegistrationNumber"
              infoTitle="This should be the same as your TRN number of UAE"
              component={Input}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <Field
              name="numberOfEmployees"
              label="Number of employees"
              path="prospect.organizationInfo.numberOfEmployees"
              component={Input}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-end" style={{ padding: 20 }}>
          <ContinueButton type="submit" />
        </Grid>
      </Form>
    )}
  </Formik>
);

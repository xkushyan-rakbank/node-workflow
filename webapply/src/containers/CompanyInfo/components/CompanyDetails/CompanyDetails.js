import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { Input, SelectAutocomplete, AutoSaveField as Field } from "../../../../components/Form";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { COMPANY_NAME_REGEX, NUMBER_REGEX } from "../../../../utils/validation";
import { MAX_COMPANY_NAME_LENGTH } from "../../constants";
import { NumberOfEmployeesInput } from "./NumberOfEmployeesInput";

const initialValues = {
  companyName: "",
  vatRegistrationNumber: "",
  numberOfEmployees: "0",
  companyCategory: ""
};

const companyDetailsSchema = Yup.object({
  companyName: Yup.string()
    .required("You need to provide company name")
    .matches(COMPANY_NAME_REGEX, "This is not a valid company name"),
  vatRegistrationNumber: Yup.string()
    .max(15, "Maximum 15 characters allowed")
    .matches(NUMBER_REGEX, "Not valid number"),
  numberOfEmployees: Yup.number()
    .typeError("Not valid number")
    .min(0, "Must be more than or equal to 0")
    .max(1000, "Must be less than or equal to 1000")
    .integer("Must be an integer"),
  companyCategory: Yup.string().required("You need to provide company category")
});

export const CompanyDetails = ({ handleContinue }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={companyDetailsSchema}
      validateOnChange={false}
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
                contextualHelpText="The company name given here will appear in all Bank records including Cheque Books. If the Company's name in Trade License is more than 30 characters long (including space), then an abbreviation can be used. Example If the company name is 'Airlift Global Automation and Heavy Equipment Rental LLC', mention the company name as 'Airlift Global Automation H E R'"
                infoTitle="This should be the same as in your Trade License"
                component={Input}
                InputProps={{
                  inputProps: { maxLength: MAX_COMPANY_NAME_LENGTH, tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="companyCategory"
                label="Company Category"
                path="prospect.orgKYCDetails.companyCategory"
                contextualHelpText="Select Foreign / Offshore / Non-Resident company if applicable. In case of a Free Zone company  select Free Zone. In case of Civil Company select  Partnerships. Select appropriate category in all other cases"
                datalistId="companyCategory"
                component={SelectAutocomplete}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <Field
                name="vatRegistrationNumber"
                label="VAT registration number (Optional)"
                placeholder="123456789012345"
                shrink={true}
                path="prospect.organizationInfo.vatRegistrationNumber"
                infoTitle="This should be the same as your TRN number of UAE"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="numberOfEmployees"
                label="Number of employees"
                path="prospect.organizationInfo.numberOfEmployees"
                component={Input}
                changeProspect={(_, value, path) => ({ [path]: value || "0" })}
                InputProps={{
                  inputComponent: NumberOfEmployeesInput,
                  inputProps: { tabIndex: 0 }
                }}
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
};

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Input, AutoSaveField as Field, SelectAutocomplete } from "../../../../components/Form";

import {
  NUMBER_REGEX,
  SPECIAL_CHARACTERS_REGEX,
  checkIsTrimmed
} from "../../../../utils/validation";
import {
  MAX_COMPANY_FULL_NAME_LENGTH,
  MAX_COMPANY_NAME_LENGTH,
  MAX_COMPANY_SHORT_NAME_LENGTH
} from "../../constants";
import { getInvalidMessage, getRequiredMessage } from "../../../../utils/getValidationMessage";

const initialValues = {
  companyName: "",
  companyShortName: "",
  companyCategory: ""
};

const companyDetailsSchema = () =>
  Yup.object({
    companyName: Yup.string()
      .required(getRequiredMessage("Company name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_COMPANY_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Company name"))
      .test("space validation", getInvalidMessage("Company name"), checkIsTrimmed),
    vatRegistrationNumber: Yup.string().matches(
      NUMBER_REGEX,
      getInvalidMessage("Registration number")
    ),
    numberOfEmployees: Yup.number()
      .typeError("Not valid number")
      .min(0, "Must be more than or equal to 0")
      .max(99999, "Must be less than or equal to 99,999")
      .integer(getInvalidMessage("Number of employees")),
    companyCategory: Yup.string().required(getRequiredMessage("Company category"))
  });

export const CompanyDetails = ({ handleContinue }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={companyDetailsSchema}
      validateOnChange={false}
      onSubmit={handleContinue}
    >
      <Form>
        <Field
          name="companyName"
          label="Company’s full name"
          path="prospect.organizationInfo.companyName"
          contextualHelpText="The company name given here will appear in all Bank records including Cheque Books. If the Company's name in Trade License is more than 50 characters long (including space), then an abbreviation can be used. Example If the company name is 'Airlift Global Automation and Heavy Equipment Rental LLC', mention the company name as 'Airlift Global Automation H E R'"
          fieldDescription="This should be the same as shown on your trade licence.                            "
          component={Input}
          InputProps={{
            inputProps: { maxLength: MAX_COMPANY_FULL_NAME_LENGTH, tabIndex: 0 }
          }}
        />
        <Field
          name="companyShortName"
          label="Shortened company name"
          path="prospect.organizationInfo.shortName"
          fieldDescription="To keep things simple, we'll use this shortened name for the account and chequebook.                     "
          component={Input}
          InputProps={{
            inputProps: { maxLength: MAX_COMPANY_SHORT_NAME_LENGTH, tabIndex: 0 }
          }}
        />
        <Field
          name="companyCategory"
          label="Company category"
          path="prospect.organizationInfo.companyCategory"
          datalistId="companyCategory"
          isSearchable
          component={SelectAutocomplete}
          tabIndex="0"
        />
      </Form>
    </Formik>
  );
};

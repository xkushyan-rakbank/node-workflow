import React from "react";

import { Input, AutoSaveField as Field, SelectAutocomplete } from "../../../../components/Form";

import { MAX_COMPANY_FULL_NAME_LENGTH, MAX_COMPANY_SHORT_NAME_LENGTH } from "../../constants";

export const CompanyDetails = () => {
  return (
    <>
      <Field
        name="companyName"
        label="Company’s full name"
        path="prospect.organizationInfo.companyName"
        fieldDescription="This should be the same as shown on your trade licence."
        component={Input}
        InputProps={{
          inputProps: { maxLength: MAX_COMPANY_FULL_NAME_LENGTH, tabIndex: 0 }
        }}
      />
      <Field
        name="shortName"
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
    </>
  );
};

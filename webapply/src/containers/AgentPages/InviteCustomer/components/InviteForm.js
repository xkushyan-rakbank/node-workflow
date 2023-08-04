import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  Input,
  AutoSaveField as Field,
  InputGroup,
  LinkedField,
  CustomSelect,
  SelectAutocomplete
} from "../../../../components/Form";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { ALPHANUMERIC_REGEX, NAME_REGEX, NUMBER_REGEX } from "../../../../utils/validation";
import {
  getInvalidMessage,
  getRequiredMessage,
  getROInvalidMessage
} from "../../../../utils/getValidationMessage";

import { useStyles } from "./styled";
import { UAE_CODE } from "../../../../constants";
import { accountTypeOptions, productVariantOptions } from "../../../../constants/options";
import { MAX_COMPANY_FULL_NAME_LENGTH } from "../../../CompanyInfo/constants";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";

const inviteSchema = Yup.object({
  custName: Yup.string()
    .required("Please enter your name")
    .max(100, "Maximum 100 characters allowed")
    .matches(NAME_REGEX, "Please remove any special character from your name"),
  custEmail: Yup.string()
    .required(getRequiredMessage("Email"))
    .max(50, "Maximum 50 characters allowed")
    .email("Please enter a valid email address without any special characters"),
  company: Yup.string()
    .required(getRequiredMessage("Company’s full name"))
    // eslint-disable-next-line no-template-curly-in-string
    .max(MAX_COMPANY_FULL_NAME_LENGTH, "Maximum ${max} characters allowed"),
  countryCode: Yup.string().required(getRequiredMessage("Country code")),
  mobileNo: Yup.string()
    .required(getRequiredMessage("Mobile Number"))
    .phoneNo({
      codeFieldName: "countryCode",
      fieldName: "Mobile Number",
      message: "Please enter a valid mobile number"
    }),
  roCode: Yup.string()
    .max(6, "Maximum 6 characters allowed")
    .matches(NUMBER_REGEX, getROInvalidMessage),
  allianceCode: Yup.string()
    .max(50, "Maximum 50 characters allowed")
    .matches(ALPHANUMERIC_REGEX, getInvalidMessage("Partner Code"))
});

export const InviteForm = ({ submitForm, isLoading }) => {
  const classes = useStyles();

  return (
    <div className={classes.baseForm}>
      <h2>Send Invite</h2>
      <p className="formDescription">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Please enter the below details to send the link
      </p>
      <Formik
        initialValues={{
          custName: "",
          custEmail: "",
          company: "",
          countryCode: UAE_CODE,
          mobileNo: "",
          companyCategory: "",
          accountType: "",
          productVariant: ""
        }}
        validationSchema={inviteSchema}
        validateOnChange={true}
        onSubmit={submitForm}
      >
        {({ isValid }) => {
          return (
            <Form>
              <Field
                name="custName"
                label="Customer Name"
                placeholder="Customer Name"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
              <Field
                name="company"
                label="Name of the company"
                placeholder="Name of the company"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
              <Field
                name="custEmail"
                label="Customer email address"
                placeholder="Customer email address"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
              <InputGroup>
                <LinkedField
                  name="countryCode"
                  disabled
                  linkedFieldName="mobileNo"
                  path="countryCode"
                  required
                  datalistId="countryCode"
                  component={CustomSelect}
                  shrink={false}
                  inputProps={{ tabIndex: 0 }}
                />
                <LinkedField
                  name="mobileNo"
                  linkedFieldName="countryCode"
                  path="mobileNo"
                  label="Mobile number"
                  placeholder="Mobile number"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  isLoadDefaultValueFromStore={false}
                />
              </InputGroup>
              <Field
                name="companyCategory"
                label="Company category"
                path="companyCategory"
                datalistId="companyCategory"
                isSearchable
                component={SelectAutocomplete}
                tabIndex="0"
              />
              <Field
                name="accountType"
                label="Account type"
                isSearchable
                options={accountTypeOptions}
                component={SelectAutocomplete}
                tabIndex="0"
              />
              <Field
                name="productVariant"
                label="Product Variant"
                isSearchable
                options={productVariantOptions}
                component={SelectAutocomplete}
                tabIndex="0"
              />

              <div className="linkContainer">
                <BackLink path={routes.login} />
                <SubmitButton justify="flex-end" label="Submit" disabled={!isValid || isLoading} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

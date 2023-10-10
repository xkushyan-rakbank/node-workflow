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
import { Footer } from "../../../../components/Footer";

const inviteSchema = Yup.object({
  custName: Yup.string()
    .required("Please enter your name")
    .max(50, "Maximum 50 characters allowed")
    .matches(NAME_REGEX, "Please remove any special character from your name"),
  custEmail: Yup.string()
    .required(getRequiredMessage("Email"))
    .max(50, "Maximum 50 characters allowed")
    .email("Please enter a valid email address without any special characters"),
  companyName: Yup.string()
    .required(getRequiredMessage("Company’s full name"))
    // eslint-disable-next-line no-template-curly-in-string
    .max(MAX_COMPANY_FULL_NAME_LENGTH, "Maximum ${max} characters allowed"),
  custMobcntCode: Yup.string().required(getRequiredMessage("Country code")),
  custMobileNum: Yup.string()
    .required(getRequiredMessage("Mobile Number"))
    .phoneNo({
      codeFieldName: "custMobcntCode",
      fieldName: "Mobile Number",
      message: "Please enter a valid mobile number"
    }),
  roCode: Yup.string()
    .max(6, "Maximum 6 characters allowed")
    .matches(NUMBER_REGEX, getROInvalidMessage),
  FreeText1: Yup.string()
    .max(50, "Maximum 50 characters allowed")
    .matches(ALPHANUMERIC_REGEX, getInvalidMessage("Partner Code")),
  isIslamic: Yup.boolean().required("Please select the product variant"),
  persona: Yup.string().required("Please select the company category"),
  accountType: Yup.string().required("Please select the account type")
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
          companyName: "",
          custMobcntCode: UAE_CODE,
          custMobileNum: "",
          persona: "",
          accountType: "",
          isIslamic: "",
          FreeText1: ""
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
                  inputProps: { tabIndex: 0, maxLength: 50 }
                }}
                fieldDescription="Enter customers full name as shown on passport."
              />
              <Field
                name="companyName"
                label="Name of the company"
                placeholder="Name of the company"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0, maxLength: 255 }
                }}
                fieldDescription="This should be the same as shown on customers trade licence."
              />
              <Field
                name="custEmail"
                label="Customer email address"
                placeholder="Customer email address"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
                fieldDescription="This number will be used to open the account. We'll send a one-time password (OTP) to it for verification."
              />
              <InputGroup>
                <LinkedField
                  name="custMobcntCode"
                  disabled
                  linkedFieldName="custMobileNum"
                  path="custMobcntCode"
                  required
                  datalistId="countryCode"
                  component={CustomSelect}
                  shrink={false}
                  inputProps={{ tabIndex: 0 }}
                />
                <LinkedField
                  name="custMobileNum"
                  linkedFieldName="custMobcntCode"
                  path="custMobileNum"
                  label="Mobile number"
                  placeholder="Mobile number"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  isLoadDefaultValueFromStore={false}
                  fieldDescription="This number will be used to open the account. We'll send a one-time password (OTP) to it for verification."
                />
              </InputGroup>
              <Field
                name="persona"
                label="Company category"
                path="persona"
                datalistId="personas"
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
                name="isIslamic"
                label="Product Variant"
                isSearchable
                options={productVariantOptions}
                component={SelectAutocomplete}
                tabIndex="0"
              />
              <Field
                name="FreeText1"
                label="Partner code"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0, maxLength: 50 }
                }}
              />

              <Footer>
                <BackLink path={routes.searchProspect} isTypeButton={true} />
                <SubmitButton justify="flex-end" label="Submit" disabled={!isValid || isLoading} />
              </Footer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

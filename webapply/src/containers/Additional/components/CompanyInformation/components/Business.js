import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { TopCustomers } from "./TopCustomers";
import { getInvalidMessage, getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { SPECIAL_CHARACTERS_REGEX, checkIsTrimmed } from "../../../../../utils/validation";
import { TopSuppliers } from "./TopSuppliers";

const additionalCompanyInfoSchema = Yup.object().shape({
  topCustomers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        // eslint-disable-next-line no-template-curly-in-string
        .max(255, "Maximum ${max} characters allowed")
        .required(getRequiredMessage("Customer name"))
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Customer name"))
        .test("space validation", getInvalidMessage("Customer name"), checkIsTrimmed),
      country: Yup.string().required(getRequiredMessage("Country"))
    })
  ),
  topSuppliers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required(getRequiredMessage("Supplier name"))
        // eslint-disable-next-line no-template-curly-in-string
        .max(255, "Maximum ${max} characters allowed")
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Supplier name"))
        .test("space validation", getInvalidMessage("Supplier name"), checkIsTrimmed),
      country: Yup.string().required(getRequiredMessage("Country"))
    })
  )
});

export const BusinessRelationship = ({ topCustomers, topSuppliers }) => {
  const initialValues = {
    topCustomers,
    topSuppliers
  };
  const initialIsValid = additionalCompanyInfoSchema.isValidSync(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={additionalCompanyInfoSchema}
      onSubmit={() => {}}
      validateOnChange={false}
    >
      {props => {
        return (
          <Form>
            <Accordion
              title={"Business relationships"}
              id={"business"}
              isCompleted={initialIsValid && props.isValid}
            >
              <TopCustomers topCustomers={topCustomers} {...props} />
              <TopSuppliers topSuppliers={topSuppliers} {...props} />
            </Accordion>
          </Form>
        );
      }}
    </Formik>
  );
};

import React, { forwardRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { TopCustomers } from "./TopCustomers";
import {
  getInvalidMessage,
  getNotTrimmedMessage,
  getRequiredMessage
} from "../../../../../utils/getValidationMessage";
import { SPECIAL_CHARACTERS_REGEX, checkIsTrimmed } from "../../../../../utils/validation";
import { TopSuppliers } from "./TopSuppliers";
import { useStyles } from "../../styled";

const additionalCompanyInfoSchema = Yup.object().shape({
  topCustomers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        // eslint-disable-next-line no-template-curly-in-string
        .max(255, "Maximum ${max} characters allowed")
        .required(getRequiredMessage("Customer name"))
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Customer name"))
        .test("space validation", getNotTrimmedMessage("Customer name"), checkIsTrimmed),
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
        .test("space validation", getNotTrimmedMessage("Supplier name"), checkIsTrimmed),
      country: Yup.string().required(getRequiredMessage("Country"))
    })
  )
});

// eslint-disable-next-line react/display-name
export const BusinessRelationship = forwardRef(
  ({ topCustomers, topSuppliers, setFieldValue: setFormFieldValue, id, refs }) => {
    const classes = useStyles();
    const initialValues = {
      topCustomers,
      topSuppliers
    };
    const initialIsValid = additionalCompanyInfoSchema.isValidSync(initialValues);
    const { businessFormRef, bussinesAccordionRef } = refs;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={additionalCompanyInfoSchema}
        // onSubmit={handleFormSubmit}
        validateOnChange={false}
        innerRef={businessFormRef}
      >
        {props => {
          return (
            <Form>
              <Accordion
                title={"Business relationships"}
                id={id}
                setFormFieldValue={setFormFieldValue}
                isCompleted={initialIsValid && props.isValid}
                classes={{
                  accordionSummaryContent: classes.additionalInfoAccordionSummaryContent,
                  accordionSummaryContentExpanded:
                    classes.additionalInfoAccordionSummaryContentExpanded
                }}
                showHelperText={
                  "Provide the details for a minimum of 1 buyer and 1 supplier. Depending on the details entered earlier, we may have pre-filled some fields for you"
                }
                accordionRef={bussinesAccordionRef}
              >
                <TopCustomers topCustomers={topCustomers} {...props} />
                <TopSuppliers topSuppliers={topSuppliers} {...props} />
              </Accordion>
            </Form>
          );
        }}
      </Formik>
    );
  }
);

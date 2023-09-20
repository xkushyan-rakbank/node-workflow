import React, { forwardRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { TopCustomers } from "./TopCustomers";
import { getInvalidMessage, getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { SPECIAL_CHARACTERS_REGEX } from "../../../../../utils/validation";
import { TopSuppliers } from "./TopSuppliers";
import { useStyles } from "../../styled";

const additionalCompanyInfoSchema = Yup.object().shape({
  topCustomers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        // eslint-disable-next-line no-template-curly-in-string
        .max(255, "Maximum ${max} characters allowed")
        .required(getRequiredMessage("Customer name"))
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Customer name")),
      country: Yup.string().required(getRequiredMessage("Country"))
    })
  ),
  topSuppliers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required(getRequiredMessage("Supplier name"))
        // eslint-disable-next-line no-template-curly-in-string
        .max(255, "Maximum ${max} characters allowed")
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Supplier name")),
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
                accordionRef={bussinesAccordionRef}
              >
                <div className={classes.descriptionSubField}>
                  <p>We need details about your customers and suppliers to gain a better understanding of your business model. If your business is less than 3 months old, please provide details about your potential customers and suppliers.</p>
                </div>
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

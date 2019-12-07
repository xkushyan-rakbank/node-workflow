import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { submitApplication } from "../../../../../constants";
import { AutoSaveField as Field, Checkbox } from "../../../../../components/Form";

import { useStyles } from "./styled";

const {
  termConditionUrl,
  termOfEnrolmentUrl,
  trueNdCompleteAcknldgelabel,
  needCommunicationLabel
} = submitApplication;

const blockConfirmSchema = Yup.object({
  isInformationProvided: Yup.boolean().oneOf([true], "Required"),
  areTermsAgreed: Yup.boolean().oneOf([true], "Required")
});

export const BlockConfirm = ({ setFormFields }) => {
  const classes = useStyles();

  const termsAgreedLabel = (
    <span>
      I agree with RakBank’s{" "}
      <a href={termConditionUrl} target="_blank" rel="noopener noreferrer">
        terms and conditions
      </a>{" "}
      &{" "}
      <a href={termOfEnrolmentUrl} target="_blank" rel="noopener noreferrer">
        terms and enrollment
      </a>
    </span>
  );

  const setFieldsValue = (event, setFieldValue, values) => {
    const { name } = event.target;
    setFieldValue(name, !values[name]);
    setFormFields({ ...values, [name]: !values[name] });
  };

  return (
    <div className={classes.checkboxesWrapper}>
      <Formik
        initialValues={{
          isInformationProvided: false,
          areTermsAgreed: false,
          needCommunication: false
        }}
        onSubmit={() => {}}
        validationSchema={blockConfirmSchema}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Field
              name="isInformationProvided"
              label={trueNdCompleteAcknldgelabel}
              onChange={e => setFieldsValue(e, setFieldValue, values)}
              formControlClasses={{ root: classes.formControlRoot }}
              component={Checkbox}
            />

            <Field
              name="areTermsAgreed"
              label={termsAgreedLabel}
              onChange={e => setFieldsValue(e, setFieldValue, values)}
              formControlClasses={{ root: classes.formControlRoot }}
              component={Checkbox}
            />

            <Field
              name="needCommunication"
              label={needCommunicationLabel}
              formControlClasses={{ root: classes.formControlRoot }}
              component={Checkbox}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

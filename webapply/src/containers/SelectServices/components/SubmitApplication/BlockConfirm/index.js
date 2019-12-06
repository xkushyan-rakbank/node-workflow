import React, { useState } from "react";
import { Formik, Form } from "formik";

import { submitApplication } from "../../../../../constants";
import { AutoSaveField as Field, Checkbox } from "../../../../../components/Form";

import { useStyles } from "./styled";

const {
  termCondition,
  termsOfEnrolment,
  termConditionUrl,
  termOfEnrolmentUrl,
  trueNdCompleteAcknldgelabel,
  needCommunicationLabel
} = submitApplication;
const termsAndConditionsError = `Please click the ${termCondition} and ${termsOfEnrolment}`;

export const BlockConfirm = ({ submitApplicationData, handleValid }) => {
  const classes = useStyles();
  const [isCheckTerms, setVisitTerms] = useState(false);
  const [isCheckConditions, setVisitConditions] = useState(false);

  const termsAgreedLabel = (
    <span>
      I agree with RakBank’s{" "}
      <a
        href={termConditionUrl}
        onClick={() => setVisitTerms(true)}
        target="_blank"
        rel="noopener noreferrer"
      >
        terms and conditions
      </a>{" "}
      &{" "}
      <a
        href={termOfEnrolmentUrl}
        onClick={() => setVisitConditions(true)}
        target="_blank"
        rel="noopener noreferrer"
      >
        terms and enrollment
      </a>
    </span>
  );

  return (
    <div className={classes.checkboxesWrapper}>
      <Formik
        initialValues={{
          isInformationProvided: false,
          areTermsAgreed: false,
          needCommunication: false
        }}
        // onSubmit={() => {}} // TDDO
      >
        {({ values, setFieldError, setFieldValue, handleChange, ...props }) => (
          <Form>
            <Field
              name="isInformationProvided"
              label={trueNdCompleteAcknldgelabel}
              component={Checkbox}
            />

            <Field
              name="areTermsAgreed"
              label={termsAgreedLabel}
              onChange={e => {
                if (!isCheckTerms || !isCheckConditions) {
                  setFieldError("areTermsAgreed", termsAndConditionsError);
                  return;
                }
                handleValid(values.areTermsAgreed);
                setFieldValue("areTermsAgreed", !values.areTermsAgreed);
              }}
              component={Checkbox}
            />

            <Field name="needCommunication" label={needCommunicationLabel} component={Checkbox} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

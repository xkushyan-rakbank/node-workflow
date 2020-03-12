import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { submitApplication } from "../../../../../constants";
import { AutoSaveField as Field, Checkbox } from "../../../../../components/Form";

import { useStyles } from "./styled";

const {
  termConditionUrlProd,
  termConditionIslamicBankingUrlProd,
  termConditionUrlUAT,
  termConditionIslamicBankingUrlUAT,
  termOfEnrolmentUrlProd,
  termOfEnrolmentIslamicBankingUrlProd,
  termOfEnrolmentUrlUAT,
  termOfEnrolmentIslamicBankingUrlUAT
} = submitApplication;

const blockConfirmSchema = Yup.object({
  isInformationProvided: Yup.boolean().oneOf([true], "Required"),
  areTermsAgreed: Yup.boolean().oneOf([true], "Required")
});

export const BlockConfirmComponent = ({ setFormFields, isIslamicBanking }) => {
  const classes = useStyles();

  const getTermConditionLink = () => {
    if (process.env.NODE_ENV === "production") {
      return isIslamicBanking ? termConditionIslamicBankingUrlProd : termConditionUrlProd;
    } else {
      return isIslamicBanking ? termConditionIslamicBankingUrlUAT : termConditionUrlUAT;
    }
  };

  const getTermEnrollmentLink = () => {
    if (process.env.NODE_ENV === "production") {
      return isIslamicBanking ? termOfEnrolmentIslamicBankingUrlProd : termOfEnrolmentUrlProd;
    } else {
      return isIslamicBanking ? termOfEnrolmentIslamicBankingUrlUAT : termOfEnrolmentUrlUAT;
    }
  };

  const termsAgreedLabel = (
    <span>
      I agree with RAKBANK’s{" "}
      <a
        className={classes.link}
        href={getTermConditionLink()}
        target="_blank"
        rel="noopener noreferrer"
      >
        terms and conditions
      </a>{" "}
      and{" "}
      <a
        className={classes.link}
        href={getTermEnrollmentLink()}
        target="_blank"
        rel="noopener noreferrer"
      >
        terms of enrollment
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
          needCommunication: true
        }}
        onSubmit={() => {}}
        validationSchema={blockConfirmSchema}
        validateOnChange={false}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Field
              name="isInformationProvided"
              label="I confirm that the information provided is true and complete"
              onChange={e => setFieldsValue(e, setFieldValue, values)}
              component={Checkbox}
              inputProps={{ tabIndex: 0 }}
            />

            <Field
              name="areTermsAgreed"
              label={termsAgreedLabel}
              onChange={e => setFieldsValue(e, setFieldValue, values)}
              component={Checkbox}
              inputProps={{ tabIndex: 0 }}
            />

            <Field
              name="needCommunication"
              path="prospect.channelServicesInfo.marketingSMS"
              label="I want to receive marketing and promotional communication from RAKBANK"
              component={Checkbox}
              inputProps={{ tabIndex: 0 }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

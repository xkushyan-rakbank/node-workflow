import React, { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { submitApplication, ISLAMIC, CONVENTIONAL } from "../../../../../constants";
import { AutoSaveField as Field, Checkbox } from "../../../../../components/Form";

import { useStyles } from "./styled";
import { NotificationsManager } from "../../../../../components/Notification";
import { termsMessageContent } from "../constants";

const { termConditionLinks, termEnrollmentLinks } = submitApplication;

const blockConfirmSchema = Yup.object({
  isInformationProvided: Yup.boolean().oneOf([true], "Required"),
  areTermsAgreed: Yup.boolean().oneOf([true], "Required")
});

export const BlockConfirmComponent = ({ setFormFields, isIslamicBanking }) => {
  const [isConditionLinkVisited, setIsConditionLinkVisited] = useState(false);
  const [isEnrollmentLinkVisited, setIsEnrollmentLinkVisited] = useState(false);
  const classes = useStyles();

  const isAllLinksVisited = isConditionLinkVisited && isEnrollmentLinkVisited;

  const handleShowNotification = useCallback(
    () =>
      !isAllLinksVisited && NotificationsManager && NotificationsManager.add(termsMessageContent),
    [isAllLinksVisited]
  );

  const typeOfAccount = isIslamicBanking ? ISLAMIC : CONVENTIONAL;

  const termsAgreedLabel = (
    <span>
      I agree with RAKBANK’s{" "}
      <a
        className={classes.link}
        href={termConditionLinks[typeOfAccount]}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => {
          e.stopPropagation();
          setIsConditionLinkVisited(true);
        }}
      >
        terms and conditions
      </a>{" "}
      and{" "}
      <a
        className={classes.link}
        href={termEnrollmentLinks[typeOfAccount]}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => {
          e.stopPropagation();
          setIsEnrollmentLinkVisited(true);
        }}
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
            <div onClick={handleShowNotification}>
              <Field
                name="areTermsAgreed"
                label={termsAgreedLabel}
                disabled={!isAllLinksVisited}
                onChange={e => {
                  setFieldsValue(e, setFieldValue, values);
                }}
                component={Checkbox}
                inputProps={{ tabIndex: 0 }}
              />
            </div>

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

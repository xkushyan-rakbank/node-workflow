import React, { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { AutoSaveField as Field, Checkbox } from "../../../../../components/Form";
import { NotificationsManager } from "../../../../../components/Notification";
import { submitApplication, ISLAMIC, CONVENTIONAL } from "../../../../../constants";
import { termsMessageContent } from "../constants";

import { useStyles } from "./styled";
import routes from "../../../../../routes";
import { BackLink } from "../../../../../components/Buttons/BackLink";
import { SubmitButton } from "../../../../../components/Buttons/SubmitButton";

const { termConditionLinks, termEnrollmentLinks } = submitApplication;

const blockConfirmSchema = Yup.object({
  isInformationProvided: Yup.boolean().oneOf([true], "Required"),
  areTermsAgreed: Yup.boolean().oneOf([true], "Required")
});

export const BlockConfirmComponent = ({
  isCustomer,
  isIslamicBanking,
  handleSubmit,
  isSubmitting
}) => {
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

  return (
    <div className={classes.checkboxesWrapper}>
      <Formik
        initialValues={{
          isInformationProvided: false,
          areTermsAgreed: false,
          needCommunication: true
        }}
        onSubmit={handleSubmit}
        validationSchema={isCustomer && blockConfirmSchema}
        validateOnChange={false}
      >
        {({ values }) => {
          const isSubmitButtonEnable =
            !isCustomer || (values.isInformationProvided && values.areTermsAgreed);
          return (
            <Form>
              {isCustomer && (
                <Field
                  name="isInformationProvided"
                  label="I confirm that the information provided is true and complete"
                  component={Checkbox}
                  inputProps={{ tabIndex: 0 }}
                />
              )}
              {isCustomer && (
                <div onClick={handleShowNotification}>
                  <Field
                    name="areTermsAgreed"
                    label={termsAgreedLabel}
                    disabled={!isAllLinksVisited}
                    classes={{
                      label: classes.checkboxLabel,
                      checkbox: classes.checkbox
                    }}
                    component={Checkbox}
                    inputProps={{ tabIndex: 0 }}
                  />
                </div>
              )}

              {isCustomer && (
                <Field
                  name="needCommunication"
                  path="prospect.channelServicesInfo.marketingSMS"
                  label="I want to receive marketing and promotional communication from RAKBANK"
                  component={Checkbox}
                  inputProps={{ tabIndex: 0 }}
                />
              )}

              <div className="linkContainer">
                <BackLink path={routes.selectServices} />
                <SubmitButton
                  disabled={!isSubmitButtonEnable || isSubmitting}
                  label="Submit"
                  justify="flex-end"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { AutoSaveField as Field, Checkbox } from "../../../../../components/Form";
import { BackLink } from "../../../../../components/Buttons/BackLink";
import { SubmitButton } from "../../../../../components/Buttons/SubmitButton";
import { NotificationsManager } from "../../../../../components/Notification";
import { ServerRequestLoadingScreen } from "../../../../../components/ServerRequestLoadingScreen/ServerRequestLoadingScreen";
import { TermsAgreedLabel } from "./TermsAgreedLabel";
import routes from "../../../../../routes";
import { termsMessageContent, IS_ALL_LINKS_VISITED, NONE_VISITED } from "../constants";

import { useStyles } from "./styled";

const blockConfirmSchema = Yup.object({
  isInformationProvided: Yup.boolean().oneOf([true], "Required"),
  areTermsAgreed: Yup.boolean().oneOf([true], "Required")
});

export const BlockConfirmComponent = ({ isCustomer, isIslamicBanking, handleSubmit }) => {
  const classes = useStyles();
  const [isLinkVisited, setIsLinkVisited] = useState(NONE_VISITED);
  const isAllLinksVisited = IS_ALL_LINKS_VISITED === isLinkVisited;

  const handleShowNotification = useCallback(
    () =>
      !isAllLinksVisited && NotificationsManager && NotificationsManager.add(termsMessageContent),
    [isAllLinksVisited]
  );
  const handleSetIsLinkVisited = useCallback(
    operation => setIsLinkVisited(isLinkVisited | operation),
    [isLinkVisited, setIsLinkVisited]
  );

  return (
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
      {({ isSubmitting }) =>
        isSubmitting ? (
          <ServerRequestLoadingScreen />
        ) : (
          <Form>
            {isCustomer && (
              <div className={classes.checkboxesWrapper}>
                <Field
                  name="isInformationProvided"
                  label="I confirm that the information provided is true and complete"
                  component={Checkbox}
                  inputProps={{ tabIndex: 0 }}
                />
                <div onClick={handleShowNotification}>
                  <Field
                    name="areTermsAgreed"
                    label={
                      <TermsAgreedLabel
                        setIsLinkVisited={handleSetIsLinkVisited}
                        isIslamicBanking={isIslamicBanking}
                      />
                    }
                    disabled={!isAllLinksVisited}
                    exhaustiveDeps={isLinkVisited}
                    classes={{
                      label: classes.checkboxLabel,
                      checkbox: classes.checkbox
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
              </div>
            )}
            <div className="linkContainer">
              <BackLink path={routes.selectServices} />
              <SubmitButton
                disabled={isCustomer && !isAllLinksVisited}
                label="Submit"
                justify="flex-end"
              />
            </div>
          </Form>
        )
      }
    </Formik>
  );
};

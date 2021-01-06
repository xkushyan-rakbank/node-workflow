import React, { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { AutoSaveField as Field, Checkbox } from "../../../../../components/Form";
import { BackLink } from "../../../../../components/Buttons/BackLink";
import { SubmitButton } from "../../../../../components/Buttons/SubmitButton";
import { NotificationsManager } from "../../../../../components/Notification";
import { TermsAgreedLabel } from "./TermsAgreedLabel";
import routes from "../../../../../routes";
import { termsMessageContent, IS_ALL_LINKS_VISITED, NONE_VISITED,MAX_PROMO_CODE_LENGTH } from "../constants";

import { useStyles } from "./styled";

import {ALPHANUMERIC_REGEX} from "../../../../../utils/validation";
import { getInvalidMessage } from "../../../../../utils/getValidationMessage";
import {Input} from "../../../../../components/Form";
import Grid from "@material-ui/core/Grid";

const blockConfirmSchema = Yup.object({
  isInformationProvided: Yup.boolean().oneOf([true], "Required"),
  areTermsAgreed: Yup.boolean().oneOf([true], "Required"),
  promoCode: Yup.string().matches(
    ALPHANUMERIC_REGEX,
    getInvalidMessage("PromoCode")
  ),
});

export const BlockConfirmComponent = ({ isIslamicBanking, handleSubmit, isAgent }) => {
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
        needCommunication: true,
        promoCode: ""
      }}
      onSubmit={handleSubmit}
      validationSchema={!isAgent && blockConfirmSchema}
      validateOnChange={false}
    >
      {() => (
        <Form>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <Field
                  name="promoCode"
                  label="Promo Code (optional)"
                  placeholder="Promo Code"
                  path="prospect.applicationInfo.promoCode"
                  infoTitle=""
                  component={Input}
                  InputProps={{
                    inputProps: { maxLength: MAX_PROMO_CODE_LENGTH, tabIndex: 0 }
                  }}
                />
              </Grid>
            </Grid>
          {!isAgent && (
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
              disabled={!isAgent && !isAllLinksVisited}
              label="Submit"
              justify="flex-end"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

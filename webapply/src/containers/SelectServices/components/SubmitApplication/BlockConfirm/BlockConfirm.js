import React, { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";

import { AutoSaveField as Field, Checkbox } from "../../../../../components/Form";
import { BackLink } from "../../../../../components/Buttons/BackLink";
import { SubmitButton } from "../../../../../components/Buttons/SubmitButton";
import { NotificationsManager } from "../../../../../components/Notification";
import { TermsAgreedLabel } from "./TermsAgreedLabel";
import routes from "../../../../../routes";

import { useStyles } from "./styled";

import { updateProspect } from "../../../../../store/actions/appConfig";
import { ALPHANUMERIC_REGEX } from "../../../../../utils/validation";
import { getInvalidMessage } from "../../../../../utils/getValidationMessage";
import { Input } from "../../../../../components/Form";
import {
  termsMessageContent,
  IS_ALL_LINKS_VISITED,
  NONE_VISITED,
  MAX_PROMO_CODE_LENGTH
} from "../constants";

const blockConfirmSchema = Yup.object({
  isInformationProvided: Yup.boolean().oneOf([true], "Required"),
  areTermsAgreed: Yup.boolean().oneOf([true], "Required"),
  promoCode: Yup.string()
    .nullable()
    .max(MAX_PROMO_CODE_LENGTH, "Maximum ${max} characters allowed for PromoCode")
    .matches(ALPHANUMERIC_REGEX, getInvalidMessage("PromoCode"))
});

const promoCodeSchema = Yup.object({
  promoCode: Yup.string()
    .nullable()
    .max(MAX_PROMO_CODE_LENGTH, "Maximum ${max} characters allowed for PromoCode")
    .matches(ALPHANUMERIC_REGEX, getInvalidMessage("PromoCode"))
});

export const BlockConfirmComponent = ({ isIslamicBanking, handleSubmit, isAgent }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
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
  //ro-assist-brd3-13
  const handleTandCSelection = bool => {
    const prospect = {};
    prospect["prospect.applicationInfo.sanctionUndertaking"] = !bool;
    dispatch(updateProspect(prospect));
  };

  return (
    <Formik
      initialValues={{
        isInformationProvided: false,
        areTermsAgreed: false,
        needCommunication: true,
        promoCode: ""
      }}
      onSubmit={handleSubmit}
      validationSchema={isAgent ? promoCodeSchema : blockConfirmSchema}
      validateOnChange={false}
    >
      {({ values }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Field
                name="promoCode"
                label="Promo Code (optional)"
                placeholder="Promo Code"
                path="prospect.applicationInfo.promoCode"
                contextualHelpText="Enter Promotional Offer code if you have one"
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
                  //ro-assist-brd3-13
                  onSelect={() => {
                    handleTandCSelection(values.areTermsAgreed);
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

//ro-assist-brd3-17
import React, { useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { AutoSaveField as Field, Checkbox } from "../../../../components/Form";
import { INITIAL_INDEX } from "../../constants";
import { Divider } from "../Divider";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { updateProspect } from "../../../../store/actions/appConfig";

import { useStyles } from "./styled";
import { CONVENTIONAL, ISLAMIC } from "../../../../constants";
import { NotificationsManager } from "../../../../components/Notification";
import { ICONS } from "../../../../components/Icons";
import { ErrorMessage } from "../../../../components/Notifications";
import { InfoTitle } from "../../../../components/InfoTitle";
import declinedRegular from "../../../../assets/gif/declined_regular.gif";

const expressCharges = 400;
const texts = [
  "We know time is crucial to you and that's why we offer priority service to fast track your Business Account application.",
  "Simply opt for our Express Service and get started quickly.",
  "Charges Applicable :",
  "AED",
  "+ VAT",
  "Read our",
  "Express Service Terms and Conditions",
  "I have read and agree to terms and conditions of Express Service",
  "* Accounts opened based on Bank's policy and approval subject to terms and conditions"
];

const termConditionLinks = {
  [CONVENTIONAL]:
    "https://revamp.rakbank.ae/wps/wcm/connect/3f9d99b1-d7a2-4634-82b5-08f03e734295/%28A%29+J00781+RAK++Debit+Card+-+Bisiness+A4-T%26C-New+Guide-EN%26AR%28withe+out+c....pdf?MOD=AJPERES&CVID=lTLVCHV",
  [ISLAMIC]:
    "https://revamp.rakbank.ae/wps/wcm/connect/32cb9ff6-706a-489b-98fb-55d639b97c16/%28K%29+J00203+-+Debit+Card+T%26C+Business+A4+02.04.17.pdf?MOD=AJPERES&CVID=IQ7xQCk"
};

const termsMessageContent = {
  message:
    "It is important to read the terms and conditions of Express Service before you proceed.",
  title: "",
  icon: ICONS.info
};

const ErrorMessageInfo = "Required";

export const ExpressServicesComponent = ({
  goToNext,
  createFormChangeHandler,
  isIslamicBanking
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [hasError, setErrorFlag] = useState(false);
  const [isLinkVisited, setIsLinkVisited] = useState(false);
  const typeOfAccount = isIslamicBanking ? ISLAMIC : CONVENTIONAL;

  const handleFormSubmit = (values, bool) => {
    if (!values.expressTandC && bool) {
      handleShowNotification();
      if (isLinkVisited) setErrorFlag(true);
    } else {
      saveAndGoToNext(bool);
    }
  };
  const saveAndGoToNext = bool => {
    const prospect = {};
    if (bool) prospect[`prospect.accountInfo[${INITIAL_INDEX}].accountCurrencies`] = ["AED"];
    prospect[`prospect.accountInfo[${INITIAL_INDEX}].express`] = bool;
    dispatch(updateProspect(prospect));
    goToNext();
  };
  const handleShowNotification = useCallback(
    () => !isLinkVisited && NotificationsManager && NotificationsManager.add(termsMessageContent),
    [isLinkVisited]
  );
  return (
    <Formik
      initialValues={{
        expressTandC: false
      }}
      onSubmit={value => handleFormSubmit(value, true)}
    >
      {createFormChangeHandler(({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={3} className={classes.flexContainer}>
            <Grid item sm={2} xs={12} className={classes.imgContainer}>
              <img width={70} height={70} src={declinedRegular} alt="SuccessStakeholder" />
            </Grid>
            <Grid item sm={10} xs={12}>
              <div className={classes.title}>
                <p className={classes.name}>{texts[0]}</p>
                <p className={classes.name}>{texts[1]}</p>
              </div>
              <div>
                <p className={classes.paddingB10}>
                  {texts[2]}{" "}
                  <span className={classes.name}>
                    {texts[3]} {expressCharges} {texts[4]}
                  </span>
                </p>
                <p className={classes.nameWithMarginV0}>
                  {texts[5]}{" "}
                  <a
                    className={classes.link}
                    href={termConditionLinks[typeOfAccount]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => {
                      e.stopPropagation();
                      setIsLinkVisited(true);
                    }}
                  >
                    {texts[6]}
                  </a>
                </p>
              </div>
            </Grid>
          </Grid>
          <div className={classes.paddingH30}>
            <div onClick={handleShowNotification}>
              <Field
                name="expressTandC"
                path={`prospect.accountInfo[${INITIAL_INDEX}].expressTandC`}
                label={texts[7]}
                classes={{ formControlRoot: classes.formControl }}
                disabled={!isLinkVisited}
                component={Checkbox}
                onSelect={() => setErrorFlag(false)}
                inputProps={{ tabIndex: 0 }}
              />
            </div>
            {hasError && <ErrorMessage error={ErrorMessageInfo} />}
            <Divider classes={{ divider: classes.marginV10 }} />
            <InfoTitle title={texts[8]} iconName={null} />
          </div>
          <Grid className={classes.buttonWrapper} container direction="row" justify="center">
            <Button
              onClick={() => handleFormSubmit(values, false)}
              color="primary"
              variant="outlined"
              className={classes.actionButton}
            >
              No, thanks
            </Button>
            <ContinueButton type="submit" label={"Yes"} />
          </Grid>
        </Form>
      ))}
    </Formik>
  );
};

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { AddButton } from "../../../../../../components/Buttons/AddButton";
import { RemoveButton } from "../../../../../../components/Buttons/RemoveButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../../../components/Notifications/index";
import { useStyles } from "./styled";
import { EMAIL_REGEX, PHONE_REGEX } from "../../../../../../utils/validation";
import { UAE_PHONE_CODE } from "./constants";
import { prospect } from "../../../../../../constants/config";
import { CustomSelect, Input, InputGroup } from "../../../../../../components/Form";
import { countryCodeOptions } from "../../../../../../constants/options";

const companyPreferredContactInformationSchema = Yup.object().shape({
  organizationInfo: Yup.object().shape({
    contactDetails: Yup.object().shape({
      primaryMobCountryCode: Yup.string().required("Required"),
      primaryMobileNo: Yup.string()
        .required("Required")
        .matches(PHONE_REGEX, "This is not a valid phone"),
      primaryPhoneCountryCode: Yup.string().required("Required"),
      primaryEmail: Yup.string()
        .required("You need to provide Email address")
        .matches(EMAIL_REGEX, "This is not a valid Email address"),
      primaryPhoneNo: Yup.string().matches(PHONE_REGEX, "This is not a valid phone")
    })
  })
});

export const CompanyPreferredContactInformationComponent = ({
  chequeBookApplied,
  updateProspect,
  handleContinue
}) => {
  const [isExistSecondaryPhoneNumber, setIsExistSecondaryPhoneNumber] = useState(false);
  const classes = useStyles();

  function handleCurrencyCountryChange(value) {
    console.log(value);
    console.log(chequeBookApplied);
    if (value !== UAE_PHONE_CODE && chequeBookApplied) {
      updateProspect({
        "prospect.accountInfo[0].chequeBookApplied": false
      });
    }
  }

  function handleRemovePrimaryPhone() {
    setIsExistSecondaryPhoneNumber(false);
    updateProspect({
      "prospect.organizationInfo.contactDetails.primaryPhoneNo": false,
      "prospect.organizationInfo.contactDetails.primaryPhoneCountryCode": UAE_PHONE_CODE
    });
  }

  const onSubmit = values => {
    handleContinue();
    console.log(values);
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          organizationInfo: {
            contactDetails: prospect.organizationInfo.contactDetails
          }
        }}
        onSubmit={onSubmit}
        validationSchema={companyPreferredContactInformationSchema}
      >
        {() => {
          return (
            <Form>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item md={6} sm={12}>
                  <InputGroup>
                    <Field
                      name="organizationInfo.contactDetails.primaryMobCountryCode"
                      options={countryCodeOptions}
                      component={CustomSelect}
                      callback={handleCurrencyCountryChange}
                      shrink={false}
                    />
                    <Field
                      name="organizationInfo.contactDetails.primaryMobileNo"
                      label="Mobile number"
                      placeholder="Mobile number"
                      component={Input}
                    />
                  </InputGroup>
                  {isExistSecondaryPhoneNumber && (
                    <div className={classes.relative}>
                      <InputGroup>
                        <Field
                          name="organizationInfo.contactDetails.primaryPhoneCountryCode"
                          options={countryCodeOptions}
                          component={CustomSelect}
                          shrink={false}
                        />
                        <Field
                          name="organizationInfo.contactDetails.primaryPhoneNo"
                          label="Mobile number"
                          placeholder="Mobile number"
                          component={Input}
                        />
                      </InputGroup>
                      <RemoveButton
                        onClick={handleRemovePrimaryPhone}
                        title="Delete"
                        className={classes.container}
                      />
                    </div>
                  )}
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="organizationInfo.contactDetails.primaryEmail"
                    label="Primary e-mail address"
                    placeholder="Primary e-mail address"
                    component={Input}
                  />
                </Grid>
              </Grid>
              {!isExistSecondaryPhoneNumber && (
                <AddButton
                  onClick={() => setIsExistSecondaryPhoneNumber(true)}
                  title="Add a landline number"
                />
              )}
              <div className={classes.infoTitleWrap}>
                <InfoTitle
                  classes={{ wrapper: classes.infoTitle }}
                  title="Heads up! We can only send chequebooks if you use a phone number from the UAE."
                />
              </div>
              <div className={classes.buttonWrapper}>
                <ContinueButton type="submit" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

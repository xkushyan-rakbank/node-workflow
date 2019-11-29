import React, { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { AddButton } from "../../../../../../components/Buttons/AddButton";
import { RemoveButton } from "../../../../../../components/Buttons/RemoveButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../../../components/Notifications/index";
import { useStyles } from "./styled";
import { EMAIL_REGEX, PHONE_REGEX } from "../../../../../../utils/validation";
import { UAE_PHONE_CODE, FIRST_ARRAY_INDEX } from "./constants";

import {
  CustomSelect,
  Input,
  InputGroup,
  AutoSaveField as Field
} from "../../../../../../components/Form";

const companyPreferredContactInformationSchema = Yup.object().shape({
  primaryMobCountryCode: Yup.string().required("You need to provide code"),
  primaryMobileNo: Yup.string()
    .required("You need to provide number")
    .matches(PHONE_REGEX, "This is not a valid phone"),
  primaryEmail: Yup.string()
    .required("You need to provide Email address")
    .matches(EMAIL_REGEX, "This is not a valid Email address"),
  primaryPhoneNo: Yup.string().matches(PHONE_REGEX, "This is not a valid phone")
});

export const CompanyPreferredContactInformationComponent = ({
  chequeBookApplied,
  updateProspect,
  primaryPhoneNo,
  handleContinue
}) => {
  const [isExistSecondaryPhoneNumber, setIsExistSecondaryPhoneNumber] = useState(
    () => !!primaryPhoneNo
  );
  const classes = useStyles();

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          primaryMobCountryCode: UAE_PHONE_CODE,
          primaryMobileNo: "",
          primaryEmail: "",
          primaryPhoneNo: "",
          primaryPhoneCountryCode: UAE_PHONE_CODE
        }}
        onSubmit={handleSubmit}
        validationSchema={companyPreferredContactInformationSchema}
      >
        {({ setFieldValue }) => {
          return (
            <Form>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item md={6} sm={12}>
                  <InputGroup>
                    <Field
                      name="primaryMobCountryCode"
                      path="prospect.organizationInfo.contactDetails.primaryMobCountryCode"
                      datalistId="countryCode"
                      extractLabel={item => item.displayText}
                      shrink={false}
                      component={CustomSelect}
                      onChange={e => {
                        setFieldValue("primaryMobCountryCode", e.target.value);
                        if (e.target.value !== UAE_PHONE_CODE && chequeBookApplied) {
                          console.log("need");
                          updateProspect({
                            [`prospect.accountInfo[${FIRST_ARRAY_INDEX}].chequeBookApplied`]: false
                          });
                        }
                      }}
                    />
                    <Field
                      name="primaryMobileNo"
                      path="prospect.organizationInfo.contactDetails.primaryMobileNo"
                      label="Mobile number"
                      placeholder="Mobile number"
                      component={Input}
                    />
                  </InputGroup>
                  {isExistSecondaryPhoneNumber && (
                    <div className={classes.relative}>
                      <InputGroup>
                        <Field
                          name="primaryPhoneCountryCode"
                          path="prospect.organizationInfo.contactDetails.primaryPhoneCountryCode"
                          component={CustomSelect}
                          datalistId="countryCode"
                          extractLabel={item => item.displayText}
                          shrink={false}
                        />
                        <Field
                          name="primaryPhoneNo"
                          path="prospect.organizationInfo.contactDetails.primaryPhoneNo"
                          label="Mobile number"
                          placeholder="Mobile number"
                          component={Input}
                        />
                      </InputGroup>
                      <RemoveButton
                        onClick={() => {
                          setFieldValue("primaryPhoneNo", "");
                          setFieldValue("primaryPhoneCountryCode", UAE_PHONE_CODE);
                          setIsExistSecondaryPhoneNumber(false);
                          updateProspect({
                            "prospect.organizationInfo.contactDetails.primaryPhoneNo": "",
                            "prospect.organizationInfo.contactDetails.primaryPhoneCountryCode": UAE_PHONE_CODE
                          });
                        }}
                        title="Delete"
                        className={classes.container}
                      />
                    </div>
                  )}
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="primaryEmail"
                    path="prospect.organizationInfo.contactDetails.primaryEmail"
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

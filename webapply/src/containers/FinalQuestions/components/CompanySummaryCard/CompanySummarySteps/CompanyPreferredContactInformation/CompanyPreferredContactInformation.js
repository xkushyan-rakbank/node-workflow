import React, { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";

import { AddButton } from "../../../../../../components/Buttons/AddButton";
import { RemoveButton } from "../../../../../../components/Buttons/RemoveButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../../../components/Notifications";
import {
  CustomSelect,
  Input,
  InputGroup,
  AutoSaveField as Field
} from "../../../../../../components/Form";
import { withCompanyFinalQuestions } from "../../../withCompanyFinalQuestions";
import {
  UAE_MOBILE_PHONE_REGEX,
  UAE_LANDLINE_PHONE_REGEX,
  NUMBER_REGEX,
  MIN_NON_UAE_PHONE_LENGTH,
  MAX_NON_UAE_PHONE_LENGTH
} from "../../../../../../utils/validation";
import { UAE_CODE } from "../../../../../../constants";

import { useStyles } from "./styled";

const companyPreferredContactInformationSchema = Yup.object().shape({
  primaryMobCountryCode: Yup.string().required("You need to provide code"),
  primaryMobileNo: Yup.string()
    .required("You need to provide number")
    .when("primaryMobCountryCode", {
      is: primaryMobCountryCode => primaryMobCountryCode === UAE_CODE,
      then: Yup.string().matches(UAE_MOBILE_PHONE_REGEX, "This is not a valid phone"),
      otherwise: Yup.string()
        .matches(NUMBER_REGEX, "This is not a valid phone not number (wrong characters)")
        .min(MIN_NON_UAE_PHONE_LENGTH, "This is not a valid phone (min length is not reached)")
        .test("length validation", "This is not a valid phone (max length exceeded)", function() {
          const { primaryMobCountryCode = "", primaryMobileNo = "" } = this.parent;
          return primaryMobCountryCode.length + primaryMobileNo.length <= MAX_NON_UAE_PHONE_LENGTH;
        })
    }),
  primaryEmail: Yup.string()
    .required("You need to provide Email address")
    .email("This is not a valid Email address"),
  primaryPhoneNo: Yup.string().when("primaryPhoneCountryCode", {
    is: primaryPhoneCountryCode => primaryPhoneCountryCode === UAE_CODE,
    then: Yup.string().matches(UAE_LANDLINE_PHONE_REGEX, "This is not a valid phone"),
    otherwise: Yup.string()
      .matches(NUMBER_REGEX, "This is not a valid phone not number (wrong characters)")
      .min(MIN_NON_UAE_PHONE_LENGTH, "This is not a valid phone (min length is not reached)")
      .test("length validation", "This is not a valid phone (max length exceeded)", function() {
        const { primaryPhoneCountryCode = "", primaryPhoneNo = "" } = this.parent;
        return primaryPhoneCountryCode.length + primaryPhoneNo.length <= MAX_NON_UAE_PHONE_LENGTH;
      })
  })
});

export const CompanyPreferredContactInformationComponent = ({
  chequeBookApplied,
  updateProspect,
  primaryPhoneNo,
  handleContinue
}) => {
  const [isExistSecondaryPhoneNumber, setIsExistSecondaryPhoneNumber] = useState(!!primaryPhoneNo);
  const classes = useStyles();

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <div>
      <Formik
        initialValues={{
          primaryMobCountryCode: UAE_CODE,
          primaryMobileNo: "",
          primaryEmail: "",
          primaryPhoneNo: "",
          primaryPhoneCountryCode: UAE_CODE
        }}
        onSubmit={handleSubmit}
        validationSchema={companyPreferredContactInformationSchema}
        validateOnChange={false}
      >
        {withCompanyFinalQuestions(({ setFieldValue }) => (
          <Form>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item md={6} sm={12}>
                <InputGroup>
                  <Field
                    name="primaryMobCountryCode"
                    path="prospect.organizationInfo.contactDetails.primaryMobCountryCode"
                    datalistId="countryCode"
                    shrink={false}
                    component={CustomSelect}
                    onChange={e => {
                      setFieldValue("primaryMobCountryCode", e.target.value);
                      if (e.target.value !== UAE_CODE && chequeBookApplied) {
                        updateProspect({
                          "prospect.accountInfo[0].chequeBookApplied": false
                        });
                      }
                    }}
                  />
                  <Field
                    name="primaryMobileNo"
                    path="prospect.organizationInfo.contactDetails.primaryMobileNo"
                    label="Mobile number"
                    placeholder="55xxxxxxx"
                    shrink={true}
                    component={Input}
                    contextualHelpText="This number will be used as primary contact for Transaction Alerts and queries related to Business. If you give an international number, then Cheque book will not be issued."
                  />
                </InputGroup>
                <div
                  className={cx(classes.relative, {
                    hidden: !isExistSecondaryPhoneNumber
                  })}
                >
                  <InputGroup>
                    <Field
                      name="primaryPhoneCountryCode"
                      path="prospect.organizationInfo.contactDetails.primaryPhoneCountryCode"
                      component={CustomSelect}
                      datalistId="countryCode"
                      shrink={false}
                    />
                    <Field
                      name="primaryPhoneNo"
                      path="prospect.organizationInfo.contactDetails.primaryPhoneNo"
                      label="Landline number"
                      placeholder="55xxxxxxx"
                      shrink={true}
                      component={Input}
                    />
                  </InputGroup>
                  <RemoveButton
                    onClick={() => {
                      setFieldValue("primaryPhoneNo", "");
                      setFieldValue("primaryPhoneCountryCode", UAE_CODE);
                      setIsExistSecondaryPhoneNumber(false);
                    }}
                    title="Delete"
                    className={classes.container}
                  />
                </div>
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
        ))}
      </Formik>
    </div>
  );
};

import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import {
  CustomSelect,
  Input,
  InputGroup,
  AutoSaveField as Field
} from "../../../../../../components/Form";
import { InfoTitle } from "../../../../../../components/InfoTitle";
import {
  UAE_MOBILE_PHONE_REGEX,
  UAE_LANDLINE_PHONE_REGEX,
  NUMBER_REGEX,
  MIN_NON_UAE_PHONE_LENGTH,
  MAX_NON_UAE_PHONE_LENGTH
} from "../../../../../../utils/validation";
import { UAE_CODE } from "../../../../../../constants";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";

import { useStyles } from "./styled";

const companyPreferredContactInformationSchema = Yup.object().shape({
  primaryMobCountryCode: Yup.string().required(getRequiredMessage("Country code")),
  primaryMobileNo: Yup.string()
    .required(getRequiredMessage("Mobile number"))
    .when("primaryMobCountryCode", {
      is: primaryMobCountryCode => primaryMobCountryCode === UAE_CODE,
      then: Yup.string().matches(UAE_MOBILE_PHONE_REGEX, getInvalidMessage("Mobile number")),
      otherwise: Yup.string()
        .matches(NUMBER_REGEX, getInvalidMessage("Mobile number"))
        .min(MIN_NON_UAE_PHONE_LENGTH, "This is not a valid phone (min length is not reached)")
        .test("length validation", "This is not a valid phone (max length exceeded)", function() {
          const { primaryMobCountryCode = "", primaryMobileNo = "" } = this.parent;
          return primaryMobCountryCode.length + primaryMobileNo.length <= MAX_NON_UAE_PHONE_LENGTH;
        })
    }),
  primaryEmail: Yup.string()
    .required(getRequiredMessage("Primary e-mail address"))
    .max(50, "Maximum 50 characters allowed")
    .email(getInvalidMessage("Primary e-mail address")),
  primaryPhoneNo: Yup.string().when("primaryPhoneCountryCode", {
    is: primaryPhoneCountryCode => primaryPhoneCountryCode === UAE_CODE,
    then: Yup.string().matches(UAE_LANDLINE_PHONE_REGEX, getInvalidMessage("Landline number")),
    otherwise: Yup.string()
      .matches(NUMBER_REGEX, getInvalidMessage("Landline number"))
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
  handleContinue
}) => {
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
        {({ setFieldValue }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Field
                  name="primaryEmail"
                  path="prospect.organizationInfo.contactDetails.primaryEmail"
                  label="Primary e-mail address"
                  placeholder="Primary e-mail address"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
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
                    inputProps={{ tabIndex: 0 }}
                  />
                  <Field
                    name="primaryMobileNo"
                    path="prospect.organizationInfo.contactDetails.primaryMobileNo"
                    label="Mobile number"
                    placeholder="55xxxxxxx"
                    component={Input}
                    contextualHelpText="This number will be used as primary contact for Transaction Alerts and queries related to Business. If you give an international number, then Cheque book will not be issued."
                    InputProps={{
                      inputProps: { tabIndex: 0 }
                    }}
                  />
                </InputGroup>
              </Grid>
              <Grid item md={6} sm={12}>
                <InputGroup>
                  <Field
                    name="primaryPhoneCountryCode"
                    path="prospect.organizationInfo.contactDetails.primaryPhoneCountryCode"
                    component={CustomSelect}
                    datalistId="countryCode"
                    shrink={false}
                    inputProps={{ tabIndex: 0 }}
                  />

                  <Field
                    name="primaryPhoneNo"
                    path="prospect.organizationInfo.contactDetails.primaryPhoneNo"
                    label="Landline number (optional)"
                    placeholder="42xxxxxx"
                    component={Input}
                    InputProps={{
                      inputProps: { tabIndex: 0 }
                    }}
                  />
                </InputGroup>
              </Grid>
            </Grid>
            <div className={classes.infoTitleWrap}>
              <InfoTitle
                classes={{ wrapper: classes.infoTitle }}
                title="We will use the information in this section to communicate with you."
              />
            </div>
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

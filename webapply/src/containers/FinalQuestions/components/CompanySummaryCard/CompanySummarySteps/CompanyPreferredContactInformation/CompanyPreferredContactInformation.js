import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import {
  CustomSelect,
  Input,
  InputGroup,
  AutoSaveField as Field,
  LinkedField
} from "../../../../../../components/Form";
import { InfoTitle } from "../../../../../../components/InfoTitle";
import { UAE_CODE } from "../../../../../../constants";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";

import { useStyles } from "./styled";
import { WEBSITE_REGEX } from "../../../../../../utils/validation";

const getCompanyPreferredContactInformationSchema = () =>
  Yup.object().shape({
    primaryMobCountryCode: Yup.string().required(getRequiredMessage("Country code")),
    primaryMobileNo: Yup.string()
      .required(getRequiredMessage("Mobile number"))
      .phoneNo({ codeFieldName: "primaryMobCountryCode", fieldName: "Mobile number" }),
    primaryEmail: Yup.string()
      .required(getRequiredMessage("Primary e-mail address"))
      .max(50, "Maximum 50 characters allowed")
      .email(getInvalidMessage("Primary e-mail address")),
    primaryPhoneNo: Yup.string().phoneNo({
      codeFieldName: "primaryPhoneCountryCode",
      fieldName: "Landline number",
      isLandline: true
    }),
    website: Yup.string()
      .nullable()
      .max(100, "Maximum 100 characters allowed")
      .matches(WEBSITE_REGEX, getInvalidMessage("Entered website URL address"))
  });

export const CompanyPreferredContactInformationComponent = ({
  chequeBookApplied,
  handleContinue,
  createFormChangeHandler
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        primaryMobCountryCode: UAE_CODE,
        primaryMobileNo: "",
        primaryEmail: "",
        primaryPhoneNo: "",
        primaryPhoneCountryCode: UAE_CODE,
        website: ""
      }}
      onSubmit={handleContinue}
      validationSchema={getCompanyPreferredContactInformationSchema}
      validateOnChange={false}
    >
      {createFormChangeHandler(() => (
        <Form>
          <Grid item container spacing={3}>
            <Grid item xs={12}>
              <Field
                name="primaryEmail"
                path="prospect.organizationInfo.contactDetails.primaryEmail"
                label="E-mail address"
                placeholder="Primary e-mail address"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item sm={6} xs={12}>
              <InputGroup>
                <LinkedField
                  name="primaryMobCountryCode"
                  linkedFieldName="primaryMobileNo"
                  path="prospect.organizationInfo.contactDetails.primaryMobCountryCode"
                  linkedPath="prospect.organizationInfo.contactDetails.primaryMobileNo"
                  datalistId="countryCode"
                  shrink={false}
                  component={CustomSelect}
                  changeProspect={(prospect, value) =>
                    value !== UAE_CODE && chequeBookApplied
                      ? { ...prospect, "prospect.accountInfo.chequeBookApplied": false }
                      : prospect
                  }
                  inputProps={{ tabIndex: 0 }}
                />
                <LinkedField
                  name="primaryMobileNo"
                  linkedFieldName="primaryMobCountryCode"
                  path="prospect.organizationInfo.contactDetails.primaryMobileNo"
                  linkedPath="prospect.organizationInfo.contactDetails.primaryMobCountryCode"
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
            <Grid item sm={6} xs={12}>
              <InputGroup>
                <LinkedField
                  name="primaryPhoneCountryCode"
                  linkedFieldName="primaryPhoneNo"
                  path="prospect.organizationInfo.contactDetails.primaryPhoneCountryCode"
                  linkedPath="prospect.organizationInfo.contactDetails.primaryPhoneNo"
                  component={CustomSelect}
                  datalistId="countryCode"
                  shrink={false}
                  inputProps={{ tabIndex: 0 }}
                />

                <LinkedField
                  name="primaryPhoneNo"
                  linkedFieldName="primaryPhoneCountryCode"
                  path="prospect.organizationInfo.contactDetails.primaryPhoneNo"
                  linkedPath="prospect.organizationInfo.contactDetails.primaryPhoneCountryCode"
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
          {/* SCR for RO change */}
          <Grid item container spacing={3}>
            <Grid item xs={12}>
              <Field
                name="website"
                path="prospect.organizationInfo.contactDetails.website"
                label="Website (optional)"
                placeholder="www.yourcompanywebsite.com "
                contextualHelpText="Enter your Company's website address URL"
                component={Input}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
          </Grid>
          {/* <div className={classes.infoTitleWrap}>
            <InfoTitle
              classes={{ wrapper: classes.infoTitle }}
              title="We will use the information in this section to communicate with you."
            />
          </div>
          <div className={classes.buttonWrapper}>
            <ContinueButton type="submit" />
          </div> */}
          <Grid
            className={classes.continueButtonContainer}
            container
            direction="row"
            justify="space-between"
          >
            <InfoTitle title="We will use the information in this section to communicate with you. Please check the email address entered as your application form may be sent to this address." />
            <span className={classes.continueBtn}>
              <ContinueButton type="submit" />
            </span>
          </Grid>
        </Form>
      ))}
    </Formik>
  );
};

import React from "react";
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
    .phoneNo({ codeFieldName: "primaryMobCountryCode", fieldName: "Mobile number" }),
  primaryEmail: Yup.string()
    .required(getRequiredMessage("Primary e-mail address"))
    .max(50, "Maximum 50 characters allowed")
    .email(getInvalidMessage("Primary e-mail address")),
  primaryPhoneNo: Yup.string().phoneNo({
    codeFieldName: "primaryPhoneCountryCode",
    fieldName: "Landline number",
    isLandline: true
  })
});

export const CompanyPreferredContactInformationComponent = ({
  chequeBookApplied,
  updateProspect,
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
        primaryPhoneCountryCode: UAE_CODE
      }}
      onSubmit={handleContinue}
      validationSchema={companyPreferredContactInformationSchema}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ setFieldValue }) => (
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
      ))}
    </Formik>
  );
};

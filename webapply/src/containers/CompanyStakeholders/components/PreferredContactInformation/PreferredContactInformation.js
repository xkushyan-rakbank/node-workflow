import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import get from "lodash/get";

import { SubmitButton } from "./../SubmitButton/SubmitButton";
import {
  AutoSaveField as Field,
  CustomSelect,
  Input,
  InputGroup,
  LinkedField
} from "../../../../components/Form";
import { getSignatories } from "../../../../store/selectors/appConfig";
import { MAX_EMAIL_LENGTH } from "../../../../constants";
import { getInvalidMessage, getRequiredMessage } from "../../../../utils/getValidationMessage";

const preferredContactInformationSchema = () =>
  Yup.object().shape({
    primaryEmail: Yup.string()
      .required(getRequiredMessage("E-mail address"))
      .email(getInvalidMessage("E-mail address"))
      .max(50, getInvalidMessage("E-mail address")),
    primaryMobCountryCode: Yup.string().required(getRequiredMessage("Country code")),
    primaryMobileNo: Yup.string()
      .required(getRequiredMessage("Mobile number"))
      .phoneNo({
        codeFieldName: "primaryMobCountryCode",
        fieldName: "Mobile number"
      }),
    primaryPhoneNo: Yup.string().phoneNo({
      codeFieldName: "primaryPhoneCountryCode",
      fieldName: "Landline number",
      isLandline: true
    })
  });

const PreferredContactInformationStep = ({
  isSignatory,
  index,
  handleContinue,
  createFormChangeHandler
}) => (
  <Formik
    initialValues={{
      primaryEmail: "",
      primaryMobCountryCode: "",
      primaryMobileNo: "",
      primaryPhoneCountryCode: "",
      primaryPhoneNo: ""
    }}
    onSubmit={handleContinue}
    validationSchema={isSignatory && preferredContactInformationSchema}
    validateOnChange={false}
  >
    {createFormChangeHandler(() => (
      <Form>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Field
              name="primaryEmail"
              path={`prospect.signatoryInfo[${index}].contactDetails.primaryEmail`}
              label="E-mail address"
              placeholder="E-mail address"
              component={Input}
              disabled={!isSignatory}
              InputProps={{
                inputProps: { maxLength: MAX_EMAIL_LENGTH, tabIndex: 0 }
              }}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={3}>
          <Grid item md={6} sm={12}>
            <InputGroup>
              <LinkedField
                name="primaryMobCountryCode"
                linkedFieldName="primaryMobileNo"
                path={`prospect.signatoryInfo[${index}].contactDetails.primaryMobCountryCode`}
                linkedPath={`prospect.signatoryInfo[${index}].contactDetails.primaryMobileNo`}
                component={CustomSelect}
                shrink={false}
                disabled={!isSignatory}
                datalistId="countryCode"
                inputProps={{ tabIndex: 0 }}
              />

              <LinkedField
                name="primaryMobileNo"
                linkedFieldName="primaryMobCountryCode"
                path={`prospect.signatoryInfo[${index}].contactDetails.primaryMobileNo`}
                linkedPath={`prospect.signatoryInfo[${index}].contactDetails.primaryMobCountryCode`}
                label="Mobile Number"
                placeholder="55xxxxxxx"
                component={Input}
                disabled={!isSignatory}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
                contextualHelpText="This number will be used as primary contact for any future communication"
              />
            </InputGroup>
          </Grid>
          <Grid item md={6} sm={12}>
            <InputGroup>
              <Field
                name="primaryPhoneCountryCode"
                path={`prospect.signatoryInfo[${index}].contactDetails.primaryPhoneCountryCode`}
                component={CustomSelect}
                shrink={false}
                disabled={!isSignatory}
                datalistId="countryCode"
                inputProps={{ tabIndex: 0 }}
              />

              <Field
                name="primaryPhoneNo"
                path={`prospect.signatoryInfo[${index}].contactDetails.primaryPhoneNo`}
                label="Landline number (optional)"
                placeholder="42xxxxxx"
                component={Input}
                disabled={!isSignatory}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </InputGroup>
          </Grid>
        </Grid>

        <SubmitButton />
      </Form>
    ))}
  </Formik>
);

const mapStateToProps = (state, { index }) => ({
  isSignatory: get(getSignatories(state)[index], "kycDetails.isSignatory", false)
});

export const PreferredContactInformation = connect(mapStateToProps)(
  PreferredContactInformationStep
);

import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import get from "lodash/get";
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
import { InfoTitle } from "../../../../components/InfoTitle";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";

const createPreferredContactInformationSchema = () =>
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
    primaryHomeCountryNo: Yup.string()
      .required(getRequiredMessage("Home country contact number"))
      .phoneNo({
        codeFieldName: "primaryHomeCountryCode",
        fieldName: "Home country contact number"
      }),
    primaryHomeCountryCode: Yup.string().required(getRequiredMessage("Home Country code")),
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
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        primaryEmail: "",
        primaryMobCountryCode: "",
        primaryMobileNo: "",
        primaryPhoneCountryCode: "",
        primaryPhoneNo: "",
        primaryHomeCountryNo: "",
        primaryHomeCountryCode: ""
      }}
      onSubmit={handleContinue}
      validationSchema={isSignatory && createPreferredContactInformationSchema}
      validateOnChange={false}
    >
      {createFormChangeHandler(() => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
            <Grid item sm={6} xs={12}>
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
                  // eslint-disable-next-line max-len
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
            <Grid item sm={6} xs={12}>
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
            {/* SCR for RO change */}
            <Grid item sm={6} xs={12}>
              <InputGroup>
                <LinkedField
                  name="primaryHomeCountryCode"
                  linkedFieldName="primaryHomeCountryNo"
                  path={`prospect.signatoryInfo[${index}].contactDetails.primaryHomeCountryCode`}
                  // eslint-disable-next-line max-len
                  linkedPath={`prospect.signatoryInfo[${index}].contactDetails.primaryHomeCountryNo`}
                  component={CustomSelect}
                  shrink={false}
                  disabled={!isSignatory}
                  datalistId="countryCode"
                  inputProps={{ tabIndex: 0 }}
                />

                <LinkedField
                  name="primaryHomeCountryNo"
                  linkedFieldName="primaryHomeCountryCode"
                  path={`prospect.signatoryInfo[${index}].contactDetails.primaryHomeCountryNo`}
                  // eslint-disable-next-line max-len
                  linkedPath={`prospect.signatoryInfo[${index}].contactDetails.primaryHomeCountryCode`}
                  label="Home country contact number"
                  placeholder="55xxxxxxx"
                  component={Input}
                  disabled={!isSignatory}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  contextualHelpText="This number will be used as primary Home country contact for any future communication"
                />
              </InputGroup>
            </Grid>
          </Grid>
          <Grid
            className={classes.continueButtonContainer}
            container
            direction="row"
            justify="space-between"
          >
            <InfoTitle title="We will use this mobile number and email address as the preferred mode to communicate with you" />
            <span className={classes.continueBtn}>
              <ContinueButton type="submit" />
            </span>
          </Grid>
        </Form>
      ))}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  isSignatory: get(getSignatories(state)[index], "kycDetails.isSignatory", false)
});

export const PreferredContactInformation = connect(mapStateToProps)(
  PreferredContactInformationStep
);

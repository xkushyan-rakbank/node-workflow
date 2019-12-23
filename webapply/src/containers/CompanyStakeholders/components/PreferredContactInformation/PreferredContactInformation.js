import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import cx from "classnames";

import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { AddButton } from "../../../../components/Buttons/AddButton";
import { RemoveButton } from "../../../../components/Buttons/RemoveButton";
import {
  AutoSaveField as Field,
  CustomSelect,
  Input,
  InputGroup
} from "../../../../components/Form";
import { getInputValueById } from "../../../../store/selectors/input";
import { EMAIL_REGEX, PHONE_REGEX } from "../../../../utils/validation";
import { UAE_PHONE_CODE } from "../../../FinalQuestions/components/CompanySummaryCard/CompanySummarySteps/CompanyPreferredContactInformation/constants";

import { useStyles } from "./styled";

const preferredContactInformationSchema = Yup.object().shape({
  primaryEmail: Yup.string()
    .required("You need to provide Email address")
    .matches(EMAIL_REGEX, "This is not a valid Email address"),
  primaryMobCountryCode: Yup.string().required("Select country code"),
  primaryMobileNo: Yup.string()
    .required("You need to provide mobile number")
    .matches(PHONE_REGEX, "This is not a valid phone"),
  primaryPhoneNo: Yup.string().matches(PHONE_REGEX, "This is not a valid phone")
});

const PreferredContactInformationStep = ({
  isSignatory,
  index,
  handleContinue,
  primaryPhoneNo
}) => {
  const [isExistsPrimaryPhoneNo, setIsExistsPrimaryPhoneNo] = useState(!!primaryPhoneNo);
  const classes = useStyles();
  return (
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
    >
      {({ setValues, values }) => (
        <Form>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item md={6} sm={12}>
              <InputGroup>
                <Field
                  name="primaryMobCountryCode"
                  path={`prospect.signatoryInfo[${index}].contactDetails.primaryMobCountryCode`}
                  component={CustomSelect}
                  shrink={false}
                  disabled={!isSignatory}
                  datalistId="countryCode"
                />

                <Field
                  name="primaryMobileNo"
                  path={`prospect.signatoryInfo[${index}].contactDetails.primaryMobileNo`}
                  label="Mobile Number"
                  placeholder="Mobile Number"
                  component={Input}
                  disabled={!isSignatory}
                />
              </InputGroup>
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="primaryEmail"
                path={`prospect.signatoryInfo[${index}].contactDetails.primaryEmail`}
                label="E-mail Address"
                placeholder="E-mail Address"
                component={Input}
                disabled={!isSignatory}
              />
            </Grid>
            <Grid
              item
              md={6}
              sm={12}
              className={cx(classes.relative, {
                hidden: !isExistsPrimaryPhoneNo
              })}
            >
              <InputGroup>
                <Field
                  name="primaryPhoneCountryCode"
                  path={`prospect.signatoryInfo[${index}].contactDetails.primaryPhoneCountryCode`}
                  component={CustomSelect}
                  shrink={false}
                  disabled={!isSignatory}
                  datalistId="countryCode"
                />

                <Field
                  name="primaryPhoneNo"
                  path={`prospect.signatoryInfo[${index}].contactDetails.primaryPhoneNo`}
                  label="Landline number (optional)"
                  placeholder="Landline number (optional)"
                  component={Input}
                  disabled={!isSignatory}
                />
              </InputGroup>
              <RemoveButton
                onClick={() => {
                  setValues({
                    ...values,
                    primaryPhoneNo: "",
                    primaryPhoneCountryCode: UAE_PHONE_CODE
                  });
                  setIsExistsPrimaryPhoneNo(false);
                }}
                title="Delete"
                className={classes.container}
              />
            </Grid>
          </Grid>
          {!isExistsPrimaryPhoneNo && (
            <AddButton
              onClick={() => setIsExistsPrimaryPhoneNo(true)}
              title="Add a landline number"
            />
          )}
          <SubmitButton />
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  isSignatory: getInputValueById(state, "SigKycd.isSignatory", [index]),
  primaryPhoneNo: getInputValueById(state, "SigCont.primaryPhoneNo", [index])
});

export const PreferredContactInformation = connect(mapStateToProps)(
  PreferredContactInformationStep
);

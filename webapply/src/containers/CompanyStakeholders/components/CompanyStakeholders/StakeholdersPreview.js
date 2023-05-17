import React from "react";
import { Form, Formik } from "formik";
import { Grid } from "@material-ui/core";
import { format, isValid } from "date-fns";
import cx from "classnames";

import { useStyles } from "./styled";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import { DATE_FORMAT } from "../../../../constants";
import {
  Input,
  AutoSaveField as Field,
  DatePicker,
  EmiratesID,
  SelectAutocomplete
} from "../../../../components/Form";

export const StakeholdersPreview = ({ values }) => {
  const classes = useStyles();
  const initialValues = {
    fullName: "",
    nationality: "",
    dateOfBirth: "",
    eidNumber: "",
    eidExpiryDt: "",
    passportNumber: "",
    passportExpiryDate: ""
  };

  const changeDateProspectHandler = (_, value, path) =>
    isValid(value) && { [path]: format(value, DATE_FORMAT) };

  return (
    <>
      <h3 className={classes.mainTitle}>Did we get everything?</h3>
      <p className={cx(classes.subTitle, classes["mb-40"])}>
        Take a minute to review the details we pulled from your documents
      </p>
      <Formik initialValues={initialValues}>
        {props => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="fullName"
                  path="prospect.signatoryInfo[0].fullName"
                  label="Name"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0, maxLength: 100 }
                  }}
                  showCounter={true}
                  disabled={true}
                  className="testingClass"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="nationality"
                  path="prospect.signatoryInfo[0].kycDetails.nationality"
                  datalistId="nationality"
                  label="Nationality"
                  component={SelectAutocomplete}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="dateOfBirth"
                  path="prospect.signatoryInfo[0].kycDetails.dateOfBirth"
                  label="Date of birth"
                  component={DatePicker}
                  inputAdornmentPosition="end"
                  changeProspect={changeDateProspectHandler}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="eidNumber"
                  path="prospect.signatoryInfo[0].kycDetails.emirateIdDetails.eidNumber"
                  label="Emirates ID"
                  placeholder="784-1950-1234567-8"
                  disabled={true}
                  component={EmiratesID}
                  changeProspect={(prospect, value) => ({
                    ...prospect,
                    ["prospect.signatoryInfo[0].kycDetails.emirateIdDetails.eidNumber"]: value.replace(
                      /-/g,
                      ""
                    )
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="eidExpiryDt"
                  path="prospect.signatoryInfo[0].kycDetails.emirateIdDetails.eidExpiryDt"
                  label="Emirates ID expiry"
                  component={DatePicker}
                  changeProspect={changeDateProspectHandler}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  inputAdornmentPosition="end"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="passportNumber"
                  path="prospect.signatoryInfo[0].kycDetails.passportDetails[0].passportNumber"
                  label="Passport number"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  isLoadDefaultValueFromStore={true}
                  name="passportExpiryDate"
                  path="prospect.signatoryInfo[0].kycDetails.passportDetails[0].passportExpiryDate"
                  label="Passport expiry"
                  component={DatePicker}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  changeProspect={changeDateProspectHandler}
                  disabled={true}
                  inputAdornmentPosition="end"
                />
              </Grid>
            </Grid>
            <div className="linkContainer">
              <NextStepButton label="Next" justify="flex-end" disabled={true} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

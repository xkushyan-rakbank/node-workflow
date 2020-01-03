import React, { useCallback } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styled";
import { MOTHERS_MAIDEN_NAME_REGEX } from "../../../../../../utils/validation";
import { OTHER_OPTION_CODE } from "../SignatoryEmploymentDetails/constants";
import { CustomSelect, Input, AutoSaveField as Field } from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { MAX_MOTHERS_MAIDEN_NAME_LENGTH } from "../../constants";

export const signatoryPersonalInformationSchema = Yup.object().shape({
  maritalStatus: Yup.string().required("You need to provide marital status"),
  mothersMaidenName: Yup.string()
    .required("You need to provide mothers maiden name")
    .matches(MOTHERS_MAIDEN_NAME_REGEX, "Invalid mothers maiden name value"),
  maritalStatusOthers: Yup.string().when("maritalStatus", {
    is: value => value === OTHER_OPTION_CODE,
    then: Yup.string().required("You need to specify marital status")
  })
});

export const SignatoryPersonalInformation = ({ index, handleContinue }) => {
  const classes = useStyles();

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          maritalStatus: "",
          mothersMaidenName: "",
          maritalStatusOthers: ""
        }}
        onSubmit={handleSubmit}
        validationSchema={signatoryPersonalInformationSchema}
        validateOnChange={false}
      >
        {({ values }) => (
          <Form>
            <Grid spacing={3} container className={classes.flexContainer}>
              <Grid item md={6} sm={12}>
                <Field
                  name="maritalStatus"
                  path={`prospect.signatoryInfo[${index}].maritalStatus`}
                  datalistId="maritalStatus"
                  label="Marital Status"
                  component={CustomSelect}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="mothersMaidenName"
                  path={`prospect.signatoryInfo[${index}].mothersMaidenName`}
                  label="Mother's maiden name"
                  placeholder="Mother's maiden name"
                  component={Input}
                  inputProps={{ maxLength: MAX_MOTHERS_MAIDEN_NAME_LENGTH }}
                />
              </Grid>
              {values.maritalStatus === OTHER_OPTION_CODE && (
                <Grid item md={12} sm={12}>
                  <Field
                    name="maritalStatusOthers"
                    path={`prospect.signatoryInfo[${index}].maritalStatusOthers`}
                    label="Other(Specify)"
                    placeholder="Other(Specify)"
                    component={Input}
                  />
                </Grid>
              )}
            </Grid>
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

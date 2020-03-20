import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";

import { NAME_REGEX } from "../../../../../../utils/validation";
import { OTHER_OPTION_CODE } from "../SignatoryEmploymentDetails/constants";
import {
  Input,
  AutoSaveField as Field,
  SelectAutocomplete
} from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { MAX_MOTHERS_MAIDEN_NAME_LENGTH, MAX_LENGTH_MARITAL_OTHERS_STATUS } from "../../constants";
import {
  getInvalidMessage,
  getRequiredMessage
} from "../../../../../../utils/getValidationMessage";

import { useStyles } from "./styled";

export const signatoryPersonalInformationSchema = Yup.object().shape({
  maritalStatus: Yup.string().required(getRequiredMessage("Marital Status")),
  mothersMaidenName: Yup.string()
    .required(getRequiredMessage("Mother's maiden name"))
    // eslint-disable-next-line no-template-curly-in-string
    .max(MAX_MOTHERS_MAIDEN_NAME_LENGTH, "Maximum ${max} characters allowed")
    .matches(NAME_REGEX, getInvalidMessage("Mother's maiden name")),
  maritalStatusOthers: Yup.string().when("maritalStatus", {
    is: value => value === OTHER_OPTION_CODE,
    then: Yup.string()
      .required(getRequiredMessage("Other"))
      .matches(NAME_REGEX, getInvalidMessage("Other"))
  })
});

export const SignatoryPersonalInformation = ({
  index,
  handleContinue,
  createFormChangeHandler
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        maritalStatus: "",
        mothersMaidenName: "",
        maritalStatusOthers: ""
      }}
      onSubmit={handleContinue}
      validationSchema={signatoryPersonalInformationSchema}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values }) => (
        <Form>
          <Grid spacing={3} container className={classes.flexContainer}>
            <Grid item md={6} xs={12}>
              <Field
                name="maritalStatus"
                path={`prospect.signatoryInfo[${index}].maritalStatus`}
                datalistId="maritalStatus"
                label="Marital Status"
                isSearchable
                component={SelectAutocomplete}
                tabIndex="0"
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="mothersMaidenName"
                path={`prospect.signatoryInfo[${index}].mothersMaidenName`}
                label="Mother's maiden name"
                placeholder="Mother's maiden name"
                component={Input}
                contextualHelpText="Provide mother's surname before marriage"
                InputProps={{
                  inputProps: { maxLength: MAX_MOTHERS_MAIDEN_NAME_LENGTH, tabIndex: 0 }
                }}
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
                  InputProps={{
                    inputProps: { maxLength: MAX_LENGTH_MARITAL_OTHERS_STATUS, tabIndex: 0 }
                  }}
                />
              </Grid>
            )}
          </Grid>
          <div className={classes.buttonWrapper}>
            <ContinueButton type="submit" />
          </div>
        </Form>
      ))}
    </Formik>
  );
};

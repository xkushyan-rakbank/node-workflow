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
import { withSignatoriesFinalQuestions } from "../../../withSignatoriesFinalQuestions";
import {
  getInvalidMessage,
  getRequiredMessage
} from "../../../../../../utils/getValidationMessage";
import { GA, events } from "../../../../../../utils/ga";

export const signatoryPersonalInformationSchema = Yup.object().shape({
  maritalStatus: Yup.string().required(getRequiredMessage("Marital Status")),
  mothersMaidenName: Yup.string()
    .required(getRequiredMessage("Mother's maiden name"))
    .matches(MOTHERS_MAIDEN_NAME_REGEX, getInvalidMessage("Mother's maiden name")),
  maritalStatusOthers: Yup.string().when("maritalStatus", {
    is: value => value === OTHER_OPTION_CODE,
    then: Yup.string().required(getRequiredMessage("Other"))
  })
});

export const SignatoryPersonalInformation = ({ index, handleContinue }) => {
  const classes = useStyles();

  const handleSubmit = useCallback(() => {
    GA.triggerEvent(events.FINAL_QUESTION_PERSONAL_INFORMATION_CONTINUE);
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
        {withSignatoriesFinalQuestions(index, ({ values }) => (
          <Form>
            <Grid spacing={3} container className={classes.flexContainer}>
              <Grid item md={6} sm={12}>
                <Field
                  name="maritalStatus"
                  path={`prospect.signatoryInfo[${index}].maritalStatus`}
                  datalistId="maritalStatus"
                  label="Marital Status"
                  component={CustomSelect}
                  inputProps={{ tabIndex: 0 }}
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
                      inputProps: { tabIndex: 0 }
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
    </div>
  );
};

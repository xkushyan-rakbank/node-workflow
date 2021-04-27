import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import {
  Input,
  AutoSaveField as Field,
  SelectAutocomplete
} from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { MAX_MOTHERS_MAIDEN_NAME_LENGTH, MAX_LENGTH_MARITAL_OTHERS_STATUS } from "../../constants";
import { OTHER_OPTION_CODE } from "../SignatoryEmploymentDetails/constants";
import {
  getInvalidMessage,
  getRequiredMessage
} from "../../../../../../utils/getValidationMessage";
import {
  NAME_REGEX,
  SPECIAL_CHARACTERS_REGEX,
  ALPHANUMERIC_REGEX
} from "../../../../../../utils/validation";

import { useStyles } from "./styled";

export const createSignatoryPersonalInformationSchema = isSignatory =>
  Yup.object().shape({
    maritalStatus: Yup.string().test(
      "required",
      getRequiredMessage("Marital Status"),
      value => !isSignatory || value
    ),
    mothersMaidenName: Yup.string()
      .test("required", getRequiredMessage("Mother's maiden name"), value => !isSignatory || value)
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_MOTHERS_MAIDEN_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(NAME_REGEX, getInvalidMessage("Mother's maiden name")),
    maritalStatusOthers: Yup.string().when("maritalStatus", {
      is: value => value === OTHER_OPTION_CODE,
      then: Yup.string()
        .required(getRequiredMessage("Other"))
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Other"))
    }),
    //ro-assist-brd3-15
    countryOfBirth: Yup.string()
      .nullable()
      .test("required", getRequiredMessage("Country of Birth"), value => !isSignatory || value),
    placeOfBirth: Yup.string()
      .nullable()
      .test("required", getRequiredMessage("Place of Birth"), value => !isSignatory || value)
      .max(100, "Maximum ${max} characters allowed")
      .matches(ALPHANUMERIC_REGEX, getInvalidMessage("Place of Birth"))
  });

export const SignatoryPersonalInformation = ({
  index,
  handleContinue,
  createFormChangeHandler,
  isSignatory
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        maritalStatus: "",
        mothersMaidenName: "",
        maritalStatusOthers: "",
        countryOfBirth: "",
        placeOfBirth: ""
      }}
      onSubmit={handleContinue}
      validationSchema={createSignatoryPersonalInformationSchema(isSignatory)}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values }) => (
        <Form>
          <Grid spacing={3} container className={classes.flexContainer}>
            <Grid item sm={6} xs={12}>
              <Field
                name="maritalStatus"
                path={`prospect.signatoryInfo[${index}].maritalStatus`}
                datalistId="maritalStatus"
                label={`Marital Status${!isSignatory ? " (optional)" : ""}`}
                isSearchable
                component={SelectAutocomplete}
                tabIndex="0"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="mothersMaidenName"
                path={`prospect.signatoryInfo[${index}].mothersMaidenName`}
                label={`Mother's maiden name${!isSignatory ? " (optional)" : ""}`}
                placeholder="Mother's maiden name"
                component={Input}
                contextualHelpText="Provide mother's surname before marriage"
                InputProps={{
                  inputProps: { maxLength: MAX_MOTHERS_MAIDEN_NAME_LENGTH, tabIndex: 0 }
                }}
              />
            </Grid>
            {values.maritalStatus === OTHER_OPTION_CODE && (
              <Grid item md={12} xs={12}>
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
            {/* //ro-assist-brd1-5 */}
            <Grid item sm={6} xs={12}>
              <Field
                name="countryOfBirth"
                path={`prospect.signatoryInfo[${index}].countryofBirth`}
                datalistId="country"
                label="Country of Birth"
                isSearchable
                component={SelectAutocomplete}
                tabIndex="3"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="placeOfBirth"
                path={`prospect.signatoryInfo[${index}].placeOfBirth`}
                label={"Place of Birth"}
                placeholder="Place of Birth"
                component={Input}
                contextualHelpText="City/Town of Place of Birth"
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
          </Grid>
          <div className={classes.buttonWrapper}>
            <ContinueButton type="submit" />
          </div>
        </Form>
      ))}
    </Formik>
  );
};

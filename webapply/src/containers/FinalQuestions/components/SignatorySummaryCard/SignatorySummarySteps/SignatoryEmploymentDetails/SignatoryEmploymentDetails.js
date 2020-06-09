import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import {
  EMPLOYMENT_OTHER_OPTION_CODE,
  OTHER_OPTION_VALUE,
  MAX_EMPLOYMENT_TYPE_OTHER_LENGTH,
  MAX_DESIGNATION_LENGTH
} from "./constants";
import { MAX_COMPANY_NAME_LENGTH } from "../../../../../CompanyInfo/constants";
import {
  Input,
  Checkbox,
  AutoSaveField as Field,
  SelectAutocomplete
} from "../../../../../../components/Form";
import {
  MAX_EXPERIENCE_YEARS_LENGTH,
  SPECIAL_CHARACTERS_REGEX,
  TOTAL_EXPERIENCE_YRS_REGEX
} from "../../../../../../utils/validation";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";

import { useStyles } from "./styled";

export const createSignatoryEmploymentDetailsSchema = isSignatory =>
  Yup.object().shape({
    qualification: Yup.string().test(
      "required",
      getRequiredMessage("Qualification"),
      value => !isSignatory || value
    ),
    employmentType: Yup.string().test(
      "required",
      getRequiredMessage("Employment Type"),
      value => !isSignatory || value
    ),
    totalExperienceYrs: Yup.string()
      .test(
        "required",
        getRequiredMessage("Background information of the signatory"),
        value => !isSignatory || value
      )
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_EXPERIENCE_YEARS_LENGTH, "Maximum ${max} characters allowed")
      .matches(
        TOTAL_EXPERIENCE_YRS_REGEX,
        getInvalidMessage("Background information of the signatory")
      ),
    otherEmploymentType: Yup.string().when("employmentType", {
      is: value => value === EMPLOYMENT_OTHER_OPTION_CODE,
      then: Yup.string()
        .required(getRequiredMessage("Other"))
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Other"))
    }),
    employerName: Yup.string()
      .test("required", getRequiredMessage("Employer name"), value => !isSignatory || value)
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_COMPANY_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Employer name")),
    designation: Yup.string()
      .test("required", getRequiredMessage("Designation"), value => !isSignatory || value)
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Designation"))
  });

export const SignatoryEmploymentDetailsComponent = ({
  index,
  companyName,
  handleContinue,
  createFormChangeHandler,
  isSignatory
}) => {
  const classes = useStyles();

  const basePath = `prospect.signatoryInfo[${index}]`;

  return (
    <Formik
      initialValues={{
        qualification: "",
        employmentType: "",
        designation: "",
        totalExperienceYrs: "",
        otherEmploymentType: "",
        isWorkAtTheCompany: false,
        employerName: ""
      }}
      onSubmit={handleContinue}
      validationSchema={createSignatoryEmploymentDetailsSchema(isSignatory)}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={3} className={classes.flexContainer}>
            <Grid item sm={6} xs={12}>
              <Field
                name="qualification"
                path={`${basePath}.kycDetails.qualification`}
                datalistId="qualification"
                label={`Qualification${!isSignatory ? " (optional)" : ""}`}
                isSearchable
                component={SelectAutocomplete}
                tabIndex="0"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="employmentType"
                path={`${basePath}.employmentDetails.employmentType`}
                datalistId="employmentType"
                label={`Employment Type${!isSignatory ? " (optional)" : ""}`}
                isSearchable
                component={SelectAutocomplete}
                contextualHelpProps={{ isDisableHoverListener: false }}
                contextualHelpText={
                  <>
                    If self-employed then provide business details
                    <br />
                    If unemployed, then select &apos;Other&apos;
                  </>
                }
                tabIndex="0"
              />
            </Grid>
            {values.employmentType === OTHER_OPTION_VALUE && (
              <Grid item xs={12}>
                <Field
                  name="otherEmploymentType"
                  path={`${basePath}.employmentDetails.otherEmploymentType`}
                  label="Other(Specify)"
                  placeholder="Other(Specify)"
                  component={Input}
                  InputProps={{
                    inputProps: { maxLength: MAX_EMPLOYMENT_TYPE_OTHER_LENGTH, tabIndex: 0 }
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Field
                name="designation"
                path={`${basePath}.employmentDetails.designation`}
                label={`Designation${!isSignatory ? " (optional)" : ""}`}
                placeholder="Designation"
                component={Input}
                contextualHelpText="If unemployed, then mention the designation as 'Unemployed'"
                InputProps={{
                  inputProps: { maxLength: MAX_DESIGNATION_LENGTH, tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={`isWorkAtTheCompany${index}`}
                path={`${basePath}.employmentDetails.isPersonWorkAtCompany`}
                label={`This Person works at ${companyName}`}
                component={Checkbox}
                onSelect={() => {
                  const employerName =
                    values.isWorkAtTheCompany || values.employerName ? "" : companyName;
                  setFieldValue("employerName", employerName);
                }}
                inputProps={{ tabIndex: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="employerName"
                path={`${basePath}.employmentDetails.employerName`}
                label={`Employer name / Company name${!isSignatory ? " (optional)" : ""}`}
                placeholder="Employer name"
                component={Input}
                disabled={values[`isWorkAtTheCompany${index}`]}
                InputProps={{
                  inputProps: { maxLength: MAX_COMPANY_NAME_LENGTH, tabIndex: 0 }
                }}
              />
              <Field
                name="totalExperienceYrs"
                path={`${basePath}.employmentDetails.totalExperienceYrs`}
                label={`Background information of the signatory (Maximum 255 characters)${
                  !isSignatory ? " (optional)" : ""
                }`}
                placeholder="Work Experience"
                component={Input}
                multiline
                rows="4"
                InputProps={{
                  inputProps: { maxLength: MAX_EXPERIENCE_YEARS_LENGTH, tabIndex: 0 }
                }}
                contextualHelpText={
                  <>
                    <b>
                      {"<"}Please DON{"'"}T use ENTER key in this field{">"}
                    </b>
                    <br />
                    <br />
                    Starting with the most recent enter jobwise list of experience:
                    <br />
                    From Month-Year, To Month-Year, Company Name, Company Country, Position &
                    Employment Type (Salaried / Self Employed)
                    <br />
                    <br />
                    Example
                    <br />
                    APR-16 to TodaysDate, Reliance Biz, UAE, Proprietor, Self-Employed
                    <br />
                    AUG-13 to MAR-16, TCS, India, Marketing Manager, Salaried
                  </>
                }
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

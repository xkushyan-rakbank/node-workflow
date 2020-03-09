import React, { useCallback } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import {
  OTHER_OPTION_CODE,
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
  SPECIAL_CHARACTERS_REGEX
} from "../../../../../../utils/validation";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";

import { useStyles } from "./styled";

export const signatoryEmploymentDetailsSchema = () =>
  Yup.object().shape({
    qualification: Yup.string().required(getRequiredMessage("Qualification")),
    employmentType: Yup.string().required(getRequiredMessage("Employment Type")),
    totalExperienceYrs: Yup.string()
      .required(getRequiredMessage("Number of years of experience"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_EXPERIENCE_YEARS_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Number of years of experience")),
    otherEmploymentType: Yup.string().when("employmentType", {
      is: value => value === OTHER_OPTION_CODE,
      then: Yup.string()
        .required(getRequiredMessage("Other"))
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Other"))
    }),
    employerName: Yup.string()
      .required(getRequiredMessage("Employer name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_COMPANY_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Employer name")),
    designation: Yup.string()
      .required(getRequiredMessage("Designation"))
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Designation"))
  });

export const SignatoryEmploymentDetailsComponent = ({ index, companyName, handleContinue }) => {
  const classes = useStyles();

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <div className={classes.formWrapper}>
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
        onSubmit={handleSubmit}
        validationSchema={signatoryEmploymentDetailsSchema}
        validateOnChange={false}
      >
        {({ values, setFieldValue }) => {
          const basePath = `prospect.signatoryInfo[${index}]`;
          return (
            <Form>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item md={6} xs={12}>
                  <Field
                    name="qualification"
                    path={`${basePath}.kycDetails.qualification`}
                    datalistId="qualification"
                    label="Qualification"
                    isSearchable
                    component={SelectAutocomplete}
                    tabIndex="0"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    name="employmentType"
                    path={`${basePath}.employmentDetails.employmentType`}
                    datalistId="employmentType"
                    label="Employment Type"
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
                  <Grid item md={12} sm={12}>
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
                <Grid item md={12} sm={12}>
                  <Field
                    name="designation"
                    path={`${basePath}.employmentDetails.designation`}
                    label="Designation"
                    placeholder="Designation"
                    component={Input}
                    contextualHelpText="If unemployment, then mention the designation as 'Unemployed'"
                    InputProps={{
                      inputProps: { maxLength: MAX_DESIGNATION_LENGTH, tabIndex: 0 }
                    }}
                  />
                </Grid>
                <Grid item sm={12}>
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
                <Grid item sm={12}>
                  <Field
                    name="employerName"
                    path={`${basePath}.employmentDetails.employerName`}
                    label="Employer name / Company name"
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
                    label="Background information of the signatory (Maximum 255 characters)"
                    placeholder="Work Experience"
                    component={Input}
                    multiline
                    rows="4"
                    InputProps={{
                      inputProps: { maxLength: MAX_EXPERIENCE_YEARS_LENGTH, tabIndex: 0 }
                    }}
                    contextualHelpText={
                      <>
                        Starting with the most recent enter jobwise list of experience:
                        <br />
                        From Month-Year, To Month-Year, Company Name, Company Country, Position &
                        Employment Type (Salaried / Self Employed)
                        <br />
                        <br />
                        Example
                        <br />
                        APR-16 to &apos;Date&apos;, Reliance Biz, UAE, Proprietor, Self-Employed
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
          );
        }}
      </Formik>
    </div>
  );
};

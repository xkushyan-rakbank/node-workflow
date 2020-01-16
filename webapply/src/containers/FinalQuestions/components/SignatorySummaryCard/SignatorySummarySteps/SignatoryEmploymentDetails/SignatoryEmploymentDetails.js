import React, { useCallback } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { OTHER_OPTION_CODE, OTHER_OPTION_VALUE } from "./constants";
import {
  CustomSelect,
  Input,
  Checkbox,
  AutoSaveField as Field
} from "../../../../../../components/Form";
import {
  EMPLOYMENT_TYPE_REGEX,
  COMPANY_NAME_REGEX,
  DESIGNATION_REGEX,
  TOTAL_EXPERIENCE_YEARS,
  NUMBER_REGEX
} from "../../../../../../utils/validation";
import { FinalQuestionField } from "../../../../FinalQuestionsStateContext";
import { withSignatoriesFinalQuestions } from "../../../withSignatoriesFinalQuestions";
import { NumberFormatInput } from "../../../../../../components/Form/Input/NumberFormatInput";

import { useStyles } from "./styled";

export const signatoryEmploymentDetailsSchema = Yup.object().shape({
  qualification: Yup.string().required("You need to provide qualification"),
  employmentType: Yup.string().required("You need to provide employment type"),
  totalExperienceYrs: Yup.string()
    .required("You need to provide total experience")
    .matches(NUMBER_REGEX, "Must be an intege")
    .matches(TOTAL_EXPERIENCE_YEARS, "Maximum 255 characters allowed"),
  otherEmploymentType: Yup.string().when("employmentType", {
    is: value => value === OTHER_OPTION_CODE,
    then: Yup.string()
      .required("You need to specify employment type")
      .matches(EMPLOYMENT_TYPE_REGEX, "Invalid employment type value")
  }),
  employerName: Yup.string()
    .required("You need to provide employer name")
    .matches(COMPANY_NAME_REGEX, "Invalid employment name value"),
  designation: Yup.string()
    .required("You need to provide designation")
    .matches(DESIGNATION_REGEX, "Invalid designation value")
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
          totalExperienceYrs: 0,
          otherEmploymentType: "",
          isWorkAtTheCompany: false,
          employerName: ""
        }}
        onSubmit={handleSubmit}
        validationSchema={signatoryEmploymentDetailsSchema}
        validateOnChange={false}
      >
        {withSignatoriesFinalQuestions(index, ({ values, setFieldValue }) => {
          const basePath = `prospect.signatoryInfo[${index}]`;
          return (
            <Form>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item md={6} sm={12}>
                  <Field
                    name="qualification"
                    path={`${basePath}.kycDetails.qualification`}
                    datalistId="qualification"
                    label="Qualification"
                    component={CustomSelect}
                    inputProps={{ tabIndex: 0 }}
                  />
                  <Field
                    name="employmentType"
                    path={`${basePath}.employmentDetails.employmentType`}
                    datalistId="employmentType"
                    label="Employment Type"
                    component={CustomSelect}
                    contextualHelpProps={{ isDisableHoverListener: false }}
                    contextualHelpText={
                      <>
                        If self-employed then provide business details
                        <br />
                        If unemployed, then select &apos;Other&apos;
                      </>
                    }
                    inputProps={{ tabIndex: 0 }}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="totalExperienceYrs"
                    path={`${basePath}.employmentDetails.totalExperienceYrs`}
                    label="Total years of experience"
                    placeholder="Work Experience"
                    component={Input}
                    InputProps={{
                      inputComponent: NumberFormatInput,
                      inputProps: { tabIndex: 0 }
                    }}
                    contextualHelpText={
                      <>
                        Starting with the most resent enter jobwise list of experience From
                        Month-Year, To Month-Year, Company Name, Company Country, Position &
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
                  <Field
                    name="designation"
                    path={`${basePath}.employmentDetails.designation`}
                    label="Designation"
                    placeholder="Designation"
                    component={Input}
                    contextualHelpText="If unemployment, then mention the designation as 'Unemployed'"
                    InputProps={{
                      inputProps: { tabIndex: 0 }
                    }}
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
                        inputProps: { tabIndex: 0 }
                      }}
                    />
                  </Grid>
                )}
                <Grid item sm={12}>
                  <FinalQuestionField
                    name="isWorkAtTheCompany"
                    label={`This Person works at ${companyName}`}
                    component={Checkbox}
                    onSelect={() => {
                      const employerName = values.isWorkAtTheCompany ? "" : companyName;
                      setFieldValue("employerName", employerName);
                    }}
                    inputProps={{ tabIndex: 0 }}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Field
                    name="employerName"
                    path={`${basePath}.employmentDetails.employerName`}
                    label="Employer name"
                    placeholder="Employer name"
                    component={Input}
                    disabled={values.isWorkAtTheCompany}
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
          );
        })}
      </Formik>
    </div>
  );
};

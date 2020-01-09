import React, { useCallback } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { OTHER_OPTION_CODE } from "./constants";
import {
  CustomSelect,
  Input,
  Checkbox,
  AutoSaveField as Field
} from "../../../../../../components/Form";
import {
  EMPLOYMENT_TYPE_REGEX,
  COMPANY_NAME_REGEX,
  DESIGNATION_REGEX
} from "../../../../../../utils/validation";

import { useStyles } from "./styled";
import { FinalQuestionField } from "../../../../FinalQuestionsStateContext";

export const signatoryEmploymentDetailsSchema = Yup.object().shape({
  qualification: Yup.string().required("You need to provide qualification"),
  employmentType: Yup.string().required("You need to provide employment type"),
  totalExperienceYrs: Yup.number()
    .required("You need to provide total experience")
    .max(100, "Maximum value is 100")
    .min(0, "Minimal value is 0"),
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
        {({ values, setFieldValue }) => {
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
                  />
                  <Field
                    name="employmentType"
                    path={`${basePath}.employmentDetails.employmentType`}
                    datalistId="employmentType"
                    label="Employment Type"
                    component={CustomSelect}
                    contextualHelpText="If self-employed then provide business details"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="totalExperienceYrs"
                    path={`${basePath}.employmentDetails.totalExperienceYrs`}
                    label="Total years of experience"
                    placeholder="Total years of experience"
                    component={Input}
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
                  />
                </Grid>
                {values.employmentType === OTHER_OPTION_CODE && (
                  <Grid item md={12} sm={12}>
                    <Field
                      name="otherEmploymentType"
                      path={`${basePath}.employmentDetails.otherEmploymentType`}
                      label="Other(Specify)"
                      placeholder="Other(Specify)"
                      component={Input}
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

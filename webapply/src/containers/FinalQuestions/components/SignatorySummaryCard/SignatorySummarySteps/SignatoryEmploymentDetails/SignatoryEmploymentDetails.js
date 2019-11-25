import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Grid from "@material-ui/core/Grid";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";
import { prospect } from "../../../../../../constants/config";
import { qualificationOptions, employmentTypeOptions, OTHER_OPTION_CODE } from "./constants";
import { CustomSelect, Input, Checkbox } from "../../../../../../components/Form";
import {
  EMPLOYMENT_TYPE_REGEX,
  COMPANY_NAME_REGEX,
  DESIGNATION_REGEX
} from "../../../../../../utils/validation";

export const signatoryEmploymentDetailsSchema = Yup.object().shape({
  qualification: Yup.string().required("You need to provide qualification"),
  employmentType: Yup.string().required("You need to provide employment type"),
  totalExperienceYrs: Yup.number()
    .required("You need to provide total experience")
    .max(100, "Maximum value is 100")
    .min(0, "Minimal value is 0"),
  otherEmploymentType: Yup.string()
    .required("You need to provide employment type")
    .matches(EMPLOYMENT_TYPE_REGEX, "Invalid employment type value"),
  employerName: Yup.string()
    .required("You need to provide employer name")
    .matches(COMPANY_NAME_REGEX, "Invalid employment name value"),
  designation: Yup.string()
    .required("You need to provide designation")
    .matches(DESIGNATION_REGEX, "Invalid designation value")
});

export const SignatoryEmploymentDetailsComponent = ({
  index,
  companyName,
  employmentType,
  isWorkAtTheCompany,
  updateProspect,
  handleContinue
}) => {
  const classes = useStyles();

  function checkboxCallback(value, name, callback) {
    const fieldPath = `prospect.signatoryInfo[${index}].employmentDetails.employerName`;
    const employerName = value ? companyName : "";
    updateProspect({
      [fieldPath]: employerName
    });
    callback(name, employerName);
  }

  const onSubmit = values => {
    handleContinue();
    console.log(values);
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          qualification: prospect.signatoryInfo[index].kycDetails.qualification,
          employmentType: prospect.signatoryInfo[index].employmentDetails.employmentType,
          designation: prospect.signatoryInfo[index].employmentDetails.designation,
          totalExperienceYrs: prospect.signatoryInfo[index].employmentDetails.totalExperienceYrs,
          otherEmploymentType: prospect.signatoryInfo[index].employmentDetails.otherEmploymentType,
          isWorkAtTheCompany: prospect.signatoryInfo[index].employmentDetails.isWorkAtTheCompany,
          employerName: prospect.signatoryInfo[index].employmentDetails.employerName
        }}
        onSubmit={onSubmit}
        validationSchema={signatoryEmploymentDetailsSchema}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item md={6} sm={12}>
                  <Field
                    options={qualificationOptions}
                    shrink={false}
                    name="qualification"
                    placeholder="Qualification"
                    component={CustomSelect}
                  />
                  <Field
                    options={employmentTypeOptions}
                    shrink={false}
                    name="employmentType"
                    placeholder="Employment Type"
                    component={CustomSelect}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="totalExperienceYrs"
                    label="Total years of experience"
                    placeholder="Total years of experience"
                    component={Input}
                  />
                  <Field
                    name="designation"
                    label="Designation"
                    placeholder="Designation"
                    component={Input}
                  />
                </Grid>
                {values.employmentType === OTHER_OPTION_CODE && (
                  <Grid item md={12} sm={12}>
                    <Field
                      name="otherEmploymentType"
                      label="Other(Specify)"
                      placeholder="Other(Specify)"
                      component={Input}
                    />
                  </Grid>
                )}
                <Grid item sm={12}>
                  <Field
                    name="isWorkAtTheCompany"
                    label={`This Person works at ${companyName}`}
                    component={Checkbox}
                    callback={() => {
                      checkboxCallback(!values.isWorkAtTheCompany, "employerName", setFieldValue);
                    }}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Field
                    name="employerName"
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

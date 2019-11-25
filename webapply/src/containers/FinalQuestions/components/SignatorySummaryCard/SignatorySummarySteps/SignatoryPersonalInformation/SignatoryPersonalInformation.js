import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styled";
import { MARITAL_STATUS_REGEX } from "../../../../../../utils/validation";
import { OTHER_OPTION_CODE } from "./constants";
import { prospect } from "../../../../../../constants/config";
import { CustomSelect, Input } from "../../../../../../components/Form";
import { maritalStatusOptions } from "./constants";

export const signatoryPersonalInformationSchema = Yup.object().shape({
  maritalStatus: Yup.string().required("You need to provide marital status"),
  mothersMaidenName: Yup.string().required("You need to provide mothers maiden name"),
  maritalStatusOthers: Yup.string().when("maritalStatus", {
    is: value => value === OTHER_OPTION_CODE,
    then: Yup.string()
      .required("You need to specify marital status")
      .matches(MARITAL_STATUS_REGEX, "Invalid marital status value")
  })
});

export const SignatoryPersonalInformationComponent = ({ index, handleContinue }) => {
  const classes = useStyles();

  const onSubmit = values => {
    handleContinue();
    console.log(values);
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          maritalStatus: prospect.signatoryInfo[index].maritalStatus,
          mothersMaidenName: prospect.signatoryInfo[index].mothersMaidenName,
          maritalStatusOthers: prospect.signatoryInfo[index].maritalStatusOthers
        }}
        onSubmit={onSubmit}
        validationSchema={signatoryPersonalInformationSchema}
      >
        {({ values }) => {
          return (
            <Form>
              <Grid spacing={3} container className={classes.flexContainer}>
                <Grid item md={6} sm={12}>
                  <Field
                    options={maritalStatusOptions}
                    shrink={false}
                    name="maritalStatus"
                    placeholder="Marital Status"
                    component={CustomSelect}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="mothersMaidenName"
                    label="Mother's maiden name"
                    placeholder="Mother's maiden name"
                    component={Input}
                  />
                </Grid>
                {values.maritalStatus === OTHER_OPTION_CODE && (
                  <Grid item md={12} sm={12}>
                    <Field
                      name="maritalStatusOthers"
                      label="Other(Specify)"
                      placeholder="Other(Specify)"
                      component={Input}
                    />
                  </Grid>
                )}
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

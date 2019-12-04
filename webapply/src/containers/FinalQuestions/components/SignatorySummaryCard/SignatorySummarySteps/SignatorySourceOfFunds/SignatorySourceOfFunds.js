import React, { useCallback } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { CustomSelect, Input, AutoSaveField as Field } from "../../../../../../components/Form";
import { WEALTH_TYPE__REGEX } from "../../../../../../utils/validation";
import { OTHER_SOURCE_OF_WEALTH } from "./constants";

import { useStyles } from "./styled";

export const signatorySourceOfFundsSchema = Yup.object().shape({
  wealthType: Yup.string().required("You need to provide wealth type"),
  others: Yup.string().when("wealthType", {
    is: value => value === OTHER_SOURCE_OF_WEALTH,
    then: Yup.string()
      .required("You need to specify wealth type")
      .matches(WEALTH_TYPE__REGEX, "Invalid wealth type value")
  })
});

export const SignatorySourceOfFundsComponent = ({ index, handleContinue, updateProspect }) => {
  const classes = useStyles();

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          wealthType: "",
          others: ""
        }}
        onSubmit={handleSubmit}
        validationSchema={signatorySourceOfFundsSchema}
      >
        {({ values, setFieldValue, setFieldTouched }) => (
          <Form>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item md={12} sm={12}>
                <Field
                  name="wealthType"
                  path={`prospect.signatoryInfo[${index}].kycDetails.sourceOfWealth.wealthType`}
                  datalistId="wealthType"
                  label="Source of funds"
                  onChange={e => {
                    if (
                      e.target.value !== OTHER_SOURCE_OF_WEALTH &&
                      values.wealthType === OTHER_SOURCE_OF_WEALTH
                    ) {
                      updateProspect({
                        [`prospect.signatoryInfo[${index}].kycDetails.sourceOfWealth.others`]: ""
                      });
                      setFieldTouched("others", false);
                    }
                    setFieldValue("wealthType", e.target.value);
                  }}
                  component={CustomSelect}
                />
              </Grid>
              {values.wealthType === OTHER_SOURCE_OF_WEALTH && (
                <Grid item md={12} sm={12}>
                  <Field
                    name="others"
                    path={`prospect.signatoryInfo[${index}].kycDetails.sourceOfWealth.others`}
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

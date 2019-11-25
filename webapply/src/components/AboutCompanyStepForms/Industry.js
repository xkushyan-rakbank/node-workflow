import React from "react";
import { Formik, Form } from "formik";
import isEmpty from "lodash/isEmpty";
import * as Yup from "yup";

import Grid from "@material-ui/core/Grid";
import { CustomSelect, SelectAutocomplete, AutoSaveField as Field } from "../../components/Form";
import { ContinueButton } from "./../Buttons/ContinueButton";
import { InfoTitle } from "./../Notifications";
import { companyIndustry, companySubCategory } from "./../../constants/options";

const initialValues = {
  industry: [],
  subCategory: []
};

const industrySchema = Yup.object({
  industry: Yup.string().required("Select country industry"),
  subCategory: Yup.string()
    .notRequired()
    .when("industry", {
      is: val => !isEmpty(val),
      then: Yup.string().required("Select country subCategory")
    })
});

export const Industry = ({ handleContinue }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={industrySchema}
      onSubmit={handleContinue}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <Field
                multiple
                name="industry"
                label="Company industry"
                path="prospect.orgKYCDetails.industryMultiSelect[0].industry[0]"
                options={companyIndustry}
                component={CustomSelect}
                onChange={e => {
                  setFieldValue("industry", e.target.value);
                  setFieldValue("subCategory", "");
                }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="subCategory"
                label="Company subCategory"
                path="prospect.orgKYCDetails.industryMultiSelect[0].subCategory[0]"
                options={companySubCategory.filter(item =>
                  values.industry.includes(item.industryCode)
                )}
                component={SelectAutocomplete}
                multiple
                disabled={isEmpty(values.industry)}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" justify="space-between" style={{ padding: 20 }}>
            <Grid item xs={9}>
              <InfoTitle title="These should be the same as in your Trade License. You can select multiple industries." />
            </Grid>
            <Grid item xs={3}>
              <ContinueButton type="submit" />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

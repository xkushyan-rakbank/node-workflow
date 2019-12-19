import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { CustomSelect, SelectAutocomplete, AutoSaveField as Field } from "../../../components/Form";
import { ContinueButton } from "../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../components/Notifications";

const initialValues = {
  industry: [],
  subCategory: []
};

const industrySchema = Yup.object({
  industry: Yup.string().required("You need to provide indusry"),
  subCategory: Yup.string().when("industry", {
    is: industry => !!industry,
    then: Yup.string().required("You need to provide sub-category")
  })
});

export const Industry = ({ handleContinue }) => (
  <Formik initialValues={initialValues} validationSchema={industrySchema} onSubmit={handleContinue}>
    {({ values, setFieldValue }) => (
      <Form>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Field
              multiple
              name="industry"
              label="Industry"
              path="prospect.orgKYCDetails.industryMultiSelect[0].industry"
              datalistId="industry"
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
              label="Industry sub-category"
              path="prospect.orgKYCDetails.industryMultiSelect[0].subCategory"
              component={SelectAutocomplete}
              datalistId="industry"
              filterOptions={options =>
                options
                  .filter(item => values.industry.includes(item.value))
                  .reduce((acc, curr) => (curr.subGroup ? [...acc, ...curr.subGroup] : acc), [])
              }
              multiple
              disabled={!(values.industry || []).length}
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

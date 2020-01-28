import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { AutoSaveField as Field } from "../../../../components/Form";
import { SelectAutocomplete } from "../../../../components/Form";
import { getRequiredMessage } from "../../../../utils/getValidationMessage";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../components/Notifications";
import { useStyles } from "./styled";

const initialValues = {
  industry: [],
  subCategory: []
};

const industrySchema = Yup.object({
  industry: Yup.array()
    .of(Yup.string().required(getRequiredMessage("Industry")))
    .required(getRequiredMessage("Industry"))
    .max(12, "Maximum 12 options allowed"),
  subCategory: Yup.array().when("industry", {
    is: industry => !!industry,
    then: Yup.array()
      .of(Yup.string().required(getRequiredMessage("Sub-category")))
      .required(getRequiredMessage("Sub-category"))
      .max(12, "Maximum 12 options allowed")
  })
});

export const Industry = ({ handleContinue }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={industrySchema}
      validateOnChange={false}
      onSubmit={handleContinue}
    >
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
                component={SelectAutocomplete}
                contextualHelpText="This should be selected as per the most relevant business / commercial / licensed activity mentioned in the trade license. Example: if business / commercial / licensed activity is 'E Commerce', please select industry as 'Service' & sub-industry as 'Computer & IT Industry' "
                contextualHelpProps={{ isDisableHoverListener: false }}
                onChange={selectedValue => {
                  setFieldValue("industry", selectedValue);
                  setFieldValue("subCategory", "");
                }}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
                tabSelectsValue={false}
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
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
                tabSelectsValue={false}
              />
            </Grid>
          </Grid>
          <Grid
            className={classes.continueButtonGrid}
            container
            direction="row"
            justify="space-between"
          >
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

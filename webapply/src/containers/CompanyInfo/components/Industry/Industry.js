import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { AutoSaveField as Field } from "../../../../components/Form";
import { SelectAutocompleteWithSearchValidation } from "./SelectAutocompleteWithSearchValidation";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../components/Notifications";
import { useStyles } from "./styled";

const initialValues = {
  industry: [],
  subCategory: []
};

const industrySchema = Yup.object({
  industry: Yup.array()
    .required("You need to provide industry")
    .max(12, "Maximum 12 options allowed"),
  subCategory: Yup.array().when("industry", {
    is: industry => !!industry,
    then: Yup.array()
      .required("You need to provide sub-category")
      .max(12, "Maximum 12 options allowed")
  })
});

const searchValueSchema = Yup.string().max(12, "Max length of search value is 12");
const validateSearchValue = searchValue =>
  searchValueSchema
    .validate(searchValue)
    .then(res => "")
    .catch(err => err.message);

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
                validateSearchField={validateSearchValue}
                component={SelectAutocompleteWithSearchValidation}
                contextualHelpText="This should be selected as per the most relevant business / commercial / licensed activity mentioned in the trade license. Example: if business / commercial / licensed activity is 'E Commerce', please select industry as 'Service' & sub-industry as 'Computer & IT Industry' "
                contextualHelpProps={{ isDisableHoverListener: false }}
                onChange={e => {
                  setFieldValue("industry", e.target.value);
                  setFieldValue("subCategory", "");
                }}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                classes={{
                  menuItem: classes.industrySubCategory
                }}
                name="subCategory"
                label="Industry sub-category"
                path="prospect.orgKYCDetails.industryMultiSelect[0].subCategory"
                validateSearchField={validateSearchValue}
                component={SelectAutocompleteWithSearchValidation}
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

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { AutoSaveField as Field } from "../../../../components/Form";
import { SearchableSelectAutocomplete } from "./SearchableSelectAutocomplete";
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
      // .required(getRequiredMessage("Sub-category"))
      .max(12, "Maximum 12 options allowed")
  })
});

const validateSearchValue = searchValue => {
  if (searchValue && searchValue.length > 12) {
    return "Max length of search value is 12";
  }

  return "";
};

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
                component={SearchableSelectAutocomplete}
                contextualHelpText="This should be selected as per the most relevant business / commercial / licensed activity mentioned in the trade license. Example: if business / commercial / licensed activity is 'E Commerce', please select industry as 'Service' & sub-industry as 'Computer & IT Industry' "
                contextualHelpProps={{ isDisableHoverListener: false }}
                onChange={selectedValue => {
                  setFieldValue("industry", selectedValue);
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
                component={SearchableSelectAutocomplete}
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

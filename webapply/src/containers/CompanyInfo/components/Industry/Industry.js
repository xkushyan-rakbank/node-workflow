import React from "react";
import { connect } from "react-redux";
import { Formik, FieldArray, Form, getIn } from "formik";
import * as Yup from "yup";
import uniqueId from "lodash/uniqueId";
import Grid from "@material-ui/core/Grid";
import get from "lodash/get";

import { getOrgKYCDetails, getIsIslamicBanking } from "../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../store/actions/appConfig";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { MAX_INDUSTRIES_LENGTH } from "../../constants";

import { AutoSaveField as Field, SelectAutocomplete } from "../../../../components/Form";
import { getRequiredMessage } from "../../../../utils/getValidationMessage";
import { AddButton } from "../../../../components/Buttons/AddButton";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../components/Notifications";
import { useStyles } from "../../styled";

const initialIndustry = {
  industry: "",
  subCategory: ""
};

const industrySchema = Yup.object().shape({
  industries: Yup.array().of(
    Yup.object().shape({
      industry: Yup.string().required(getRequiredMessage("Industry")),
      subCategory: Yup.string().when("industry", {
        is: industry => !!industry,
        then: Yup.string().required(getRequiredMessage("Sub-category"))
      })
    })
  )
});

export const IndustryStep = ({ handleContinue, industries, updateProspect, isIslamicBanking }) => {
  const classes = useStyles();

  const addIndustryHandler = arrayHelper => () => {
    arrayHelper.push({ ...initialIndustry, id: uniqueId() });
  };

  const isAdditionalIndustryDisabled = (values, industryIndex) => {
    return !(
      getIn(values, `industries[${industryIndex}].industry`, false) &&
      getIn(values, `industries[${industryIndex}].subCategory`, false)
    );
  };

  const handleDelete = (industryIndex, values, setFieldValue) => {
    const newValues = values.industries.filter((_, index) => industryIndex !== index);
    const newValuesIndustries = newValues.length ? newValues.map(item => item.industry) : [""];
    const newValuesSubCategories = newValues.length
      ? newValues.map(item => item.subCategory)
      : [""];
    setFieldValue(
      "industries",
      newValues.length ? newValues : [{ ...initialIndustry, id: uniqueId() }]
    );
    updateProspect({
      "prospect.orgKYCDetails.industryMultiSelect[0]": {
        industry: newValuesIndustries,
        subCategory: newValuesSubCategories
      }
    });
  };

  const datalistId = isIslamicBanking ? "islamicIndustry" : "industry";

  return (
    <Formik
      initialValues={{
        industries:
          get(industries, "[0].industry[0].length", 0) > 0
            ? industries[0].industry.map((item, index) => ({
                industry: item,
                subCategory: industries[0].subCategory[index],
                id: uniqueId()
              }))
            : industries.map(item => ({
                ...item,
                id: uniqueId()
              }))
      }}
      validationSchema={industrySchema}
      validateOnChange={false}
      onSubmit={handleContinue}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            <FieldArray
              name="industries"
              render={arrayHelper =>
                values.industries.map((item, industryIndex) => {
                  // eslint-disable-next-line max-len
                  const currentIndustry = `prospect.orgKYCDetails.industryMultiSelect[0].industry[${industryIndex}]`;
                  // eslint-disable-next-line max-len
                  const currentSubCategory = `prospect.orgKYCDetails.industryMultiSelect[0].subCategory[${industryIndex}]`;
                  const isDisplayDeleteButton = values.industries.length > 1;

                  return (
                    <React.Fragment key={item.id}>
                      <Grid item md={isDisplayDeleteButton ? 5 : 6} xs={12}>
                        <Field
                          name={`industries[${industryIndex}].industry`}
                          path={currentIndustry}
                          label="Industry"
                          component={SelectAutocomplete}
                          datalistId={datalistId}
                          changeProspect={(prospect, value) => {
                            if (industryIndex) {
                              return prospect;
                            }

                            return {
                              ...prospect,
                              // eslint-disable-next-line max-len
                              [`prospect.orgKYCDetails.industryMultiSelect[0].industry[${industryIndex}]`]: value
                            };
                          }}
                          shrink={true}
                          tabIndex="0"
                          contextualHelpText={
                            <>
                              This should be selected as per the most relevant business / commercial
                              / licensed activity mentioned in the trade license
                            </>
                          }
                        />
                      </Grid>
                      <Grid item md={isDisplayDeleteButton ? 5 : 6} xs={12}>
                        <Field
                          name={`industries[${industryIndex}].subCategory`}
                          path={currentSubCategory}
                          label="Industry sub-category"
                          component={SelectAutocomplete}
                          datalistId={datalistId}
                          filterOptionsDeps={item.industry}
                          filterOptions={options => {
                            // All previous industries with selected industry
                            const previousSelectedIndustries = values.industries.filter(
                              item => item.industry === values.industries[industryIndex].industry
                            );
                            // All previous selected subcategories for selected industry
                            const previousSelectedSubCategories = previousSelectedIndustries.map(
                              item => item.subCategory
                            );

                            return options
                              .filter(({ value }) => item.industry === value)
                              .reduce((acc, curr) => {
                                // All subCategories for selected industry
                                const allSubCategories = curr.subGroup;
                                // Array with current selected subCategory
                                const currentSelectedValue = allSubCategories.filter(
                                  ({ value }) => value === item.subCategory
                                );
                                // Not selected subCategories yet
                                const availableSubCategories = allSubCategories.filter(
                                  sub => !previousSelectedSubCategories.includes(sub.value)
                                );

                                return curr.subGroup && availableSubCategories
                                  ? [...acc, ...availableSubCategories, ...currentSelectedValue]
                                  : acc;
                              }, []);
                          }}
                          disabled={!item.industry}
                          tabIndex="0"
                          contextualHelpText={
                            <>
                              This should be selected as per the most relevant business / commercial
                              / licensed activity mentioned in the trade license
                            </>
                          }
                        />
                      </Grid>
                      <Grid item md={isDisplayDeleteButton ? 2 : false} sm={12}>
                        {isDisplayDeleteButton && (
                          <LinkButton
                            className={classes.deleteButton}
                            clickHandler={() => handleDelete(industryIndex, values, setFieldValue)}
                            title="Delete"
                          />
                        )}
                      </Grid>

                      <Grid item md={12} sm={12}>
                        {values.industries.length === industryIndex + 1 &&
                          values.industries.length < MAX_INDUSTRIES_LENGTH && (
                            <AddButton
                              title="Add another industry"
                              onClick={addIndustryHandler(arrayHelper)}
                              disabled={isAdditionalIndustryDisabled(values, industryIndex)}
                            />
                          )}
                      </Grid>
                    </React.Fragment>
                  );
                })
              }
            />
          </Grid>
          <Grid
            className={classes.continueButton}
            container
            direction="row"
            justify="space-between"
          >
            <InfoTitle title="These should be the same as in your Trade License. You can select multiple industries." />
            <ContinueButton type="submit" />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    industries: get(getOrgKYCDetails(state), "industryMultiSelect", []),
    isIslamicBanking: getIsIslamicBanking(state)
  };
};

const mapDispatchToProps = {
  updateProspect
};

export const Industry = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndustryStep);

import React, { useCallback } from "react";
import uniqueId from "lodash/uniqueId";
import cx from "classnames";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { ArrayRemoveButton } from "../../../Buttons/ArrayRemoveButton";
import { ArrayAddButton } from "../../../Buttons/ArrayAddButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import {
  Checkbox,
  Input,
  SelectAutocomplete,
  AutoSaveField as Field
} from "../../../../../../components/Form";
import { limits, initialEntitiesInUAE, initialEntitiesOutsideUAE } from "./constants";
import {
  MAX_COMPANY_NAME_LENGTH,
  MAX_TRADE_LICENSE_LENGTH
} from "../CompanyBusinessRelationships/constants";
import { ALPHANUMERIC_REGEX, COMPANY_NAME_REGEX } from "../../../../../../utils/validation";
import { withCompanyFinalQuestions } from "../../../withCompanyFinalQuestions";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";

import { useStyles } from "./styled";

const companyBranchesAndSubsidiariesSchema = Yup.object().shape({
  otherEntitiesInUAE: Yup.boolean(),
  entitiesInUAE: Yup.array().when("otherEntitiesInUAE", {
    is: true,
    then: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string()
          .required(getRequiredMessage("Company name"))
          .matches(COMPANY_NAME_REGEX, getInvalidMessage("Company name")),
        emirate: Yup.string().required(getRequiredMessage("Emirate")),
        tradeLicenseNo: Yup.string()
          .required(getRequiredMessage("Trade license number"))
          .max(20, "Maximum 20 characters allowed")
          .matches(ALPHANUMERIC_REGEX, getInvalidMessage("Trade license number"))
      })
    )
  }),
  otherEntitiesOutsideUAE: Yup.boolean(),
  entitiesOutsideUAE: Yup.array().when("otherEntitiesOutsideUAE", {
    is: true,
    then: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string()
          .required(getRequiredMessage("Company name"))
          .matches(COMPANY_NAME_REGEX, getInvalidMessage("Company name")),
        country: Yup.string().required(getRequiredMessage("Country"))
      })
    )
  })
});

export const CompanyBranchesAndSubsidiariesComponent = ({
  handleContinue,
  entitiesInUAE,
  entitiesOutsideUAE,
  updateProspect
}) => {
  const classes = useStyles();

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  const basisPath = "prospect.orgKYCDetails";

  return (
    <div>
      <Formik
        initialValues={{
          entitiesInUAE: entitiesInUAE.map(item => ({ ...item, id: uniqueId() })),
          entitiesOutsideUAE: entitiesOutsideUAE.map(item => ({ ...item, id: uniqueId() })),
          otherEntitiesInUAE: false,
          otherEntitiesOutsideUAE: false
        }}
        onSubmit={handleSubmit}
        validationSchema={companyBranchesAndSubsidiariesSchema}
        validateOnChange={false}
      >
        {withCompanyFinalQuestions(({ values, setFieldValue, setFieldTouched }) => (
          <Form>
            <FieldArray name="entitiesInUAE">
              {arrayHelpers => (
                <>
                  <h4 className={classes.groupLabel}>
                    Branches or subsidiaries or other companies in the UAE
                  </h4>
                  <Field
                    name="otherEntitiesInUAE"
                    path="prospect.orgKYCDetails.otherEntitiesInUAE"
                    label="The company has branches, subsidiaries or other companies in the UAE"
                    component={Checkbox}
                    onSelect={() => {
                      if (values.otherEntitiesInUAE) {
                        setFieldValue(
                          "entitiesInUAE",
                          initialEntitiesInUAE.map(item => ({
                            ...item,
                            id: uniqueId()
                          }))
                        );
                        updateProspect({
                          "prospect.orgKYCDetails.entitiesInUAE": initialEntitiesInUAE
                        });
                        setFieldTouched("entitiesInUAE[0].companyName", false);
                        setFieldTouched("entitiesInUAE[0].tradeLicenseNo", false);
                        setFieldTouched("entitiesInUAE[0].emirate", false);
                      }
                    }}
                    inputProps={{ tabIndex: 0 }}
                  />
                  {values.otherEntitiesInUAE && (
                    <>
                      <Grid container spacing={3} className={classes.flexContainer}>
                        {values.entitiesInUAE.map((item, index) => (
                          <React.Fragment key={item.id}>
                            <Grid item sm={12}>
                              <Field
                                name={`entitiesInUAE[${index}].companyName`}
                                path={`${basisPath}.entitiesInUAE[${index}].companyName`}
                                label="Company name"
                                placeholder="Company name"
                                component={Input}
                                contextualHelpText={
                                  <>
                                    The name of the other company, branch or subsidiary should be as
                                    per their respective Trade Licenses.
                                    <br /> Example <br /> Airlift Global Automation and Heavy
                                    Equipment Rental LLC
                                  </>
                                }
                                InputProps={{
                                  inputProps: { maxLength: MAX_COMPANY_NAME_LENGTH, tabIndex: 0 }
                                }}
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              sm={12}
                              className={cx(classes.relative, { [classes.tablet]: !index })}
                            >
                              <Field
                                name={`entitiesInUAE[${index}].tradeLicenseNo`}
                                path={`${basisPath}.entitiesInUAE[${index}].tradeLicenseNo`}
                                label="Trade License Number"
                                placeholder="Trade License Number"
                                component={Input}
                                contextualHelpText={
                                  <>
                                    The Licence Number of the other company, branch or subsidiary
                                    should be as per their respective Trade License.
                                    <br />
                                    If License Number contains hyphen (-), oblique (/), spaces or
                                    any other special character please enter only alphabets and
                                    numbers
                                    <br />
                                    Example
                                    <br />
                                    CN-123/2019/456 to be entered as CN1232019456
                                  </>
                                }
                                InputProps={{
                                  inputProps: { maxLength: MAX_TRADE_LICENSE_LENGTH, tabIndex: 0 }
                                }}
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              sm={12}
                              className={cx(classes.relative, { [classes.tablet]: !index })}
                            >
                              <Field
                                name={`entitiesInUAE[${index}].emirate`}
                                path={`prospect.orgKYCDetails.entitiesInUAE[${index}].emirate`}
                                datalistId="emirateCity"
                                label="Emirate"
                                isSearchable={false}
                                component={SelectAutocomplete}
                                inputProps={{ tabIndex: 0 }}
                              />
                              {!!index && (
                                <ArrayRemoveButton
                                  arrayHelpers={arrayHelpers}
                                  dataArray={entitiesInUAE}
                                  itemIndex={index}
                                  updateProspect={updateProspect}
                                  prospectPath="prospect.orgKYCDetails.entitiesInUAE"
                                  className={classes.container}
                                  title="Delete"
                                />
                              )}
                            </Grid>
                          </React.Fragment>
                        ))}
                      </Grid>
                      {values.entitiesInUAE.length < limits.INSIDE_SUBSIDIARY_COUNT && (
                        <ArrayAddButton
                          title="Add another subsidiary inside the UAE"
                          limit={limits.INSIDE_SUBSIDIARY_COUNT}
                          requiredFields={["companyName", "tradeLicenseNo", "emirate"]}
                          addedItem={{ companyName: "", tradeLicenseNo: "", emirate: "" }}
                          dataArray={values.entitiesInUAE}
                          arrayHelpers={arrayHelpers}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </FieldArray>
            <div className={classes.divider} />
            <FieldArray name="entitiesOutsideUAE">
              {arrayHelpers => (
                <>
                  <h4 className={classes.groupLabel}>
                    Branches or subsidiaries or other companies outside the UAE
                  </h4>
                  <Field
                    name="otherEntitiesOutsideUAE"
                    path="prospect.orgKYCDetails.otherEntitiesOutsideUAE"
                    label="The company has branches, subsidiaries or other companies outside the UAE"
                    component={Checkbox}
                    onSelect={() => {
                      if (values.otherEntitiesOutsideUAE) {
                        setFieldValue(
                          "entitiesOutsideUAE",
                          initialEntitiesOutsideUAE.map(item => ({
                            ...item,
                            id: uniqueId()
                          }))
                        );
                        updateProspect({
                          "prospect.orgKYCDetails.entitiesOutsideUAE": initialEntitiesOutsideUAE
                        });
                        setFieldTouched("entitiesOutsideUAE[0].companyName", false);
                        setFieldTouched("entitiesOutsideUAE[0].country", false);
                      }
                    }}
                    inputProps={{ tabIndex: 0 }}
                  />
                  {values.otherEntitiesOutsideUAE && (
                    <>
                      <Grid container spacing={3} className={classes.flexContainer}>
                        {values.entitiesOutsideUAE.map((item, index) => (
                          <React.Fragment key={item.id}>
                            <Grid item md={6} sm={12}>
                              <Field
                                name={`entitiesOutsideUAE[${index}].companyName`}
                                path={`${basisPath}.entitiesOutsideUAE[${index}].companyName`}
                                label="Company name"
                                placeholder="Company name"
                                component={Input}
                                contextualHelpText={
                                  <>
                                    The name of the other company, branch or subsidiary should be as
                                    per their respective Trade Licenses.
                                    <br /> Example <br /> Airlift Global Automation and Heavy
                                    Equipment Rental LLC
                                  </>
                                }
                                InputProps={{
                                  inputProps: { maxLength: MAX_COMPANY_NAME_LENGTH, tabIndex: 0 }
                                }}
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              sm={12}
                              className={cx({ [classes.relative]: !!index })}
                            >
                              <Field
                                name={`entitiesOutsideUAE[${index}].country`}
                                path={`${basisPath}.entitiesOutsideUAE[${index}].country`}
                                datalistId="countryOfIncorporation"
                                label="Country"
                                component={SelectAutocomplete}
                                InputProps={{
                                  inputProps: { tabIndex: 0 }
                                }}
                              />
                              {!!index && (
                                <ArrayRemoveButton
                                  arrayHelpers={arrayHelpers}
                                  dataArray={entitiesOutsideUAE}
                                  itemIndex={index}
                                  updateProspect={updateProspect}
                                  prospectPath="prospect.orgKYCDetails.entitiesOutsideUAE"
                                  className={classes.container}
                                  title="Delete"
                                />
                              )}
                            </Grid>
                          </React.Fragment>
                        ))}
                      </Grid>
                      {values.entitiesOutsideUAE.length < limits.OUTSIDE_SUBSIDIARY_COUNT && (
                        <ArrayAddButton
                          title="Add another subsidiary outside the UAE"
                          limit={limits.OUTSIDE_SUBSIDIARY_COUNT}
                          requiredFields={["companyName", "country"]}
                          addedItem={{ companyName: "", country: "" }}
                          dataArray={values.entitiesOutsideUAE}
                          arrayHelpers={arrayHelpers}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </FieldArray>
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        ))}
      </Formik>
    </div>
  );
};

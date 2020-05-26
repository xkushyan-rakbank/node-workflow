import React from "react";
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
import { UAE } from "../../../../../../constants";
import { limits, initialEntitiesInUAE, initialEntitiesOutsideUAE } from "./constants";
import {
  MAX_COMPANY_NAME_LENGTH,
  MAX_TRADE_LICENSE_LENGTH
} from "../CompanyBusinessRelationships/constants";
import { SPECIAL_CHARACTERS_REGEX, checkIsTrimmed } from "../../../../../../utils/validation";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";

import { useStyles } from "./styled";

const companyBranchesAndSubsidiariesSchema = () =>
  Yup.object().shape({
    otherEntitiesInUAE: Yup.boolean(),
    entitiesInUAE: Yup.array().when("otherEntitiesInUAE", {
      is: true,
      then: Yup.array().of(
        Yup.object().shape({
          companyName: Yup.string()
            .required(getRequiredMessage("Company name"))
            // eslint-disable-next-line no-template-curly-in-string
            .max(MAX_COMPANY_NAME_LENGTH, "Maximum ${max} characters allowed")
            .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Company name"))
            .test("space validation", getInvalidMessage("Company name"), checkIsTrimmed),
          emirate: Yup.string().required(getRequiredMessage("Emirate/ City")),
          tradeLicenseNo: Yup.string()
            .required(getRequiredMessage("Trade license number"))
            .max(20, "Maximum 20 characters allowed")
            .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Trade license number"))
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
            // eslint-disable-next-line no-template-curly-in-string
            .max(MAX_COMPANY_NAME_LENGTH, "Maximum ${max} characters allowed")
            .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Company name"))
            .test("space validation", getInvalidMessage("Company name"), checkIsTrimmed),
          country: Yup.string().required(getRequiredMessage("Country"))
        })
      )
    })
  });

export const CompanyBranchesAndSubsidiariesComponent = ({
  handleContinue,
  createFormChangeHandler,
  entitiesInUAE,
  entitiesOutsideUAE,
  updateProspect
}) => {
  const classes = useStyles();

  const basisPath = "prospect.orgKYCDetails";

  return (
    <Formik
      initialValues={{
        entitiesInUAE: entitiesInUAE.map(item => ({ ...item, id: uniqueId() })),
        entitiesOutsideUAE: entitiesOutsideUAE.map(item => ({ ...item, id: uniqueId() })),
        otherEntitiesInUAE: false,
        otherEntitiesOutsideUAE: false
      }}
      onSubmit={handleContinue}
      validationSchema={companyBranchesAndSubsidiariesSchema}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values, setTouched, setFieldValue }) => {
        const isEntitiesInUAE = values.entitiesInUAE.length > 1;
        const isEntitiesOutsideUAE = values.entitiesOutsideUAE.length > 1;
        return (
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
                    label="The company or shareholders have other companies, branches or subsidiaries in the UAE"
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
                        setTouched({
                          "entitiesInUAE[0].companyName": false,
                          "entitiesInUAE[0].tradeLicenseNo": false,
                          "entitiesInUAE[0].emirate": false
                        });
                      }
                    }}
                    inputProps={{ tabIndex: 0 }}
                  />
                  {values.otherEntitiesInUAE && (
                    <>
                      <Grid container spacing={3} className={classes.flexContainer}>
                        {values.entitiesInUAE.map((item, index) => (
                          <React.Fragment key={item.id}>
                            <Grid item sm={isEntitiesInUAE ? 10 : 12} xs={12}>
                              <Field
                                name={`entitiesInUAE[${index}].companyName`}
                                path={`${basisPath}.entitiesInUAE[${index}].companyName`}
                                label="Company name"
                                placeholder="Company name"
                                component={Input}
                                contextualHelpText={
                                  <>
                                    The name of the other company, branch or subsidiary should be as
                                    per their respective Trade license.
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
                              sm={isEntitiesInUAE ? 5 : 6}
                              xs={12}
                              className={cx(classes.relative, { [classes.tablet]: !index })}
                            >
                              <Field
                                name={`entitiesInUAE[${index}].tradeLicenseNo`}
                                path={`${basisPath}.entitiesInUAE[${index}].tradeLicenseNo`}
                                label="Trade License Number"
                                placeholder="Trade License Number"
                                component={Input}
                                contextualHelpText="The License Number of the other company, branch or subsidiary
                                  should be as per their respective Trade License."
                                InputProps={{
                                  inputProps: { maxLength: MAX_TRADE_LICENSE_LENGTH, tabIndex: 0 }
                                }}
                              />
                            </Grid>
                            <Grid
                              item
                              sm={isEntitiesInUAE ? 5 : 6}
                              xs={12}
                              className={cx(classes.relative, { [classes.tablet]: !index })}
                            >
                              <Field
                                name={`entitiesInUAE[${index}].emirate`}
                                path={`prospect.orgKYCDetails.entitiesInUAE[${index}].emirate`}
                                datalistId="emirateCity"
                                label="Emirate/ City"
                                isSearchable
                                component={SelectAutocomplete}
                                tabIndex="0"
                              />
                              {isEntitiesInUAE && (
                                <ArrayRemoveButton
                                  arrayHelpers={arrayHelpers}
                                  dataArray={entitiesInUAE}
                                  itemIndex={index}
                                  updateProspect={updateProspect}
                                  prospectPath="prospect.orgKYCDetails.entitiesInUAE"
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
                    label="The company or shareholders have other companies, branches or subsidiaries outside the UAE"
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
                        setTouched({
                          "entitiesOutsideUAE[0].companyName": false,
                          "entitiesOutsideUAE[0].country": false
                        });
                      }
                    }}
                    inputProps={{ tabIndex: 0 }}
                  />
                  {values.otherEntitiesOutsideUAE && (
                    <>
                      <Grid container spacing={3} className={classes.flexContainer}>
                        {values.entitiesOutsideUAE.map((item, index) => (
                          <React.Fragment key={item.id}>
                            <Grid item sm={isEntitiesOutsideUAE ? 5 : 6} xs={12}>
                              <Field
                                name={`entitiesOutsideUAE[${index}].companyName`}
                                path={`${basisPath}.entitiesOutsideUAE[${index}].companyName`}
                                label="Company name"
                                placeholder="Company name"
                                component={Input}
                                contextualHelpText={
                                  <>
                                    The name of the other company, branch or subsidiary should be as
                                    per their respective registration documents.
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
                              sm={isEntitiesOutsideUAE ? 5 : 6}
                              xs={12}
                              className={classes.relative}
                            >
                              <Field
                                name={`entitiesOutsideUAE[${index}].country`}
                                filterOptions={countries => {
                                  return countries.filter(country => country.code !== UAE);
                                }}
                                path={`${basisPath}.entitiesOutsideUAE[${index}].country`}
                                datalistId="countryOfIncorporation"
                                label="Country"
                                component={SelectAutocomplete}
                                tabIndex="0"
                              />
                              {isEntitiesOutsideUAE && (
                                <ArrayRemoveButton
                                  arrayHelpers={arrayHelpers}
                                  dataArray={entitiesOutsideUAE}
                                  itemIndex={index}
                                  updateProspect={updateProspect}
                                  prospectPath="prospect.orgKYCDetails.entitiesOutsideUAE"
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
        );
      })}
    </Formik>
  );
};

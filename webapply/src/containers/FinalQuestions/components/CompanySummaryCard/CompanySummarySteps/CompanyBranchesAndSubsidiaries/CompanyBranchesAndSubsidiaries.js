import React, { useCallback } from "react";
import cx from "classnames";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { AddButton } from "../../../../../../components/Buttons/AddButton";
import { RemoveButton } from "../../../../../../components/Buttons/RemoveButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { limits } from "./constants";
import { useStyles } from "./styled";
import { prospect } from "../../../../../../constants/config";
import { Checkbox, CustomSelect, Input, AutoSaveField } from "../../../../../../components/Form";
import { TRADE_LICENSE_REGEX, COMPANY_NAME_REGEX } from "../../../../../../utils/validation";
import { emirateCityOptions } from "../CompanyPreferredMailingAddress/constants";
import { countryOptions } from "../CompanyBusinessRelationships/constants";

const companyBranchesAndSubsidiariesSchema = Yup.object().shape({
  otherEntitiesInUAE: Yup.boolean(),
  entitiesInUAE: Yup.array().when("otherEntitiesInUAE", {
    is: true,
    then: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string()
          .required("You need to provide company name")
          .matches(COMPANY_NAME_REGEX, "This is not a valid company name"),
        emirate: Yup.string().required("You need to provide emirate city"),
        tradeLicenseNo: Yup.string()
          .required("You need to provide license number")
          .matches(TRADE_LICENSE_REGEX, "This is not a valid trade license number")
      })
    )
  }),
  otherEntitiesOutsideUAE: Yup.boolean(),
  entitiesOutsideUAE: Yup.array().when("otherEntitiesOutsideUAE", {
    is: true,
    then: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string()
          .required("You need to provide company name")
          .matches(COMPANY_NAME_REGEX, "This is not a valid company name"),
        country: Yup.string().required("You need to provide company country")
      })
    )
  })
});

export const CompanyBusinessRelationshipsComponent = ({ handleContinue }) => {
  const classes = useStyles();

  const checkIsAddButtonDisabled = (limit, items, ...fields) => {
    const lastAddedItem = items[items.length - 1];
    const allFieldsFilled = fields.length
      ? fields.every(item => lastAddedItem[item] !== "")
      : lastAddedItem;
    return items.length >= limit || !allFieldsFilled;
  };

  const handleCheckboxCallback = (value, name, callback) => {
    if (!value) {
      callback(name, prospect.orgKYCDetails[name]);
    }
  };

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          entitiesInUAE: [
            {
              companyName: "",
              emirate: "",
              tradeLicenseNo: ""
            }
          ],
          entitiesOutsideUAE: [
            {
              companyName: "",
              country: ""
            }
          ],
          otherEntitiesInUAE: false,
          otherEntitiesOutsideUAE: false
        }}
        onSubmit={handleSubmit}
        validationSchema={companyBranchesAndSubsidiariesSchema}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <AutoSaveField
                isFieldArray
                name="entitiesInUAE"
                path="prospect.orgKYCDetails.entitiesInUAE"
              >
                {arrayHelpers => (
                  <>
                    <h4 className={classes.groupLabel}>
                      Branches or subsidiaries or other companies in the UAE
                    </h4>
                    <AutoSaveField
                      name="otherEntitiesInUAE"
                      path="prospect.orgKYCDetails.otherEntitiesInUAE"
                      label="The company has branches, subsidiaries or other companies in the UAE"
                      component={Checkbox}
                      onChange={() => {
                        setFieldValue("otherEntitiesInUAE", !values.otherEntitiesInUAE);
                        handleCheckboxCallback(
                          values.otherEntitiesInUAE,
                          "entitiesInUAE",
                          setFieldValue
                        );
                      }}
                    />
                    {values.otherEntitiesInUAE && (
                      <>
                        <Grid container spacing={3} className={classes.flexContainer}>
                          {values.entitiesInUAE.map((item, index) => (
                            <React.Fragment key={index}>
                              <Grid item sm={12}>
                                <Field
                                  name={`entitiesInUAE[${index}].companyName`}
                                  label="Company name"
                                  placeholder="Company name"
                                  component={Input}
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
                                  label="Trade License Number"
                                  placeholder="Trade License Number"
                                  component={Input}
                                />
                              </Grid>
                              <Grid
                                item
                                md={6}
                                sm={12}
                                className={cx(classes.relative, { [classes.tablet]: !index })}
                              >
                                <Field
                                  options={emirateCityOptions}
                                  name={`entitiesInUAE[${index}].emirate`}
                                  label="Emirate"
                                  extractId={option => option.key}
                                  component={CustomSelect}
                                />
                                {!!index && (
                                  <RemoveButton
                                    onClick={() => arrayHelpers.remove(index)}
                                    title="Delete"
                                    className={classes.container}
                                  />
                                )}
                              </Grid>
                            </React.Fragment>
                          ))}
                        </Grid>
                        {values.entitiesInUAE.length < limits.INSIDE_SUBSIDIARY_COUNT && (
                          <AddButton
                            onClick={() =>
                              arrayHelpers.insert(values.entitiesInUAE.length, {
                                companyName: "",
                                tradeLicenseNo: "",
                                emirate: ""
                              })
                            }
                            title="Add another subsidiary inside the UAE"
                            disabled={checkIsAddButtonDisabled(
                              limits.INSIDE_SUBSIDIARY_COUNT,
                              values.entitiesInUAE,
                              "companyName",
                              "tradeLicenseNo",
                              "emirate"
                            )}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </AutoSaveField>
              <div className={classes.divider} />
              <AutoSaveField
                isFieldArray
                name="entitiesOutsideUAE"
                path="prospect.orgKYCDetails.entitiesOutsideUAE"
              >
                {arrayHelpers => (
                  <>
                    <h4 className={classes.groupLabel}>
                      Branches or subsidiaries or other companies outside the UAE
                    </h4>
                    <AutoSaveField
                      name="otherEntitiesOutsideUAE"
                      path="prospect.orgKYCDetails.otherEntitiesOutsideUAE"
                      label="The company has branches, subsidiaries or other companies outside the UAE"
                      component={Checkbox}
                      onChange={() => {
                        setFieldValue("otherEntitiesOutsideUAE", !values.otherEntitiesOutsideUAE);
                        handleCheckboxCallback(
                          values.otherEntitiesOutsideUAE,
                          "entitiesOutsideUAE",
                          setFieldValue
                        );
                      }}
                    />
                    {values.otherEntitiesOutsideUAE && (
                      <>
                        <Grid container spacing={3} className={classes.flexContainer}>
                          {values.entitiesOutsideUAE.map((item, index) => (
                            <React.Fragment key={index}>
                              <Grid item md={6} sm={12}>
                                <Field
                                  name={`entitiesOutsideUAE[${index}].companyName`}
                                  label="Company name"
                                  placeholder="Company name"
                                  component={Input}
                                />
                              </Grid>
                              <Grid
                                item
                                md={6}
                                sm={12}
                                className={cx({ [classes.relative]: index !== 0 })}
                              >
                                <Field
                                  options={countryOptions}
                                  name={`entitiesOutsideUAE[${index}].country`}
                                  label="Country"
                                  extractId={option => option.key}
                                  component={CustomSelect}
                                />
                                {!!index && (
                                  <RemoveButton
                                    onClick={() => arrayHelpers.remove(index)}
                                    title="Delete"
                                    className={classes.container}
                                  />
                                )}
                              </Grid>
                            </React.Fragment>
                          ))}
                        </Grid>
                        {values.entitiesOutsideUAE.length < limits.OUTSIDE_SUBSIDIARY_COUNT && (
                          <AddButton
                            onClick={() =>
                              arrayHelpers.insert(values.entitiesOutsideUAE.length, {
                                companyName: "",
                                country: ""
                              })
                            }
                            title="Add another subsidiary outside the UAE"
                            disabled={checkIsAddButtonDisabled(
                              limits.OUTSIDE_SUBSIDIARY_COUNT,
                              values.entitiesOutsideUAE,
                              "companyName",
                              "country"
                            )}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </AutoSaveField>
              <div className={classes.buttonWrapper}>
                <ContinueButton type="submit" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

import React from "react";
import cx from "classnames";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { AddButton } from "../../../../../../components/Buttons/AddButton";
import { RemoveButton } from "../../../../../../components/Buttons/RemoveButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { limits } from "./constants";
import { useStyles } from "./styled";
import { prospect } from "../../../../../../constants/config";
import { Checkbox, CustomSelect, Input } from "../../../../../../components/Form";
import { TRADE_LICENSE_REGEX, COMPANY_NAME_REGEX } from "../../../../../../utils/validation";
import { countryOptions } from "../CompanyBusinessRelationships/constants";

const companyBranchesAndSubsidiariesSchema = Yup.object().shape({
  otherEntitiesInUAE: Yup.boolean(),
  entitiesInUAE: Yup.array().when("otherEntitiesInUAE", {
    is: true,
    then: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string()
          .required("Required")
          .matches(COMPANY_NAME_REGEX, "This is not a valid company name"),
        emirate: Yup.string().required("Required"),
        tradeLicenseNo: Yup.string()
          .required("Required")
          .matches(TRADE_LICENSE_REGEX, "This is not a valid trade license number")
      })
    )
  }),
  otherwise: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string(),
      emirate: Yup.string(),
      tradeLicenseNo: Yup.string()
    })
  ),
  otherEntitiesOutsideUAE: Yup.boolean(),
  entitiesOutsideUAE: Yup.array().when("otherEntitiesOutsideUAE", {
    is: true,
    then: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string()
          .required("Required")
          .matches(COMPANY_NAME_REGEX, "This is not a valid company name"),
        country: Yup.string().required("Required")
      })
    )
  })
});

export const CompanyBusinessRelationshipsComponent = ({ handleContinue }) => {
  const classes = useStyles();

  function getIsAddButtonDisabled(limit, items, ...fields) {
    const lastAddedItem = items[items.length - 1];
    const allFieldsFilled = fields.length
      ? fields.every(item => lastAddedItem[item] !== "")
      : lastAddedItem;
    return items.length >= limit || !allFieldsFilled;
  }

  function checkboxCallback(value, name, callback) {
    if (value) {
      return;
    }
    callback(name, prospect.orgKYCDetails[name]);
  }

  const onSubmit = values => {
    handleContinue();
    console.log(values);
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          entitiesInUAE: prospect.orgKYCDetails.entitiesInUAE,
          entitiesOutsideUAE: prospect.orgKYCDetails.entitiesOutsideUAE,
          otherEntitiesInUAE: prospect.orgKYCDetails.otherEntitiesInUAE,
          otherEntitiesOutsideUAE: prospect.orgKYCDetails.otherEntitiesOutsideUAE
        }}
        onSubmit={onSubmit}
        validationSchema={companyBranchesAndSubsidiariesSchema}
      >
        {({ values, setFieldValue }) => {
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
                      label="The company has branches, subsidiaries or other companies in the UAE"
                    >
                      {({ field, form }) => (
                        <Checkbox
                          field={field}
                          form={form}
                          label="The company has branches, subsidiaries or other companies in the UAE"
                          name="otherEntitiesInUAE"
                          callback={() =>
                            checkboxCallback(
                              values.otherEntitiesInUAE,
                              "entitiesInUAE",
                              setFieldValue
                            )
                          }
                        />
                      )}
                    </Field>
                    {values.otherEntitiesInUAE && (
                      <>
                        <Grid container spacing={3} className={classes.flexContainer}>
                          {values.entitiesInUAE.map((friend, index) => (
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
                                  options={countryOptions}
                                  shrink={false}
                                  name={`entitiesInUAE[${index}].emirate`}
                                  placeholder="Emirate"
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
                            disabled={getIsAddButtonDisabled(
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
                      label="The company has branches, subsidiaries or other companies outside the UAE"
                    >
                      {({ field, form }) => (
                        <Checkbox
                          field={field}
                          form={form}
                          label="The company has branches, subsidiaries or other companies outside the UAE"
                          name="otherEntitiesOutsideUAE"
                          callback={() =>
                            checkboxCallback(
                              values.otherEntitiesOutsideUAE,
                              "entitiesOutsideUAE",
                              setFieldValue
                            )
                          }
                        />
                      )}
                    </Field>
                    {values.otherEntitiesOutsideUAE && (
                      <>
                        <Grid container spacing={3} className={classes.flexContainer}>
                          {values.entitiesOutsideUAE.map((friend, index) => (
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
                                className={cx({ [classes.relative]: !index })}
                              >
                                <Field
                                  options={countryOptions}
                                  shrink={false}
                                  name={`entitiesOutsideUAE[${index}].country`}
                                  placeholder="Country"
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
                            disabled={getIsAddButtonDisabled(
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
              </FieldArray>
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

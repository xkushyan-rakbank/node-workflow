import React from "react";
import cx from "classnames";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { AddButton } from "../../../../../../components/Buttons/AddButton";
import { RemoveButton } from "../../../../../../components/Buttons/RemoveButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { limits } from "./constants";
import { useStyles } from "./styled";
import { prospect } from "../../../../../../constants/config";
import {
  Checkbox,
  CustomSelect,
  Input,
  AutoSaveField as Field
} from "../../../../../../components/Form";
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
          .required("You need to provide company name")
          .matches(COMPANY_NAME_REGEX, "This is not a valid company name"),
        country: Yup.string().required("You need to provide company country")
      })
    )
  })
});

export const CompanyBusinessRelationshipsComponent = ({
  handleContinue,
  entitiesInUAE,
  updateProspect,
  entitiesOutsideUAE,
  otherEntitiesOutsideUAE,
  otherEntitiesInUAE
}) => {
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

  function handleRemoveItem(items, index, prospect) {
    const dataList = [...items];
    dataList.splice(index, 1);
    const path = `prospect.orgKYCDetails.${prospect}`;
    updateProspect({
      [path]: [...dataList]
    });
  }

  const onSubmit = () => {
    handleContinue();
  };

  const basisPath = "prospect.orgKYCDetails";

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          entitiesInUAE,
          entitiesOutsideUAE,
          otherEntitiesInUAE,
          otherEntitiesOutsideUAE
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
                      path="prospect.orgKYCDetails.otherEntitiesInUAE"
                      label="The company has branches, subsidiaries or other companies in the UAE"
                      component={Checkbox}
                      onChange={() => {
                        setFieldValue("otherEntitiesInUAE", !values.otherEntitiesInUAE);
                        checkboxCallback(values.otherEntitiesInUAE, "entitiesInUAE", setFieldValue);
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
                                  path={`${basisPath}.entitiesInUAE[${index}].companyName`}
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
                                  path={`${basisPath}.entitiesInUAE[${index}].tradeLicenseNo`}
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
                                  shrink={false}
                                  name={`entitiesInUAE[${index}].emirate`}
                                  path={`prospect.orgKYCDetails.entitiesInUAE[${index}].emirate`}
                                  placeholder="Emirate"
                                  label="Emirate"
                                  extractId={option => option.key}
                                  component={CustomSelect}
                                />
                                {!!index && (
                                  <RemoveButton
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                      handleRemoveItem(entitiesInUAE, index, "entitiesInUAE");
                                    }}
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
                      path="prospect.orgKYCDetails.otherEntitiesOutsideUAE"
                      label="The company has branches, subsidiaries or other companies outside the UAE"
                      component={Checkbox}
                      onChange={() => {
                        setFieldValue("otherEntitiesOutsideUAE", !values.otherEntitiesOutsideUAE);
                        checkboxCallback(
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
                                  path={`${basisPath}.entitiesOutsideUAE[${index}].companyName`}
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
                                  shrink={false}
                                  name={`entitiesOutsideUAE[${index}].country`}
                                  path={`${basisPath}.entitiesOutsideUAE[${index}].country`}
                                  placeholder="Country"
                                  label="Country"
                                  extractId={option => option.key}
                                  component={CustomSelect}
                                />
                                {!!index && (
                                  <RemoveButton
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                      handleRemoveItem(
                                        entitiesOutsideUAE,
                                        index,
                                        "entitiesOutsideUAE"
                                      );
                                    }}
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

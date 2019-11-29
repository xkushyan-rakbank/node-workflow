import React, { useCallback } from "react";
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

export const CompanyBranchesAndSubsidiariesComponent = ({
  handleContinue,
  entitiesInUAE,
  entitiesOutsideUAE,
  updateProspect
}) => {
  const classes = useStyles();

  const checkIsAddButtonDisabled = (limit, items, ...fields) => {
    if (!items.length) {
      return false;
    }
    const lastAddedItem = items[items.length - 1];
    return items.length === limit || fields.some(item => lastAddedItem[item] === "");
  };

  const handleRemoveField = (items, index, prospect) => {
    const dataList = [...items];
    dataList.splice(index, 1);
    const path = `prospect.orgKYCDetails.${prospect}`;
    updateProspect({ [path]: [...dataList] });
  };

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  const basisPath = "prospect.orgKYCDetails";

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          entitiesInUAE,
          entitiesOutsideUAE,
          otherEntitiesInUAE: false,
          otherEntitiesOutsideUAE: false
        }}
        onSubmit={handleSubmit}
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
                      onSelect={() => {
                        if (values.otherEntitiesInUAE) {
                          setFieldValue("entitiesInUAE", prospect.orgKYCDetails.entitiesInUAE);
                          updateProspect({
                            "prospect.orgKYCDetails.entitiesInUAE":
                              prospect.orgKYCDetails.entitiesInUAE
                          });
                        }
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
                                  name={`entitiesInUAE[${index}].emirate`}
                                  path={`prospect.orgKYCDetails.entitiesInUAE[${index}].emirate`}
                                  datalistId="emirate"
                                  label="Emirate"
                                  extractLabel={item => item.displayText}
                                  component={CustomSelect}
                                />
                                {!!index && (
                                  <RemoveButton
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                      handleRemoveField(entitiesInUAE, index, "entitiesInUAE");
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
                            prospect.orgKYCDetails.entitiesOutsideUAE
                          );
                          updateProspect({
                            "prospect.orgKYCDetails.entitiesOutsideUAE":
                              prospect.orgKYCDetails.entitiesOutsideUAE
                          });
                        }
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
                                className={cx({ [classes.relative]: !!index })}
                              >
                                <Field
                                  name={`entitiesOutsideUAE[${index}].country`}
                                  path={`${basisPath}.entitiesOutsideUAE[${index}].country`}
                                  label="Country"
                                  datalistId="country"
                                  extractLabel={item => item.displayText}
                                  component={CustomSelect}
                                />
                                {!!index && (
                                  <RemoveButton
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                      handleRemoveField(
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

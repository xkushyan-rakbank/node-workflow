import React, { useCallback } from "react";
import uniqueId from "lodash/uniqueId";
import cx from "classnames";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { ArrayRemoveButton } from "../../../../Buttons/ArrayRemoveButton";
import { ArrayAddButton } from "../../../../Buttons/ArrayAddButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import {
  Checkbox,
  CustomSelect,
  Input,
  AutoSaveField as Field
} from "../../../../../../components/Form";
import { limits } from "./constants";
import { prospect } from "../../../../../../constants/config";
import { TRADE_LICENSE_REGEX, COMPANY_NAME_REGEX } from "../../../../../../utils/validation";

import { useStyles } from "./styled";

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

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  const basisPath = "prospect.orgKYCDetails";

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          entitiesInUAE: entitiesInUAE.map(item => ({ ...item, id: uniqueId() })),
          entitiesOutsideUAE: entitiesOutsideUAE.map(item => ({ ...item, id: uniqueId() })),
          otherEntitiesInUAE: false,
          otherEntitiesOutsideUAE: false
        }}
        onSubmit={handleSubmit}
        validationSchema={companyBranchesAndSubsidiariesSchema}
      >
        {({ values, setFieldValue, setFieldTouched }) => (
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
                          prospect.orgKYCDetails.entitiesInUAE.map(item => ({
                            ...item,
                            id: uniqueId()
                          }))
                        );
                        updateProspect({
                          "prospect.orgKYCDetails.entitiesInUAE":
                            prospect.orgKYCDetails.entitiesInUAE
                        });
                        setFieldTouched("entitiesInUAE[0].companyName", false);
                        setFieldTouched("entitiesInUAE[0].tradeLicenseNo", false);
                        setFieldTouched("entitiesInUAE[0].emirate", false);
                      }
                    }}
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
                                component={CustomSelect}
                              />
                              {!!index && (
                                <ArrayRemoveButton
                                  arrayHelpers={arrayHelpers}
                                  dataArray={entitiesInUAE}
                                  itemIndex={index}
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
                          prospect.orgKYCDetails.entitiesOutsideUAE.map(item => ({
                            ...item,
                            id: uniqueId()
                          }))
                        );
                        updateProspect({
                          "prospect.orgKYCDetails.entitiesOutsideUAE":
                            prospect.orgKYCDetails.entitiesOutsideUAE
                        });
                        setFieldTouched("entitiesOutsideUAE[0].companyName", false);
                        setFieldTouched("entitiesOutsideUAE[0].country", false);
                      }
                    }}
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
                                component={CustomSelect}
                              />
                              {!!index && (
                                <ArrayRemoveButton
                                  arrayHelpers={arrayHelpers}
                                  dataArray={entitiesOutsideUAE}
                                  itemIndex={index}
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
        )}
      </Formik>
    </div>
  );
};

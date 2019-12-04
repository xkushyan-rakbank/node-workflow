import React, { useCallback } from "react";
import uniqueId from "lodash/uniqueId";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";

import {
  Input,
  CustomSelect,
  Checkbox,
  AutoSaveField as Field
} from "../../../../../../components/Form";
import { ArrayRemoveButton } from "../../../Buttons/ArrayRemoveButton";
import { ArrayAddButton } from "../../../Buttons/ArrayAddButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import {
  limits,
  INITIAL_ARRAY_INDEX,
  initialOtherBankDetails,
  initialTopOriginGoodsCountries,
  initialTopSuppliers
} from "./constants";
import { COMPANY_NAME_REGEX, BANK_NAME_REGEX } from "../../../../../../utils/validation";

import { useStyles } from "./styled";

const companyBusinessRelationshipsSchema = Yup.object().shape({
  topCustomers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("You need to provide customer name")
        .matches(COMPANY_NAME_REGEX, "This is not a valid company name"),
      country: Yup.string().required("You need to provide company country")
    })
  ),
  isDontHaveSuppliersYet: Yup.boolean(),
  topSuppliers: Yup.array().when("isDontHaveSuppliersYet", {
    is: false,
    then: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .required("You need to provide company name")
          .matches(COMPANY_NAME_REGEX, "This is not a valid company name"),
        country: Yup.string().required("You need to provide company country")
      })
    )
  }),
  isDontTradeGoodsYet: Yup.bool(),
  topOriginGoodsCountries: Yup.array().when("isDontTradeGoodsYet", {
    is: false,
    then: Yup.array().of(
      Yup.object().shape({
        country: Yup.string().required("You need to provide trade good country")
      })
    )
  }),
  otherBankingRelationshipsInfo: Yup.object().shape({
    otherBankingRelationshipsExist: Yup.bool(),
    otherBankDetails: Yup.array().when("otherBankingRelationshipsExist", {
      is: true,
      then: Yup.array().of(
        Yup.object().shape({
          bankName: Yup.string()
            .matches(BANK_NAME_REGEX, "This is not a valid bank name")
            .required("You need to provide bank name")
        })
      )
    })
  })
});

export const CompanyBusinessRelationshipsComponent = ({
  handleContinue,
  topCustomers,
  topSuppliers,
  topOriginGoodsCountries,
  otherBankDetails,
  updateProspect
}) => {
  const classes = useStyles();
  const basisPath = "prospect.orgKYCDetails";
  const bankFieldPath = "otherBankingRelationshipsInfo.otherBankDetails";

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          topCustomers: topCustomers.map(item => ({ ...item, id: uniqueId() })),
          isDontHaveSuppliersYet: false,
          topSuppliers: topSuppliers.map(item => ({ ...item, id: uniqueId() })),
          topOriginGoodsCountries: topOriginGoodsCountries.map(item => ({
            country: item,
            id: uniqueId()
          })),
          isDontTradeGoodsYet: false,
          otherBankingRelationshipsInfo: {
            otherBankingRelationshipsExist: false,
            otherBankDetails: otherBankDetails.map(item => ({ ...item, id: uniqueId() }))
          }
        }}
        onSubmit={handleSubmit}
        validationSchema={companyBusinessRelationshipsSchema}
      >
        {({ values, setFieldValue, setFieldTouched }) => {
          return (
            <Form>
              <FieldArray name="topCustomers">
                {arrayHelpers => (
                  <>
                    <h4 className={classes.groupLabel}>Top customers</h4>
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.topCustomers.map((item, index) => (
                        <React.Fragment key={item.id}>
                          <Grid item md={index === 0 ? 6 : 5} sm={12}>
                            <Field
                              name={`topCustomers[${index}].name`}
                              path={`prospect.orgKYCDetails.topCustomers[${index}].name`}
                              label="Name"
                              placeholder="Name"
                              component={Input}
                            />
                          </Grid>
                          <Grid
                            item
                            md={index === 0 ? 6 : 5}
                            sm={12}
                            className={cx(classes.relative, { [classes.tablet]: !index })}
                          >
                            <Field
                              name={`topCustomers[${index}].country`}
                              path={`prospect.orgKYCDetails.topCustomers[${index}].country`}
                              label="Country"
                              datalistId="country"
                              component={CustomSelect}
                            />
                            {!!index && (
                              <ArrayRemoveButton
                                arrayHelpers={arrayHelpers}
                                dataArray={topCustomers}
                                itemIndex={index}
                                prospectPath="prospect.orgKYCDetails.topCustomers"
                                title="Delete"
                              />
                            )}
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                    {values.topCustomers.length < limits.CUSTOMER_COUNT && (
                      <ArrayAddButton
                        title="Add another customer"
                        limit={limits.CUSTOMER_COUNT}
                        requiredFields={["name", "country"]}
                        addedItem={{ name: "", country: "" }}
                        dataArray={values.topCustomers}
                        arrayHelpers={arrayHelpers}
                      />
                    )}
                  </>
                )}
              </FieldArray>
              <div className={classes.divider} />
              <FieldArray name="topSuppliers">
                {arrayHelpers => (
                  <>
                    <h4 className={classes.groupLabel}>Top suppliers</h4>
                    <Field
                      name="isDontHaveSuppliersYet"
                      path="prospect.orgKYCDetails.isDontHaveSuppliersYet"
                      label="I don't have any suppliers"
                      component={Checkbox}
                      onSelect={() => {
                        if (!values.isDontHaveSuppliersYet) {
                          setFieldValue(
                            "topSuppliers",
                            initialTopSuppliers.map(item => ({
                              ...item,
                              id: uniqueId()
                            }))
                          );
                          updateProspect({
                            "prospect.orgKYCDetails.topSuppliers": initialTopSuppliers
                          });
                          setFieldTouched(`topSuppliers[${INITIAL_ARRAY_INDEX}].name`, false);
                          setFieldTouched(`topSuppliers[${INITIAL_ARRAY_INDEX}].country`, false);
                        }
                      }}
                    />
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.topSuppliers.map((item, index) => (
                        <React.Fragment key={item.id}>
                          <Grid item md={index === 0 ? 6 : 5} sm={12}>
                            <Field
                              name={`topSuppliers[${index}].name`}
                              path={`prospect.orgKYCDetails.topSuppliers[${index}].name`}
                              label="Name"
                              placeholder="Name"
                              component={Input}
                              disabled={values.isDontHaveSuppliersYet}
                            />
                          </Grid>
                          <Grid
                            item
                            md={index === 0 ? 6 : 5}
                            sm={12}
                            className={cx(classes.relative, { [classes.tablet]: !index })}
                          >
                            <Field
                              name={`topSuppliers[${index}].country`}
                              path={`prospect.orgKYCDetails.topSuppliers[${index}].country`}
                              label="Country"
                              datalistId="country"
                              component={CustomSelect}
                              disabled={values.isDontHaveSuppliersYet}
                            />
                            {!!index && (
                              <ArrayRemoveButton
                                arrayHelpers={arrayHelpers}
                                dataArray={topSuppliers}
                                itemIndex={index}
                                prospectPath="prospect.orgKYCDetails.topSuppliers"
                                title="Delete"
                              />
                            )}
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                    {values.topSuppliers.length < limits.SUPPLIER_COUNT && (
                      <ArrayAddButton
                        title="Add another supplier"
                        limit={limits.SUPPLIER_COUNT}
                        requiredFields={["name", "country"]}
                        addedItem={{
                          name: "",
                          country: ""
                        }}
                        dataArray={values.topSuppliers}
                        arrayHelpers={arrayHelpers}
                      />
                    )}
                  </>
                )}
              </FieldArray>
              <div className={classes.divider} />
              <FieldArray name="topOriginGoodsCountries">
                {arrayHelpers => (
                  <>
                    <h4 className={classes.groupLabel}>Top origin of goods</h4>
                    <Field
                      name="isDontTradeGoodsYet"
                      path="prospect.orgKYCDetails.isDontTradeGoodsYet"
                      label="I don't trade with goods"
                      component={Checkbox}
                      onSelect={() => {
                        if (!values.isDontTradeGoodsYet) {
                          setFieldValue(
                            "topOriginGoodsCountries",
                            initialTopOriginGoodsCountries.map(item => ({
                              country: item,
                              id: uniqueId()
                            }))
                          );
                          updateProspect({
                            "prospect.orgKYCDetails.topOriginGoodsCountries": initialTopOriginGoodsCountries
                          });
                          setFieldTouched(`topOriginGoodsCountries[${INITIAL_ARRAY_INDEX}]`, false);
                        }
                      }}
                    />
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.topOriginGoodsCountries.map((item, index) => (
                        <React.Fragment key={item.id}>
                          <Grid
                            item
                            md={index === 0 ? 12 : 10}
                            sm={12}
                            className={cx(classes.relative, { [classes.tablet]: !index })}
                          >
                            <Field
                              name={`topOriginGoodsCountries[${index}].country`}
                              path={`prospect.orgKYCDetails.topOriginGoodsCountries[${index}]`}
                              label="Country"
                              datalistId="country"
                              component={CustomSelect}
                              disabled={values.isDontTradeGoodsYet}
                            />
                            {!!index && (
                              <ArrayRemoveButton
                                arrayHelpers={arrayHelpers}
                                dataArray={topOriginGoodsCountries}
                                itemIndex={index}
                                prospectPath="prospect.orgKYCDetails.topOriginGoodsCountries"
                                title="Delete"
                              />
                            )}
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                    {values.topOriginGoodsCountries.length < limits.COUNTRY_OF_ORIGIN_COUNT && (
                      <ArrayAddButton
                        title="Add another country of origin"
                        limit={limits.COUNTRY_OF_ORIGIN_COUNT}
                        requiredFields={["country"]}
                        addedItem={{ country: "" }}
                        dataArray={values.topOriginGoodsCountries}
                        arrayHelpers={arrayHelpers}
                      />
                    )}
                  </>
                )}
              </FieldArray>
              <div className={classes.divider} />
              <FieldArray name={bankFieldPath}>
                {arrayHelpers => (
                  <>
                    <h4 className={classes.groupLabel}>Relationships with other banks</h4>
                    <Field
                      name="otherBankingRelationshipsInfo.otherBankingRelationshipsExist"
                      path="prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankingRelationshipsExist"
                      label="The company has accounts with other banks, inside or outside the UAE"
                      type="checkbox"
                      component={Checkbox}
                      onSelect={() => {
                        if (values.otherBankingRelationshipsInfo.otherBankingRelationshipsExist) {
                          setFieldValue(
                            "otherBankingRelationshipsInfo.otherBankDetails",
                            initialOtherBankDetails.map(item => ({
                              ...item,
                              id: uniqueId()
                            }))
                          );
                          updateProspect({
                            "prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankDetails": initialOtherBankDetails
                          });
                          setFieldTouched(`${bankFieldPath}[${INITIAL_ARRAY_INDEX}]`, false);
                        }
                      }}
                    />
                    {values.otherBankingRelationshipsInfo.otherBankingRelationshipsExist && (
                      <>
                        <Grid container spacing={3} className={classes.flexContainer}>
                          {values.otherBankingRelationshipsInfo.otherBankDetails.map(
                            (item, index) => (
                              <React.Fragment key={item.id}>
                                <Grid
                                  item
                                  md={index === 0 ? 12 : 10}
                                  sm={12}
                                  className={cx(classes.relative, {
                                    [classes.tablet]: !index
                                  })}
                                >
                                  <Field
                                    name={`${bankFieldPath}[${index}].bankName`}
                                    path={`${basisPath}.${bankFieldPath}[${index}].bankName`}
                                    placeholder="Bank name"
                                    component={Input}
                                  />
                                  {!!index && (
                                    <ArrayRemoveButton
                                      arrayHelpers={arrayHelpers}
                                      dataArray={otherBankDetails}
                                      itemIndex={index}
                                      prospectPath="prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankDetails"
                                      title="Delete"
                                    />
                                  )}
                                </Grid>
                              </React.Fragment>
                            )
                          )}
                        </Grid>
                        {values.otherBankingRelationshipsInfo.otherBankDetails.length <
                          limits.ANOTHER_BANK_COUNT && (
                          <ArrayAddButton
                            title="Add another bank"
                            limit={limits.ANOTHER_BANK_COUNT}
                            requiredFields={["bankName"]}
                            addedItem={{ bankName: "" }}
                            dataArray={values.otherBankingRelationshipsInfo.otherBankDetails}
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
        }}
      </Formik>
    </div>
  );
};

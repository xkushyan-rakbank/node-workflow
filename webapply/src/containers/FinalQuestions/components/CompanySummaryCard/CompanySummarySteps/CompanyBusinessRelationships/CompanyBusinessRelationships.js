import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import {
  Input,
  CustomSelect,
  Checkbox,
  AutoSaveField as Field
} from "../../../../../../components/Form";
import Grid from "@material-ui/core/Grid";
import { AddButton } from "../../../../../../components/Buttons/AddButton";
import { RemoveButton } from "../../../../../../components/Buttons/RemoveButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { limits, initialValues, countryOptions } from "./constants";
import { useStyles } from "./styled";
import { COMPANY_NAME_REGEX, BANK_NAME_REGEX } from "../../../../../../utils/validation";

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
    then: Yup.array().of(Yup.string().required("You need to provide trade good country"))
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
  isDontHaveSuppliersYet,
  topSuppliers,
  topOriginGoodsCountries,
  isDontTradeGoodsYet,
  otherBankingRelationshipsExist,
  otherBankDetails,
  updateProspect
}) => {
  const classes = useStyles();
  const basisPath = "prospect.orgKYCDetails";
  const bankFieldPath = "otherBankingRelationshipsInfo.otherBankDetails";

  function checkboxCallback(value, name, callback) {
    if (value) {
      return;
    }
    callback(name, initialValues[name]);
  }

  function getIsAddButtonDisabled(limit, items, ...fields) {
    const lastAddedItem = items[items.length - 1];
    const allFieldsFilled = fields.length
      ? fields.every(item => lastAddedItem[item] !== "")
      : lastAddedItem;
    return items.length >= limit || !allFieldsFilled;
  }

  function handleRemoveItem(items, index, prospect) {
    const dataList = [...items];
    dataList.splice(index, 1);
    const path = `prospect.orgKYCDetails.${prospect}`;
    updateProspect({
      [path]: [...dataList]
    });
  }

  const onSubmit = values => {
    handleContinue();
    console.log(values);
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          topCustomers: topCustomers || initialValues.topCustomers,
          isDontHaveSuppliersYet: isDontHaveSuppliersYet || initialValues.isDontHaveSuppliersYet,
          topSuppliers: topSuppliers || initialValues.topSuppliers,
          topOriginGoodsCountries: topOriginGoodsCountries || initialValues.topOriginGoodsCountries,
          isDontTradeGoodsYet: isDontTradeGoodsYet || initialValues.isDontTradeGoodsYet,
          otherBankingRelationshipsInfo: {
            otherBankingRelationshipsExist:
              otherBankingRelationshipsExist || initialValues.otherBankingRelationshipsExist,
            otherBankDetails: otherBankDetails || initialValues.otherBankDetails
          }
        }}
        onSubmit={onSubmit}
        validationSchema={companyBusinessRelationshipsSchema}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <FieldArray name="topCustomers">
                {arrayHelpers => (
                  <>
                    <h4 className={classes.groupLabel}>Top customers</h4>
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.topCustomers.map((friend, index) => (
                        <React.Fragment key={index}>
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
                              options={countryOptions}
                              shrink={false}
                              name={`topCustomers[${index}].country`}
                              path={`prospect.orgKYCDetails.topCustomers[${index}].country`}
                              placeholder="Country"
                              extractId={option => option.key}
                              component={CustomSelect}
                            />
                            {!!index && (
                              <RemoveButton
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                  handleRemoveItem(topCustomers, index, "topCustomers");
                                }}
                                title="Delete"
                              />
                            )}
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                    {values.topCustomers.length < limits.CUSTOMER_COUNT && (
                      <AddButton
                        onClick={() =>
                          arrayHelpers.insert(values.topCustomers.length, { name: "", country: "" })
                        }
                        title="Add another customer"
                        disabled={getIsAddButtonDisabled(
                          limits.CUSTOMER_COUNT,
                          values.topCustomers,
                          "name",
                          "country"
                        )}
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
                      onChange={() => {
                        setFieldValue("isDontHaveSuppliersYet", !values.isDontHaveSuppliersYet);
                        checkboxCallback(
                          values.isDontHaveSuppliersYet,
                          "topSuppliers",
                          setFieldValue
                        );
                      }}
                    />
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.topSuppliers.map((friend, index) => (
                        <React.Fragment key={index}>
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
                              options={countryOptions}
                              shrink={false}
                              name={`topSuppliers[${index}].country`}
                              path={`prospect.orgKYCDetails.topSuppliers[${index}].country`}
                              placeholder="Country"
                              extractId={option => option.key}
                              component={CustomSelect}
                              disabled={values.isDontHaveSuppliersYet}
                            />
                            {!!index && (
                              <RemoveButton
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                  handleRemoveItem(topSuppliers, index, "topSuppliers");
                                }}
                                title="Delete"
                              />
                            )}
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                    {values.topSuppliers.length < limits.SUPPLIER_COUNT && (
                      <AddButton
                        onClick={() =>
                          arrayHelpers.insert(values.topSuppliers.length, { name: "", country: "" })
                        }
                        title="Add another supplier"
                        disabled={getIsAddButtonDisabled(
                          limits.SUPPLIER_COUNT,
                          values.topSuppliers,
                          "name",
                          "country"
                        )}
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
                      onChange={() => {
                        setFieldValue("isDontTradeGoodsYet", !values.isDontTradeGoodsYet);
                        checkboxCallback(
                          values.isDontTradeGoodsYet,
                          "topOriginGoodsCountries",
                          setFieldValue
                        );
                      }}
                    />
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.topOriginGoodsCountries.map((friend, index) => (
                        <React.Fragment key={index}>
                          <Grid
                            key={index}
                            item
                            md={index === 0 ? 12 : 10}
                            sm={12}
                            className={cx(classes.relative, { [classes.tablet]: !index })}
                          >
                            <Field
                              options={countryOptions}
                              shrink={false}
                              name={`topOriginGoodsCountries[${index}]`}
                              path={`prospect.orgKYCDetails.topOriginGoodsCountries[${index}]`}
                              placeholder="Country"
                              extractId={option => option.key}
                              component={CustomSelect}
                              disabled={values.isDontTradeGoodsYet}
                            />
                            {!!index && (
                              <RemoveButton
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                  handleRemoveItem(
                                    topOriginGoodsCountries,
                                    index,
                                    "topOriginGoodsCountries"
                                  );
                                }}
                                title="Delete"
                              />
                            )}
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                    {values.topOriginGoodsCountries.length < limits.COUNTRY_OF_ORIGIN_COUNT && (
                      <AddButton
                        onClick={() =>
                          arrayHelpers.insert(values.topOriginGoodsCountries.length, "")
                        }
                        title="Add another country of origin"
                        disabled={getIsAddButtonDisabled(
                          limits.COUNTRY_OF_ORIGIN_COUNT,
                          values.topOriginGoodsCountries
                        )}
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
                      onChange={() => {
                        setFieldValue(
                          "otherBankingRelationshipsInfo.otherBankingRelationshipsExist",
                          !values.otherBankingRelationshipsInfo.otherBankingRelationshipsExist
                        );
                        checkboxCallback(
                          !values.otherBankingRelationshipsInfo.otherBankingRelationshipsExist,
                          "otherBankingRelationshipsInfo.otherBankDetails",
                          setFieldValue
                        );
                      }}
                    />
                    {values.otherBankingRelationshipsInfo.otherBankingRelationshipsExist && (
                      <>
                        <Grid container spacing={3} className={classes.flexContainer}>
                          {values.otherBankingRelationshipsInfo.otherBankDetails.map(
                            (friend, index) => (
                              <React.Fragment key={index}>
                                <Grid
                                  key={index}
                                  item
                                  md={index === 0 ? 12 : 10}
                                  sm={12}
                                  className={cx(classes.relative, {
                                    [classes.tablet]: !index
                                  })}
                                >
                                  <Field
                                    name={`${bankFieldPath}[${index}].bankName`}
                                    path={`${basisPath}${bankFieldPath}[${index}].bankName`}
                                    placeholder="Bank name"
                                    component={Input}
                                  />
                                  {!!index && (
                                    <RemoveButton
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                        handleRemoveItem(
                                          otherBankDetails,
                                          index,
                                          "otherBankingRelationshipsInfo.otherBankDetails"
                                        );
                                      }}
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
                          <AddButton
                            onClick={() =>
                              arrayHelpers.insert(
                                values.otherBankingRelationshipsInfo.otherBankDetails.length,
                                { bankName: "" }
                              )
                            }
                            title="Add another bank"
                            disabled={getIsAddButtonDisabled(
                              limits.ANOTHER_BANK_COUNT,
                              values.otherBankingRelationshipsInfo.otherBankDetails,
                              "bankName"
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

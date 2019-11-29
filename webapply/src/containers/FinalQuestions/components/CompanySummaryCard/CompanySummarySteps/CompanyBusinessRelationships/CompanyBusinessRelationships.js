import React, { useCallback } from "react";
import uniqueId from "lodash/uniqueId";
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
import { limits, INITIAL_ARRAY_INDEX } from "./constants";
import { useStyles } from "./styled";
import { COMPANY_NAME_REGEX, BANK_NAME_REGEX } from "../../../../../../utils/validation";
import { prospect } from "../../../../../../constants/config";

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

  const checkIsAddButtonDisabled = (limit, items, ...fields) => {
    if (!items.length) {
      return false;
    }
    const lastAddedItem = items[items.length - 1];
    return items.length === limit || fields.some(item => lastAddedItem[item] === "");
  };

  const handleRemoveItem = (items, index, prospect) => {
    const dataList = [...items];
    dataList.splice(index, 1);
    const path = `prospect.orgKYCDetails.${prospect}`;
    updateProspect({
      [path]: [...dataList]
    });
  };

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
            otherBankDetails
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
                              extractLabel={item => item.displayText}
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
                          arrayHelpers.insert(values.topCustomers.length, {
                            id: uniqueId(),
                            name: "",
                            country: ""
                          })
                        }
                        title="Add another customer"
                        disabled={checkIsAddButtonDisabled(
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
                      onSelect={() => {
                        if (!values.isDontHaveSuppliersYet) {
                          setFieldValue(
                            "topSuppliers",
                            prospect.orgKYCDetails.topSuppliers.map(item => ({
                              ...item,
                              id: uniqueId()
                            }))
                          );
                          updateProspect({
                            "prospect.orgKYCDetails.topSuppliers":
                              prospect.orgKYCDetails.topSuppliers
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
                              extractLabel={item => item.displayText}
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
                          arrayHelpers.insert(values.topSuppliers.length, {
                            id: uniqueId(),
                            name: "",
                            country: ""
                          })
                        }
                        title="Add another supplier"
                        disabled={checkIsAddButtonDisabled(
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
                      onSelect={() => {
                        if (!values.isDontTradeGoodsYet) {
                          setFieldValue(
                            "topOriginGoodsCountries",
                            prospect.orgKYCDetails.topOriginGoodsCountries.map(item => ({
                              country: item,
                              id: uniqueId()
                            }))
                          );
                          updateProspect({
                            "prospect.orgKYCDetails.topOriginGoodsCountries":
                              prospect.orgKYCDetails.topOriginGoodsCountries
                          });
                          setFieldTouched(`topOriginGoodsCountries[${INITIAL_ARRAY_INDEX}]`, false);
                        }
                      }}
                    />
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.topOriginGoodsCountries.map((item, index) => (
                        <React.Fragment key={index}>
                          <Grid
                            key={index}
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
                              extractLabel={item => item.displayText}
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
                          arrayHelpers.insert(values.topOriginGoodsCountries.length, {
                            country: "",
                            id: uniqueId()
                          })
                        }
                        title="Add another country of origin"
                        disabled={checkIsAddButtonDisabled(
                          limits.COUNTRY_OF_ORIGIN_COUNT,
                          values.topOriginGoodsCountries,
                          "country"
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
                      onSelect={() => {
                        if (values.otherBankingRelationshipsInfo.otherBankingRelationshipsExist) {
                          const {
                            orgKYCDetails: {
                              otherBankingRelationshipsInfo: { otherBankDetails } = {}
                            } = {}
                          } = prospect;
                          setFieldValue(
                            "otherBankingRelationshipsInfo.otherBankDetails",
                            otherBankDetails.map(item => ({
                              ...item,
                              id: uniqueId()
                            }))
                          );
                          updateProspect({
                            "prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankDetails": otherBankDetails
                          });
                          setFieldTouched(`${bankFieldPath}[${INITIAL_ARRAY_INDEX}]`, false);
                        }
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
                                    path={`${basisPath}.${bankFieldPath}[${index}].bankName`}
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
                            disabled={checkIsAddButtonDisabled(
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

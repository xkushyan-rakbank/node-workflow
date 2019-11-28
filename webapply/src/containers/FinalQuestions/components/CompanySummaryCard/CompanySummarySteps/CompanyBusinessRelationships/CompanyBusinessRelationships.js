import React, { useCallback } from "react";
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
import { limits, initialValues } from "./constants";
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
  topSuppliers,
  topOriginGoodsCountries,
  otherBankDetails,
  updateProspect
}) => {
  const classes = useStyles();
  const basisPath = "prospect.orgKYCDetails";
  const bankFieldPath = "otherBankingRelationshipsInfo.otherBankDetails";

  const handleCheckboxCallback = useCallback(
    (value, name, callback) => {
      if (!value) {
        updateProspect({ [`prospect.orgKYCDetails.${name}`]: initialValues[name] });
        callback(name, initialValues[name]);
      }
    },
    [updateProspect]
  );

  const checkIsAddButtonDisabled = (limit, items, ...fields) => {
    const lastAddedItem = items[items.length - 1];
    const allFieldsFilled = fields.length
      ? fields.every(item => lastAddedItem[item] !== "")
      : lastAddedItem;
    return items.length >= limit || !allFieldsFilled;
  };

  const handleRemoveItem = useCallback(
    (items, index, prospect) => {
      const dataList = [...items];
      dataList.splice(index, 1);
      const path = `prospect.orgKYCDetails.${prospect}`;
      updateProspect({
        [path]: [...dataList]
      });
    },
    [updateProspect]
  );

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          topCustomers,
          isDontHaveSuppliersYet: false,
          topSuppliers,
          topOriginGoodsCountries,
          isDontTradeGoodsYet: false,
          otherBankingRelationshipsInfo: {
            otherBankingRelationshipsExist: false,
            otherBankDetails
          }
        }}
        onSubmit={handleSubmit}
        validationSchema={companyBusinessRelationshipsSchema}
      >
        {({ values, setFieldValue, errors }) => {
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
                          arrayHelpers.insert(values.topCustomers.length, { name: "", country: "" })
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
                      onChange={() => {
                        setFieldValue("isDontHaveSuppliersYet", !values.isDontHaveSuppliersYet);
                        handleCheckboxCallback(
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
                          arrayHelpers.insert(values.topSuppliers.length, { name: "", country: "" })
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
                      onChange={() => {
                        setFieldValue("isDontTradeGoodsYet", !values.isDontTradeGoodsYet);
                        handleCheckboxCallback(
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
                              name={`topOriginGoodsCountries[${index}]`}
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
                          arrayHelpers.insert(values.topOriginGoodsCountries.length, "")
                        }
                        title="Add another country of origin"
                        disabled={checkIsAddButtonDisabled(
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
                        handleCheckboxCallback(
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

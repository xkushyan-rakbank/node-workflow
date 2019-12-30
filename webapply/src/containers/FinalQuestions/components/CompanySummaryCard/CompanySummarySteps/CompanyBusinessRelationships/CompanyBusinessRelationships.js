import React, { useCallback } from "react";
import uniqueId from "lodash/uniqueId";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";

import {
  Input,
  Checkbox,
  SelectAutocomplete,
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
import { FinalQuestionField } from "../../../../FinalQuestionsStateContext";

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
    <div>
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
        validateOnChange={false}
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
                              label="Customer name"
                              contexualHelpText={
                                <>
                                  List down the names of top existing or future customers. These
                                  customer names should be as per their respective Trade Licenses.
                                  <br />
                                  Example 1
                                  <br />
                                  Airlift Global Automation and Heavy Equipment Rental LLC
                                  <br />
                                  Example 2
                                  <br />
                                  {`If the company is in the Retail Industry, you can mention
                                  'Walk-in Customers'`}
                                </>
                              }
                              placeholder="Customer name"
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
                              component={SelectAutocomplete}
                              shrink
                            />
                            {!!index && (
                              <ArrayRemoveButton
                                arrayHelpers={arrayHelpers}
                                dataArray={topCustomers}
                                itemIndex={index}
                                updateProspect={updateProspect}
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
                    <FinalQuestionField
                      name="isDontHaveSuppliersYet"
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
                              label="Supplier name"
                              placeholder="Supplier name"
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
                              component={SelectAutocomplete}
                              disabled={values.isDontHaveSuppliersYet}
                              shrink
                            />
                            {!!index && (
                              <ArrayRemoveButton
                                arrayHelpers={arrayHelpers}
                                dataArray={topSuppliers}
                                itemIndex={index}
                                updateProspect={updateProspect}
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
                    <FinalQuestionField
                      name="isDontTradeGoodsYet"
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
                              label="Country of origin"
                              datalistId="country"
                              component={SelectAutocomplete}
                              disabled={values.isDontTradeGoodsYet}
                              shrink
                            />
                            {!!index && (
                              <ArrayRemoveButton
                                arrayHelpers={arrayHelpers}
                                dataArray={topOriginGoodsCountries}
                                itemIndex={index}
                                updateProspect={updateProspect}
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
                                      updateProspect={updateProspect}
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

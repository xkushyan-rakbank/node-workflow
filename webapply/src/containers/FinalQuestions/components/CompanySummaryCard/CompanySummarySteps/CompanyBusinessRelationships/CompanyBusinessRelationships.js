import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import { Input, CustomSelect, Checkbox } from "../../../../../../components/Form";
import Grid from "@material-ui/core/Grid";
import AddButton from "../../../../../../components/Buttons/AddButton";
// import SubmitButton from "../../../../../../components/Buttons/SubmitButton"
import RemoveButton from "../../../../../../components/Buttons/RemoveButton";
import { limits, initialValues, countryOptions } from "./constants";
import { useStyles } from "./styled";
// import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX } from "../../../../../../utils/validation";

const companyBusinessRelationshipsSchema = Yup.object().shape({
  topCustomers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      country: Yup.string().required("Required")
    })
  ),
  isDontHaveSuppliersYet: Yup.bool(),
  topSuppliers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      country: Yup.string().required("Required")
    })
  ),
  topOriginGoodsCountries: Yup.array().of(Yup.string().required("Required")),
  otherBankingRelationshipsInfo: Yup.object().shape({
    otherBankingRelationshipsExist: Yup.bool(),
    otherBankDetails: Yup.array().of(
      Yup.object().shape({
        bankName: Yup.string().required("Required")
      })
    )
  })
});

export const CompanyBusinessRelationshipsComponent = () => {
  const classes = useStyles();
  const bankFieldPath = "otherBankingRelationshipsInfo.otherBankDetails";

  // TODO checkbox state handle
  // function checkboxCallback(value, id) {
  //   if (value) {
  //     if (id === "Okyc.isDontHaveSuppliersYet_") {
  //       updateProspect({
  //         "prospect.orgKYCDetails.topSuppliers": [{ name: "", country: "" }]
  //       });
  //     } else if (id === "Okyc.isDontTradeGoodsYet_") {
  //       updateProspect({
  //         "prospect.orgKYCDetails.topOriginGoodsCountries": [""]
  //       });
  //     } else if (id === "OkycObri.otherBankingRelationshipsExist_") {
  //       updateProspect({
  //         "prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankDetails": [
  //           { bankName: "" }
  //         ]
  //       });
  //     }
  //   }
  // }

  function getIsAddButtonDisabled(limit, items, ...fields) {
    const lastAddedItem = items[items.length - 1];
    const allFieldsFilled = fields.length
      ? fields.every(item => lastAddedItem[item] !== "")
      : lastAddedItem;
    return items.length >= limit || !allFieldsFilled;
  }

  const onSubmit = values => console.log(values);

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          topCustomers: initialValues.topCustomers,
          isDontHaveSuppliersYet: initialValues.isDontHaveSuppliersYet,
          topSuppliers: initialValues.topSuppliers,
          topOriginGoodsCountries: initialValues.topOriginGoodsCountries,
          otherBankingRelationshipsInfo: {
            otherBankingRelationshipsExist: initialValues.otherBankingRelationshipsExist,
            otherBankDetails: initialValues.otherBankDetails
          }
        }}
        onSubmit={onSubmit}
        validationSchema={companyBusinessRelationshipsSchema}
      >
        {({ values }) => {
          return (
            <Form>
              <FieldArray name="topCustomers">
                {arrayHelpers => (
                  <>
                    <h4 className={classes.groupLabel}>Top customers</h4>
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.topCustomers.length > 0 &&
                        values.topCustomers.map((friend, index) => (
                          <React.Fragment key={index}>
                            <Grid item md={index === 0 ? 6 : 5} sm={12}>
                              <Field
                                name={`topCustomers[${index}].name`}
                                label="Name"
                                placeholder="Name"
                                component={Input}
                              />
                            </Grid>
                            <Grid
                              item
                              md={index === 0 ? 6 : 5}
                              sm={12}
                              className={cx(classes.relative, { [classes.tablet]: index !== 0 })}
                            >
                              <Field
                                options={countryOptions}
                                shrink={false}
                                name={`topCustomers[${index}].country`}
                                placeholder="Country"
                                extractId={option => option.key}
                                component={CustomSelect}
                              />
                              {index !== 0 && (
                                <RemoveButton
                                  onClick={() => arrayHelpers.remove(index)}
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
                      label="I don't have any suppliers"
                      type="checkbox"
                      component={Checkbox}
                    />
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.topSuppliers.length > 0 &&
                        values.topSuppliers.map((friend, index) => (
                          <React.Fragment key={index}>
                            <Grid item md={index === 0 ? 6 : 5} sm={12}>
                              <Field
                                name={`topSuppliers[${index}].name`}
                                label="Name"
                                placeholder="Name"
                                component={Input}
                              />
                            </Grid>
                            <Grid
                              item
                              md={index === 0 ? 6 : 5}
                              sm={12}
                              className={cx(classes.relative, { [classes.tablet]: index !== 0 })}
                            >
                              <Field
                                options={countryOptions}
                                shrink={false}
                                name={`topSuppliers[${index}].country`}
                                placeholder="Country"
                                extractId={option => option.key}
                                component={CustomSelect}
                              />
                              {index > 0 && (
                                <RemoveButton
                                  onClick={() => arrayHelpers.remove(index)}
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
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.topOriginGoodsCountries.length > 0 &&
                        values.topOriginGoodsCountries.map((friend, index) => (
                          <React.Fragment key={index}>
                            <Grid
                              key={index}
                              item
                              md={index === 0 ? 12 : 10}
                              sm={12}
                              className={cx(classes.relative, { [classes.tablet]: index !== 0 })}
                            >
                              <Field
                                options={countryOptions}
                                shrink={false}
                                name={`topOriginGoodsCountries[${index}]`}
                                placeholder="Country"
                                extractId={option => option.key}
                                component={CustomSelect}
                              />
                              {index !== 0 && (
                                <RemoveButton
                                  onClick={() => arrayHelpers.remove(index)}
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
                    <Grid container spacing={3} className={classes.flexContainer}>
                      {values.otherBankingRelationshipsInfo.otherBankDetails.length > 0 &&
                        values.otherBankingRelationshipsInfo.otherBankDetails.map(
                          (friend, index) => (
                            <React.Fragment key={index}>
                              <Grid
                                key={index}
                                item
                                md={index === 0 ? 12 : 10}
                                sm={12}
                                className={cx(classes.relative, { [classes.tablet]: index !== 0 })}
                              >
                                <Field
                                  name={`${bankFieldPath}[${index}].bankName`}
                                  placeholder="Bank name"
                                  component={Input}
                                />
                                {index !== 0 && (
                                  <RemoveButton
                                    onClick={() => arrayHelpers.remove(index)}
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
              </FieldArray>
            </Form>
          );
        }}
      </Formik>
    </div>
    // <>
    //   <h4 className={classes.groupLabel}>Top suppliers</h4>
    //   <CustomCheckbox
    //     id="Okyc.isDontHaveSuppliersYet"
    //     indexes={[index]}
    //     callback={checkboxCallback}
    //   />    //
    //   <h4 className={classes.groupLabel}>Top origin of goods</h4>
    //   <CustomCheckbox
    // id="Okyc.isDontTradeGoodsYet"
    // indexes={[index]} callback={checkboxCallback} />
    //   <h4 className={classes.groupLabel}>Relationships with other banks</h4>
    //   <CustomCheckbox
    //     id="OkycObri.otherBankingRelationshipsExist"
    //     indexes={[index]}
    //     callback={checkboxCallback}
    //   />
    //   {otherBankingRelationshipsExist && (
    //     <>
    //       <Grid container spacing={3} className={classes.flexContainer}>
    //         <Grid item sm={12}>
    //           {otherBankDetails.map((_, index) => {
    //             return (
    //               <React.Fragment key={index}>
    //                 <Grid
    //                   item
    //                   sm={12}
    //                   md={index === 0 ? 12 : 10}
    //                   className={cx(classes.relative, { [classes.marginBottom]: index !== 0 })}
    //                 >
    //                   <TextInput
    //                     id="OkycObriObd.bankName"
    //                     indexes={[index]}
    //                     required={otherBankingRelationshipsExist}
    //                     disabled={!otherBankingRelationshipsExist}
    //                   />
    //                   {index !== 0 && (
    //                     <RemoveButton
    //                       onClick={() =>
    //                         handleRemoveItem(
    //                           otherBankDetails,
    //                           index,
    //                           "otherBankingRelationshipsInfo.otherBankDetails"
    //                         )
    //                       }
    //                       title="Delete"
    //                       classes={{ container: classes.container }}
    //                     />
    //                   )}
    //                 </Grid>
    //               </React.Fragment>
    //             );
    //           })}
    //         </Grid>
    //       </Grid>
    //       {otherBankDetails.length < limits.ANOTHER_BANK_COUNT && (
    //         <AddButton
    //           onClick={() =>
    //             handleAddItem(
    //               otherBankDetails,
    //               "otherBankingRelationshipsInfo.otherBankDetails",
    //               limits.ANOTHER_BANK_COUNT,
    //               { bankName: "" }
    //             )
    //           }
    //           title="Add another bank"
    //           disabled={
    //             !otherBankingRelationshipsExist ||
    //             isAddButtonDisabled(limits.ANOTHER_BANK_COUNT, otherBankDetails, "bankName")
    //           }
    //         />
    //       )}
    //     </>
    //   )}
    // </>
  );
};

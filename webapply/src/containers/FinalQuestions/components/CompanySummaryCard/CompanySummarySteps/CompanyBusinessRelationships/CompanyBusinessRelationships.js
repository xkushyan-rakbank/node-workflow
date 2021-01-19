import React, { useState, useCallback } from "react";
import uniqueId from "lodash/uniqueId";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import {
  Input,
  Checkbox,
  SelectAutocomplete,
  AutoSaveField as Field,
  InlineRadioGroup
} from "../../../../../../components/Form";
import { ArrayRemoveButton } from "../../../Buttons/ArrayRemoveButton";
import { ArrayAddButton } from "../../../Buttons/ArrayAddButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import {
  limits,
  INITIAL_ARRAY_INDEX,
  initialOtherBankDetails,
  initialTopOriginGoodsCountries,
  initialTopSuppliers,
  MAX_BANK_NAME_LENGTH,
  MAX_COMPANY_NAME_LENGTH,
  IS_DNFBP_INFO_VISITED,
  NONE_VISITED,
  dnfbpInfoContent
} from "./constants";
import { SPECIAL_CHARACTERS_REGEX, checkIsTrimmed } from "../../../../../../utils/validation";
import {
  getInvalidMessage,
  getRequiredMessage
} from "../../../../../../utils/getValidationMessage";

import { useStyles } from "./styled";
import { enumYesNoOptions, yesNoOptions } from "../../../../../../constants/options";
import { ContexualHelp, ContextualDnfbpHelp } from "../../../../../../components/Notifications";
import { NotificationsManager } from "../../../../../../components/Notification";
import { Icon, ICONS } from "../../../../../../components/Icons";

const companyBusinessRelationshipsSchema = () =>
  Yup.object().shape({
    topCustomers: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .required(getRequiredMessage("Customer name"))
          // eslint-disable-next-line no-template-curly-in-string
          .max(MAX_COMPANY_NAME_LENGTH, "Maximum ${max} characters allowed")
          .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Customer name"))
          .test("space validation", getInvalidMessage("Customer name"), checkIsTrimmed),
        country: Yup.string().required(getRequiredMessage("Country"))
      })
    ),
    isDontHaveSuppliersYet: Yup.boolean(),
    topSuppliers: Yup.array().when("isDontHaveSuppliersYet", {
      is: false,
      then: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .required(getRequiredMessage("Supplier name"))
            // eslint-disable-next-line no-template-curly-in-string
            .max(MAX_COMPANY_NAME_LENGTH, "Maximum ${max} characters allowed")
            .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Supplier name"))
            .test("space validation", getInvalidMessage("Supplier name"), checkIsTrimmed),
          country: Yup.string().required(getRequiredMessage("Country"))
        })
      )
    }),
    isDontTradeGoodsYet: Yup.bool(),
    topOriginGoodsCountries: Yup.array().when("isDontTradeGoodsYet", {
      is: false,
      then: Yup.array().of(
        Yup.object().shape({
          country: Yup.string().required(getRequiredMessage("Country of origin"))
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
              .required(getRequiredMessage("Bank name"))
              // eslint-disable-next-line no-template-curly-in-string
              .max(MAX_BANK_NAME_LENGTH, "Maximum ${max} characters allowed")
              .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Bank name"))
          })
        )
      })
    }),
    dnfbpField: Yup.string()
      .required("Field Is your company dealing in Designated Business Categories is not filled")
      .oneOf(
        ["Yes", "No"],
        "Field Is your company dealing in Designated Business Categories is not filled"
      ),
    isCompanyUSEntity: Yup.string().required("Field Is your company a US entity is not filled")
  });

export const CompanyBusinessRelationshipsComponent = ({
  handleContinue,
  createFormChangeHandler,
  topCustomers,
  topSuppliers,
  topOriginGoodsCountries,
  otherBankDetails,
  updateProspect
}) => {
  const classes = useStyles();
  const basisPath = "prospect.orgKYCDetails";
  const bankFieldPath = "otherBankingRelationshipsInfo.otherBankDetails";

  const [isLinkVisited, setIsLinkVisited] = useState(NONE_VISITED);
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
    setIsLinkVisited(IS_DNFBP_INFO_VISITED);
  };

  const handleShowNotification = useCallback(
    () => !isLinkVisited && NotificationsManager && NotificationsManager.add(dnfbpInfoContent),
    [isLinkVisited]
  );

  return (
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
        },
        dnfbpField: "na",
        isCompanyUSEntity: ""
      }}
      onSubmit={handleContinue}
      validationSchema={companyBusinessRelationshipsSchema}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values, setFieldValue, setTouched, setFieldTouched }) => {
        const isTopCustomers = values.topCustomers.length > 1;
        const isTopSuppliers = values.topSuppliers.length > 1;
        const isTopOriginGoodsCountries = values.topOriginGoodsCountries.length > 1;
        const isOtherBankingRelationshipsInfo =
          values.otherBankingRelationshipsInfo.otherBankDetails.length > 1;
        return (
          <Form>
            <FieldArray name="topCustomers">
              {arrayHelpers => (
                <>
                  <h4 className={classes.groupLabel}>Top customers</h4>
                  <Grid container spacing={3} className={classes.flexContainer}>
                    {values.topCustomers.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <Grid item sm={isTopCustomers ? 5 : 6} xs={12}>
                          <Field
                            name={`topCustomers[${index}].name`}
                            path={`prospect.orgKYCDetails.topCustomers[${index}].name`}
                            label="Customer name"
                            contextualHelpText={
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
                                If the company is in the Retail Industry, you can mention
                                {"'"}Walk-in Customers{"'"}
                              </>
                            }
                            placeholder="Customer name"
                            component={Input}
                            InputProps={{
                              inputProps: { maxLength: MAX_COMPANY_NAME_LENGTH, tabIndex: 0 }
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          sm={isTopCustomers ? 5 : 6}
                          xs={12}
                          className={cx(classes.relative, { [classes.tablet]: !index })}
                        >
                          <Field
                            name={`topCustomers[${index}].country`}
                            path={`prospect.orgKYCDetails.topCustomers[${index}].country`}
                            label="Country"
                            datalistId="country"
                            component={SelectAutocomplete}
                            shrink
                            tabIndex="0"
                          />
                          {isTopCustomers && (
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
                        setTouched({
                          [`topSuppliers[${INITIAL_ARRAY_INDEX}].name`]: false,
                          [`topSuppliers[${INITIAL_ARRAY_INDEX}].country`]: false
                        });
                      }
                    }}
                    inputProps={{ tabIndex: 0 }}
                  />
                  <Grid container spacing={3} className={classes.flexContainer}>
                    {values.topSuppliers.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <Grid item sm={isTopSuppliers ? 5 : 6} xs={12}>
                          <Field
                            name={`topSuppliers[${index}].name`}
                            path={`prospect.orgKYCDetails.topSuppliers[${index}].name`}
                            label="Supplier name"
                            placeholder="Supplier name"
                            contextualHelpText={
                              <>
                                List down the names of top existing or future suppliers. These
                                supplier names should be as per their respective Trade Licenses.
                                <br />
                                Example 1
                                <br />
                                Airlift Global Automation and Heavy Equipment Rental LLC
                                <br />
                                Example 2
                                <br />
                                If the company is in the Retail Industry, you can mention
                                {"'"}Walk-in Customers{"'"}
                              </>
                            }
                            component={Input}
                            disabled={values.isDontHaveSuppliersYet}
                            InputProps={{
                              inputProps: { maxLength: MAX_COMPANY_NAME_LENGTH, tabIndex: 0 }
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          sm={isTopSuppliers ? 5 : 6}
                          xs={12}
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
                            tabIndex="0"
                          />
                          {isTopSuppliers && (
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
                    inputProps={{ tabIndex: 0 }}
                  />
                  <Grid container spacing={3} className={classes.flexContainer}>
                    {values.topOriginGoodsCountries.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <Grid
                          item
                          sm={isTopOriginGoodsCountries ? 10 : 12}
                          xs={12}
                          className={cx(classes.relative, { [classes.tablet]: !index })}
                        >
                          <Field
                            name={`topOriginGoodsCountries[${index}].country`}
                            path={`prospect.orgKYCDetails.topOriginGoodsCountries[${index}]`}
                            label="Country of origin"
                            datalistId="country"
                            component={SelectAutocomplete}
                            disabled={values.isDontTradeGoodsYet}
                            contextualHelpText="List down the top countries from where existing or future goods originate"
                            shrink
                            tabIndex="0"
                            filterOptions={options => {
                              const countries = values.topOriginGoodsCountries
                                .filter(
                                  (item, indexCountry) => item.country && indexCountry !== index
                                )
                                .map(item => item.country);
                              return options.filter(item => !countries.includes(item.code));
                            }}
                          />
                          {isTopOriginGoodsCountries && (
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
                    inputProps={{ tabIndex: 0 }}
                  />
                  {values.otherBankingRelationshipsInfo.otherBankingRelationshipsExist && (
                    <>
                      <Grid container spacing={3} className={classes.flexContainer}>
                        {values.otherBankingRelationshipsInfo.otherBankDetails.map(
                          (item, index) => (
                            <React.Fragment key={item.id}>
                              <Grid
                                item
                                sm={isOtherBankingRelationshipsInfo ? 10 : 12}
                                xs={12}
                                className={cx(classes.relative, {
                                  [classes.tablet]: !index
                                })}
                              >
                                <Field
                                  name={`${bankFieldPath}[${index}].bankName`}
                                  path={`${basisPath}.${bankFieldPath}[${index}].bankName`}
                                  placeholder="Bank name"
                                  component={Input}
                                  InputProps={{
                                    inputProps: { maxLength: MAX_BANK_NAME_LENGTH, tabIndex: 0 }
                                  }}
                                />
                                {isOtherBankingRelationshipsInfo && (
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
            <div className={classes.divider} />
            <h4 className={classes.groupLabel}>Deals In Designated Business Categories</h4>
            <Grid container spacing={3}>
              <Grid item sm={8} xs={12}>
                <h5 className={classes.groupLabel}>
                  Is your company dealing in Designated Business Categories?
                </h5>
                <h6 className={classes.dnfbpStyle}>
                  <i>
                    Kindly click on Need more Information and read carefully before you make a
                    selection
                  </i>
                </h6>
              </Grid>
              <Grid item sm={4} xs={12}>
                <div className={classes.dnfbpTitleWrapper}>
                  {
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                      <div>
                        <ContextualDnfbpHelp
                          title={
                            <>
                              Dealing in precious metals/precious stones/real estate or any
                              commercial and/or financial transactions/ operations,on behalf of /for
                              benefit of, our and/or potentila clients, business/trade/ professional
                              counterparts, and/ortheir beneficial owners
                            </>
                          }
                          placement="right"
                          isDisableHoverListener={true}
                          onClose={handleTooltipClose}
                          open={open}
                        >
                          <Button onClick={handleTooltipOpen}>
                            <span className={classes.questionIcon}>
                              <Icon name={ICONS.info} alt="info" className={classes.iconSize} />
                            </span>
                            <span className={classes.dnfbpHelp}>Need More information</span>
                          </Button>
                        </ContextualDnfbpHelp>
                      </div>
                    </ClickAwayListener>
                  }
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <div onClick={handleShowNotification}>
                <Field
                  name="dnfbpField"
                  path={"prospect.orgKYCDetails.dnfbpField"}
                  component={InlineRadioGroup}
                  options={enumYesNoOptions}
                  InputProps={{
                    inputProps: { tabIndex: 0, label: "" }
                  }}
                  disabled={!isLinkVisited}
                  exhaustiveDeps={isLinkVisited}
                />
              </div>
            </Grid>
            <div className={classes.divider} />
            <h4 className={classes.groupLabel}>US Entity</h4>
            <Grid container spacing={3}>
              <Grid item sm={8} xs={12}>
                <h5 className={classes.groupLabel}>Is your company a US entity?</h5>
              </Grid>
              <Grid item sm={4} xs={12}>
                <ContexualHelp
                  title={
                    "You are US entity if - company is incorporated in US, or holding mailing address of US"
                  }
                  placement="right"
                  isDisableHoverListener={false}
                  // onClose=""
                  // open=""
                >
                  <Button>
                    <span className={classes.questionIcon}>
                      <Icon name={ICONS.info} alt="info" className={classes.iconSize} />
                    </span>
                    <span className={classes.dnfbpHelp}>Need More information</span>
                  </Button>
                </ContexualHelp>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Field
                name="isCompanyUSEntity"
                path={"prospect.orgKYCDetails.isCompanyUSEntity"}
                component={InlineRadioGroup}
                options={yesNoOptions}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        );
      })}
    </Formik>
  );
};

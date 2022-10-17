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
  InlineRadioGroup,
  GlobalIntermediaryID
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
  //NONE_VISITED,
  dnfbpInfoContent,
  usEntity,
  financialInstitution,
  nonFinancialInstitution
} from "./constants";
import {
  SPECIAL_CHARACTERS_REGEX,
  checkIsTrimmed,
  GLOBAL_INTERMEDIARY_REGEX
} from "../../../../../../utils/validation";
import {
  getInvalidMessage,
  getRequiredMessage
} from "../../../../../../utils/getValidationMessage";

import { useStyles } from "./styled";
import { enumYesNoOptions } from "../../../../../../constants/options";
import { ContexualHelp, ContextualDnfbpHelp } from "../../../../../../components/Notifications";
import { NotificationsManager } from "../../../../../../components/Notification";
import { Icon, ICONS } from "../../../../../../components/Icons";
import { InfoTitle } from "../../../../../../components/InfoTitle";

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
      .nullable()
      .required("Field Is your company dealing in Designated Business Categories is not filled")
      .oneOf(
        ["yes", "no"],
        "Field Is your company dealing in Designated Business Categories is not filled"
      ),
    isCompanyUSEntity: Yup.string()
      .nullable()
      .required("Field Is your company a US entity is not filled"),
    //ro-assist-brd3-15
    isFinancialInstitution: Yup.string()
      .nullable()
      .required("Field Is your company a Financial Instituion is not filled")
      .oneOf(["yes", "no"], "Field Is your company a Financial Instituion is not filled"),
    isNonFinancialInstitution: Yup.string().when("isFinancialInstitution", {
      is: "no",
      then: Yup.string()
        .nullable()
        .required(
          "Field Is your company a active or passive Non-Financial Instituion is not filled"
        )
        .oneOf(
          ["active", "passive"],
          "Field Is your company a active or passive Non-Financial Instituion is not filled"
        )
    }),
    globalintermediaryId: Yup.string().when("isFinancialInstitution", {
      is: "yes",
      then: Yup.string()
        .nullable()
        .required(getRequiredMessage("Global Intermediary Identification No"))
        .matches(
          GLOBAL_INTERMEDIARY_REGEX,
          getInvalidMessage("Global Intermediary Identification No")
        )
    })
  });

export const CompanyBusinessRelationshipsComponent = ({
  handleContinue,
  createFormChangeHandler,
  topCustomers,
  topSuppliers,
  topOriginGoodsCountries,
  otherBankDetails,
  updateProspect,
  dnfbpField,
  datalist
}) => {
  const classes = useStyles();
  const basisPath = "prospect.orgKYCDetails";
  const bankFieldPath = "otherBankingRelationshipsInfo.otherBankDetails";

  const [isLinkVisited, setIsLinkVisited] = useState(dnfbpField);
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

  //ro-assist-brd3-15
  const lableAndRadio = ({ options, helperText, body, title, infoText, path, fieldName }) => {
    return (
      <div>
        {title && <h4 className={classes.groupLabel}>{title}</h4>}
        <Grid container spacing={3}>
          <Grid item sm={8} xs={12}>
            <h5 className={classes.groupLabel}>{body}</h5>
            <h6 className={classes.dnfbpStyle}>
              <i>{infoText}</i>
            </h6>
          </Grid>
          <Grid item sm={4} xs={12} className={classes.dispFlxJustEnd}>
            <ContexualHelp
              title={helperText}
              placement="right"
              isDisableHoverListener={false}
              // onClose=""
              // open=""
            >
              <Button className={classes.marginT5}>
                <Icon name={ICONS.info} alt="info" fill={"#909093"} className={classes.iconSize} />
                <span className={classes.dnfbpHelp}>Need More information?</span>
              </Button>
            </ContexualHelp>
          </Grid>
        </Grid>
        <Grid container className={classes.paddingH12} spacing={3}>
          <Field
            name={fieldName}
            path={path}
            component={InlineRadioGroup}
            options={options}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
          />
        </Grid>
      </div>
    );
  };

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
        isCompanyUSEntity: false,
        isFinancialInstitution: "na",
        isNonFinancialInstitution: "na",
        globalintermediaryId: ""
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
                  Is your Company Dealing in Designated Business Categories
                </h5>
                <h6 className={classes.dnfbpStyle}>
                  <i>
                    Kindly click on Need more Information and read carefully before you make a
                    selection
                  </i>
                </h6>
              </Grid>
              <Grid item sm={4} xs={12} className={classes.dispFlxJustEnd}>
                <div className={classes.dnfbpTitleWrapper}>
                  {
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                      <div>
                        <ContextualDnfbpHelp
                          title={
                            <>
                              Dealing in precious metals/precious stones/real estate or any
                              commercial and/or financial transactions/ operations, on behalf of/for
                              benefit of, our existing and/or potential clients, business/trade/
                              professional counterparts, and/or their beneficial owners
                            </>
                          }
                          placement="right"
                          isDisableHoverListener={true}
                          onClose={handleTooltipClose}
                          open={open}
                        >
                          <Button onClick={handleTooltipOpen} className={classes.marginT5}>
                            <Icon
                              name={ICONS.info}
                              alt="info"
                              fill={"#909093"}
                              className={classes.iconSize}
                            />
                            <span className={classes.dnfbpHelp}>Need More information?</span>
                          </Button>
                        </ContextualDnfbpHelp>
                      </div>
                    </ClickAwayListener>
                  }
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.paddingH12}>
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
            {/* ro-assist-brd3-15 */}
            {lableAndRadio(usEntity)}
            <div className={classes.divider} />
            {lableAndRadio(financialInstitution)}
            {values.isFinancialInstitution === "no" && lableAndRadio(nonFinancialInstitution)}
            {values.isFinancialInstitution === "yes" && (
              <Grid container className={classes.flexContainer}>
                <Grid item sm={6} xs={12}>
                  <Field
                    name={"globalintermediaryId"}
                    path={"prospect.orgKYCDetails.globalintermediaryId"}
                    component={GlobalIntermediaryID}
                    contextualHelpText={
                      <>
                        GIIN is a Global Intermediary Identification Number assigned by the FATCA
                        Registration System to financial institutions and direct reporting
                        non-financial foreign entities.
                      </>
                    }
                  />
                </Grid>
              </Grid>
            )}
            <Grid
              className={classes.continueButtonContainer}
              container
              direction="row"
              justify="space-between"
            >
              <InfoTitle
                title={
                  <span>
                    <i>RAKBANK</i> does not provide any accounting, tax, regulatory or legal advice
                    and shall not be liable or responsible for any incorrect information provided by
                    you. You should consult your professional financial, legal and tax advisors
                    before submitting the information.
                  </span>
                }
              />
              <span className={classes.continueBtn}>
                <ContinueButton type="submit" />
              </span>
            </Grid>
          </Form>
        );
      })}
    </Formik>
  );
};

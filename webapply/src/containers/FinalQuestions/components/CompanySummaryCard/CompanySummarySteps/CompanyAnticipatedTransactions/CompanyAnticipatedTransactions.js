import React, { useCallback } from "react";
import * as Yup from "yup";
import isNaN from "lodash/isNaN";
import cx from "classnames";

import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { InfoTitle } from "../../../../../../components/Notifications";
import { Input, AutoSaveField as Field, NumberFormat } from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";
import { COMPANY_CURRENCY, YEAR_MONTH_COUNT, ANNUAL_TURNOVER_MAX_LENGTH } from "./constants";
import { CURRENCY_REGEX } from "../../../../../../utils/validation";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";

const FormatDecimalNumberInput = props => (
  <NumberFormat allowNegative={false} decimalScale={0} {...props} />
);

const getTotalMonthlyCreditsValue = annualFinancialTurnover => {
  if (!checkValidNumberFromString(annualFinancialTurnover)) {
    return 0;
  }
  const calculation = parseFloat(annualFinancialTurnover) / YEAR_MONTH_COUNT;
  return Number(calculation.toFixed());
};

const getTotalMonthlyCreditsText = monthlyCreditsValue => {
  return checkValidNumberFromString(monthlyCreditsValue)
    ? `${monthlyCreditsValue} in Total Monthly Credits`
    : "9999999999";
};

const checkValidNumberFromString = string => !isNaN(Number(string));

const checkFieldSumNotExceedYearTotal = (field, conditionalField, yearTotal) => {
  const isValidFieldAndYearTotalValue =
    checkValidNumberFromString(field) && checkValidNumberFromString(yearTotal);
  if (isValidFieldAndYearTotalValue && checkValidNumberFromString(conditionalField)) {
    return Number(field) + Number(conditionalField) <= Number(yearTotal);
  } else if (isValidFieldAndYearTotalValue) {
    return Number(field) <= Number(yearTotal);
  }
  return true;
};

const checkFieldSumEqualMonthTotal = (field, conditionalField, yearTotal) => {
  const monthTotal = getTotalMonthlyCreditsValue(yearTotal);
  if (checkValidNumberFromString(field) && checkValidNumberFromString(conditionalField)) {
    return Number(field) + Number(conditionalField) === monthTotal;
  }
  return true;
};

const companyAnticipatedTransactionsSchema = Yup.object().shape({
  annualFinTurnoverAmtInAED: Yup.string()
    .required(getRequiredMessage("Annual Financial Turnover"))
    .matches(CURRENCY_REGEX, getInvalidMessage("Annual Financial Turnover")),
  maxAmtSingleTxnCashAED: Yup.string()
    .required(getRequiredMessage("Part of Monthly Total in Cash"))
    .matches(CURRENCY_REGEX, getInvalidMessage("Part of Monthly Total in Cash"))
    .test(
      "is not exceed turnover",
      "maximum amount in a single transactions in Cash and Non-cash should not exceed the Annual Financial Turnover",
      function(value) {
        const { annualFinTurnoverAmtInAED, maxAmtSingleTxnNonCashAED } = this.parent;
        return checkFieldSumNotExceedYearTotal(
          value,
          maxAmtSingleTxnNonCashAED,
          annualFinTurnoverAmtInAED
        );
      }
    ),
  maxAmtSingleTxnNonCashAED: Yup.string()
    .required(getRequiredMessage("Part of Monthly Total in Non-Cash"))
    .matches(CURRENCY_REGEX, getInvalidMessage("Part of Monthly Total in Non-Cash"))
    .test(
      "is not exceed turnover",
      "maximum amount in a single transactions in Cash and Non-cash should not exceed the Annual Financial Turnover",
      function(value) {
        const { annualFinTurnoverAmtInAED, maxAmtSingleTxnCashAED } = this.parent;
        return checkFieldSumNotExceedYearTotal(
          value,
          maxAmtSingleTxnCashAED,
          annualFinTurnoverAmtInAED
        );
      }
    ),
  totalMonthlyCashAmountInFigures: Yup.string()
    .required(getRequiredMessage("Maximum amount in Cash"))
    .matches(CURRENCY_REGEX, getInvalidMessage("Maximum amount in Cash"))
    .test(
      "is matches with month turnover",
      "total amount in Cash and Non-cash should be equal to Total Monthly Credits",
      function(value) {
        const { annualFinTurnoverAmtInAED, totalMonthlyNonCashAmountInFigures } = this.parent;
        return checkFieldSumEqualMonthTotal(
          value,
          totalMonthlyNonCashAmountInFigures,
          annualFinTurnoverAmtInAED
        );
      }
    ),
  totalMonthlyNonCashAmountInFigures: Yup.string()
    .required(getRequiredMessage("Maximum amount in Non-Cash"))
    .matches(CURRENCY_REGEX, getInvalidMessage("Maximum amount in Non-Cash"))
    .test(
      "is matches with month turnover",
      "total amount in Cash and Non-cash should be equal to Total Monthly Credits",
      function(value) {
        const { annualFinTurnoverAmtInAED, totalMonthlyCashAmountInFigures } = this.parent;
        return checkFieldSumEqualMonthTotal(
          value,
          totalMonthlyCashAmountInFigures,
          annualFinTurnoverAmtInAED
        );
      }
    )
});

const commonInputProps = {
  endAdornment: <InputAdornment position="end">{COMPANY_CURRENCY}</InputAdornment>
};

export const CompanyAnticipatedTransactions = ({ handleContinue }) => {
  const classes = useStyles();

  const onSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <div>
      <Formik
        initialValues={{
          annualFinTurnoverAmtInAED: "",
          maxAmtSingleTxnCashAED: "",
          maxAmtSingleTxnNonCashAED: "",
          totalMonthlyCashAmountInFigures: "",
          totalMonthlyNonCashAmountInFigures: ""
        }}
        onSubmit={onSubmit}
        validationSchema={companyAnticipatedTransactionsSchema}
        validateOnChange={false}
      >
        {({ values }) => (
          <Form autoComplete="off">
            <h4 className={classes.groupLabel}>Annual turnover</h4>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item sm={12}>
                <Field
                  name="annualFinTurnoverAmtInAED"
                  path="prospect.orgKYCDetails.annualFinTurnoverAmtInAED"
                  label="Annual Financial Turnover"
                  autoComplete="none"
                  placeholder="9999999999"
                  InputProps={{
                    ...commonInputProps,
                    inputComponent: FormatDecimalNumberInput,
                    inputProps: {
                      maxLength: ANNUAL_TURNOVER_MAX_LENGTH,
                      tabIndex: 0
                    }
                  }}
                  component={Input}
                  contextualHelpText="Mention the Turnover per annum of the company. For new companies, give the expected turnover per annum"
                  changeProspect={(prospect, value) => ({
                    ...prospect,
                    "prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyCreditsAED": getTotalMonthlyCreditsValue(
                      value
                    )
                  })}
                />
              </Grid>
            </Grid>
            <div className={classes.divider} />
            <h4 className={classes.groupLabel}>Monthly transactions</h4>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item sm={12}>
                <FormControl className="formControl">
                  <TextField
                    className={classes.disabledInput}
                    variant="outlined"
                    autoComplete="off"
                    disabled
                    InputProps={{
                      ...commonInputProps,
                      inputProps: {
                        tabIndex: -1
                      }
                    }}
                    value={getTotalMonthlyCreditsText(
                      getTotalMonthlyCreditsValue(values.annualFinTurnoverAmtInAED)
                    )}
                  />
                  <InfoTitle
                    classes={{ wrapper: classes.infoTitles }}
                    title="This section is calculated based on the company’s Annual Financial Turnover"
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="totalMonthlyCashAmountInFigures"
                  path="prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyCashCreditsAED.amountInFigures"
                  label="Part of Monthly Total in Cash"
                  placeholder="9999999999"
                  autoComplete="off"
                  component={Input}
                  contextualHelpText="Approximate amount that the company expects to receive in a month in Cash."
                  InputProps={{
                    ...commonInputProps,
                    inputComponent: FormatDecimalNumberInput,
                    inputProps: { tabIndex: 0, maxLength: ANNUAL_TURNOVER_MAX_LENGTH }
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="totalMonthlyNonCashAmountInFigures"
                  autoComplete="off"
                  path="prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyNonCashCreditsAED.amountInFigures"
                  label="Part of Monthly Total in Non-Cash"
                  placeholder="9999999999"
                  component={Input}
                  contextualHelpText="Approximate amount that the company expects to receive in a month in modes other than Cash."
                  InputProps={{
                    ...commonInputProps,
                    inputComponent: FormatDecimalNumberInput,
                    inputProps: { tabIndex: 0, maxLength: ANNUAL_TURNOVER_MAX_LENGTH }
                  }}
                />
                <InfoTitle
                  classes={{
                    wrapper: cx(classes.infoTitles, classes.nonCashTitle)
                  }}
                  title="Non-cash: cheque / EFT / internal transfer / point of sale"
                />
              </Grid>
            </Grid>
            <div className={classes.divider} />

            <h4 className={classes.groupLabel}>Maximum amount expected in a single transaction</h4>

            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item md={6} sm={12}>
                <Field
                  name="maxAmtSingleTxnCashAED"
                  label="Maximum amount in Cash"
                  autoComplete="off"
                  path="prospect.orgKYCDetails.anticipatedTransactionsDetails.maxAmtSingleTxnCashAED"
                  placeholder="9999999999"
                  InputProps={{
                    ...commonInputProps,
                    inputComponent: FormatDecimalNumberInput,
                    inputProps: { tabIndex: 0, maxLength: ANNUAL_TURNOVER_MAX_LENGTH }
                  }}
                  component={Input}
                  contextualHelpText="Approximate amount that the company expects to receive in single transaction in Cash "
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="maxAmtSingleTxnNonCashAED"
                  label="Maximum amount in Non-Cash"
                  path="prospect.orgKYCDetails.anticipatedTransactionsDetails.maxAmtSingleTxnNonCashAED"
                  placeholder="9999999999"
                  InputProps={{
                    ...commonInputProps,
                    inputComponent: FormatDecimalNumberInput,
                    inputProps: { tabIndex: 0, maxLength: ANNUAL_TURNOVER_MAX_LENGTH }
                  }}
                  component={Input}
                  contextualHelpText="Approximate amount that the company expects to receive in single transaction in modes other than Cash"
                />
                <InfoTitle
                  classes={{
                    wrapper: cx(classes.infoTitles, classes.nonCashTitle)
                  }}
                  title="Non-cash: cheque / EFT / internal transfer / point of sale"
                />
              </Grid>
            </Grid>
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

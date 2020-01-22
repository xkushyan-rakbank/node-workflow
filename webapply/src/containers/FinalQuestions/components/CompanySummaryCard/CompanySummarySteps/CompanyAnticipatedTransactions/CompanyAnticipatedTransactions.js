import React, { useCallback } from "react";
import * as Yup from "yup";
import isNumber from "lodash/isNumber";
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
import { withCompanyFinalQuestions } from "../../../withCompanyFinalQuestions";

const FormatDecimalNumberInput = props => <NumberFormat decimalScale={2} {...props} />;

const getTotalMonthlyCreditsValue = annualFinancialTurnover => {
  if (!checkValidNumberFromString(annualFinancialTurnover)) {
    return 0;
  }
  return Number((parseFloat(annualFinancialTurnover) / YEAR_MONTH_COUNT).toFixed(2));
};

const getTotalMonthlyCreditsText = monthlyCreditsValue => {
  return monthlyCreditsValue ? `${monthlyCreditsValue} in Total Monthly Credits` : "9999999999.99";
};

const checkValidNumberFromString = string => {
  return isNumber(Number(string)) && !isNaN(Number(string));
};

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
    .required("You need to provide annual turnover")
    .matches(CURRENCY_REGEX, "This is not a valid value"),
  maxAmtSingleTxnCashAED: Yup.string()
    .required("You need to provide single transaction value")
    .matches(CURRENCY_REGEX, "This is not a valid value")
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
    .required("You need to provide single transaction value")
    .matches(CURRENCY_REGEX, "This is not a valid value")
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
    .required("You need to provide total monthly amount in cash")
    .matches(CURRENCY_REGEX, "This is not a valid value")
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
    .required("You need to provide total monthly amount in non-cash")
    .matches(CURRENCY_REGEX, "This is not a valid value")
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
        {withCompanyFinalQuestions(({ values }) => (
          <Form>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item sm={12}>
                <Field
                  name="annualFinTurnoverAmtInAED"
                  path="prospect.orgKYCDetails.annualFinTurnoverAmtInAED"
                  label="Annual turnover"
                  placeholder="9999999999.99"
                  InputProps={{
                    ...commonInputProps,
                    inputProps: {
                      maxLength: ANNUAL_TURNOVER_MAX_LENGTH,
                      tabIndex: 0,
                      inputComponent: FormatDecimalNumberInput
                    }
                  }}
                  component={Input}
                  contextualHelpText="Mention the Turnover per annum of the company. For new companies, give the expected turnover per annum"
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
                  placeholder="99999999.99"
                  component={Input}
                  contextualHelpText="Approximate amount that the company expects to receive in a month in Cash."
                  InputProps={{
                    ...commonInputProps,
                    inputComponent: FormatDecimalNumberInput,
                    inputProps: { tabIndex: 0 }
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="totalMonthlyNonCashAmountInFigures"
                  path="prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyNonCashCreditsAED.amountInFigures"
                  label="Part of Monthly Total in Non-Cash"
                  placeholder="99999999.99"
                  component={Input}
                  contextualHelpText="Approximate amount that the company expects to receive in a month in modes other than Cash."
                  InputProps={{
                    ...commonInputProps,
                    inputComponent: FormatDecimalNumberInput,
                    inputProps: { tabIndex: 0 }
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
                  path="prospect.orgKYCDetails.anticipatedTransactionsDetails.maxAmtSingleTxnCashAED"
                  placeholder="99999999.99"
                  InputProps={{
                    ...commonInputProps,
                    inputComponent: FormatDecimalNumberInput,
                    inputProps: { tabIndex: 0 }
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
                  placeholder="99999999.99"
                  InputProps={{
                    ...commonInputProps,
                    inputComponent: FormatDecimalNumberInput,
                    inputProps: { tabIndex: 0 }
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
        ))}
      </Formik>
    </div>
  );
};

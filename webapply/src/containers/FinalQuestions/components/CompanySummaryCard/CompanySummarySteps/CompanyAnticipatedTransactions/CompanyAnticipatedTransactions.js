import React from "react";
import * as Yup from "yup";
import cx from "classnames";

import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { InfoTitle } from "../../../../../../components/InfoTitle";
import { Input, AutoSaveField as Field, NumberFormat } from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";
import {
  COMPANY_CURRENCY,
  YEAR_MONTH_COUNT,
  ANNUAL_TURNOVER_MAX_LENGTH,
  PLACEHOLDER,
  linkedFields
} from "./constants";
import { isNumeric } from "../../../../../../utils/validation";
import { getRequiredMessage } from "../../../../../../utils/getValidationMessage";

const FormatDecimalNumberInput = props => (
  <NumberFormat
    allowNegative={false}
    thousandSeparator={true}
    decimalSeparator={false}
    {...props}
  />
);

const getTotalMonthlyCreditsValue = annualFinancialTurnover => {
  if (!isNumeric(annualFinancialTurnover)) {
    return null;
  }
  const calculation = parseFloat(annualFinancialTurnover) / YEAR_MONTH_COUNT;
  return Math.floor(calculation);
};

const getTotalMonthlyCreditsText = monthlyCreditsValue => {
  return isNumeric(monthlyCreditsValue)
    ? `${monthlyCreditsValue.toLocaleString("en-US")} in Total Monthly Credits`
    : PLACEHOLDER;
};

const checkFieldSumNotExceedYearTotal = (field, conditionalField, yearTotal) => {
  const isValidFieldAndYearTotalValue = isNumeric(field) && isNumeric(yearTotal);
  if (isValidFieldAndYearTotalValue && isNumeric(conditionalField)) {
    return Number(field) + Number(conditionalField) <= Number(yearTotal);
  } else if (isValidFieldAndYearTotalValue) {
    return Number(field) <= Number(yearTotal);
  }
  return true;
};

const checkFieldSumEqualMonthTotal = (field, conditionalField, yearTotal) => {
  const monthTotal = getTotalMonthlyCreditsValue(yearTotal);
  if (isNumeric(field) && isNumeric(conditionalField)) {
    return Number(field) + Number(conditionalField) === monthTotal;
  }
  return true;
};

const getPercentValue = (values, name, totalMonthlyCreditsAED) => {
  const totalMonthlyCashAmountInPercent = Math.round(
    (values.totalMonthlyCashAmountInFigures * 100) / totalMonthlyCreditsAED
  );
  return name === linkedFields.totalMonthlyCashAmountInPercent.name
    ? totalMonthlyCashAmountInPercent
    : 100 - totalMonthlyCashAmountInPercent;
};

const createChangeProspectHandler = values => (_, __, ___, errors) => {
  const isDataValid = !Object.values(linkedFields).some(
    field => field.isFillByUser && (!values[field.name] || errors[field.name])
  );

  if (!isDataValid) {
    return {};
  }

  const totalMonthlyCreditsAED = getTotalMonthlyCreditsValue(values.annualFinTurnoverAmtInAED);
  const prospectFields = Object.values(linkedFields).reduce(
    (resultObject, { path, name, isFillByUser }) => ({
      ...resultObject,
      [path]: isFillByUser ? values[name] : getPercentValue(values, name, totalMonthlyCreditsAED)
    }),
    {}
  );

  return {
    ...prospectFields,
    "prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyCreditsAED": totalMonthlyCreditsAED
  };
};

const companyAnticipatedTransactionsSchema = Yup.object().shape({
  annualFinTurnoverAmtInAED: Yup.string().required(getRequiredMessage("Annual Financial Turnover")),
  maxAmtSingleTxnCashAED: Yup.string()
    .required(getRequiredMessage("Part of Monthly Total in Cash"))
    .test(
      "is not exceed turnover",
      "Maximum amount in a single transactions in Cash and Non-cash should not exceed the Annual Financial Turnover",
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
    .test(
      "is not exceed turnover",
      "Maximum amount in a single transactions in Cash and Non-cash should not exceed the Annual Financial Turnover",
      function(value) {
        const { annualFinTurnoverAmtInAED, maxAmtSingleTxnCashAED = 0 } = this.parent;
        return checkFieldSumNotExceedYearTotal(
          value,
          maxAmtSingleTxnCashAED,
          annualFinTurnoverAmtInAED
        );
      }
    ),
  totalMonthlyCashAmountInFigures: Yup.string()
    .required(getRequiredMessage("Maximum amount in Cash"))
    .test(
      "is matches with month turnover",
      "Total amount in Cash and Non-cash should be equal to Total Monthly Credits",
      function(value) {
        const { annualFinTurnoverAmtInAED, totalMonthlyNonCashAmountInFigures = 0 } = this.parent;
        return checkFieldSumEqualMonthTotal(
          value,
          totalMonthlyNonCashAmountInFigures,
          annualFinTurnoverAmtInAED
        );
      }
    ),
  totalMonthlyNonCashAmountInFigures: Yup.string()
    .required(getRequiredMessage("Maximum amount in Non-Cash"))
    .test(
      "is matches with month turnover",
      "Total amount in Cash and Non-cash should be equal to Total Monthly Credits",
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

export const CompanyAnticipatedTransactions = ({ handleContinue, createFormChangeHandler }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        annualFinTurnoverAmtInAED: "",
        maxAmtSingleTxnCashAED: "",
        maxAmtSingleTxnNonCashAED: "",
        totalMonthlyCashAmountInFigures: "",
        totalMonthlyNonCashAmountInFigures: ""
      }}
      onSubmit={handleContinue}
      validationSchema={companyAnticipatedTransactionsSchema}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values }) => (
        <Form autoComplete="off">
          <h4 className={classes.groupLabel}>Annual turnover</h4>
          <Grid container spacing={3} className={classes.flexContainer}>
            <Grid item sm={12}>
              <Field
                name="annualFinTurnoverAmtInAED"
                path="prospect.orgKYCDetails.annualFinTurnoverAmtInAED"
                label="Annual Financial Turnover"
                autoComplete="none"
                placeholder={PLACEHOLDER}
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
                changeProspect={createChangeProspectHandler(values)}
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
                placeholder={PLACEHOLDER}
                autoComplete="off"
                component={Input}
                contextualHelpText={
                  <>
                    Approximate amount that the company expects to receive in a month in Cash.
                    <br />
                    Enter 0 if there are no cash transactions.
                  </>
                }
                InputProps={{
                  ...commonInputProps,
                  inputComponent: FormatDecimalNumberInput,
                  inputProps: { tabIndex: 0, maxLength: ANNUAL_TURNOVER_MAX_LENGTH }
                }}
                changeProspect={createChangeProspectHandler(values)}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="totalMonthlyNonCashAmountInFigures"
                autoComplete="off"
                path="prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyNonCashCreditsAED.amountInFigures"
                label="Part of Monthly Total in Non-Cash"
                placeholder={PLACEHOLDER}
                component={Input}
                contextualHelpText={
                  <>
                    Approximate amount that the company expects to receive in a month in modes other
                    than Cash.
                    <br />
                    Enter 0 if there are no non-cash transactions.
                  </>
                }
                InputProps={{
                  ...commonInputProps,
                  inputComponent: FormatDecimalNumberInput,
                  inputProps: { tabIndex: 0, maxLength: ANNUAL_TURNOVER_MAX_LENGTH }
                }}
                changeProspect={createChangeProspectHandler(values)}
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
                placeholder={PLACEHOLDER}
                InputProps={{
                  ...commonInputProps,
                  inputComponent: FormatDecimalNumberInput,
                  inputProps: { tabIndex: 0, maxLength: ANNUAL_TURNOVER_MAX_LENGTH }
                }}
                component={Input}
                contextualHelpText={
                  <>
                    Approximate amount that the company expects to receive in single transaction in
                    Cash.
                    <br />
                    Enter 0 if there are no cash transactions.
                  </>
                }
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="maxAmtSingleTxnNonCashAED"
                label="Maximum amount in Non-Cash"
                path="prospect.orgKYCDetails.anticipatedTransactionsDetails.maxAmtSingleTxnNonCashAED"
                placeholder={PLACEHOLDER}
                InputProps={{
                  ...commonInputProps,
                  inputComponent: FormatDecimalNumberInput,
                  inputProps: { tabIndex: 0, maxLength: ANNUAL_TURNOVER_MAX_LENGTH }
                }}
                component={Input}
                contextualHelpText={
                  <>
                    Approximate amount that the company expects to receive in single transaction in
                    modes other than Cash.
                    <br />
                    Enter 0 if there are no non-cash transactions.
                  </>
                }
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
  );
};

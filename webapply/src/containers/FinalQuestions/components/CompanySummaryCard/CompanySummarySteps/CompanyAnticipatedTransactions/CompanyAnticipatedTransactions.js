import React from "react";
import * as Yup from "yup";
import isNumber from "lodash/isNumber";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { InfoTitle } from "../../../../../../components/Notifications";
import { Input, AutoSaveField as Field } from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";
import { COMPANY_CURRENCY, MONTH_COUNT } from "./constants";
import { ANNUAL_TURNOVER_REGEX } from "../../../../../../utils/validation";

function getTotalMonthlyCreditsValue(annualFinancialTurnover) {
  if (
    !annualFinancialTurnover ||
    !isNumber(+annualFinancialTurnover) ||
    isNaN(+annualFinancialTurnover)
  ) {
    return 0;
  }
  return Math.floor(annualFinancialTurnover / MONTH_COUNT);
}

const companyAnticipatedTransactionsSchema = Yup.object().shape({
  annualFinTurnoverAmtInAED: Yup.string().matches(
    ANNUAL_TURNOVER_REGEX,
    "This is not a valid value"
  ),
  maxAmtSingleTxnCashAED: Yup.number()
    .required("Required")
    .test(
      "is not exceed turnover",
      "maximum amount in a single transactions in Cash and Non-cash should not exceed the Annual Financial Turnover",
      function(value) {
        const { annualFinTurnoverAmtInAED, maxAmtSingleTxnNonCashAED } = this.parent;
        if (annualFinTurnoverAmtInAED && maxAmtSingleTxnNonCashAED) {
          return +value + +maxAmtSingleTxnNonCashAED <= annualFinTurnoverAmtInAED;
        } else if (annualFinTurnoverAmtInAED) {
          return value <= annualFinTurnoverAmtInAED;
        }
        return true;
      }
    ),
  maxAmtSingleTxnNonCashAED: Yup.number()
    .required("Required")
    .test(
      "is not exceed turnover",
      "maximum amount in a single transactions in Cash and Non-cash should not exceed the Annual Financial Turnover",
      function(value) {
        const { annualFinTurnoverAmtInAED, maxAmtSingleTxnCashAED } = this.parent;
        if (annualFinTurnoverAmtInAED && maxAmtSingleTxnCashAED) {
          return +value + +maxAmtSingleTxnCashAED <= annualFinTurnoverAmtInAED;
        } else if (annualFinTurnoverAmtInAED) {
          return value <= annualFinTurnoverAmtInAED;
        }
        return true;
      }
    ),
  totalMonthlyCashAmountInFigures: Yup.number()
    .required("Required")
    .test(
      "is matches with month turnover",
      "total amount in Cash and Non-cash should be equal to Total Monthly Credits",
      function(value) {
        const { annualFinTurnoverAmtInAED, totalMonthlyNonCashAmountInFigures } = this.parent;
        const totalMonthlyCredits = getTotalMonthlyCreditsValue(annualFinTurnoverAmtInAED);
        if (totalMonthlyCredits && totalMonthlyNonCashAmountInFigures) {
          return +value + +totalMonthlyNonCashAmountInFigures === totalMonthlyCredits;
        }
        return true;
      }
    ),
  totalMonthlyNonCashAmountInFigures: Yup.number()
    .required("Required")
    .test(
      "is matches with month turnover",
      "total amount in Cash and Non-cash should be equal to Total Monthly Credits",
      function(value) {
        const { annualFinTurnoverAmtInAED, totalMonthlyCashAmountInFigures } = this.parent;
        const totalMonthlyCredits = getTotalMonthlyCreditsValue(annualFinTurnoverAmtInAED);
        if (totalMonthlyCredits && totalMonthlyCashAmountInFigures) {
          return +value + +totalMonthlyCashAmountInFigures === totalMonthlyCredits;
        }
        return true;
      }
    )
});

export const CompanyAnticipatedTransactionsComponent = ({
  handleContinue,
  annualFinTurnoverAmtInAED,
  totalMonthlyCashAmountInFigures,
  totalMonthlyNonCashAmountInFigures,
  maxAmtSingleTxnCashAED,
  maxAmtSingleTxnNonCashAED
}) => {
  const classes = useStyles();
  const commonInputProps = {
    endAdornment: <InputAdornment position="end">{COMPANY_CURRENCY}</InputAdornment>
  };

  function getTotalMonthlyCreditsText(monthlyCreditsValue) {
    return monthlyCreditsValue
      ? `${Math.floor(monthlyCreditsValue)} in Total Monthly Credits`
      : "Total Monthly Credits";
  }

  const onSubmit = values => {
    handleContinue();
    const prospectValue = {
      annualFinTurnoverAmtInAED: values.annualFinTurnoverAmtInAED,
      anticipatedTransactionsDetails: {
        maxAmtSingleTxnCashAED: values.maxAmtSingleTxnCashAED,
        maxAmtSingleTxnNonCashAED: values.maxAmtSingleTxnNonCashAED,
        totalMonthlyCashCreditsAED: { amountInFigures: values.totalMonthlyCashAmountInFigures },
        totalMonthlyNonCashCreditsAED: {
          amountInFigures: values.totalMonthlyNonCashAmountInFigures
        }
      }
    };
    console.log(prospectValue);
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          annualFinTurnoverAmtInAED,
          maxAmtSingleTxnCashAED,
          maxAmtSingleTxnNonCashAED,
          totalMonthlyCashAmountInFigures,
          totalMonthlyNonCashAmountInFigures
        }}
        onSubmit={onSubmit}
        validationSchema={companyAnticipatedTransactionsSchema}
      >
        {({ values }) => {
          return (
            <Form>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item sm={12}>
                  <Field
                    name="annualFinTurnoverAmtInAED"
                    path="prospect.orgKYCDetails.annualFinTurnoverAmtInAED"
                    label="Annual turnover"
                    placeholder="Annual turnover"
                    component={Input}
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
                      InputProps={commonInputProps}
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
                    placeholder="Part of Monthly Total in Cash"
                    InputProps={commonInputProps}
                    component={Input}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="totalMonthlyNonCashAmountInFigures"
                    path="prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyNonCashCreditsAED.amountInFigures"
                    label="Part of Monthly Total in Non-Cash"
                    placeholder="Part of Monthly Total in Non-Cash"
                    InputProps={commonInputProps}
                    component={Input}
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

              <h4 className={classes.groupLabel}>
                Maximum amount expected in a single transaction
              </h4>

              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item md={6} sm={12}>
                  <Field
                    name="maxAmtSingleTxnCashAED"
                    label="Maximum amount in Cash"
                    path="prospect.orgKYCDetails.anticipatedTransactionsDetails.maxAmtSingleTxnCashAED"
                    placeholder="Maximum amount in Cash"
                    InputProps={commonInputProps}
                    component={Input}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="maxAmtSingleTxnNonCashAED"
                    label="Maximum amount in Non-Cash"
                    path="prospect.orgKYCDetails.anticipatedTransactionsDetails.maxAmtSingleTxnNonCashAED"
                    placeholder="Maximum amount in Non-Cash"
                    InputProps={commonInputProps}
                    component={Input}
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
          );
        }}
      </Formik>
    </div>
  );
};

import React from "react";
import * as Yup from "yup";
import isNumber from "lodash/isNumber";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { InfoTitle } from "../../../../../../components/Notifications";
import { Input } from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";
import { prospect } from "../../../../../../constants/config";
import { COMPANY_CURRENCY, MONTH_COUNT } from "./constants";
import { ANNUAL_TURNOVER_REGEX } from "../../../../../../utils/validation";

const companyAnticipatedTransactionsSchema = Yup.object().shape({
  annualFinTurnoverAmtInAED: Yup.string().matches(
    ANNUAL_TURNOVER_REGEX,
    "This is not a valid value"
  ),
  anticipatedTransactionsDetails: Yup.object().shape({
    maxAmtSingleTxnCashAED: Yup.number().required("Required"),
    maxAmtSingleTxnNonCashAED: Yup.number().required("Required"),
    totalMonthlyCashCreditsAED: Yup.object().shape({
      amountInFigures: Yup.number().required("Required")
    }),
    totalMonthlyNonCashCreditsAED: Yup.object().shape({
      amountInFigures: Yup.number().required("Required")
    })
  })
});

export const CompanyAnticipatedTransactionsComponent = ({ handleContinue }) => {
  const classes = useStyles();
  const commonInputProps = {
    endAdornment: <InputAdornment position="end">{COMPANY_CURRENCY}</InputAdornment>
  };

  function getTotalMonthlyCreditsValue(annualFinancialTurnover) {
    if (
      !annualFinancialTurnover ||
      !isNumber(+annualFinancialTurnover) ||
      isNaN(+annualFinancialTurnover)
    ) {
      return "Total Monthly Credits";
    }
    const monthlyCreditsValue = annualFinancialTurnover / MONTH_COUNT;
    return `${Math.floor(monthlyCreditsValue)} in Total Monthly Credits`;
  }

  const onSubmit = values => {
    handleContinue();
    console.log(values);
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          annualFinTurnoverAmtInAED: prospect.orgKYCDetails.annualFinTurnoverAmtInAED,
          anticipatedTransactionsDetails: prospect.orgKYCDetails.anticipatedTransactionsDetails
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
                      value={getTotalMonthlyCreditsValue(values.annualFinTurnoverAmtInAED)}
                    />
                    <InfoTitle
                      classes={{ wrapper: classes.infoTitles }}
                      title="This section is calculated based on the company’s Annual Financial Turnover"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="anticipatedTransactionsDetails.totalMonthlyCashCreditsAED.amountInFigures"
                    label="Part of Monthly Total in Cash"
                    placeholder="Part of Monthly Total in Cash"
                    InputProps={commonInputProps}
                    component={Input}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="anticipatedTransactionsDetails.totalMonthlyNonCashCreditsAED.amountInFigures"
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
                    name="anticipatedTransactionsDetails.maxAmtSingleTxnCashAED"
                    label="Maximum amount in Cash"
                    placeholder="Maximum amount in Cash"
                    InputProps={commonInputProps}
                    component={Input}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <Field
                    name="anticipatedTransactionsDetails.maxAmtSingleTxnNonCashAED"
                    label="Maximum amount in Non-Cash"
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

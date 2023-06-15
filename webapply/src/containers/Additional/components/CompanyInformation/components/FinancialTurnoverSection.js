import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

import { createMuiTheme } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { ThemeProvider as SliderThemeProvider } from "@material-ui/styles";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { AutoSaveField as Field, Input, NumberFormat } from "../../../../../components/Form";

import { useStyles } from "../styled";
import { DisclaimerNote } from "../../../../../components/InfoNote/DisclaimerNote";
import { getInvalidMessage, getRequiredMessage } from "../../../../../utils/getValidationMessage";

function calculatePercent(number, total) {
  return (number / total) * 100;
}
function calculateAmountFromPercentage(percent, total) {
  return (percent * total) / 100;
}

const FormatDecimalNumberInput = props => <NumberFormat allowNegative={false} {...props} />;

export const FinancialTurnoverSection = () => {
  const classes = useStyles();

  const FinancialSlider = createMuiTheme({
    overrides: {
      MuiSlider: {
        root: {
          color: "#525252",
          height: 12,
          margin: "20px 0"
        },
        thumb: {
          height: 22,
          width: 22,
          backgroundColor: "#fff",
          border: "2px solid #525252",
          marginTop: -6,
          marginLeft: -12,
          "&:focus, &:hover, &$active": {
            boxShadow: "inherit"
          },
          "&::after": {
            boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.08)"
          }
        },
        active: {},
        valueLabel: {
          left: "calc(-50% + 4px)"
        },
        track: {
          height: 12,
          borderRadius: 10
        },
        rail: {
          height: 12,
          borderRadius: 10
        }
      }
    }
  });

  const [percent, setPercent] = useState(0);
  const [amount, setAmount] = useState(0);

  const initialValues = {
    annualFinTurnoverAmtInAED: "",
    anualCashDepositAED: ""
  };

  const additionalCompanyInfoSchema = Yup.object({
    annualFinTurnoverAmtInAED: Yup.number()
      .typeError(getInvalidMessage("Annual financial turnover (AED)"))
      .required(getRequiredMessage("Annual financial turnover (AED)"))
      .min(1000.01, "The amount should be greater than 1000.00 AED")
  });

  function handlePercentCalculation(annualAmt, sliderValue) {
    const annualFinTurnoverAmtInAED = parseFloat(annualAmt);
    const percentValue = calculatePercent(sliderValue, annualFinTurnoverAmtInAED);
    const totalAmount = calculateAmountFromPercentage(percentValue, annualFinTurnoverAmtInAED);

    setPercent(percentValue.toFixed());
    setAmount(totalAmount.toFixed(2));
  }

  const initialIsValid = additionalCompanyInfoSchema.isValidSync(initialValues);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={additionalCompanyInfoSchema}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={true}
        isInitialValid={initialIsValid}
        onSubmit={() => {}}
      >
        {({ setFieldValue, values, isValid, handleBlur }) => {
          function handleChange(ev, blur) {
            const { value } = ev.target;
            const annualTurnover = value ? parseFloat(value).toFixed(2) : "";
            setFieldValue("anualCashDepositAED", "");
            setPercent(0);
            setAmount(0);
            setFieldValue("annualFinTurnoverAmtInAED", annualTurnover?.toString());
            blur(ev);
          }

          function handleSliderChange(ev, newValue) {
            setFieldValue("anualCashDepositAED", newValue.toString());
            handlePercentCalculation(values.annualFinTurnoverAmtInAED, newValue);
          }
          return (
            <Accordion title={"Financial turnover"} id={"financialTurnover"} isCompleted={isValid}>
              <Field
                name="annualFinTurnoverAmtInAED"
                label="Annual financial turnover (AED)"
                placeholder="Annual financial turnover (AED)"
                path="prospect.companyAdditionalInfo.annualFinTurnoverAmtInAED"
                component={Input}
                showCounter={false}
                InputProps={{
                  inputComponent: FormatDecimalNumberInput,
                  inputProps: { maxLength: 9, tabIndex: 0 },
                  onBlur: e => handleChange(e, handleBlur)
                }}
              />
              <p className={classes.sectionLabel}>What is your estimated annual cash deposit?</p>
              <DisclaimerNote text="Just drag the slider to provide your cash and non-cash component" />
              <SliderThemeProvider theme={FinancialSlider}>
                <Field
                  name="anualCashDepositAED"
                  path="prospect.companyAdditionalInfo.anualCashDepositAED"
                  value={values?.anualCashDepositAED ? parseFloat(values.anualCashDepositAED) : 0}
                  component={Slider}
                  max={parseInt(values?.annualFinTurnoverAmtInAED)}
                  onChange={handleSliderChange}
                  disabled={!values?.annualFinTurnoverAmtInAED}
                />
              </SliderThemeProvider>
              <div>
                <span className={classes.percentageText}>{percent}</span>•
                <span className={classes.amountText}>{amount} AED</span>
              </div>
            </Accordion>
          );
        }}
      </Formik>
    </>
  );
};

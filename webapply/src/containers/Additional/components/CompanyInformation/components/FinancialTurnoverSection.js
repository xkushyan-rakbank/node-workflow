import React from "react";
import { createMuiTheme } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { ThemeProvider as SliderThemeProvider } from "@material-ui/styles";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { AutoSaveField as Field, Input, NumberFormat } from "../../../../../components/Form";

import { useStyles } from "../styled";
import { DisclaimerNote } from "../../../../../components/InfoNote/DisclaimerNote";

const FormatDecimalNumberInput = props => <NumberFormat allowNegative={false} {...props} />;

export const FinancialTurnoverSection = props => {
  const { setFieldValue, values, isValid } = props;
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

  function handleBlur(ev, blur) {
    const { value } = ev.target;
    const annualTurnover = value ? parseFloat(value).toFixed(2) : "";
    setFieldValue("annualFinTurnoverAmtInAED", annualTurnover?.toString());
    blur(ev);
  }

  function handleChange(ev, newValue) {
    setFieldValue("anualCashDepositAED", newValue.toString());
  }

  return (
    <div>
      <Accordion title={"Financial turnover"} id={"financialTurnover"} isCompleted={isValid}>
        <Field
          name="annualFinTurnoverAmtInAED"
          label="Annual financial turnover (AED)"
          placeholder="Annual financial turnover (AED)"
          path="prospect.companyAdditionalInfo.annualFinTurnoverAmtInAED"
          component={Input}
          InputProps={{
            inputComponent: FormatDecimalNumberInput,
            inputProps: { maxLength: 9, tabIndex: 0 },
            onBlur: e => handleBlur(e, props.handleBlur)
          }}
        />
        <p className={classes.sectionLabel}>What is your estimated annual cash deposit?</p>
        <DisclaimerNote text="Just drag the slider to provide your cash and non-cash component" />
        <SliderThemeProvider theme={FinancialSlider}>
          <Field
            name="anualCashDepositAED"
            path="prospect.companyAdditionalInfo.anualCashDepositAED"
            value={parseInt(values.anualCashDepositAED)}
            defaultValue={0}
            component={Slider}
            onChange={handleChange}
            disabled={values.annualFinTurnoverAmtInAED.length === 0}
            InputProps={{
              max: parseInt(values?.annualFinTurnoverAmtInAED),
              type: "number"
            }}
          />
        </SliderThemeProvider>
        {/* <div>
          <span className={classes.percentageText}>35%</span>•
          <span className={classes.amountText}>350,000 AED</span>
        </div> */}
      </Accordion>
    </div>
  );
};

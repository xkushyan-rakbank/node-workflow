/* eslint-disable react/display-name */
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import cx from "classnames";

import { createMuiTheme } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { ThemeProvider as SliderThemeProvider } from "@material-ui/styles";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { AutoSaveField as Field, Input, NumberFormat } from "../../../../../components/Form";

import { useStyles } from "../../styled";
import { getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { getCompanyAdditionalInfo } from "../../../../../store/selectors/appConfig";

function calculatePercent(number, total) {
  return (number / total) * 100;
}
function calculateAmountFromPercentage(percent, total) {
  return (percent * total) / 100;
}

const FormatDecimalNumberInput = props => (
  <NumberFormat
    allowNegative={false}
    thousandsGroupStyle="thousand"
    thousandSeparator=","
    {...props}
  />
);

export const FinancialTurnoverSection = forwardRef(
  ({ setFieldValue: setFormFieldValue, id, refs }) => {
    const classes = useStyles();
    const { annualFinTurnoverAmtInAED, anualCashDepositAED } = useSelector(
      getCompanyAdditionalInfo
    );

    const { financialFormRef, financialAccordionRef } = refs;

    const sliderThumbIcon =
      "url('data:image/svg+xml,<svg width=\"53\" height=\"62\" viewBox=\"0 0 53 62\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g filter=\"url(%23filter0_d_11717_129572)\"><rect opacity=\"0.8\" x=\"11.041\" y=\"19\" width=\"30.2695\" height=\"30\" rx=\"15\" fill=\"%23F7F7FC\" stroke=\"white\" stroke-width=\"8\"/><g filter=\"url(%23filter1_d_11717_129572)\"><rect x=\"15.041\" y=\"23\" width=\"22.2695\" height=\"22\" rx=\"11\" fill=\"white\"/><rect x=\"16.041\" y=\"24\" width=\"20.2695\" height=\"20\" rx=\"10\" stroke=\"%235E080B\" stroke-width=\"2\"/></g><path d=\"M22.4002 10.9895H29.6004C29.6733 10.9892 29.7448 10.9691 29.8071 10.9313C29.8694 10.8935 29.9203 10.8394 29.9541 10.7748C29.988 10.7103 30.0036 10.6377 29.9993 10.5649C29.995 10.4922 29.9709 10.422 29.9297 10.3619L26.3296 5.1617C26.1803 4.9461 25.8211 4.9461 25.6715 5.1617L22.0714 10.3619C22.0298 10.4218 22.0053 10.4921 22.0008 10.565C21.9962 10.6379 22.0117 10.7106 22.0456 10.7753C22.0795 10.84 22.1305 10.8942 22.193 10.9319C22.2555 10.9697 22.3272 10.9896 22.4002 10.9895Z\" fill=\"%23830000\"/></g><defs><filter id=\"filter0_d_11717_129572\" x=\"0.0410156\" y=\"0\" width=\"52.2695\" height=\"62\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"><feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/><feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/><feOffset dy=\"2\"/><feGaussianBlur stdDeviation=\"3.5\"/><feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0\"/><feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_11717_129572\"/><feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_11717_129572\" result=\"shape\"/></filter><filter id=\"filter1_d_11717_129572\" x=\"8.04102\" y=\"18\" width=\"36.2695\" height=\"36\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"><feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/><feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/><feOffset dy=\"2\"/><feGaussianBlur stdDeviation=\"3.5\"/><feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0\"/><feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_11717_129572\"/><feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_11717_129572\" result=\"shape\"/></filter></defs></svg>')";
    const FinancialSlider = createMuiTheme({
      overrides: {
        MuiSlider: {
          root: {
            color: "#525252",
            height: 12,
            margin: "20px 0",
            padding: "50px 0 20px !important",
            backgroundColor: "transparent !important",
          },
          dragging: {
            backgroundColor: "transparent"
          },
          thumb: {
            backgroundColor: "transparent",
            "& .thumbColorPrimary": {
              backgroundColor: "transparent"
            },
            "&:focus, &:hover, &$active": {
              backgroundColor: "transparent",
              backgroundRepeat: "no-repeat",
              backgroundImage: `${sliderThumbIcon}`,
              outline: "none",
              boxShadow: "none"
            },
            "&::after": {
              top: "-25px !important",
              left: "-25px !important",
              right: "-25px !important",
              bottom: "-25px !important",
              marginBottom: 0,
              marginLeft: 0,
              boxShadow: "none",
              backgroundColor: "transparent",
              backgroundRepeat: "no-repeat",
              backgroundImage: `${sliderThumbIcon}`
            }
          },
          active: {
            height: 12,
            width: 12,
            boxShadow: "none",
            backgroundColor: "transparent",
            backgroundRepeat: "no-repeat",
            backgroundImage: `${sliderThumbIcon}`
          },
          valueLabel: {
            top: "55px !important",
            left: "calc(-50% + 4px)"
          },
          track: {
            height: 12,
            borderRadius: 10
          },
          rail: {
            height: 12,
            borderRadius: 10
          },
          markLabel: {
            top: "2px !important",
            paddingBottom: "5px"
          },
          markActive: {
            opacity: 0
          },
          mark: {
            display: "none"
          }
        }
      }
    });

    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
      if (anualCashDepositAED !== sliderValue) {
        setSliderValue(parseFloat(anualCashDepositAED) || 0);
      }
    }, [anualCashDepositAED]);

    const initialValues = {
      annualFinTurnoverAmtInAED,
      anualCashDepositAED
    };

    const additionalCompanyInfoSchema = Yup.object({
      annualFinTurnoverAmtInAED: Yup.number()
        .typeError("The amount should be greater than 1000.00 AED")
        .required(getRequiredMessage("Annual financial turnover (AED)"))
        .min(1000.01, "The amount should be greater than 1000.00 AED"),
      anualCashDepositAED: Yup.number().required(getRequiredMessage("Annual cash deposit"))
    });

    const numberWithCommas = x => {
      let numberX = x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      return numberX;
    };

    const calculateAmountPercentage = useCallback((values, sliderNewValue) => {
      const annualAmt = values.annualFinTurnoverAmtInAED || 0;
      const sliderValue = sliderNewValue || values.anualCashDepositAED || 0;
      if (!(annualAmt && sliderValue)) {
        return { formattedAmount: 0, percentValue: 0 };
      }
      const annualFinTurnoverAmtInAED = parseFloat(annualAmt);
      const percentValue = calculatePercent(sliderValue, annualFinTurnoverAmtInAED).toFixed();

      if (percentValue > 100 || isNaN(percentValue) || !isFinite(percentValue)) {
        return { formattedAmount: "", percentValue: "", totalAmount: "" };
      }

      const totalAmount = calculateAmountFromPercentage(percentValue, annualFinTurnoverAmtInAED);
      const formattedAmount = numberWithCommas(totalAmount.toFixed(2));
      return { formattedAmount, percentValue, totalAmount };
    });

    const initialIsValid = additionalCompanyInfoSchema.isValidSync(initialValues);

    const marks = amount => {
      const values = [];
      if (annualFinTurnoverAmtInAED) {
        for (let percentage = 0; percentage <= 10; percentage++) {
          const value = (percentage / 10) * amount;
          values.push({ value, label: `${percentage * 10}%` });
        }
      }
      return values;
    };

    return (
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={additionalCompanyInfoSchema}
          validateOnChange={true}
          validateOnBlur={true}
          isInitialValid={initialIsValid}
          innerRef={financialFormRef}
        >
          {({ setFieldValue, values, isValid, handleBlur }) => {
            function handleChange(ev, blur) {
              const { value } = ev.target;
              const annualTurnover = value ? parseFloat(value.replaceAll(",", "")).toFixed(2) : "";
              setFieldValue("anualCashDepositAED", "");
              setFieldValue("annualFinTurnoverAmtInAED", annualTurnover?.toString());
              blur(ev);
            }

            function handleSliderChange(ev, newValue) {
              const calculateValue = calculateAmountPercentage(values, newValue).totalAmount;
              setSliderValue(calculateValue || 0);
              setFieldValue("anualCashDepositAED", calculateValue?.toString());
            }
            return (
              <Accordion
                title={"Financial turnover"}
                id={id}
                setFormFieldValue={setFormFieldValue}
                isCompleted={isValid}
                classes={{
                  accordionSummaryContent: classes.additionalInfoAccordionSummaryContent,
                  accordionSummaryContentExpanded:
                    classes.additionalInfoAccordionSummaryContentExpanded
                }}
                showHelperText={
                  "Annual turnover and cash projection details are required for internal checks and calculations."
                }
                accordionRef={financialAccordionRef}
              >
                <Field
                  name="annualFinTurnoverAmtInAED"
                  label="Annual financial turnover (AED)"
                  placeholder="Annual financial turnover (AED)"
                  path="prospect.companyAdditionalInfo.annualFinTurnoverAmtInAED"
                  component={Input}
                  showCounter={false}
                  InputProps={{
                    inputComponent: FormatDecimalNumberInput,
                    // 9 digits + 2 ','(commas)
                    inputProps: { maxLength: 11, tabIndex: 0 },
                    onChange: e => {
                      handleChange(e, handleBlur);
                      setFieldValue("annualFinTurnoverAmtInAED", e.target.value);
                      setSliderValue(0);
                      handleSliderChange();
                    }
                  }}
                />
                <p className={cx(classes.sectionLabel, classes.boldLabel)}>
                  What is your estimated annual cash deposit?
                </p>
                <div className={classes.sliderContainer}>
                  <SliderThemeProvider theme={FinancialSlider}>
                    <Field
                      name="anualCashDepositAED"
                      path="prospect.companyAdditionalInfo.anualCashDepositAED"
                      value={sliderValue}
                      component={Slider}
                      max={parseInt(values?.annualFinTurnoverAmtInAED)}
                      onChange={handleSliderChange}
                      disabled={
                        !values?.annualFinTurnoverAmtInAED ||
                        values.annualFinTurnoverAmtInAED < 1001
                      }
                      marks={
                        values.annualFinTurnoverAmtInAED < 1001
                          ? []
                          : marks(values?.annualFinTurnoverAmtInAED)
                      }
                    />
                  </SliderThemeProvider>
                </div>
                <div className={classes.slideValuePrice}>
                  {calculateAmountPercentage(values).percentValue !== "" &&
                    calculateAmountPercentage(values).formattedAmount !== "" && (
                      <>
                        (
                        <span className={classes.percentageText}>
                          {calculateAmountPercentage(values).percentValue}%
                        </span>
                        )
                        <span className={classes.amountText}>
                          {calculateAmountPercentage(values).formattedAmount} AED
                        </span>
                      </>
                    )}
                </div>
              </Accordion>
            );
          }}
        </Formik>
      </>
    );
  }
);

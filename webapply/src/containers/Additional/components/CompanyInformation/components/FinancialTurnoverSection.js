import React from "react";
import { Formik, Form, Field } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { Input } from "../../../../../components/Form";

import { useStyles } from "../styled";

export const FinancialTurnoverSection = () => {
  const classes = useStyles();

  const FinancialSlider = withStyles({
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
  })(Slider);

  const handleSubmit = () => {
    console.log("-handleSubmit-");
  };

  return (
    <div>
      <Formik initialValues={{}} onSubmit={handleSubmit} validateOnChange={false}>
        <Form>
          <Accordion title={"Financial turnover"}>
            <Field
              name="Annual financial turnover (AED)"
              label="Annual financial turnover (AED)"
              placeholder="Annual financial turnover (AED)"
              InputProps={{
                inputProps: { tabIndex: 1 }
              }}
              component={Input}
            />
            <p className={classes.sectionLabel}>What is your estimated annual cash deposit?</p>
            <div className={classes.financialTurnOverSliderInfo}>
              <ErrorOutlineOutlinedIcon />
              <span>Just drag the slider to provide your cash and non-cash component</span>
            </div>
            <FinancialSlider aria-label="financial turnover slider" defaultValue={20} />
            <div>
              <span className={classes.percentageText}>35%</span>•
              <span className={classes.amountText}>350,000 AED</span>
            </div>
          </Accordion>
        </Form>
      </Formik>
    </div>
  );
};

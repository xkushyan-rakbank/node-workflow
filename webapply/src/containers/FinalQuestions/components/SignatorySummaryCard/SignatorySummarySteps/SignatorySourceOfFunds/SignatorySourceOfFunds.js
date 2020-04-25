import React from "react";
import * as Yup from "yup";
import get from "lodash/get";
import { Formik, Form } from "formik";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../../../components/InfoTitle";
import {
  SelectAutocomplete,
  Input,
  AutoSaveField as Field
} from "../../../../../../components/Form";
import {
  MAX_SOURCE_OF_FUNDS_OTHERS_LENGTH,
  SPECIAL_CHARACTERS_REGEX
} from "../../../../../../utils/validation";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";

import { OTHER_SOURCE_OF_WEALTH } from "./constants";
import { useStyles } from "./styled";

export const createSignatorySourceOfFundsSchema = isSignatory =>
  Yup.object().shape({
    sourceOfWealth: Yup.array()
      .of(
        Yup.object().shape({
          wealthType: Yup.string(),
          others: Yup.string()
        })
      )
      .test(
        "required",
        getRequiredMessage("Source of funds"),
        value => !isSignatory || value.length
      ),
    others: Yup.string()
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Other"))
      .when("sourceOfWealth", {
        is: sourceOfWealth =>
          sourceOfWealth.map(value => value.wealthType).includes(OTHER_SOURCE_OF_WEALTH),
        then: Yup.string().required()
      })
  });

export const SignatorySourceOfFunds = ({
  index,
  handleContinue,
  createFormChangeHandler,
  isSignatory
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        sourceOfWealth: [],
        others: ""
      }}
      onSubmit={handleContinue}
      validationSchema={createSignatorySourceOfFundsSchema(isSignatory)}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={3} className={classes.flexContainer}>
            <Grid item md={12} xs={12}>
              <Field
                multiple
                name="sourceOfWealth"
                path={`prospect.signatoryInfo[${index}].kycDetails.sourceOfWealth`}
                datalistId="wealthType"
                label={`Source of funds${!isSignatory ? " (optional)" : ""}`}
                onChange={selectedValue => {
                  const withOption = selectedValue.includes(OTHER_SOURCE_OF_WEALTH);
                  const sourceOfWealth = selectedValue.map(value => ({
                    wealthType: value,
                    others: withOption ? values.others : ""
                  }));

                  setFieldValue("sourceOfWealth", sourceOfWealth);
                  if (!withOption) {
                    setFieldValue("others", "");
                  }
                }}
                extractValue={value => value.wealthType}
                contextualHelpText="Select the most prominent source of capital to fund the company"
                contextualHelpProps={{ isDisableHoverListener: false }}
                component={SelectAutocomplete}
                tabIndex="0"
                isSearchable
              />
              <InfoTitle
                classes={{
                  wrapper: classes.infoTitles
                }}
                title="You can select multiple values"
              />
            </Grid>
            <Grid
              className={cx({
                hidden: !(values.sourceOfWealth || [])
                  .map(item => item.wealthType)
                  .includes(OTHER_SOURCE_OF_WEALTH)
              })}
              item
              md={12}
              sm={12}
            >
              <Field
                name="others"
                path={`prospect.signatoryInfo[${index}].kycDetails.sourceOfWealth[0].others`}
                label="Other (Specify)"
                placeholder="Other (Specify)"
                initialValue={get(values, "sourceOfWealth[0].others", "")}
                component={Input}
                InputProps={{
                  inputProps: { maxLength: MAX_SOURCE_OF_FUNDS_OTHERS_LENGTH, tabIndex: 0 }
                }}
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

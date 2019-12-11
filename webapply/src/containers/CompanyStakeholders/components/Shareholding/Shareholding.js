import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import {
  NumericInput,
  InlineRadioGroup,
  AutoSaveField as Field
} from "../../../../components/Form";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { getInputValueById } from "../../../../store/selectors/input";
import { yesNoOptions } from "../../../../constants/options";
import { percentageSelectorWithoutCurrentStakeholder } from "../../../../store/selectors/stakeholder";

const getShareholdingRightsSchema = totalPercentageWithoutCurrentStakeholder =>
  Yup.object().shape({
    isShareholderACompany: Yup.boolean().required("Required"),
    shareHoldingPercentage: Yup.number()
      .integer()
      .min(0, "Shareholders can't hold less than 0% of shares in total")
      .max(
        100 - totalPercentageWithoutCurrentStakeholder,
        "Shareholders can't hold more than 100% of shares in total"
      )
      .required("Required")
  });

const ShareholdingStep = ({
  handleContinue,
  totalPercentageWithoutCurrentStakeholder,
  isSoleProprietor,
  index
}) => {
  const initialValues = isSoleProprietor
    ? { isShareholderACompany: true, shareHoldingPercentage: 100 }
    : { isShareholderACompany: "", shareHoldingPercentage: "" };

  const createShareholderHandler = ({ values, setFieldValue }) => event => {
    const value = JSON.parse(event.target.value);
    setFieldValue("isShareholderACompany", value);

    if (value !== values.isShareholderACompany && !value) {
      setFieldValue("shareHoldingPercentage", 0);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleContinue}
      validationSchema={getShareholdingRightsSchema(totalPercentageWithoutCurrentStakeholder)}
    >
      {({ values, setFieldValue }) => {
        const shareholderHandler = createShareholderHandler({ values, setFieldValue });
        return (
          <Form>
            <Grid container>
              <Field
                name="isShareholderACompany"
                component={InlineRadioGroup}
                path={`prospect.signatoryInfo[${index}].kycDetails.isShareholderACompany`}
                options={yesNoOptions}
                label="Is this person a shareholder?"
                onChange={shareholderHandler}
              />
              <Grid item md={12}>
                <Field
                  name="shareHoldingPercentage"
                  path={`prospect.signatoryInfo[${index}].kycDetails.shareHoldingPercentage`}
                  label="Percentage"
                  placeholder="Percentage"
                  disabled={!values.isShareholderACompany}
                  component={NumericInput}
                  inputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                  isNumericString
                  decimalSeparator={"."}
                  decimalScale={2}
                />
              </Grid>
            </Grid>

            <SubmitButton />
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => {
  const totalPercentageWithoutCurrentStakeholder = percentageSelectorWithoutCurrentStakeholder(
    state,
    index
  );
  return {
    isSoleProprietor: getInputValueById(state, "SigAcntSig.authorityType", [index]) === "SP",
    totalPercentageWithoutCurrentStakeholder
  };
};

export const Shareholding = connect(mapStateToProps)(ShareholdingStep);

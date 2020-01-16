import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import { NumberFormatInput } from "../../../../components/Form/Input/NumberFormatInput";
import { InlineRadioGroup, AutoSaveField as Field, Input } from "../../../../components/Form";
import { withCompanyStakeholder } from "../withCompanyStakeholder";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { getInputValueById } from "../../../../store/selectors/input";
import { yesNoOptions } from "../../../../constants/options";
import { percentageSelectorWithoutCurrentStakeholder } from "../../../../store/selectors/stakeholder";

const PercentageInput = props => (
  <NumberFormatInput decimalSeparator="." decimalScale={2} {...props} />
);

const getShareholdingRightsSchema = totalPercentageWithoutCurrentStakeholder =>
  Yup.object().shape({
    isShareholderACompany: Yup.boolean().required("Required"),
    shareHoldingPercentage: Yup.number()
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

    const shareHoldingPercentage = value !== values.isShareholderACompany && !value ? 0 : "";
    setFieldValue("shareHoldingPercentage", shareHoldingPercentage);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleContinue}
      validationSchema={getShareholdingRightsSchema(totalPercentageWithoutCurrentStakeholder)}
      validateOnChange={false}
    >
      {withCompanyStakeholder(index, ({ values, setFieldValue }) => {
        const shareholderHandler = createShareholderHandler({ values, setFieldValue });
        return (
          <Form>
            <Grid container>
              <Field
                name="isShareholderACompany"
                component={InlineRadioGroup}
                path={`prospect.signatoryInfo[${index}].kycDetails.isShareholder`}
                options={yesNoOptions}
                label="Is this person a shareholder?"
                onChange={shareholderHandler}
                contextualHelpProps={{ isDisableHoverListener: false }}
                contextualHelpText="Select 'Yes' if this person holds any shares based on Memorandum of Association/ Articles of Association/ Partners agreement/ Service Agreement/ Share Certificate"
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
              <Grid item md={12}>
                <Field
                  name="shareHoldingPercentage"
                  path={`prospect.signatoryInfo[${index}].kycDetails.shareHoldingPercentage`}
                  label="Percentage"
                  placeholder={values.isShareholderACompany ? "33.33" : "Percentage"}
                  disabled={!values.isShareholderACompany}
                  component={Input}
                  InputProps={{
                    inputComponent: PercentageInput,
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    inputProps: { maxLength: 6, tabIndex: 0 }
                  }}
                  contextualHelpText="Mention the percentage of shares held based on  Memorandum of Association/ Articles of Association/ Partners agreement/ Service Agreement/ Share Certificate"
                />
              </Grid>
            </Grid>

            <SubmitButton />
          </Form>
        );
      })}
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

import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as Yup from "yup";
import get from "lodash/get";
import round from "lodash/round";
import { Form, Formik } from "formik";

import {
  InlineRadioGroup,
  AutoSaveField as Field,
  Input,
  NumberFormat
} from "../../../../components/Form";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { getSignatories } from "../../../../store/selectors/appConfig";
import { yesNoOptions } from "../../../../constants/options";
import { percentageSelectorWithoutCurrentStakeholder } from "../../../../store/selectors/stakeholders";
import { getRequiredMessage } from "../../../../utils/getValidationMessage";
import { SOLE_PROPRIETOR } from "../../../../constants";

const PercentageInput = props => <NumberFormat decimalSeparator="." decimalScale={2} {...props} />;

const getShareholdingRightsSchema = totalPercentageWithoutCurrentStakeholder =>
  Yup.object().shape({
    isShareholderACompany: Yup.boolean().required(
      "Field Is this person a shareholder is not filled"
    ),
    shareHoldingPercentage: Yup.number()
      .min(0, "Shareholders can't hold less than 0% of shares in total")
      .max(
        round(100 - totalPercentageWithoutCurrentStakeholder, 2),
        "Shareholders can't hold more than 100% of shares in total"
      )
      .required(getRequiredMessage("Percentage"))
  });

const initialValues = {
  isShareholderACompany: "",
  shareHoldingPercentage: ""
};

const ShareholdingStep = ({
  handleContinue,
  createFormChangeHandler,
  totalPercentageWithoutCurrentStakeholder,
  isSoleProprietor,
  index
}) => {
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
      {createFormChangeHandler(({ values, setFieldValue }) => {
        const shareholderHandler = createShareholderHandler({ values, setFieldValue });
        return (
          <Form>
            <Grid container>
              <Field
                disabled={isSoleProprietor}
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
                  disabled={!values.isShareholderACompany || isSoleProprietor}
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
    isSoleProprietor:
      get(getSignatories(state)[index], "accountSigningInfo.authorityType", "") === SOLE_PROPRIETOR,
    totalPercentageWithoutCurrentStakeholder
  };
};

export const Shareholding = connect(mapStateToProps)(ShareholdingStep);

import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import get from "lodash/get";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import { InlineRadioGroup } from "../Form/InlineRadioGroup/InlineRadioGroup";
import { NumericInput } from "../Form/Input/NumericInput";
import { SubmitButton } from "./SubmitButton/SubmitButton";
import { getSignatories } from "../../store/selectors/appConfig";
import { getInputNameById, getInputValueById } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";
import { yesNoOptions } from "../../constants/options";

const shareholdingRightsSchema = Yup.object().shape({
  kycDetails: Yup.object().shape({
    isShareholderACompany: Yup.boolean().required("Required"),
    shareHoldingPercentage: Yup.number()
      .positive()
      .min(0, "Shareholders can't hold less than 0% of shares in total")
      .max(100, "Shareholders can't hold more than 100% of shares in total")
      .required("Required")
  })
});

export const Shareholding = props => {
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (
  //     prevProps.isShareholder !== this.props.isShareholder &&
  //     this.props.isShareholder === false
  //   ) {
  //     this.updateShareholderPercentageValue(0);
  //   }
  // }
  //
  // updateShareholderPercentageValue(value) {
  //   this.props.updateProspect({ [this.props.shareholderPercentageInputName]: value });
  // }
  //
  // customValidationMessage = ({ isFocused }) => {
  //   if (!isFocused && this.props.totalPercentage > 100) {
  //     return <ErrorMessage error="Shareholders can't hold more than 100% of shares in total" />;
  //   }
  //
  //   return null;
  // };

  return (
    <Formik
      initialValues={{ kycDetails: { isShareholderACompany: "", shareHoldingPercentage: "" } }}
      // onSubmit={handleContinue}
      validationSchema={shareholdingRightsSchema}
    >
      {({ values }) => {
        return (
          <Form>
            <Grid container>
              <Field
                component={InlineRadioGroup}
                name="kycDetails.isShareholderACompany"
                options={yesNoOptions}
                label="Is this person a shareholder?"
              />
              <Grid item md={12}>
                <Field
                  name="kycDetails.shareHoldingPercentage"
                  label="Percentage"
                  placeholder="Percentage"
                  disabled={!values.kycDetails.isShareholderACompany}
                  component={NumericInput}
                  inputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                  format="###.##"
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
  const signatories = getSignatories(state);
  const totalPercentage = signatories.reduce(
    (acc, item) => acc + Number(get(item, "kycDetails.shareHoldingPercentage", 0)),
    0
  );
  return {
    isShareholder: getInputValueById(state, "SigKycd.isShareholder", [index]),
    shareholderPercentageInputName: getInputNameById(state, "SigKycd.shareHoldingPercentage", [
      index
    ]),
    // temp - will work only on WireMock data
    isSoleProprietor: getInputValueById(state, "SigAcntSig.authorityType", [index]) === "SP",
    currentPercentage: getInputValueById(state, "SigKycd.shareHoldingPercentage", [index]),
    signatories,
    totalPercentage,
    isError: totalPercentage > 100
  };
};

const mapDispatchToProps = {
  updateProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shareholding);

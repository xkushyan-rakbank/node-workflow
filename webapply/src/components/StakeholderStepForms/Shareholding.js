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
import { getInputValueById } from "../../store/selectors/input";
import { yesNoOptions } from "../../constants/options";

const shareholdingRightsSchema = totalPercentage =>
  Yup.object().shape({
    kycDetails: Yup.object().shape({
      isShareholderACompany: Yup.boolean().required("Required"),
      shareHoldingPercentage: Yup.number()
        .positive()
        .min(0, "Shareholders can't hold less than 0% of shares in total")
        .max(100 - totalPercentage, "Shareholders can't hold more than 100% of shares in total")
        .required("Required")
    })
  });

export const Shareholding = ({ handleContinue, totalPercentage, isSoleProprietor }) => {
  const kycDetails = isSoleProprietor
    ? { isShareholderACompany: true, shareHoldingPercentage: 100 }
    : { isShareholderACompany: "", shareHoldingPercentage: "" };

  return (
    <Formik
      initialValues={{ kycDetails }}
      onSubmit={handleContinue}
      validationSchema={() => shareholdingRightsSchema(totalPercentage)}
    >
      {({ values, setFieldValue }) => {
        const shareholderHandler = event => {
          const value = JSON.parse(event.target.value);
          setFieldValue("kycDetails.isShareholderACompany", value);

          if (value !== values.kycDetails.isShareholderACompany && !value) {
            setFieldValue("kycDetails.shareHoldingPercentage", 0);
          }
        };

        return (
          <Form>
            <Grid container>
              <Field
                component={InlineRadioGroup}
                name="kycDetails.isShareholderACompany"
                options={yesNoOptions}
                label="Is this person a shareholder?"
                onChange={shareholderHandler}
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
    isSoleProprietor: getInputValueById(state, "SigAcntSig.authorityType", [index]) === "SP",
    totalPercentage
  };
};

export default connect(
  mapStateToProps,
  null
)(Shareholding);

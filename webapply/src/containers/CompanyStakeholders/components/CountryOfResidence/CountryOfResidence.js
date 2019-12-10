import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { getInputValueById } from "../../../../store/selectors/input";
import {
  AutoSaveField as Field,
  NumericInput,
  SelectAutocomplete
} from "../../../../components/Form";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { EMIRATES_ID_REGEX } from "../../../../utils/validation";

const UAE = "AE";

const getCountryOfResidenceSchema = isSignatory =>
  Yup.object().shape({
    residenceCountry: Yup.string().test("required", "Required", value => isSignatory || value),
    eidNumber: Yup.string().when("residenceCountry", {
      is: value => value === UAE,
      then: Yup.string()
        .required("Required")
        .matches(EMIRATES_ID_REGEX, "Emirates ID should be in the format of 15 digits")
    })
  });

const CountryOfResidenceStep = ({ index, isSignatory, handleContinue }) => (
  <Formik
    initialValues={{
      residenceCountry: "",
      eidNumber: ""
    }}
    onSubmit={handleContinue}
    validationSchema={getCountryOfResidenceSchema(isSignatory)}
  >
    {({ values }) => (
      <Form>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Field
              name="residenceCountry"
              path={`prospect.signatoryInfo[${index}].kycDetails.residenceCountry`}
              label="Country of Residence"
              component={SelectAutocomplete}
              disabled={isSignatory}
              datalistId="country"
              shrink
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <Field
              name="eidNumber"
              path={`prospect.signatoryInfo[${index}].kycDetails.emirateIdDetails.eidNumber`}
              label="Emirates ID"
              placeholder="784-XXXX-XXXXXXX-X"
              component={NumericInput}
              disabled={values.residenceCountry !== UAE}
              format="784-####-#######-#"
              prefix={"784-"}
            />
          </Grid>
        </Grid>

        <SubmitButton />
      </Form>
    )}
  </Formik>
);

const mapStateToProps = (state, { index }) => ({
  isSignatory: getInputValueById(state, "SigKycd.isSignatory", [index], false)
});

export const CountryOfResidence = connect(mapStateToProps)(CountryOfResidenceStep);

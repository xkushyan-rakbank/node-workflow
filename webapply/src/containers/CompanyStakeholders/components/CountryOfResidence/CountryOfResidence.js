import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { getInputValueById } from "../../../../store/selectors/input";
import {
  AutoSaveField as Field,
  SelectAutocomplete,
  EmiratesID
} from "../../../../components/Form";
import { withCompanyStakeholder } from "../withCompanyStakeholder";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { EMIRATES_ID_REGEX } from "../../../../utils/validation";
import { UAE } from "../../../../constants";

const getCountryOfResidenceSchema = isSignatory =>
  Yup.object().shape({
    residenceCountry: Yup.string().test("required", "Required", value => isSignatory || value),
    eidNumber: Yup.string().when("residenceCountry", {
      is: value => value === UAE,
      then: Yup.string()
        .required("Required")
        .transform(value => value.replace(/-/g, ""))
        .matches(EMIRATES_ID_REGEX, "Emirates ID should be in the format of 15 digits")
    })
  });

const CountryOfResidenceStep = ({ index, isSignatory, handleContinue }) => {
  const eidNumberPath = `prospect.signatoryInfo[${index}].kycDetails.emirateIdDetails.eidNumber`;

  return (
    <Formik
      initialValues={{
        residenceCountry: UAE,
        eidNumber: ""
      }}
      onSubmit={handleContinue}
      validationSchema={getCountryOfResidenceSchema(isSignatory)}
      validateOnChange={false}
    >
      {withCompanyStakeholder(index, ({ values }) => (
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
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="eidNumber"
                path={eidNumberPath}
                disabled={values.residenceCountry !== UAE}
                component={EmiratesID}
                changeProspect={(prospect, value) => ({
                  ...prospect,
                  [eidNumberPath]: value.replace(/-/g, "")
                })}
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
          </Grid>

          <SubmitButton />
        </Form>
      ))}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  isSignatory: getInputValueById(state, "SigKycd.isSignatory", [index], false)
});

export const CountryOfResidence = connect(mapStateToProps)(CountryOfResidenceStep);

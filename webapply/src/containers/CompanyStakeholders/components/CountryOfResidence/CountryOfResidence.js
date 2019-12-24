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
import { withCompanyStakeholderFormik } from "../StakeholderFormik";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { EMIRATES_ID_REGEX } from "../../../../utils/validation";

const UAE = "AE";

const getCountryOfResidenceSchema = isSignatory =>
  Yup.object().shape({
    residenceCountry: Yup.string().test("required", "Required", value => isSignatory || value),
    eidNumber: Yup.string().when("residenceCountry", {
      is: value => !isSignatory && value === UAE,
      then: Yup.string()
        .required("Required")
        .matches(EMIRATES_ID_REGEX, "Emirates ID should be in the format of 15 digits")
    })
  });

const CountryOfResidenceStep = ({
  index,
  isSignatory,
  handleContinue,
  filledStakeholder,
  setFillStakeholder
}) => {
  const eidNumberPath = `prospect.signatoryInfo[${index}].kycDetails.emirateIdDetails.eidNumber`;
  const setUnfilledStakeholder = () => setFillStakeholder(index, false);
  return (
    <Formik
      initialValues={{
        residenceCountry: "",
        eidNumber: ""
      }}
      onSubmit={handleContinue}
      validationSchema={getCountryOfResidenceSchema(isSignatory)}
    >
      {withCompanyStakeholderFormik({ filledStakeholder, setUnfilledStakeholder }, ({ values }) => (
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
                path={eidNumberPath}
                disabled={isSignatory || values.residenceCountry !== UAE}
                component={EmiratesID}
                changeProspect={(prospect, value) => ({
                  ...prospect,
                  [eidNumberPath]: value.replace(/-/g, "")
                })}
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

import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import get from "lodash/get";

import { getSignatories } from "../../../../store/selectors/appConfig";
import {
  AutoSaveField as Field,
  SelectAutocomplete,
  EmiratesID
} from "../../../../components/Form";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { EMIRATES_ID_REGEX } from "../../../../utils/validation";
import { UAE } from "../../../../constants";
import { getRequiredMessage, getInvalidMessage } from "../../../../utils/getValidationMessage";

const getCountryOfResidenceSchema = isSignatory =>
  Yup.object().shape({
    residenceCountry: Yup.string().test(
      "required",
      getRequiredMessage("Country of residence"),
      value => isSignatory || value
    ),
    eidNumber: Yup.string().when("residenceCountry", {
      is: value => value === UAE,
      then: Yup.string()
        .required(getRequiredMessage("Emirates ID"))
        .transform(value => value.replace(/-/g, ""))
        .matches(EMIRATES_ID_REGEX, getInvalidMessage("Emirates ID"))
    })
  });

const CountryOfResidenceStep = ({ index, isSignatory, handleContinue }) => {
  const eidNumberPath = `prospect.signatoryInfo[${index}].kycDetails.emirateIdDetails.eidNumber`;
  const isUAEResident = `prospect.signatoryInfo[${index}].kycDetails.isUAEResident`;

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
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Field
                name="residenceCountry"
                path={`prospect.signatoryInfo[${index}].kycDetails.residenceCountry`}
                label="Country of residence"
                component={SelectAutocomplete}
                disabled={isSignatory}
                datalistId="country"
                shrink
                tabIndex="0"
                changeProspect={(prospect, value) => {
                  let result = {
                    ...prospect,
                    [isUAEResident]: value === UAE
                  };

                  if (value !== UAE) {
                    result.eidNumberPath = "";
                  }

                  return result;
                }}
                onChange={value => {
                  if (value !== UAE) {
                    setFieldValue("eidNumber", "");
                  }
                  setFieldValue("residenceCountry", value);
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                name="eidNumber"
                path={eidNumberPath}
                label="Emirates ID"
                placeholder="784-1950-1234567-8"
                disabled={values.residenceCountry !== UAE}
                component={EmiratesID}
                changeProspect={(prospect, value) => ({
                  ...prospect,
                  [eidNumberPath]: value.replace(/-/g, "")
                })}
                contextualHelpText={
                  <>
                    If Emirates ID contains hyphen (-), spaces or any other special character please
                    enter only alphabets and numbers
                    <br />
                    Example
                    <br />
                    784-1950-1234567-8 to be entered as 784195012345678
                  </>
                }
              />
            </Grid>
          </Grid>

          <SubmitButton />
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  isSignatory: get(getSignatories(state)[index], "kycDetails.isSignatory", false)
});

export const CountryOfResidence = connect(mapStateToProps)(CountryOfResidenceStep);

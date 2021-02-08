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
  EmiratesID,
  InlineRadioGroup
} from "../../../../components/Form";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { EMIRATES_ID_REGEX } from "../../../../utils/validation";
import { UAE } from "../../../../constants";
import { getRequiredMessage, getInvalidMessage } from "../../../../utils/getValidationMessage";
import { yesNoOptions } from "../../../../constants/options";

const createCountryOfResidenceSchema = isSignatory =>
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
    }),
    isUSrelation: isSignatory && Yup.boolean().required("Please select a option")
  });

const CountryOfResidenceStep = ({
  index,
  isSignatory,
  handleContinue,
  createFormChangeHandler
}) => {
  const pathToEidNumber = `prospect.signatoryInfo[${index}].kycDetails.emirateIdDetails.eidNumber`;
  const pathToIsUAEResident = `prospect.signatoryInfo[${index}].kycDetails.isUAEResident`;
  const selectUsRelation = ({ values, setFieldValue }) => event => {
    const value = JSON.parse(event.target.value);
    setFieldValue("isUSrelation", value);
  };
  return (
    <Formik
      initialValues={{
        residenceCountry: UAE,
        eidNumber: "",
        isUSrelation: ""
      }}
      onSubmit={handleContinue}
      validationSchema={createCountryOfResidenceSchema(isSignatory)}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values, setFieldValue }) => {
        const preferredMailingAddress = selectUsRelation({ values, setFieldValue });
        return (
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
                      [pathToIsUAEResident]: value === UAE
                    };

                    if (value !== UAE) {
                      result[pathToEidNumber] = "";
                    }

                    return result;
                  }}
                  onChange={value => {
                    setFieldValue("residenceCountry", value);
                    if (value !== UAE) {
                      setFieldValue("eidNumber", "");
                    }
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Field
                  name="eidNumber"
                  path={pathToEidNumber}
                  label="Emirates ID"
                  placeholder="784-1950-1234567-8"
                  disabled={values.residenceCountry !== UAE}
                  component={EmiratesID}
                  changeProspect={(prospect, value) => ({
                    ...prospect,
                    [pathToEidNumber]: value.replace(/-/g, "")
                  })}
                  contextualHelpText={
                    <>
                      If Emirates ID contains hyphen (-), spaces or any other special character
                      please enter only alphabets and numbers
                      <br />
                      Example
                      <br />
                      784-1950-1234567-8 to be entered as 784195012345678
                    </>
                  }
                />
              </Grid>
            </Grid>
            {isSignatory && (
              <Grid container>
                <Field
                  name="isUSrelation"
                  component={InlineRadioGroup}
                  path={`prospect.signatoryInfo[${index}].isUSrelation`}
                  options={yesNoOptions}
                  label="I have US relation"
                  onChange={preferredMailingAddress}
                  contextualHelpProps={{ isDisableHoverListener: false, placement: "bottom-end" }}
                  contextualHelpText="You have connections with US if - You are a US national / Resident of the USA / Holder of a US Green Card / Tax Resident of US, and that I have stated U.S as one of the countries in the previous section. (If selected please complete W9 form)"
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                />
              </Grid>
            )}
            <SubmitButton />
          </Form>
        );
      })}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  isSignatory: get(getSignatories(state)[index], "kycDetails.isSignatory", false)
});

export const CountryOfResidence = connect(mapStateToProps)(CountryOfResidenceStep);

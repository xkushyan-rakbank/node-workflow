import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { ContexualHelp } from "../../../../../../components/Notifications";
import { Icon, ICONS } from "../../../../../../components/Icons";
import { ALPHANUMERIC_REGEX, SPECIAL_CHARACTERS_REGEX } from "../../../../../../utils/validation";
import {
  Input,
  AutoSaveField as Field,
  Checkbox,
  SelectAutocomplete,
  InlineRadioGroup
} from "../../../../../../components/Form";
import { DEFAULT_SIGNATORY_COUNTRY } from "./constants";
import {
  MAX_OFFICE_NUMBER_LENGTH,
  MAX_STREET_NUMBER_LENGTH,
  MAX_PO_BOX_NUMBER_LENGTH
} from "../../../CompanySummaryCard/CompanySummarySteps/CompanyPreferredMailingAddress/constants";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";
import { useStyles } from "./styled";

const createSignatoryHomeCountryAddressSchema =  () =>
  Yup.object().shape({
    homeCountryAddressLine2: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Street / Location")),
    homeCountryAddressLine1: Yup.string()
      .required(getRequiredMessage("Flat / Villa / Building"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_OFFICE_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Flat / Villa / Building")),
    
    homeCountryAddressCity: Yup.string()
      .required(getRequiredMessage("Emirate/ City")),
     
  });

export const SignatoryHomeCountryAddressComponent = ({
  index,
  handleContinue,
  createFormChangeHandler,
  
}) => {
  const classes = useStyles();

  const autoSavePathBase = `prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0]`;


  return (
    <Formik
      initialValues={{
         
        homeCountryAddressLine1 : "",
        homeCountryAddressLine2: "",
        homeCountryAddressCity: "",
        homeCountryAddressCountry: DEFAULT_SIGNATORY_COUNTRY
      }}
      onSubmit={handleContinue}
      validationSchema={createSignatoryHomeCountryAddressSchema}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values, setFieldValue }) => {
        return(
        <Form>
          {/* SCR RO changes */}
           
          <h4 className={classes.groupLabel}>Home country address</h4>
            <Grid container spacing={3} className={classes.flexContainer}>
            <Grid item xs={12}>
              <Field
                name="homeCountryAddressLine1"
                path={`${autoSavePathBase}.homeCountryAddressLine1`}
                label="Flat / Villa / Building"
                placeholder="Flat / Villa / Building"
                component={Input}
                InputProps={{
                  inputProps: { maxLength: MAX_OFFICE_NUMBER_LENGTH, tabIndex: 0 }
                }}
              />
            </Grid>
              <Grid item sm={6} xs={12}>
              <Field
                name="homeCountryAddressLine2"
                path={`${autoSavePathBase}.homeCountryAddressLine2`}
                label="Street / Location (optional)"
                placeholder="Street / Location"
                component={Input}
                InputProps={{
                  inputProps: { maxLength: MAX_STREET_NUMBER_LENGTH, tabIndex: 0 }
                }}
              />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Field
                  name="homeCountryAddressCity"
                  path={`${autoSavePathBase}.homeCountryAddressCity`}
                  datalistId="emirateCity"
                  label="City"
                  isSearchable
                  component={SelectAutocomplete}
                  tabIndex="3"
                />
                <Field name="homeCountryAddressCountry" disabled component={Input} />
              </Grid>
            </Grid>
        </Form>
      );
    })}
    </Formik>
  );
};

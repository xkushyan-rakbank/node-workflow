import React from "react";
import { Formik } from "formik";
import { Grid } from "@material-ui/core";
import * as Yup from "yup";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { Input, AutoSaveField as Field, SelectAutocomplete } from "../../../../../components/Form";
import { getInvalidMessage, getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { POBOX_REGEX, SPECIAL_CHARACTERS_REGEX } from "../../../../../utils/validation";
import { MAX_STREET_NUMBER_LENGTH } from "../../../../FinalQuestions/components/CompanySummaryCard/CompanySummarySteps/CompanyPreferredMailingAddress/constants";

export const ResidentialAddress = ({ setFieldValue: setFormFieldValue, id }) => {
  const basePath = "prospect.signatoryInfo[0].stakeholderAdditionalInfo.residentialAddress";

  const initialValues = {
    addressLine1: "",
    addressLine2: "",
    country: "AE",
    emirateCity: "",
    poBox: ""
  };

  const residentialAddressSchema = Yup.object().shape({
    country: Yup.string().required(),
    addressLine1: Yup.string()
      .required(getRequiredMessage("Flat, villa or building"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Flat, villa or building")),
    addressLine2: Yup.string()
      .required(getRequiredMessage("Street or location"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Street or location")),
    poBox: Yup.string()
      .required(getRequiredMessage("P.O. Box number"))
      .max(10, "Maximum ${max} characters allowed")
      .matches(POBOX_REGEX, getInvalidMessage("P.O. Box number")),
    emirateCity: Yup.string().required(getRequiredMessage("Emirate or city"))
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={residentialAddressSchema}
      validateOnChange={true}
      onSubmit={() => {}}
    >
      {({ values }) => {
        const isValidForm = residentialAddressSchema.isValidSync(values);
        return (
          <Accordion
            title={"Residential address"}
            id={id}
            setFormFieldValue={setFormFieldValue}
            isCompleted={isValidForm}
          >
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <Field
                  name="addressLine1"
                  path={`${basePath}.addressLine1`}
                  label="Flat, villa or building"
                  placeholder="Flat, villa or building"
                  InputProps={{
                    inputProps: { tabIndex: 1 }
                  }}
                  component={Input}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Field
                  name="poBox"
                  path={`${basePath}.poBox`}
                  label="P.O. Box"
                  placeholder="P.O. Box"
                  InputProps={{
                    inputProps: { tabIndex: 1 }
                  }}
                  component={Input}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Field
                  name="addressLine2"
                  path={`${basePath}.addressLine2`}
                  label="Street or location"
                  placeholder="Street or location"
                  InputProps={{
                    inputProps: { tabIndex: 1 }
                  }}
                  component={Input}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Field
                  name="emirateCity"
                  path={`${basePath}.emirateCity`}
                  label="Emirate or city"
                  placeholder="Emirate or city"
                  datalistId="emirateCity"
                  component={SelectAutocomplete}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Field
                  name="country"
                  path={`${basePath}.country`}
                  label="Country"
                  placeholder="Country"
                  datalistId="country"
                  component={SelectAutocomplete}
                  disabled={true}
                />
              </Grid>
            </Grid>
          </Accordion>
        );
      }}
    </Formik>
  );
};

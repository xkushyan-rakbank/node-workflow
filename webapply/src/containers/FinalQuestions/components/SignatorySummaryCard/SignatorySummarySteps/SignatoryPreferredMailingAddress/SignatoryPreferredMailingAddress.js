import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { ALPHANUMERIC_REGEX, SPECIAL_CHARACTERS_REGEX } from "../../../../../../utils/validation";
import {
  Input,
  AutoSaveField as Field,
  Checkbox,
  SelectAutocomplete
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

const signatoryPreferredMailingAddressSchema = () =>
  Yup.object().shape({
    addressLine2: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Street / Location")),
    addressLine1: Yup.string()
      .required(getRequiredMessage("Flat / Villa / Building"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_OFFICE_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Flat / Villa / Building")),
    poBox: Yup.string()
      .required(getRequiredMessage("PO Box Number"))
      .matches(ALPHANUMERIC_REGEX, getInvalidMessage("PO Box Number")),
    emirateCity: Yup.string().required(getRequiredMessage("Emirate/ City"))
  });

export const SignatoryPreferredMailingAddressComponent = ({
  index,
  handleContinue,
  organisationAddressLine2,
  organisationAddressLine1,
  organisationPoBox,
  organisationEmirateCity
}) => {
  const classes = useStyles();

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  const autoSavePathBase = `prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0]`;

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          sameAsCompanyAddress: false,
          addressLine2: "",
          addressLine1: "",
          poBox: "",
          emirateCity: "",
          country: DEFAULT_SIGNATORY_COUNTRY
        }}
        onSubmit={handleSubmit}
        validationSchema={signatoryPreferredMailingAddressSchema}
        validateOnChange={false}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Field
              name="sameAsCompanyAddress"
              path={`prospect.signatoryInfo[${index}].sameAsCompanyAddress`}
              component={Checkbox}
              label="Same as Company Address"
              onSelect={() => {
                setFieldValue(
                  "addressLine2",
                  !values.sameAsCompanyAddress ? organisationAddressLine2 : ""
                );
                setFieldValue(
                  "addressLine1",
                  !values.sameAsCompanyAddress ? organisationAddressLine1 : ""
                );
                setFieldValue(
                  "emirateCity",
                  !values.sameAsCompanyAddress ? organisationEmirateCity : ""
                );
                setFieldValue("poBox", !values.sameAsCompanyAddress ? organisationPoBox : "");
                setFieldValue("country", DEFAULT_SIGNATORY_COUNTRY);
              }}
              inputProps={{ maxLength: MAX_STREET_NUMBER_LENGTH, tabIndex: 0 }}
            />
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item sm={12}>
                <Field
                  name="addressLine1"
                  path={`${autoSavePathBase}.addressLine1`}
                  disabled={values.sameAsCompanyAddress}
                  label="Flat / Villa / Building"
                  placeholder="Flat / Villa / Building"
                  component={Input}
                  InputProps={{
                    inputProps: { maxLength: MAX_OFFICE_NUMBER_LENGTH, tabIndex: 0 }
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Field
                  name="addressLine2"
                  path={`${autoSavePathBase}.addressLine2`}
                  disabled={values.sameAsCompanyAddress}
                  label="Street / Location"
                  placeholder="Street / Location"
                  component={Input}
                  InputProps={{
                    inputProps: { maxLength: MAX_STREET_NUMBER_LENGTH, tabIndex: 0 }
                  }}
                />
                <Field
                  name="emirateCity"
                  path={`${autoSavePathBase}.emirateCity`}
                  disabled={values.sameAsCompanyAddress}
                  datalistId="emirateCity"
                  label="Emirate/ City"
                  isSearchable
                  component={SelectAutocomplete}
                  tabIndex="0"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="poBox"
                  path={`${autoSavePathBase}.poBox`}
                  disabled={values.sameAsCompanyAddress}
                  label="PO Box Number"
                  placeholder="AB1234"
                  component={Input}
                  InputProps={{
                    inputProps: { maxLength: MAX_PO_BOX_NUMBER_LENGTH, tabIndex: 0 }
                  }}
                />
                <Field
                  name="country"
                  path={`${autoSavePathBase}.country`}
                  label="Country"
                  placeholder="Country"
                  disabled
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                />
              </Grid>
            </Grid>
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

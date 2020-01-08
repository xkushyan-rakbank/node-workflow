import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { ADDRESS_NUMBER_REGEX, ALPHANUMERIC_REGEX } from "../../../../../../utils/validation";
import {
  CustomSelect,
  Input,
  AutoSaveField as Field,
  Checkbox
} from "../../../../../../components/Form";
import { DEFAULT_SIGNATORY_COUNTRY } from "./constants";
import { MAX_PO_BOX_NUMBER_LENGTH } from "../../../CompanySummaryCard/CompanySummarySteps/CompanyPreferredMailingAddress/constants";

import { useStyles } from "./styled";

const signatoryPreferredMailingAddressSchema = Yup.object().shape({
  addressFieldDesc: Yup.string().required("You need to provide address details"),
  addressLine1: Yup.string().matches(ADDRESS_NUMBER_REGEX, "Invalid address value"),
  poBox: Yup.string()
    .required("You need to provide po box number")
    .matches(ALPHANUMERIC_REGEX, "Invalid PO box number"),
  emirateCity: Yup.string().required("You need to provide emirate city")
});

export const SignatoryPreferredMailingAddressComponent = ({
  index,
  handleContinue,
  organisationAddressFieldDesc,
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
          addressFieldDesc: "",
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
                  "addressFieldDesc",
                  !values.sameAsCompanyAddress ? organisationAddressFieldDesc : ""
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
              }}
            />
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item sm={12}>
                <Field
                  name="addressFieldDesc"
                  path={`${autoSavePathBase}.addressFieldDesc`}
                  disabled={values.sameAsCompanyAddress}
                  label="Flat / Villa / Building"
                  placeholder="Flat / Villa / Building"
                  component={Input}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="addressLine1"
                  path={`${autoSavePathBase}.addressLine1`}
                  disabled={values.sameAsCompanyAddress}
                  label="Street / Location"
                  placeholder="Street / Location"
                  component={Input}
                />
                <Field
                  name="emirateCity"
                  path={`${autoSavePathBase}.emirateCity`}
                  disabled={values.sameAsCompanyAddress}
                  datalistId="emirateCity"
                  label="Emirate"
                  component={CustomSelect}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="poBox"
                  path={`${autoSavePathBase}.poBox`}
                  disabled={values.sameAsCompanyAddress}
                  label="PO Box Number"
                  placeholder="PO Box Number"
                  component={Input}
                  inputProps={{ maxLength: MAX_PO_BOX_NUMBER_LENGTH }}
                />
                <Field
                  name="country"
                  path={`${autoSavePathBase}.country`}
                  label="Country"
                  placeholder="Country"
                  disabled
                  component={Input}
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

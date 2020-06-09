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

const createSignatoryPreferredMailingAddressSchema = isSignatory =>
  Yup.object().shape({
    addressLine2: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Street / Location")),
    addressLine1: Yup.string()
      .test(
        "required",
        getRequiredMessage("Flat / Villa / Building"),
        value => !isSignatory || value
      )
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_OFFICE_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Flat / Villa / Building")),
    poBox: Yup.string()
      .test("required", getRequiredMessage("PO Box Number"), value => !isSignatory || value)
      .matches(ALPHANUMERIC_REGEX, getInvalidMessage("PO Box Number")),
    emirateCity: Yup.string().test(
      "required",
      getRequiredMessage("Emirate/ City"),
      value => !isSignatory || value
    )
  });

export const SignatoryPreferredMailingAddressComponent = ({
  index,
  handleContinue,
  createFormChangeHandler,
  organisationAddressLine2,
  organisationAddressLine1,
  organisationPoBox,
  organisationEmirateCity,
  isSignatory
}) => {
  const classes = useStyles();

  const autoSavePathBase = `prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0]`;

  return (
    <Formik
      initialValues={{
        sameAsCompanyAddress: false,
        addressLine2: "",
        addressLine1: "",
        poBox: "",
        emirateCity: "",
        country: DEFAULT_SIGNATORY_COUNTRY
      }}
      onSubmit={handleContinue}
      validationSchema={createSignatoryPreferredMailingAddressSchema(isSignatory)}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values, setValues }) => (
        <Form>
          <div className={classes.sameAsCompanyAddressBox}>
            <Field
              name="sameAsCompanyAddress"
              classes={{ formControlRoot: classes.sameAsCompanyAddressCheckbox }}
              path={`prospect.signatoryInfo[${index}].sameAsCompanyAddress`}
              component={Checkbox}
              label="Same as Company Address"
              onSelect={() => {
                setValues({
                  sameAsCompanyAddress: !values.sameAsCompanyAddress,
                  addressLine2: !values.sameAsCompanyAddress ? organisationAddressLine2 : "",
                  addressLine1: !values.sameAsCompanyAddress ? organisationAddressLine1 : "",
                  emirateCity: !values.sameAsCompanyAddress ? organisationEmirateCity : "",
                  poBox: !values.sameAsCompanyAddress ? organisationPoBox : "",
                  country: DEFAULT_SIGNATORY_COUNTRY
                });
              }}
              inputProps={{ maxLength: MAX_STREET_NUMBER_LENGTH, tabIndex: 0 }}
            />
            <ContexualHelp
              title={
                <span>
                  Select this checkbox if you want the Company address to be the preferred mailing
                  address.
                  <br />
                  <br />
                  If not, please enter the Residence address in below fields.
                  <br />
                  <br />
                  Kindly note, the Business Debit Card of this stakeholder will be delivered to this
                  address.
                </span>
              }
              placement="right"
              isDisableHoverListener={false}
            >
              <span className={classes.questionIcon}>
                <Icon name={ICONS.question} alt="question" className={classes.questionIcon} />
              </span>
            </ContexualHelp>
          </div>
          <Grid container spacing={3} className={classes.flexContainer}>
            <Grid item xs={12}>
              <Field
                name="addressLine1"
                path={`${autoSavePathBase}.addressLine1`}
                disabled={values.sameAsCompanyAddress}
                label={`Flat / Villa / Building${!isSignatory ? " (optional)" : ""}`}
                placeholder="Flat / Villa / Building"
                component={Input}
                InputProps={{
                  inputProps: { maxLength: MAX_OFFICE_NUMBER_LENGTH, tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="addressLine2"
                path={`${autoSavePathBase}.addressLine2`}
                disabled={values.sameAsCompanyAddress}
                label="Street / Location (optional)"
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
                label={`Emirate/ City${!isSignatory ? " (optional)" : ""}`}
                isSearchable
                component={SelectAutocomplete}
                tabIndex="0"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="poBox"
                path={`${autoSavePathBase}.poBox`}
                disabled={values.sameAsCompanyAddress}
                label={`PO Box Number${!isSignatory ? " (optional)" : ""}`}
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
      ))}
    </Formik>
  );
};

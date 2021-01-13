import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";

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
import { yesNoOptions } from "./options";
import { useStyles } from "./styled";
import { Accordion } from "../../../../../../components/Accordion/Accordion";
import { updateProspect } from "../../../../../../store/actions/appConfig";

const createSignatoryPreferredMailingAddressSchema = () =>
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
    emirateCity: Yup.string().required(getRequiredMessage("Emirate/ City")),
    officeAddrsEmirateCity: Yup.string().required(
      getRequiredMessage("Office address Emirate/ City")
    ),
    officeAddrsPoBox: Yup.string()
      .required(getRequiredMessage("Office address PO Box Number"))
      .matches(ALPHANUMERIC_REGEX, getInvalidMessage("Office address PO Box Number")),
    isResisdenceOrOfficeAddress: Yup.boolean().required(
      "Please select your preferred mailing address"
    ),
    homeCountryAddressLine2: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Street / Location")),
    homeCountryAddressLine1: Yup.string()
      .required(getRequiredMessage("Flat / Villa / Building"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_OFFICE_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Flat / Villa / Building")),

    homeCountryAddressCity: Yup.string().required(getRequiredMessage("Emirate/ City"))
  });

export const SignatoryPreferredMailingAddressComponent = ({
  index,
  handleContinue,
  createFormChangeHandler,
  signatoriesEmirateCity,
  signatoriesPoBox,
  organisationInfo
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const autoSavePathBase = `prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0]`;
  // eslint-disable-next-line max-len
  const autoSavePathBase_OfficeAdd = `prospect.signatoryInfo[${index}].addressInfo[1].addressDetails[0]`;
  // eslint-disable-next-line max-len
  const autoSavePathBase_HomeCountryAdd = `prospect.signatoryInfo[${index}].addressInfo[2].addressDetails[0]`;

  const selectPreferredMailingAddrs = ({ values, setFieldValue }) => event => {
    const value = JSON.parse(event.target.value);
    console.log("value=>", value);
    const prospect = {};
    prospect[`${autoSavePathBase}.preferredAddress`] = value ? "Yes" : "No";
    prospect[`${autoSavePathBase_OfficeAdd}.preferredAddress`] = value ? "No" : "Yes";
    dispatch(updateProspect(prospect));
    setFieldValue("isResisdenceOrOfficeAddress", value);
    if (value) {
      setFieldValue("signoPreferredMailingAddrs", "Resisdence Address");
    } else {
      setFieldValue("signoPreferredMailingAddrs", "Office Address");
    }
  };

  return (
    <Formik
      initialValues={{
        sameAsResidenceAddress: false,
        addressLine2: "",
        addressLine1: "",
        poBox: "",
        emirateCity: "",
        officeAddrsEmirateCity: "",
        officeAddrsPoBox: "",
        officeAddrsCountry: DEFAULT_SIGNATORY_COUNTRY,
        country: DEFAULT_SIGNATORY_COUNTRY,
        isResisdenceOrOfficeAddress: "",
        homeCountryAddressLine1: "",
        homeCountryAddressLine2: "",
        homeCountryAddressCity: "",
        homeCountryAddressCountry: DEFAULT_SIGNATORY_COUNTRY
      }}
      onSubmit={handleContinue}
      validationSchema={createSignatoryPreferredMailingAddressSchema}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values, setFieldValue }) => {
        const preferredMailingAddress = selectPreferredMailingAddrs({ values, setFieldValue });
        return (
          <Form>
            {/* SCR RO changes */}
            <Accordion title={"Residence Address"}>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item xs={12}>
                  <Field
                    name="addressLine1"
                    path={`${autoSavePathBase}.addressLine1`}
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
                    name="addressLine2"
                    path={`${autoSavePathBase}.addressLine2`}
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
                    datalistId="emirateCity"
                    label="Emirate/ City"
                    isSearchable
                    component={SelectAutocomplete}
                    tabIndex="0"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Field
                    name="poBox"
                    path={`${autoSavePathBase}.poBox`}
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
            </Accordion>
            <Accordion title={"Office Address"}>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item sm={6} xs={12}>
                  <div className={classes.sameAsCompanyAddressBox}>
                    <Field
                      name="sameAsResidenceAddress"
                      classes={{ formControlRoot: classes.sameAsCompanyAddressCheckbox }}
                      path={`prospect.signatoryInfo[${index}].sameAsResidenceAddress`}
                      component={Checkbox}
                      label="Same as Company Address"
                      onSelect={() => {
                        if (!values.sameAsResidenceAddress) {
                          const preferredCompanyAddress = organisationInfo.find(
                            ele => ele.addressDetails[0].preferredAddress === "Yes"
                          );
                          setFieldValue("sameAsResidenceAddress", !values.sameAsResidenceAddress);
                          setFieldValue(
                            "officeAddrsEmirateCity",
                            !values.sameAsResidenceAddress
                              ? preferredCompanyAddress.addressDetails[0].emirateCity
                              : ""
                          );
                          setFieldValue(
                            "officeAddrsPoBox",
                            !values.sameAsResidenceAddress
                              ? preferredCompanyAddress.addressDetails[0].poBox
                              : ""
                          );
                          setFieldValue("officeAddrsCountry", DEFAULT_SIGNATORY_COUNTRY);
                        } else {
                          console.log("else ");
                          setFieldValue("sameAsResidenceAddress", values.sameAsResidenceAddress);
                          setFieldValue("officeAddrsEmirateCity", "");
                          setFieldValue("officeAddrsPoBox", "");
                          setFieldValue("officeAddrsCountry", DEFAULT_SIGNATORY_COUNTRY);
                        }
                      }}
                      inputProps={{ maxLength: MAX_STREET_NUMBER_LENGTH, tabIndex: 0 }}
                    />
                    <ContexualHelp
                      title={
                        <span>
                          Select this checkbox if you want the Company address to be same as office
                          address.
                          <br />
                          <br />
                          If not, please enter the Office address in below fields.
                          <br />
                          <br />
                          Kindly note, the Business Debit Card of this stakeholder will be delivered
                          address.
                        </span>
                      }
                      placement="right"
                      isDisableHoverListener={false}
                    >
                      <span className={classes.questionIcon}>
                        <Icon
                          name={ICONS.question}
                          alt="question"
                          className={classes.questionIcon}
                        />
                      </span>
                    </ContexualHelp>
                  </div>
                  <Field
                    name="officeAddrsEmirateCity"
                    path={`${autoSavePathBase_OfficeAdd}.emirateCity`}
                    disabled={values.sameAsResidenceAddress}
                    datalistId="emirateCity"
                    label="Emirate/ City"
                    isSearchable
                    component={SelectAutocomplete}
                    tabIndex="0"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Field
                    name="officeAddrsPoBox"
                    path={`${autoSavePathBase_OfficeAdd}.poBox`}
                    disabled={values.sameAsResidenceAddress}
                    label="PO Box Number"
                    placeholder="AB1234"
                    component={Input}
                    InputProps={{
                      inputProps: { maxLength: MAX_PO_BOX_NUMBER_LENGTH, tabIndex: 0 }
                    }}
                  />
                  <Field
                    name="officeAddrsCountry"
                    path={`${autoSavePathBase_OfficeAdd}.country`}
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
            </Accordion>
            <Grid container>
              <Field
                name="isResisdenceOrOfficeAddress"
                component={InlineRadioGroup}
                path={`${autoSavePathBase}.signoPreferredMailingAddrs`}
                options={yesNoOptions}
                label="Please select perferred mailing address"
                onChange={preferredMailingAddress}
                contextualHelpProps={{ isDisableHoverListener: false, placement: "bottom-end" }}
                contextualHelpText="Please select your preferred mailing address"
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
            <Accordion title={"Home Country Address"}>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item sm={6} xs={12}>
                  <Field
                    name="homeCountryAddressLine1"
                    path={`${autoSavePathBase_HomeCountryAdd}.addressLine1`}
                    label="Flat / Villa / Building"
                    placeholder="Flat / Villa / Building"
                    component={Input}
                    InputProps={{
                      inputProps: { maxLength: MAX_OFFICE_NUMBER_LENGTH, tabIndex: 0 }
                    }}
                  />
                  <Field
                    name="homeCountryAddressCity"
                    path={`${autoSavePathBase_HomeCountryAdd}.emirateCity`}
                    datalistId="emirateCity"
                    label="Emirate/ City"
                    isSearchable
                    component={SelectAutocomplete}
                    tabIndex="3"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Field
                    name="homeCountryAddressLine2"
                    path={`${autoSavePathBase_HomeCountryAdd}.addressLine2`}
                    label="Street / Location"
                    placeholder="Street / Location"
                    component={Input}
                    InputProps={{
                      inputProps: { maxLength: MAX_STREET_NUMBER_LENGTH, tabIndex: 0 }
                    }}
                  />
                  <Field
                    name="homeCountryAddressCountry"
                    path={`${autoSavePathBase_HomeCountryAdd}.country`}
                    datalistId="country"
                    label="Country"
                    isSearchable
                    component={SelectAutocomplete}
                    tabIndex="3"
                  />
                </Grid>
              </Grid>
            </Accordion>
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        );
      })}
    </Formik>
  );
};

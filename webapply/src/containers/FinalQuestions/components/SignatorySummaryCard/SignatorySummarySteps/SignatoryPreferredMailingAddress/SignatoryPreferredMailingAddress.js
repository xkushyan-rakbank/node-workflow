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
import {
  DEFAULT_SIGNATORY_COUNTRY,
  DEFAULT_SIGNATORY_COUNTRY_NAME,
  MAX_CITY_NAME_LENGTH
} from "./constants";
import {
  MAX_STREET_NUMBER_LENGTH,
  MAX_PO_BOX_NUMBER_LENGTH,
  MAX_FLAT_NUMBER_LENGTH
} from "../../../CompanySummaryCard/CompanySummarySteps/CompanyPreferredMailingAddress/constants";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";
import { yesNoOptions } from "./options";
import { useStyles } from "./styled";
import { Accordion } from "../../../../../../components/Accordion/Accordion";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { UAE } from "../../../../../../constants";

const createSignatoryPreferredMailingAddressSchema = signatoriesNationality =>
  Yup.object().shape({
    addressLine2: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Street / Location")),
    addressLine1: Yup.string()
      .required(getRequiredMessage("Flat / Villa / Building"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_FLAT_NUMBER_LENGTH, "Maximum ${max} characters allowed")
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
    isResidenceOrOfficeAddress: Yup.boolean().required(
      "Please select your preferred mailing address"
    ),
    //ro-assist-brd1-5
    homeCountryAddressLine2:
      signatoriesNationality !== UAE &&
      Yup.string()
        .required(getRequiredMessage("Street / Location"))
        // eslint-disable-next-line no-template-curly-in-string
        .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Street / Location")),
    homeCountryAddressLine1:
      signatoriesNationality !== UAE &&
      Yup.string()
        .required(getRequiredMessage("Flat / Villa / Building"))
        // eslint-disable-next-line no-template-curly-in-string
        .max(MAX_FLAT_NUMBER_LENGTH, "Maximum ${max} characters allowed")
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Flat / Villa / Building")),
    homeCountryAddressCity:
      signatoriesNationality !== UAE &&
      Yup.string()
        .required(getRequiredMessage("City"))
        .max(MAX_CITY_NAME_LENGTH, "Maximum ${max} characters allowed")
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("City")),
    homeCountryAddressCountry:
      signatoriesNationality !== UAE && Yup.string().required(getRequiredMessage("Home Country"))
  });

export const SignatoryPreferredMailingAddressComponent = ({
  index,
  handleContinue,
  createFormChangeHandler,
  signatoriesNationality,
  organisationInfo
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const autoSavePathBase = `prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0]`;

  //ro-assist-brd1-5
  const OUTSIDE_BASE_PATH = `signatoryInfo[${index}]`;
  // eslint-disable-next-line max-len
  const autoSavePathBase_OfficeAdd = `prospect.signatoryInfo[${index}].addressInfo[1].addressDetails[0]`;
  // eslint-disable-next-line max-len
  const autoSavePathBase_HomeCountryAdd = `prospect.signatoryInfo[${index}].addressInfo[2].addressDetails[0]`;

  const selectPreferredMailingAddrs = ({ setFieldValue }) => event => {
    const value = JSON.parse(event.target.value);
    const prospect = {};
    prospect[`${autoSavePathBase}.preferredAddress`] = value ? "Yes" : "No";
    prospect[`${autoSavePathBase_OfficeAdd}.preferredAddress`] = value ? "No" : "Yes";
    dispatch(updateProspect(prospect));
    setFieldValue("isResidenceOrOfficeAddress", value);
  };

  return (
    <Formik
      initialValues={{
        sameAsCompanyAddress: false,
        addressLine2: "",
        addressLine1: "",
        poBox: "",
        emirateCity: "",
        officeAddrsEmirateCity: "",
        officeAddrsPoBox: "",
        officeAddrsCountry: DEFAULT_SIGNATORY_COUNTRY,
        country: DEFAULT_SIGNATORY_COUNTRY_NAME,
        isResidenceOrOfficeAddress: "",
        homeCountryAddressLine1: "",
        homeCountryAddressLine2: "",
        homeCountryAddressCity: "",
        homeCountryAddressCountry: ""
      }}
      onSubmit={handleContinue}
      validationSchema={() => createSignatoryPreferredMailingAddressSchema(signatoriesNationality)}
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
                      inputProps: { maxLength: MAX_FLAT_NUMBER_LENGTH, tabIndex: 0 }
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
                  {/* //ro-assist-brd1-5 */}
                  <Field
                    name="country"
                    label="Country"
                    placeholder="Country"
                    disabled
                    component={Input}
                    shrink
                    tabIndex="0"
                  />
                </Grid>
              </Grid>
            </Accordion>
            <Accordion title={"Office Address"}>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item sm={6} xs={12}>
                  <div className={classes.sameAsCompanyAddressBox}>
                    <Field
                      name="sameAsCompanyAddress"
                      classes={{ formControlRoot: classes.sameAsCompanyAddressCheckbox }}
                      path={`prospect.signatoryInfo[${index}].sameAsCompanyAddress`}
                      component={Checkbox}
                      label="Same as Company Address"
                      onSelect={() => {
                        if (!values.sameAsCompanyAddress) {
                          const preferredCompanyAddress = organisationInfo.find(
                            ele => ele.addressDetails[0].preferredAddress === "Yes"
                          );
                          setFieldValue("sameAsCompanyAddress", !values.sameAsCompanyAddress);
                          setFieldValue(
                            "officeAddrsEmirateCity",
                            !values.sameAsCompanyAddress
                              ? preferredCompanyAddress.addressDetails[0].emirateCity
                              : ""
                          );
                          setFieldValue(
                            "officeAddrsPoBox",
                            !values.sameAsCompanyAddress
                              ? preferredCompanyAddress.addressDetails[0].poBox
                              : ""
                          );
                          setFieldValue("officeAddrsCountry", DEFAULT_SIGNATORY_COUNTRY);
                        } else {
                          setFieldValue("sameAsCompanyAddress", values.sameAsCompanyAddress);
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
                          Kindly note, the Business Debit Card of this stakeholder will be delivered
                          to this address.
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
                    disabled={values.sameAsCompanyAddress}
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
                    disabled={values.sameAsCompanyAddress}
                    label="PO Box Number"
                    placeholder="AB1234"
                    component={Input}
                    InputProps={{
                      inputProps: { maxLength: MAX_PO_BOX_NUMBER_LENGTH, tabIndex: 0 }
                    }}
                  />
                  {/* //ro-assist-brd1-5 */}
                  <Field
                    name="officeAddrsCountry"
                    path={`${autoSavePathBase_OfficeAdd}.country`}
                    label="Country"
                    placeholder="Country"
                    disabled
                    datalistId="countryOfIncorporation"
                    component={SelectAutocomplete}
                    shrink
                    tabIndex="0"
                  />
                </Grid>
              </Grid>
            </Accordion>
            <Grid container>
              {/* //ro-assist-brd1-5 */}
              <Field
                name="isResidenceOrOfficeAddress"
                component={InlineRadioGroup}
                path={`${OUTSIDE_BASE_PATH}.signoPreferredMailingAddrs`}
                options={yesNoOptions}
                label="Please select preferred mailing address"
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
                      inputProps: { maxLength: MAX_FLAT_NUMBER_LENGTH, tabIndex: 0 }
                    }}
                  />
                  {/* ro-assist-brd1-5 */}
                  <Field
                    name="homeCountryAddressCity"
                    label="Enter your Home Country City"
                    path={`${autoSavePathBase_HomeCountryAdd}.emirateCity`}
                    component={Input}
                    InputProps={{
                      inputProps: { maxLength: MAX_CITY_NAME_LENGTH, tabIndex: 0 }
                    }}
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
                    datalistId="countryOfIncorporation"
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

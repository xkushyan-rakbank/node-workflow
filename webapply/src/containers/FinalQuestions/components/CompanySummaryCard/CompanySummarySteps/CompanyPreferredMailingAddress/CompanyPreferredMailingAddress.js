import React, { useCallback, useRef } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";

import { InfoTitle } from "../../../../../../components/InfoTitle";
import {
  Input,
  Checkbox,
  AutoSaveField as Field,
  InlineRadioGroup,
  SelectAutocomplete
} from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { SPECIAL_CHARACTERS_REGEX, POBOX_REGEX } from "../../../../../../utils/validation";
import {
  OTHER_OPTION_CODE,
  BASE_PATH_1,
  BASE_PATH_2,
  MAX_STREET_NUMBER_LENGTH,
  MAX_PO_BOX_NUMBER_LENGTH,
  MAX_OTHER_FIELD_LENGTH,
  MAX_OFFICE_NUMBER_LENGTH
} from "./constants";
import {
  getInvalidMessage,
  getRequiredMessage
} from "../../../../../../utils/getValidationMessage";
import { yesNoOptions } from "./options";
import { useStyles } from "./styled";
import { Accordion } from "../../../../../../components/Accordion/Accordion";
import { updateProspect } from "../../../../../../store/actions/appConfig";

const companyPreferredMailingAddressSchema = () =>
  Yup.object().shape({
    addressLine1: Yup.string()
      .required(getRequiredMessage("Office / Shop Number"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_OFFICE_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Office / Shop Number")),
    addressLine2: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Street / Location")),
    poBox: Yup.string()
      .required(getRequiredMessage("PO Box Number"))
      .matches(POBOX_REGEX, getInvalidMessage("PO Box Number")),
    emirateCity: Yup.string().required(getRequiredMessage("Emirate")),
    typeOfSpaceOccupied: Yup.object().shape({
      spaceType: Yup.string().required(getRequiredMessage("Type of Space Occupied")),
      others: Yup.string().matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Other"))
    }),
    officeAddrsLine1: Yup.string()
      .required(getRequiredMessage("Office / Shop Number"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_OFFICE_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Office / Shop Number")),

    officeAddrsPoBox: Yup.string()
      .required(getRequiredMessage("PO Box Number"))
      .matches(POBOX_REGEX, getInvalidMessage("PO Box Number")),
    officeAddrsEmirateCity: Yup.string().required(getRequiredMessage("Emirate")),
    isRegisteredAddrsOrOfficeAddrs: Yup.boolean().required(
      "Please select your preferred mailing address"
    )
  });

export const CompanyPreferredMailingAddressComponent = ({
  handleContinue,
  createFormChangeHandler
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectPreferredMailingAddrs = ({ values, setFieldValue }) => event => {
    const value = JSON.parse(event.target.value);
    console.log("value=>", value);
    const prospect = {};
    prospect[`${BASE_PATH_1}.preferredAddress`] = value ? "Yes" : "No";
    prospect[`${BASE_PATH_2}.preferredAddress`] = value ? "No" : "Yes";
    dispatch(updateProspect(prospect));
    setFieldValue("isRegisteredAddrsOrOfficeAddrs", value);
    setFieldValue(
      "preferredMailingAddrs",
      value ? "Registered Address/Head office" : "Office Address"
    );
  };

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  const addressLine1Ref = useRef();
  const poBoxRef = useRef();
  const emirateCityRef = useRef();
  const countryRef = useRef();

  return (
    <div>
      <Formik
        initialValues={{
          addressLine1: "",
          addressLine2: "",
          poBox: "",
          emirateCity: "",
          typeOfSpaceOccupied: {
            spaceType: "",
            others: ""
          },
          country: "United Arab Emirates",
          officeAddrsLine1: "",
          officeAddrsPoBox: "",
          officeAddrsEmirateCity: "",
          officeAddrsCountry: "United Arab Emirates",
          preferredMailingAddrs: "",
          isDontSameAsRegisteredAddress: false,
          isRegisteredAddrsOrOfficeAddrs: ""
        }}
        onSubmit={handleSubmit}
        validationSchema={companyPreferredMailingAddressSchema}
        validateOnChange={false}
      >
        {createFormChangeHandler(({ values, setFieldValue }) => {
          const preferredMailingAddress = selectPreferredMailingAddrs({ values, setFieldValue });
          return (
            <Form>
              <Accordion title={"Registered Address/ Head office"}>
                <Grid container spacing={3} className={classes.flexContainer}>
                  <Grid item sm={6} xs={12}>
                    <Field
                      innerRef={addressLine1Ref}
                      name="addressLine1"
                      path={`${BASE_PATH_1}.addressLine1`}
                      label="Office / Shop Number"
                      placeholder="Office / Shop Number"
                      contextualHelpText="Give the Registered Address of the company as given in Trade license or the operating or head office address of the company. This will be used as primary contact and Cheque book will be delivered to this address."
                      InputProps={{
                        inputProps: { maxLength: MAX_OFFICE_NUMBER_LENGTH, tabIndex: 1 }
                      }}
                      component={Input}
                    />
                    <Field
                      name="addressLine2"
                      path={`${BASE_PATH_1}.addressLine2`}
                      label="Street / Location"
                      placeholder="Street / Location"
                      component={Input}
                      InputProps={{
                        inputProps: { maxLength: MAX_STREET_NUMBER_LENGTH, tabIndex: 2 }
                      }}
                    />
                    <Field
                      innerRef={emirateCityRef}
                      name="emirateCity"
                      path={`${BASE_PATH_1}.emirateCity`}
                      datalistId="emirateCity"
                      label="Emirate / City"
                      isSearchable
                      component={SelectAutocomplete}
                      tabIndex="3"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name="typeOfSpaceOccupied.spaceType"
                      path={`${BASE_PATH_1}.typeOfSpaceOccupied.spaceType`}
                      datalistId="spaceType"
                      label="Type of Space Occupied"
                      isSearchable
                      component={SelectAutocomplete}
                      tabIndex="1"
                    />
                    {values.typeOfSpaceOccupied.spaceType === OTHER_OPTION_CODE && (
                      <Field
                        name="typeOfSpaceOccupied.others"
                        path={`${BASE_PATH_1}.typeOfSpaceOccupied.others`}
                        label="Other(Specify)"
                        placeholder="Other(Specify)"
                        component={Input}
                        InputProps={{
                          inputProps: { maxLength: MAX_OTHER_FIELD_LENGTH, tabIndex: 2 }
                        }}
                      />
                    )}
                    <Field
                      innerRef={poBoxRef}
                      name="poBox"
                      path={`${BASE_PATH_1}.poBox`}
                      label="PO Box Number"
                      placeholder="AB1234"
                      component={Input}
                      InputProps={{
                        inputProps: {
                          maxLength: MAX_PO_BOX_NUMBER_LENGTH,
                          tabIndex:
                            values.typeOfSpaceOccupied.spaceType === OTHER_OPTION_CODE ? 3 : 2
                        }
                      }}
                    />
                    <Field name="country" innerRef={countryRef} disabled component={Input} />
                  </Grid>
                </Grid>
              </Accordion>
              <Field
                name="isDontSameAsRegisteredAddress"
                path={`${BASE_PATH_1}.isDontSameAsRegisteredAddress`}
                label="Same as Registered Address / Head office"
                component={Checkbox}
                onSelect={() => {
                  if (!values.isDontSameAsRegisteredAddress) {
                    setFieldValue(
                      "isDontSameAsRegisteredAddress",
                      !values.isDontSameAsRegisteredAddress
                    );
                    setFieldValue(
                      "officeAddrsLine1",
                      !values.isDontSameAsRegisteredAddress
                        ? addressLine1Ref.current.children[1].children[0].value
                        : ""
                    );
                    setFieldValue(
                      "officeAddrsCountry",
                      !values.isDontSameAsRegisteredAddress
                        ? countryRef.current.children[0].children[0].value === "AE"
                          ? "United Arab Emirates"
                          : countryRef.current.children[0].children[0].value
                        : ""
                    );
                    setFieldValue(
                      "officeAddrsPoBox",
                      !values.isDontSameAsRegisteredAddress
                        ? poBoxRef.current.children[1].children[0].value
                        : ""
                    );
                    setFieldValue(
                      "officeAddrsEmirateCity",
                      !values.isDontSameAsRegisteredAddress
                        ? emirateCityRef.current.state.value.value
                        : ""
                    );
                  } else {
                    setFieldValue(
                      "isDontSameAsRegisteredAddress",
                      values.isDontSameAsRegisteredAddress
                    );
                    setFieldValue("officeAddrsLine1", "");
                    setFieldValue("officeAddrsCountry", "United Arab Emirates");
                    setFieldValue("officeAddrsPoBox", "");
                    setFieldValue("officeAddrsEmirateCity", "");
                  }
                }}
                inputProps={{ tabIndex: 0 }}
              />

              <FieldArray name="officeAddress">
                {arrayHelpers => (
                  <Accordion title={"Office Address"}>
                    <Grid container spacing={3} className={classes.flexContainer}>
                      <Grid item sm={6} xs={12}>
                        <Field
                          name="officeAddrsLine1"
                          path={`${BASE_PATH_2}.addressLine1`}
                          label="Office / Shop Number"
                          placeholder="Office / Shop Number"
                          disabled={values.isDontSameAsRegisteredAddress}
                          contextualHelpText="Give the Registered Address of the company as given in Trade license or the operating or head office address of the company. This will be used as primary contact and Cheque book will be delivered to this address."
                          InputProps={{
                            inputProps: { maxLength: MAX_OFFICE_NUMBER_LENGTH, tabIndex: 1 }
                          }}
                          component={Input}
                        />
                        <Field
                          name="officeAddrsPoBox"
                          path={`${BASE_PATH_2}.poBox`}
                          label="PO Box Number"
                          disabled={values.isDontSameAsRegisteredAddress}
                          placeholder="AB1234"
                          component={Input}
                          InputProps={{
                            inputProps: {
                              maxLength: MAX_PO_BOX_NUMBER_LENGTH,
                              tabIndex: 0
                            }
                          }}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Field
                          name="officeAddrsEmirateCity"
                          path={`${BASE_PATH_2}.emirateCity`}
                          datalistId="emirateCity"
                          disabled={values.isDontSameAsRegisteredAddress}
                          label="Emirate / City"
                          isSearchable
                          component={SelectAutocomplete}
                          tabIndex="3"
                        />
                        <Field
                          name="officeAddrsCountry"
                          path={`${BASE_PATH_2}.country`}
                          disabled
                          component={Input}
                        />
                      </Grid>
                    </Grid>
                  </Accordion>
                )}
              </FieldArray>
              <Grid container>
                <Field
                  name="isRegisteredAddrsOrOfficeAddrs"
                  component={InlineRadioGroup}
                  path={`${BASE_PATH_1}.preferredMailingAddrs`}
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
              {/* <div className={classes.infoTitleWrap}>
              <InfoTitle 
              classes={{ wrapper: classes.infoTitle }} 
              title="You guessed it! We will use the 
              information in this section to communicate with you"/>
            </div> */}
              {/* <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div> */}

              <Grid
                className={classes.continueButtonContainer}
                container
                direction="row"
                justify="space-between"
              >
                <InfoTitle title="You guessed it! We will use the information in this section to communicate with you" />
                <span className={classes.continueBtn}>
                  <ContinueButton type="submit" />
                </span>
              </Grid>
            </Form>
          );
        })}
      </Formik>
    </div>
  );
};

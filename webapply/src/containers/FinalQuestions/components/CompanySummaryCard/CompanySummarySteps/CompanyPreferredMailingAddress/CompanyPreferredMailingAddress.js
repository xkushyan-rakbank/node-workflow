import React, { useCallback } from "react";
import { Formik, Form ,FieldArray } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

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
  BASE_PATH,
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
  createFormChangeHandler,
  organisationCountry,
  organisationAddressLine1,
  organisationPoBox,
  organisationEmirateCity 
}) => {
  const classes = useStyles();

  const selectPreferredMailingAddrs = ({ values, setFieldValue }) => event => {
    const value = JSON.parse(event.target.value);
    console.log('value=>',value)
    setFieldValue("isRegisteredAddrsOrOfficeAddrs", value);
    setFieldValue("preferredMailingAddrs", value ? "Registered Address/Head office" : "Office Address");
  };

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

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
          officeAddrsCountry : "United Arab Emirates",
          preferredMailingAddrs:"",
          isDontSameAsRegisteredAddress : false,
          isRegisteredAddrsOrOfficeAddrs: ""

        }}
        onSubmit={handleSubmit}
        validationSchema={companyPreferredMailingAddressSchema}
        validateOnChange={false}
      >
        {createFormChangeHandler(({ values , setFieldValue }) => {
            const preferredMailingAddress = selectPreferredMailingAddrs({ values, setFieldValue });
          return (
          <Form>
            <h4 className={classes.groupLabel}>Registered Address/ Head office</h4>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item sm={6} xs={12}>
                <Field
                  name="addressLine1"
                  path={`${BASE_PATH}.addressLine1`}
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
                  path={`${BASE_PATH}.addressLine2`}
                  label="Street / Location"
                  placeholder="Street / Location"
                  component={Input}
                  InputProps={{
                    inputProps: { maxLength: MAX_STREET_NUMBER_LENGTH, tabIndex: 2 }
                  }}
                />
                <Field
                  name="emirateCity"
                  path={`${BASE_PATH}.emirateCity`}
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
                  path={`${BASE_PATH}.typeOfSpaceOccupied.spaceType`}
                  datalistId="spaceType"
                  label="Type of Space Occupied"
                  isSearchable
                  component={SelectAutocomplete}
                  tabIndex="1"
                />
                {values.typeOfSpaceOccupied.spaceType === OTHER_OPTION_CODE && (
                  <Field
                    name="typeOfSpaceOccupied.others"
                    path={`${BASE_PATH}.typeOfSpaceOccupied.others`}
                    label="Other(Specify)"
                    placeholder="Other(Specify)"
                    component={Input}
                    InputProps={{
                      inputProps: { maxLength: MAX_OTHER_FIELD_LENGTH, tabIndex: 2 }
                    }}
                  />
                )}
                <Field
                  name="poBox"
                  path={`${BASE_PATH}.poBox`}
                  label="PO Box Number"
                  placeholder="AB1234"
                  component={Input}
                  InputProps={{
                    inputProps: {
                      maxLength: MAX_PO_BOX_NUMBER_LENGTH,
                      tabIndex: values.typeOfSpaceOccupied.spaceType === OTHER_OPTION_CODE ? 3 : 2
                    }
                  }}
                />
                <Field name="country" disabled component={Input} />
              </Grid>
            </Grid>
            <div className={classes.divider} />
            <FieldArray name="officeAddress">
              {arrayHelpers => (
                <>
                  <h4 className={classes.groupLabel}>Office Address</h4>
                  <Field
                    name="isDontSameAsRegisteredAddress"
                    path={`${BASE_PATH}.isDontSameAsRegisteredAddress`}
                    label="Same as Registered Address / Head office"
                    component={Checkbox}
                    onSelect={() => {
                      if(!values.isDontSameAsRegisteredAddress){
                        setFieldValue("isDontSameAsRegisteredAddress", !values.isDontSameAsRegisteredAddress);
                        setFieldValue("officeAddrsLine1", !values.isDontSameAsRegisteredAddress ?  organisationAddressLine1 : "");
                        setFieldValue("officeAddrsCountry", !values.isDontSameAsRegisteredAddress ?  organisationCountry === "AE" ? "United Arab Emirates" : organisationCountry : "");
                        setFieldValue("officeAddrsPoBox", !values.isDontSameAsRegisteredAddress ?  organisationPoBox : "");
                        setFieldValue("officeAddrsEmirateCity", !values.isDontSameAsRegisteredAddress ?  organisationEmirateCity : "");
                      } else {
                        setFieldValue("isDontSameAsRegisteredAddress", values.isDontSameAsRegisteredAddress);
                        setFieldValue("officeAddrsLine1",   "");
                        setFieldValue("officeAddrsCountry",   "United Arab Emirates");
                        setFieldValue("officeAddrsPoBox",  "");
                        setFieldValue("officeAddrsEmirateCity",  "");
                      }
                    }}
                    inputProps={{ tabIndex: 0 }}
                  />
                   <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item sm={6} xs={12}>
                <Field
                  name="officeAddrsLine1"
                  path={`${BASE_PATH}.officeAddrsLine1`}
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
                  path={`${BASE_PATH}.officeAddrsPoBox`}
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
                  path={`${BASE_PATH}.officeAddrsEmirateCity`}
                  datalistId="emirateCity"
                  disabled={values.isDontSameAsRegisteredAddress}
                  label="Emirate / City"
                  isSearchable
                  component={SelectAutocomplete}
                  tabIndex="3"
                />
                <Field 
                name="officeAddrsCountry"
                path={`${BASE_PATH}.officeAddrsCountry`} 
                disabled 
                component={Input} />
              </Grid>
            </Grid>
                </>
              )}
            </FieldArray>
            <Grid container>
              <Field
                name="isRegisteredAddrsOrOfficeAddrs"
                component={InlineRadioGroup}
                path={`${BASE_PATH}.preferredMailingAddrs`}
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
                title="You guessed it! We will use the information in this section to communicate with you"
              />
            </div>
            <div className={classes.buttonWrapper}>
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

import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { InfoTitle } from "../../../../../../components/InfoTitle";
import {
  Input,
  AutoSaveField as Field,
  SelectAutocomplete
} from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import {
  ADDRESS_NUMBER_REGEX,
  ADDRESS_REGEX,
  ALPHANUMERIC_REGEX,
  SPACE_OCCUPIED_OTHER_REGEX
} from "../../../../../../utils/validation";
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

import { useStyles } from "./styled";

const companyPreferredMailingAddressSchema = Yup.object().shape({
  addressLine1: Yup.string()
    .required(getRequiredMessage("Office / Shop Number"))
    .matches(ADDRESS_NUMBER_REGEX, getInvalidMessage("Office / Shop Number")),
  addressLine2: Yup.string().matches(ADDRESS_REGEX, getInvalidMessage("Street / Location")),
  poBox: Yup.string()
    .required(getRequiredMessage("PO Box Number"))
    .matches(ALPHANUMERIC_REGEX, getInvalidMessage("PO Box Number")),
  emirateCity: Yup.string().required(getRequiredMessage("Emirate")),
  typeOfSpaceOccupied: Yup.object().shape({
    spaceType: Yup.string().required(getRequiredMessage("Type of Space Occupied")),
    others: Yup.string().matches(SPACE_OCCUPIED_OTHER_REGEX, getInvalidMessage("Other"))
  })
});

export const CompanyPreferredMailingAddress = ({ handleContinue }) => {
  const classes = useStyles();

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
          country: "United Arab Emirates"
        }}
        onSubmit={handleSubmit}
        validationSchema={companyPreferredMailingAddressSchema}
        validateOnChange={false}
      >
        {({ values }) => (
          <Form>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item md={6} xs={12}>
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
              <Grid item md={6} xs={12}>
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
            <div className={classes.infoTitleWrap}>
              <InfoTitle
                classes={{ wrapper: classes.infoTitle }}
                title="You guessed it! We will use the information in this section to communicate with you"
              />
            </div>
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

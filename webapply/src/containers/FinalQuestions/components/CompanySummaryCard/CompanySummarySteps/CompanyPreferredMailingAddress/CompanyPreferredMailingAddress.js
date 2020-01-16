import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { InfoTitle } from "../../../../../../components/InfoTitle";
import { CustomSelect, Input, AutoSaveField as Field } from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import {
  ADDRESS_NUMBER_REGEX,
  ALPHANUMERIC_REGEX,
  SPACE_OCCUPIED_OTHER_REGEX
} from "../../../../../../utils/validation";
import {
  OTHER_OPTION_CODE,
  BASE_PATH,
  MAX_OFFICE_NUMBER_LENGTH,
  MAX_PO_BOX_NUMBER_LENGTH
} from "./constants";
import { withCompanyFinalQuestions } from "../../../withCompanyFinalQuestions";

import { useStyles } from "./styled";

const companyPreferredMailingAddressSchema = Yup.object().shape({
  addressLine1: Yup.string()
    .required("You need to provide address details")
    .matches(ADDRESS_NUMBER_REGEX, "Invalid address value"),
  addressLine2: Yup.string().matches(ADDRESS_NUMBER_REGEX, "Invalid address value"),
  poBox: Yup.string()
    .required("You need to provide po box number")
    .matches(ALPHANUMERIC_REGEX, "Invalid PO box number"),
  emirateCity: Yup.string().required("You need to provide emirate city"),
  typeOfSpaceOccupied: Yup.object().shape({
    spaceType: Yup.string().required("You need to provide space type"),
    others: Yup.string().matches(SPACE_OCCUPIED_OTHER_REGEX, "Invalid field value")
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
        {withCompanyFinalQuestions(({ values }) => (
          <Form>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item md={6} sm={12}>
                <Field
                  name="addressLine1"
                  path={`${BASE_PATH}.addressLine1`}
                  label="Office / Shop Number"
                  placeholder="Office / Shop Number"
                  contextualHelpText="Give the Registered Address of the company as given in Trade license or the operating or head office address of the company. This will be used as primary contact and Cheque book will be delivered to this address."
                  InputProps={{
                    inputProps: { maxLength: MAX_OFFICE_NUMBER_LENGTH, tabIndex: 0 }
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
                    inputProps: { tabIndex: 0 }
                  }}
                />
                <Field
                  name="emirateCity"
                  path={`${BASE_PATH}.emirateCity`}
                  datalistId="emirateCity"
                  label="Emirate"
                  component={CustomSelect}
                  inputProps={{ tabIndex: 0 }}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="typeOfSpaceOccupied.spaceType"
                  path={`${BASE_PATH}.typeOfSpaceOccupied.spaceType`}
                  datalistId="spaceType"
                  label="Type of Space Occupied"
                  component={CustomSelect}
                  inputProps={{ tabIndex: 0 }}
                />
                {values.typeOfSpaceOccupied.spaceType === OTHER_OPTION_CODE && (
                  <Field
                    name="typeOfSpaceOccupied.others"
                    path={`${BASE_PATH}.typeOfSpaceOccupied.others`}
                    label="Other(Specify)"
                    placeholder="Other(Specify)"
                    component={Input}
                    InputProps={{
                      inputProps: { tabIndex: 0 }
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
                    inputProps: { maxLength: MAX_PO_BOX_NUMBER_LENGTH, tabIndex: 0 }
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
        ))}
      </Formik>
    </div>
  );
};

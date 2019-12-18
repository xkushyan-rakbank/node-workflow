import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { InfoTitle } from "../../../../../../components/InfoTitle";
import { CustomSelect, Input, AutoSaveField as Field } from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { ADDRESS_NUMBER_REGEX, PO_NUMBER_REGEX } from "../../../../../../utils/validation";
import { OTHER_OPTION_CODE, BASE_PATH } from "./constants";

import { useStyles } from "./styled";

const companyPreferredMailingAddressSchema = Yup.object().shape({
  addressFieldDesc: Yup.string().required("You need to provide address details"),
  addressLine1: Yup.string().matches(ADDRESS_NUMBER_REGEX, "Invalid address value"),
  poBox: Yup.string()
    .required("You need to provide po box number")
    .matches(PO_NUMBER_REGEX, "Invalid PO box number"),
  emirateCity: Yup.string().required("You need to provide emirate city"),
  typeOfSpaceOccupied: Yup.object().shape({
    spaceType: Yup.string().required("You need to provide space type"),
    others: Yup.string().when("spaceType", {
      is: value => value === OTHER_OPTION_CODE,
      then: Yup.string().required("You need to specify space type")
    })
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
          addressFieldDesc: "",
          addressLine1: "",
          poBox: "",
          emirateCity: "",
          typeOfSpaceOccupied: {
            spaceType: "",
            others: ""
          },
          country: ""
        }}
        onSubmit={handleSubmit}
        validationSchema={companyPreferredMailingAddressSchema}
      >
        {({ values }) => (
          <Form>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item md={6} sm={12}>
                <Field
                  name="addressFieldDesc"
                  path={`${BASE_PATH}.addressFieldDesc`}
                  label="Office / Shop Number"
                  placeholder="Office / Shop Number"
                  component={Input}
                />
                <Field
                  name="addressLine1"
                  path={`${BASE_PATH}.addressLine1`}
                  label="Street / Location"
                  placeholder="Street / Location"
                  component={Input}
                />
                <Field
                  name="emirateCity"
                  path={`${BASE_PATH}.emirateCity`}
                  datalistId="emirate"
                  label="Emirate"
                  component={CustomSelect}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="typeOfSpaceOccupied.spaceType"
                  path={`${BASE_PATH}.typeOfSpaceOccupied.spaceType`}
                  datalistId="spaceType"
                  label="Type of Space Occupied"
                  component={CustomSelect}
                />
                {values.typeOfSpaceOccupied.spaceType === OTHER_OPTION_CODE && (
                  <Field
                    name="typeOfSpaceOccupied.others"
                    path={`${BASE_PATH}.typeOfSpaceOccupied.others`}
                    label="Other(Specify)"
                    placeholder="Other(Specify)"
                    component={Input}
                  />
                )}
                <Field
                  name="poBox"
                  path={`${BASE_PATH}.poBox`}
                  label="PO Box Number"
                  placeholder="PO Box Number"
                  component={Input}
                />
                <Field name="country" path={`${BASE_PATH}.country`} disabled component={Input} />
              </Grid>
            </Grid>
            <div className={classes.infoTitleWrap}>
              <InfoTitle
                classes={{ wrapper: classes.infoTitle }}
                title="You guessed it, we will use this section for our communication with you"
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

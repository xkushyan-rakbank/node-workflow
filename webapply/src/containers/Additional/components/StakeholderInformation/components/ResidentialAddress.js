import React from "react";
import { Formik } from "formik";
import { Grid } from "@material-ui/core";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { Input, AutoSaveField as Field, SelectAutocomplete } from "../../../../../components/Form";

export const ResidentialAddress = () => {
  const basePath = "prospect.stakeholderAdditionalInfo.residentialAddress.addressDetails[0]";

  const initialValues = {
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    addressLine4: "",
    country: "AE",
    emirateCity: "",
    poBox: ""
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {isValid => {
        return (
          <Accordion title={"Residential address"} id={"residentialAddress"} isCompleted={isValid}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <Field
                  name="addressLine3"
                  path={`${basePath}.addressLine3`}
                  label="Flat, villa or building"
                  placeholder="Flat, villa or building"
                  InputProps={{
                    inputProps: { tabIndex: 1 }
                  }}
                  component={Input}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Field
                  name="poBox"
                  path={`${basePath}.poBox`}
                  label="P.O. Box"
                  placeholder="P.O. Box"
                  InputProps={{
                    inputProps: { tabIndex: 1 }
                  }}
                  component={Input}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Field
                  name="addressLine2"
                  path={`${basePath}.addressLine2`}
                  label="Street or location"
                  placeholder="Street or location"
                  InputProps={{
                    inputProps: { tabIndex: 1 }
                  }}
                  component={Input}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Field
                  name="emirateCity"
                  path={`${basePath}.emirateCity`}
                  label="Emirate or city"
                  placeholder="Emirate or city"
                  datalistId="emirateCity"
                  component={SelectAutocomplete}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Field
                  name="country"
                  path={`${basePath}.country`}
                  label="Country"
                  placeholder="Country"
                  datalistId="country"
                  component={SelectAutocomplete}
                  disabled={true}
                />
              </Grid>
            </Grid>
          </Accordion>
        );
      }}
    </Formik>
  );
};

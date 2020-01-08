import React from "react";
import { Grid } from "@material-ui/core";

import { Input, AutoSaveField as Field } from "../../../../../components/Form";
import { InfoTitle } from "../../../../../components/InfoTitle";

import { useStyles } from "./styled";

export const SignatoriesList = ({ stakeholders }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.signatoryLabel}>Signatory names on debit cards</div>
      <InfoTitle
        title="Names on debit cards have a limit of 19 characters"
        classes={{ wrapper: classes.infoTitle }}
      />

      <div className={classes.signatoryNamesContainer}>
        {stakeholders.map(({ firstName, lastName, kycDetails = {} }, index) => {
          const prefix = `prospect.signatoryInfo.${index}`;

          return (
            kycDetails.isSignatory && (
              <div className={classes.signatoryName} key={index}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item md={6} sm={12}>
                    <span>{`${firstName} ${lastName}`}</span>
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <Field
                      name={`signatory.${index}.nameOnDebitCard`}
                      path={`${prefix}.debitCardInfo.authSignatoryDetails.nameOnDebitCard`}
                      label="Name on debit card"
                      placeholder="Name on debit card"
                      classes={{ formControlRoot: classes.rootInput }}
                      component={Input}
                    />
                  </Grid>
                </Grid>
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

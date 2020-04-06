import React from "react";
import { Grid } from "@material-ui/core";

import { Input, AutoSaveField as Field } from "../../../../../components/Form";
import { InfoTitle } from "../../../../../components/InfoTitle";

import { MAX_NAME_IN_BUSINESS_LENGTH } from "../../../../../utils/validation";

import { useStyles } from "./styled";

export const SignatoriesList = ({ stakeholders }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.signatoryLabel}>Signatory names on business debit cards</div>
      <InfoTitle
        title="Names on business debit cards have a limit of 19 characters"
        classes={{ wrapper: classes.infoTitle }}
      />

      <div className={classes.signatoryNamesContainer}>
        {stakeholders.map(({ firstName, lastName, kycDetails = {}, debitCardInfo }, index) => {
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
                      isLoadDefaultValueFromStore={
                        !!debitCardInfo.authSignatoryDetails.nameOnDebitCard
                      }
                      label="Name on business debit card"
                      placeholder="Name on business debit card"
                      classes={{ formControlRoot: classes.rootInput }}
                      component={Input}
                      InputProps={{
                        inputProps: {
                          maxLength: MAX_NAME_IN_BUSINESS_LENGTH
                        }
                      }}
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

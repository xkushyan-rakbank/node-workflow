import React from "react";

import InfoTitle from "../../../../../components/InfoTitle";
import TextInput from "../../../../../components/InputField/TextInput";

import { useStyles } from "./styled";

export const SignatoriesList = ({ stakeholders }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.signatoryLabel}>Signatory name</div>
      <InfoTitle
        title="Names on debit cards have a limit of 19 characters"
        classes={{ wrapper: classes.infoTitle }}
      />

      <div className={classes.signatoryNamesContainer}>
        {stakeholders.map(
          ({ firstName, lastName, kycDetails = {} }, index) =>
            kycDetails.isSignatory && (
              <div className={classes.signatoryName} key={index}>
                <span>
                  {firstName} {lastName}
                </span>
                <TextInput
                  id="SigDbtcAuths.nameOnDebitCard"
                  indexes={[index]}
                  classes={{ regularWrapper: classes.selectCombined }}
                />
              </div>
            )
        )}
      </div>
    </>
  );
};

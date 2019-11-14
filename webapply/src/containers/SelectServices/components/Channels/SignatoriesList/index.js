import React from "react";
import { withStyles } from "@material-ui/core";
import get from "lodash/get";

import InfoTitle from "../../../../../components/InfoTitle";
import TextInput from "../../../../../components/InputField/TextInput";

import { styled } from "./styled";

const SignatoriesList = ({ classes, stakeholders }) => {
  return (
    <>
      <div className={classes.signatoryLabel}>Signatory name</div>
      <InfoTitle
        title="Names on debit cards have a limit of 19 characters"
        classes={{ wrapper: classes.infoTitle }}
      />

      <div className={classes.signatoryNamesContainer}>
        {stakeholders.map((stakeholder, index) => {
          const { firstName, lastName } = stakeholder;
          const isSignatory = get(stakeholder, "kycDetails.isSignatory");

          return isSignatory ? (
            <div className={classes.signatoryName} key={index}>
              <span>{`${firstName} ${lastName}`}</span>
              <TextInput
                id="SigDbtcAuths.nameOnDebitCard"
                indexes={[index]}
                classes={{ regularWrapper: classes.selectCombined }}
              />
            </div>
          ) : null;
        })}
      </div>
    </>
  );
};

export default withStyles(styled)(SignatoriesList);

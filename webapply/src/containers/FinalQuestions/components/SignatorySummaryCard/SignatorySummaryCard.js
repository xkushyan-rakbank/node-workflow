import React, { useState } from "react";
import get from "lodash/get";

import { FormCard } from "../../../../components/FormCard/FormCard";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { useStyles } from "./styled";
import { signatoriesSteps } from "./constants";

export const SignatorySummaryCardComponent = ({
  addAvailableSignatoryIndex,
  sendProspectToAPI,
  index,
  signatory,
  availableSignatoriesIndexes,
  signatory: { firstName, lastName, fullName } = {}
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();

  const percentage = parseInt(get(signatory, "kycDetails.shareHoldingPercentage", 0), 10);

  return (
    <FormCard
      className={classes.card}
      firstName={signatory.firstName}
      lastName={signatory.lastName || signatory.fullName}
      content={
        <div className={classes.contentBox}>
          <div className={classes.infoBox}>
            <div className={classes.name}>
              {firstName && lastName ? `${firstName} ${lastName}` : fullName}
            </div>
            <div className={classes.signatoryField}>
              {get(signatory, "accountSigningInfo.authorityType")}
            </div>
            <div className={classes.shareholdingField}>
              {percentage > 0 ? `Shareholding ${percentage}%` : "No shareholding"}
            </div>
          </div>
          <div className={classes.controlsBox}>
            {!isExpanded && availableSignatoriesIndexes.has(index) && (
              <LinkButton
                clickHandler={() => {
                  setIsExpanded(true);
                }}
              />
            )}
          </div>
        </div>
      }
      index={index}
    >
      {isExpanded && (
        <FinalQuestionStepComponent
          index={index}
          stepsArray={signatoriesSteps}
          addAvailableSignatoryIndex={addAvailableSignatoryIndex}
          sendProspectToAPI={sendProspectToAPI}
        />
      )}
    </FormCard>
  );
};

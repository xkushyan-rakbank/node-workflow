import React from "react";
import get from "lodash/get";
import cx from "classnames";

import { FormCard } from "../../../../components/FormCard/FormCard";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { useStyles } from "./styled";
import { signatoriesSteps } from "./constants";

export const SignatorySummaryCardComponent = ({
  sendProspectToAPI,
  index,
  signatory,
  availableSignatoriesIndexes,
  signatory: { firstName, lastName, fullName } = {},
  expandedSignatoryIndex,
  setExpandedSignatoryIndex,
  handleFinalStepContinue
}) => {
  const classes = useStyles();

  const handleExpandNextBlock = () => setExpandedSignatoryIndex(index + 1);

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
            {expandedSignatoryIndex !== index && availableSignatoriesIndexes.includes(index) && (
              <LinkButton
                clickHandler={() => {
                  setExpandedSignatoryIndex(index);
                }}
              />
            )}
          </div>
        </div>
      }
      index={index}
    >
      <div className={cx({ [classes.hidden]: expandedSignatoryIndex !== index })}>
        <FinalQuestionStepComponent
          index={index}
          stepsArray={signatoriesSteps}
          handleExpandNextBlock={handleExpandNextBlock}
          handleFinalStepContinue={handleFinalStepContinue}
          sendProspectToAPI={sendProspectToAPI}
        />
      </div>
    </FormCard>
  );
};

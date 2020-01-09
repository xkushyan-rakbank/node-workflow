import React from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import cx from "classnames";

import { FormCard } from "../../../../components/FormCard/FormCard";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { useStyles } from "./styled";
import { signatoriesSteps, SIGNATORY_FIELD_NAME, STEP_1 } from "./constants";
import { FINAL_QUESTIONS_PAGE } from "../CompanySummaryCard/constants";

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
  const completedSteps = useSelector(
    state => state.completedSteps[FINAL_QUESTIONS_PAGE][SIGNATORY_FIELD_NAME][index] || []
  );
  const isAllStepsCompleted = completedSteps.length === signatoriesSteps.length;
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
            <div className={classes.name}>{fullName}</div>
            <div className={classes.signatoryField}>
              {get(signatory, "accountSigningInfo.authorityType")}
            </div>
            <div className={classes.shareholdingField}>
              {percentage > 0 ? `Shareholding ${percentage}%` : "No shareholding"}
            </div>
          </div>
          <div className={classes.controlsBox}>
            {expandedSignatoryIndex !== index && isAllStepsCompleted && (
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
      <div className={cx({ hidden: expandedSignatoryIndex !== index })}>
        <FinalQuestionStepComponent
          index={index}
          stepsArray={signatoriesSteps}
          handleExpandNextBlock={handleExpandNextBlock}
          handleFinalStepContinue={handleFinalStepContinue}
          sendProspectToAPI={sendProspectToAPI}
          fieldName={SIGNATORY_FIELD_NAME}
          initialStep={isAllStepsCompleted ? null : STEP_1}
        />
      </div>
    </FormCard>
  );
};

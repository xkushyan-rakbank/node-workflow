import React, { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import cx from "classnames";

import { CompanyCard } from "../CompanyCard";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { finalQuestionsSteps, COMPANY_FIELD_NAME, STEP_1 } from "./constants";
import { StepStateContext } from "../../../../components/StepComponent/StepStateContext";

import { useStyles } from "./styled";

export const CompanySummaryCardComponent = ({
  index,
  switchExpandedMargin,
  companyName,
  handleFinalStepContinue,
  sendProspectToAPI
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const state = useContext(StepStateContext);
  const { location } = useHistory();
  const availableSteps = state[location.pathname][COMPANY_FIELD_NAME] || [];
  const isAllStepsCompleted = availableSteps.length >= finalQuestionsSteps.length;
  const classes = useStyles();

  const handleClickStartHere = useCallback(() => {
    setIsExpanded(true);
    if (switchExpandedMargin) {
      switchExpandedMargin();
    }
  }, [switchExpandedMargin]);

  const handleExpandNextBlock = () => setIsExpanded(false);

  return (
    <CompanyCard
      companyName={companyName}
      controls={
        !isExpanded &&
        (isAllStepsCompleted ? (
          <LinkButton clickHandler={() => setIsExpanded(true)} />
        ) : (
          <ContinueButton
            label="Start here"
            classes={{ buttonStyle: classes.buttonStyle }}
            handleClick={handleClickStartHere}
          />
        ))
      }
    >
      <div className={cx({ hidden: !isExpanded })}>
        <FinalQuestionStepComponent
          index={index}
          stepsArray={finalQuestionsSteps}
          handleExpandNextBlock={handleExpandNextBlock}
          handleFinalStepContinue={handleFinalStepContinue}
          sendProspectToAPI={sendProspectToAPI}
          fieldName={COMPANY_FIELD_NAME}
          initialStep={isAllStepsCompleted ? null : STEP_1}
        />
      </div>
    </CompanyCard>
  );
};

import React, { useState, useCallback } from "react";
import cx from "classnames";

import { CompanyCard } from "../CompanyCard";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { finalQuestionsSteps, COMPANY_PATH, STEP_1, FINAL_QUESTIONS_PAGE } from "./constants";

import { useStyles } from "./styled";

export const CompanySummaryCardComponent = ({
  index,
  switchExpandedMargin,
  companyName,
  handleFinalStepContinue,
  sendProspectToAPI,
  isCompanyStepsCompleted
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
        (isCompanyStepsCompleted ? (
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
          path={COMPANY_PATH}
          page={FINAL_QUESTIONS_PAGE}
          initialStep={STEP_1}
        />
      </div>
    </CompanyCard>
  );
};

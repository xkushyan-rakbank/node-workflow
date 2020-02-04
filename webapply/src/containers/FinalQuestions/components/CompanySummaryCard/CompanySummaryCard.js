import React, { useCallback } from "react";
import cx from "classnames";

import { CompanyCard } from "../CompanyCard";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { finalQuestionsSteps, STEP_1, FINAL_QUESTIONS_COMPANY_ID } from "./constants";

import { useStyles } from "./styled";

export const CompanySummaryCardComponent = ({
  index,
  switchExpandedMargin,
  companyName,
  handleFinalStepContinue,
  sendProspectToAPI,
  isCompanyStepsCompleted,
  isCompanyExpanded,
  setIsCompanyExpanded
}) => {
  const classes = useStyles();

  const handleClickStartHere = useCallback(() => {
    setIsCompanyExpanded(true);
    if (switchExpandedMargin) {
      switchExpandedMargin();
    }
  }, [switchExpandedMargin]);

  const handleExpandNextBlock = () => setIsCompanyExpanded(false);

  return (
    <CompanyCard
      companyName={companyName}
      controls={
        !isCompanyExpanded &&
        (isCompanyStepsCompleted ? (
          <LinkButton clickHandler={() => setIsCompanyExpanded(true)} />
        ) : (
          <ContinueButton
            label="Start here"
            classes={{ buttonStyle: classes.buttonStyle }}
            handleClick={handleClickStartHere}
          />
        ))
      }
    >
      <div className={cx({ hidden: !isCompanyExpanded })}>
        <FinalQuestionStepComponent
          index={index}
          stepsArray={finalQuestionsSteps}
          handleExpandNextBlock={handleExpandNextBlock}
          handleFinalStepContinue={handleFinalStepContinue}
          sendProspectToAPI={sendProspectToAPI}
          page={FINAL_QUESTIONS_COMPANY_ID}
          initialStep={!isCompanyStepsCompleted && STEP_1}
        />
      </div>
    </CompanyCard>
  );
};

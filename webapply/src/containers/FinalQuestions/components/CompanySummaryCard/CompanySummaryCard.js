import React from "react";
import cx from "classnames";

import { CompanyCard } from "../CompanyCard";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { finalQuestionsSteps } from "./constants";

import { FINAL_QUESTIONS_COMPANY_ID } from "../../../../constants";

export const CompanySummaryCardComponent = ({
  index,
  companyName,
  handleFinalStepContinue,
  sendProspectToAPI,
  isCompanyStepsCompleted,
  isCompanyExpanded,
  setIsCompanyExpanded
}) => {
  const handleExpandNextBlock = () => setIsCompanyExpanded(false);

  return (
    <CompanyCard
      companyName={companyName}
      controls={
        !isCompanyExpanded &&
        isCompanyStepsCompleted && <LinkButton clickHandler={() => setIsCompanyExpanded(true)} />
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
        />
      </div>
    </CompanyCard>
  );
};

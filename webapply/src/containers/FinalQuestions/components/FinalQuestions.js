import React from "react";
import cx from "classnames";

import { CompanySummaryCard } from "./CompanySummaryCard";
import { SignatorySummaryCard } from "./SignatorySummaryCard";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { BackLink } from "../../../components/Buttons/BackLink";
import { ContinueButton } from "../../../components/Buttons/ContinueButton";
import routes from "../../../routes";

import { useStyles } from "./styled";

export const FinalQuestions = ({
  signatories,
  signatoriesSteps,
  isLoading,
  isAllStepsCompleted,
  isCompanyExpanded,
  isCompanyStepsCompleted,
  expandedSignatoryIndex,
  setIsCompanyExpanded,
  setExpandedSignatoryIndex,
  goToUploadDocument,
  handleClickStartHere,
  handleFinalStepContinue
}) => {
  const classes = useStyles();
  return (
    <>
      <h2>Final questions</h2>
      <p className={classes.description}>
        We’re almost there! Here we ask a bit about the background of the company and that of the
        signatories. We promise there are no more questions after this section.
      </p>
      {!isAllStepsCompleted && !isCompanyExpanded && expandedSignatoryIndex === null && (
        <ContinueButton
          label="Start here"
          classes={{ buttonStyle: classes.startButton }}
          handleClick={handleClickStartHere}
        />
      )}
      <div className={cx(classes.sectionContainer, classes.companyContainer)}>
        <CompanySummaryCard
          handleFinalStepContinue={handleFinalStepContinue}
          isCompanyStepsCompleted={isCompanyStepsCompleted}
          isCompanyExpanded={isCompanyExpanded}
          setIsCompanyExpanded={setIsCompanyExpanded}
        />
      </div>
      <div className={classes.sectionContainer}>
        {signatories.map((item, index) => (
          <SignatorySummaryCard
            key={index}
            expandedSignatoryIndex={expandedSignatoryIndex}
            signatory={item}
            index={index}
            sIndex={item.id}
            setExpandedSignatoryIndex={setExpandedSignatoryIndex}
            handleFinalStepContinue={handleFinalStepContinue}
            allSignatoriesSteps={signatoriesSteps}
          />
        ))}
      </div>
      <div className={classes.linkContainer}>
        <BackLink path={routes.stakeholdersInfo} />
        <NextStepButton
          disabled={!isAllStepsCompleted}
          isDisplayLoader={isLoading}
          handleClick={goToUploadDocument}
          label="Next Step"
        />
      </div>
    </>
  );
};

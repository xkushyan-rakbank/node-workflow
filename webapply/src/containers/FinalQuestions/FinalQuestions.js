import React, { useState, useCallback } from "react";
import cx from "classnames";
import { useSelector } from "react-redux";

import { NextStepButton } from "../../components/Buttons/NextStepButton";
import { CompanySummaryCard } from "./components/CompanySummaryCard";
import { SignatorySummaryCard } from "./components/SignatorySummaryCard";
import { BackLink } from "../../components/Buttons/BackLink";
import { ContinueButton } from "../../components/Buttons/ContinueButton";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getCompanySteps, getSignatoriesSteps } from "../../store/selectors/completedSteps";
import { checkAllStepsCompleted } from "../../utils/checkAllStepsCompleted";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { formStepper, NEXT } from "../../constants";
import routes from "../../routes";

import { useStyles } from "./styled";

export const FinalQuestionsComponent = ({ signatories, sendProspectToAPI }) => {
  const [expandedSignatoryIndex, setExpandedSignatoryIndex] = useState(null);
  const [isCompanyExpanded, setIsCompanyExpanded] = useState(false);
  const classes = useStyles();

  const companySteps = useSelector(getCompanySteps);
  const isCompanyStepsCompleted = checkAllStepsCompleted(companySteps);
  const signatoriesSteps = useSelector(getSignatoriesSteps);
  const [isLoading, setIsLoading] = useState(false);
  const isAllStepsCompleted = checkAllStepsCompleted(signatoriesSteps) && isCompanyStepsCompleted;
  const pushHistory = useTrackingHistory();

  const goToUploadDocument = () => {
    setIsLoading(true);
    sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) pushHistory(routes.uploadDocuments, true);
      },
      () => setIsLoading(false)
    );
  };

  const handleFinalStepContinue = useCallback(
    nextIndex => {
      setIsCompanyExpanded(false);
      setExpandedSignatoryIndex(nextIndex);
    },
    [setIsCompanyExpanded, setExpandedSignatoryIndex]
  );

  const handleClickStartHere = useCallback(() => {
    setIsCompanyExpanded(true);
  }, [setIsCompanyExpanded]);

  useFormNavigation([false, true, formStepper]);

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

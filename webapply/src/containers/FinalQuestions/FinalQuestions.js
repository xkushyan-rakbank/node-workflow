import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";

import { NextStepButton } from "../../components/Buttons/NextStepButton";
import { CompanySummaryCard } from "./components/CompanySummaryCard";
import { SignatorySummaryCard } from "./components/SignatorySummaryCard";
import { BackLink } from "../../components/Buttons/BackLink";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getSignatoriesSteps, getCompanySteps } from "../../store/selectors/appConfig";
import { checkAllStepsCompleted } from "../../utils/checkAllStepsCompleted";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { formStepper, NEXT } from "../../constants";
import routes from "../../routes";

import { useStyles } from "./styled";
import { ContinueButton } from "../../components/Buttons/ContinueButton";

export const FinalQuestionsComponent = ({ signatories, sendProspectToAPI }) => {
  const [isExpandedMargin, setIsExpandedMargin] = useState(true);
  const [expandedSignatoryIndex, setExpandedSignatoryIndex] = useState(null);
  const [isCompanyExpanded, setIsCompanyExpanded] = useState(false);
  const classes = useStyles();

  const companySteps = useSelector(getCompanySteps);
  const isCompanyStepsCompleted = checkAllStepsCompleted(companySteps);
  const signatoriesSteps = useSelector(getSignatoriesSteps);
  const isAllStepsCompleted = checkAllStepsCompleted(signatoriesSteps) && isCompanyStepsCompleted;
  const pushHistory = useTrackingHistory();

  const goToUploadDocument = () => {
    sendProspectToAPI(NEXT).then(isScreeningError => {
      if (!isScreeningError) pushHistory(routes.uploadDocuments, true);
    });
  };

  const handleFinalStepContinue = useCallback(
    nextIndex => {
      setIsCompanyExpanded(false);
      setExpandedSignatoryIndex(nextIndex);
    },
    [setIsCompanyExpanded, setExpandedSignatoryIndex]
  );

  const switchExpandedMargin = useCallback(() => setIsExpandedMargin(!isExpandedMargin), [
    setIsExpandedMargin,
    isExpandedMargin
  ]);

  const handleClickStartHere = useCallback(() => {
    setIsCompanyExpanded(true);
    if (switchExpandedMargin) {
      switchExpandedMargin();
    }
  }, [switchExpandedMargin, setIsCompanyExpanded]);

  useFormNavigation([false, true, formStepper]);

  return (
    <>
      <h2>Final questions</h2>
      <p className={cx(classes.description, { [classes.smallMargin]: !isExpandedMargin })}>
        We’re almost there! Here we ask a bit about the background of the company and that of the
        signatories. We promise there are no more questions after this section.
      </p>
      <div className={classes.sectionContainer}>
        {!isAllStepsCompleted && !isCompanyExpanded && expandedSignatoryIndex === null && (
          <ContinueButton
            label="Start here"
            classes={{ buttonStyle: classes.startButton }}
            handleClick={handleClickStartHere}
          />
        )}
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
          handleClick={goToUploadDocument}
          label="Next Step"
        />
      </div>
    </>
  );
};

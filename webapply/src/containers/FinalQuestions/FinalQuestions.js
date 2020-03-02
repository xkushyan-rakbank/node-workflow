import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";

import routes from "../../routes";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanySummaryCard } from "./components/CompanySummaryCard";
import { SignatorySummaryCard } from "./components/SignatorySummaryCard";
import { BackLink } from "../../components/Buttons/BackLink";
import { getSignatoriesSteps, getCompanySteps } from "../../store/selectors/appConfig";
import { checkAllStepsCompleted } from "../../utils/checkAllStepsCompleted";
import { NEXT } from "../../constants";

import { useStyles } from "./styled";

export const FinalQuestionsComponent = ({ signatories, history, sendProspectToAPI }) => {
  const [isExpandedMargin, setIsExpandedMargin] = useState(true);
  const [expandedSignatoryIndex, setExpandedSignatoryIndex] = useState(null);
  const [isCompanyExpanded, setIsCompanyExpanded] = useState(false);
  const classes = useStyles();

  const companySteps = useSelector(getCompanySteps);
  const isCompanyStepsCompleted = checkAllStepsCompleted(companySteps);
  const signatoriesSteps = useSelector(getSignatoriesSteps);
  const isSignatoriesStepsCompleted = checkAllStepsCompleted(signatoriesSteps);

  const goToUploadDocument = () => {
    sendProspectToAPI(NEXT).then(isScreeningError => {
      if (!isScreeningError) history.push(routes.uploadDocuments);
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

  return (
    <>
      <h2>Final questions</h2>
      <p className={cx(classes.description, { [classes.smallMargin]: !isExpandedMargin })}>
        We’re almost there! Here we ask a bit about the background of the company and that of the
        signatories. We promise there are no more questions after this section.
      </p>
      <div className={classes.sectionContainer}>
        <CompanySummaryCard
          switchExpandedMargin={switchExpandedMargin}
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
        <SubmitButton
          disabled={!isCompanyStepsCompleted || !isSignatoriesStepsCompleted}
          handleClick={goToUploadDocument}
          label="Next Step"
          className={classes.submitButton}
        />
      </div>
    </>
  );
};

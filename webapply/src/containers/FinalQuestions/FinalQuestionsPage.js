import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { FinalQuestions } from "./components/FinalQuestions";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getCompanySteps, getSignatoriesSteps } from "../../store/selectors/completedSteps";
import { useViewId } from "../../utils/useViewId";
import { checkAllStepsCompleted } from "../../utils/checkAllStepsCompleted";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { formStepper, NEXT } from "../../constants";
import routes from "../../routes";

export const FinalQuestionsPage = ({ signatories, sendProspectToAPI }) => {
  useFormNavigation([false, true, formStepper]);
  useViewId(true);
  const pushHistory = useTrackingHistory();

  const [expandedSignatoryIndex, setExpandedSignatoryIndex] = useState(null);
  const [isCompanyExpanded, setIsCompanyExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const companySteps = useSelector(getCompanySteps);
  const signatoriesSteps = useSelector(getSignatoriesSteps);

  const isCompanyStepsCompleted = checkAllStepsCompleted(companySteps);
  const isAllStepsCompleted = checkAllStepsCompleted(signatoriesSteps) && isCompanyStepsCompleted;

  const goToUploadDocument = useCallback(() => {
    setIsLoading(true);
    return sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) pushHistory(routes.uploadDocuments, true);
      },
      () => setIsLoading(false)
    );
  }, [setIsLoading, sendProspectToAPI, pushHistory]);

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

  return (
    <FinalQuestions
      signatories={signatories}
      signatoriesSteps={signatoriesSteps}
      isLoading={isLoading}
      isAllStepsCompleted={isAllStepsCompleted}
      isCompanyExpanded={isCompanyExpanded}
      isCompanyStepsCompleted={isCompanyStepsCompleted}
      expandedSignatoryIndex={expandedSignatoryIndex}
      setIsCompanyExpanded={setIsCompanyExpanded}
      setExpandedSignatoryIndex={setExpandedSignatoryIndex}
      goToUploadDocument={goToUploadDocument}
      handleClickStartHere={handleClickStartHere}
      handleFinalStepContinue={handleFinalStepContinue}
    />
  );
};

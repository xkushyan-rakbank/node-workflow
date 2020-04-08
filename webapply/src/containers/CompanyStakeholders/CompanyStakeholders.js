import React, { useCallback, useState, useEffect } from "react";

import {
  StakeholdersNameManager,
  StakeholdersNameProvider
} from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { CompanyStakeholdersComponent } from "./components/CompanyStakeholders/CompanyStakeholders";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";
import { formStepper, NEXT } from "../../constants";

export const CompanyStakeholdersContainer = ({
  deleteStakeholder: deleteHandler,
  changeEditableStakeholder,
  createNewStakeholder,
  stakeholders,
  percentage,
  stakeholdersIds,
  hasSignatories,
  sendProspectToAPI,
  isStakeholderStepsCompleted,
  isAnyStakeholderStepsCompleted,
  isSendingProspect
}) => {
  const pushHistory = useTrackingHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isShowingAddButton, setIsShowingAddButton] = useState(stakeholders.length > 0);

  useFormNavigation([false, true, formStepper]);

  useEffect(() => {
    if (!stakeholders.length) {
      createNewStakeholder();
    }
  }, [createNewStakeholder, stakeholders.length]);

  useEffect(() => {
    StakeholdersNameManager && StakeholdersNameManager.setStakeholderFullNames(stakeholders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLowPercentage = percentage < 100;

  const isDisableNextStep =
    stakeholders.length < 1 || !isStakeholderStepsCompleted || isLowPercentage || !hasSignatories;

  const isLowPercentageErrorDisplayed =
    stakeholders.length > 0 && isAnyStakeholderStepsCompleted && isLowPercentage;

  const isSignatoryErrorDisplayed =
    stakeholders.length > 0 && isAnyStakeholderStepsCompleted && !hasSignatories;

  const goToFinalQuestions = useCallback(() => {
    setIsLoading(true);
    sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) pushHistory(routes.finalQuestions, true);
      },
      () => setIsLoading(false)
    );
  }, [pushHistory, sendProspectToAPI]);

  const handleDeleteStakeholder = useCallback(
    id => {
      setIsShowingAddButton(stakeholders.length !== 1);
      changeEditableStakeholder("");
      deleteHandler(id);
    },
    [stakeholders.length, deleteHandler, setIsShowingAddButton, changeEditableStakeholder]
  );

  const addNewStakeholder = useCallback(() => {
    setIsShowingAddButton(false);
    createNewStakeholder();
  }, [setIsShowingAddButton, createNewStakeholder]);

  return (
    <StakeholdersNameProvider>
      <CompanyStakeholdersComponent
        stakeholders={stakeholders}
        setIsShowingAddButton={setIsShowingAddButton}
        stakeholdersIds={stakeholdersIds}
        handleDeleteStakeholder={handleDeleteStakeholder}
        isSendingProspect={isSendingProspect}
        addNewStakeholder={addNewStakeholder}
        percentage={percentage}
        goToFinalQuestions={goToFinalQuestions}
        isLoading={isLoading}
        isDisableNextStep={isDisableNextStep}
        isShowingAddButton={isShowingAddButton}
        isSignatoryErrorDisplayed={isSignatoryErrorDisplayed}
        isLowPercentageErrorDisplayed={isLowPercentageErrorDisplayed}
      />
    </StakeholdersNameProvider>
  );
};

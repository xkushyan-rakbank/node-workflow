import React, { useCallback, useState, useEffect } from "react";

import {
  StakeholdersNameManager,
  StakeholdersNameProvider
} from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { CompanyStakeholdersComponent } from "./components/CompanyStakeholders/CompanyStakeholders";
import { useViewId } from "../../utils/useViewId";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";
import { formStepper, NEXT } from "../../constants";
import { useLayoutParams } from "../FormLayout";

export const CompanyStakeholdersContainer = ({
  fullName,
  companyCategory,
  deleteStakeholder: deleteHandler,
  changeEditableStakeholder,
  createNewStakeholder,
  stakeholders,
  percentage,
  hasSignatories,
  sendProspectToAPI,
  isAllStakeholdersStepsCompleted,
  isAnyStakeholderStepsCompleted,
  isSendingProspect,
  editableStakeholder
}) => {
  const pushHistory = useTrackingHistory();

  const [isLoading, setIsLoading] = useState(false);

  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);

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
    stakeholders.length < 1 ||
    !isAllStakeholdersStepsCompleted ||
    isLowPercentage ||
    !hasSignatories;

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
      StakeholdersNameManager && StakeholdersNameManager.deleteStakeholderFullName(id);
      changeEditableStakeholder(null);
      deleteHandler(id);
    },
    [deleteHandler, changeEditableStakeholder]
  );

  return (
    <StakeholdersNameProvider>
      <CompanyStakeholdersComponent
        fullName={fullName}
        companyCategory={companyCategory}
        stakeholders={stakeholders}
        handleDeleteStakeholder={handleDeleteStakeholder}
        isSendingProspect={isSendingProspect}
        addNewStakeholder={createNewStakeholder}
        percentage={percentage}
        goToFinalQuestions={goToFinalQuestions}
        isLoading={isLoading}
        isDisableNextStep={isDisableNextStep}
        isSignatoryErrorDisplayed={isSignatoryErrorDisplayed}
        isLowPercentageErrorDisplayed={isLowPercentageErrorDisplayed}
        editableStakeholder={editableStakeholder}
      />
    </StakeholdersNameProvider>
  );
};

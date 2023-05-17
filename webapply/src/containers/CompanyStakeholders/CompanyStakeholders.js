import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  StakeholdersNameManager,
  StakeholdersNameProvider
} from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { CompanyStakeholdersComponent } from "./components/CompanyStakeholders/CompanyStakeholders";
import { useViewId } from "../../utils/useViewId";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";
import { formStepper } from "../../constants";
import { useLayoutParams } from "../FormLayout";
import { getTransactionId } from "../../store/selectors/kyc";

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
  editableStakeholder,
  createKycTransaction,
  entityConfirmation
}) => {
  const pushHistory = useTrackingHistory();
  const transactionId = useSelector(getTransactionId);
  const [isLoading, setIsLoading] = useState(false);

  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);

  useEffect(() => {
    if (!transactionId) {
      createKycTransaction();
    }
  }, []);

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

  const handleClickNextStep = useCallback(() => {
    setIsLoading(true);

    return entityConfirmation().then(
      isScreeningError => {
        pushHistory(routes.stakeholdersPreview, true);
      },
      () => {
        setIsLoading(false);
        // pushHistory(routes.stakeholdersPreview, true);
      }
    );
  }, [entityConfirmation, pushHistory]);

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
        isLoading={isLoading}
        isDisableNextStep={isDisableNextStep}
        isSignatoryErrorDisplayed={isSignatoryErrorDisplayed}
        isLowPercentageErrorDisplayed={isLowPercentageErrorDisplayed}
        editableStakeholder={editableStakeholder}
        handleClickNextStep={handleClickNextStep}
      />
    </StakeholdersNameProvider>
  );
};

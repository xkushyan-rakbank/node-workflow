import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  StakeholdersNameManager,
  StakeholdersNameProvider
} from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { CompanyStakeholdersComponent } from "./components/CompanyStakeholders/CompanyStakeholders";
import { useViewId } from "../../utils/useViewId";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";
import { formStepper, WTM_STATUS } from "../../constants";
import { useLayoutParams } from "../FormLayout";
import { getTransactionId } from "../../store/selectors/kyc";
import { startScheduler, stopScheduler } from "../../store/actions/webToMobile";
import { getwtmSessionDetails } from "../../store/selectors/webToMobile";

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
  notifyHost
}) => {
  const pushHistory = useTrackingHistory();
  const history = useHistory();
  const dispatch = useDispatch();
  const transactionId = useSelector(getTransactionId);
  const {
    sessionData: { sessionType }
  } = useSelector(getwtmSessionDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

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
    if (sessionType) {
      setOpenInfo(true);
      dispatch(stopScheduler(WTM_STATUS.FINISHED));
    } else {
      setIsLoading(true);

      return notifyHost().then(
        isScreeningError => {
          pushHistory(routes.stakeholdersPreview, true);
        },
        () => {
          setIsLoading(false);
          // pushHistory(routes.stakeholdersPreview, true);
        }
      );
    }
  }, [notifyHost, pushHistory]);

  const handleDeleteStakeholder = useCallback(
    id => {
      StakeholdersNameManager && StakeholdersNameManager.deleteStakeholderFullName(id);
      changeEditableStakeholder(null);
      deleteHandler(id);
    },
    [deleteHandler, changeEditableStakeholder]
  );

  useEffect(() => {
    sessionType && dispatch(startScheduler(WTM_STATUS.IN_PROGRESS));
    return () => {
      // stopScheduler
      sessionType && dispatch(stopScheduler(WTM_STATUS.FINISHED));
    };
  }, [sessionType]);

  const onInfoModalClose = () => {
    setOpenInfo(false);
    history.push(routes.quickapplyLanding);
  };

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
        sessionType={sessionType}
        openInfo={openInfo}
        handleInfoModalClose={onInfoModalClose}
      />
    </StakeholdersNameProvider>
  );
};

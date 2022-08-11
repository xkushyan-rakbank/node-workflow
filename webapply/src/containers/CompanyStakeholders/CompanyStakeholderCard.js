import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { StakeholdersNamesContext } from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { CompanyStakeholderCardComponent } from "./components/CompanyStakeholderCard/CompanyStakeholderCard";
import { getSignatoriesCount } from "../../store/selectors/appConfig";
import { getIsSendingProspect } from "../../store/selectors/sendProspectToAPI";
import { createGetIsStakeholderStepsCompleted } from "../../store/selectors/completedSteps";

export const CompanyStakeholderCard = ({
  stakeholderId,
  stakeholder,
  index,
  cancelEditHandler,
  deleteHandler,
  isDisplayConfirmation,
  children
}) => {
  const isAllStepsCompleted = useSelector(createGetIsStakeholderStepsCompleted(stakeholderId));
  const isStatusLoading = useSelector(getIsSendingProspect);
  const signatoriesCount = useSelector(getSignatoriesCount);
  const stakeholdersName = useContext(StakeholdersNamesContext);
  const { firstName, lastName, middleName } =
    stakeholdersName.find(item => item.id === stakeholderId) || {};

  return (
    <CompanyStakeholderCardComponent
      firstName={firstName}
      lastName={lastName}
      middleName={middleName}
      deleteHandler={deleteHandler}
      cancelEditHandler={cancelEditHandler}
      isDisplayConfirmation={isDisplayConfirmation}
      isStatusLoading={isStatusLoading}
      stakeholdersCount={signatoriesCount}
      isAllStepsCompleted={isAllStepsCompleted}
      index={index}
      isShareholderACompany={stakeholder.kycDetails.isShareholderACompany}
      signatoryCompanyInfo={stakeholder.signatoryCompanyInfo}
    >
      {children}
    </CompanyStakeholderCardComponent>
  );
};

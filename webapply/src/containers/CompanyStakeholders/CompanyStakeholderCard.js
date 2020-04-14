import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { StakeholdersNamesContext } from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { CompanyStakeholderCardComponent } from "./components/CompanyStakeholderCard/CompanyStakeholderCard";
import { getSignatoriesCount } from "../../store/selectors/appConfig";

export const CompanyStakeholderCard = ({
  stakeholderId,
  isStatusShown,
  isStatusLoading,
  index,
  isEditInProgress,
  editHandler,
  deleteHandler,
  isDisplayConfirmation,
  children
}) => {
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
      editHandler={editHandler}
      isDisplayConfirmation={isDisplayConfirmation}
      isEditInProgress={isEditInProgress}
      isStatusLoading={isStatusLoading}
      isStatusShown={isStatusShown}
      stakeholdersCount={signatoriesCount}
      index={index}
    >
      {children}
    </CompanyStakeholderCardComponent>
  );
};

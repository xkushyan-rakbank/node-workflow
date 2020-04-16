import React, { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StakeholdersNamesContext } from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { FilledStakeholderCardComponent } from "./components/FilledStakeholderCard/FilledStakeholderCard";

import { changeEditableStakeholder } from "../../store/actions/stakeholders";
import { createGetAuthorityTypeDisplayText } from "../../store/selectors/appConfig";

export const FilledStakeholderCard = ({
  authorityType,
  index,
  kycDetails: { shareHoldingPercentage },
  isEditDisabled,
  stakeholderId
}) => {
  const dispatch = useDispatch();
  const authorityTypeDisplayText = useSelector(createGetAuthorityTypeDisplayText(authorityType));
  const stakeholdersName = useContext(StakeholdersNamesContext);
  const { firstName, lastName, middleName } =
    stakeholdersName.find(item => item.id === stakeholderId) || {};

  const editStakeholder = useCallback(() => {
    dispatch(changeEditableStakeholder(stakeholderId));
  }, [dispatch, stakeholderId]);

  return (
    <FilledStakeholderCardComponent
      firstName={firstName}
      lastName={lastName}
      middleName={middleName}
      editStakeholder={editStakeholder}
      isEditDisabled={isEditDisabled}
      shareHoldingPercentage={shareHoldingPercentage}
      authorityTypeDisplayText={authorityTypeDisplayText}
      index={index}
    />
  );
};

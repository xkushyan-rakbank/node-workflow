import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";

import { StakeholdersNamesContext } from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { getAuthorityTypeDisplayText } from "../FinalQuestions/components/SignatorySummaryCard/utils";
import { FilledStakeholderCardComponent } from "./components/FilledStakeholderCard/FilledStakeholderCard";
import { getAuthorityTypeDatalist } from "../../store/selectors/appConfig";

export const FilledStakeholderCard = ({
  accountSigningInfo,
  changeEditableStep,
  index,
  kycDetails: { shareHoldingPercentage } = {},
  isEditDisabled,
  id
}) => {
  const authorityTypeDatalist = useSelector(getAuthorityTypeDatalist);
  const stakeholdersName = useContext(StakeholdersNamesContext);
  const { firstName, lastName, middleName } = stakeholdersName.find(item => item.id === id) || {};
  const authorityTypeValue = getAuthorityTypeDisplayText(
    get(accountSigningInfo, "authorityType"),
    authorityTypeDatalist
  );

  const editStakeholder = useCallback(() => changeEditableStep(index), [index, changeEditableStep]);

  return (
    <FilledStakeholderCardComponent
      firstName={firstName}
      lastName={lastName}
      middleName={middleName}
      editStakeholder={editStakeholder}
      isEditDisabled={isEditDisabled}
      shareHoldingPercentage={shareHoldingPercentage}
      authorityTypeValue={authorityTypeValue}
      index={index}
    />
  );
};

import React, { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";

import { StakeholdersNamesContext } from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { getAuthorityTypeDisplayText } from "../FinalQuestions/components/SignatorySummaryCard/utils";
import { FilledStakeholderCardComponent } from "./components/FilledStakeholderCard/FilledStakeholderCard";
import { getAuthorityTypeDatalist } from "../../store/selectors/appConfig";
import { changeEditableStakeholder } from "../../store/actions/stakeholders";

export const FilledStakeholderCard = ({
  accountSigningInfo,
  index,
  kycDetails: { shareHoldingPercentage } = {},
  isEditDisabled,
  stakeholderId
}) => {
  const dispatch = useDispatch();
  const authorityTypeDatalist = useSelector(getAuthorityTypeDatalist);
  const stakeholdersName = useContext(StakeholdersNamesContext);
  const { firstName, lastName, middleName } =
    stakeholdersName.find(item => item.id === stakeholderId) || {};
  const authorityTypeValue = getAuthorityTypeDisplayText(
    get(accountSigningInfo, "authorityType"),
    authorityTypeDatalist
  );

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
      authorityTypeValue={authorityTypeValue}
      index={index}
    />
  );
};

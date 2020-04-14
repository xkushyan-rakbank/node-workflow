import React, { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";

import { StakeholdersNamesContext } from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { FilledStakeholderCardComponent } from "./components/FilledStakeholderCard/FilledStakeholderCard";

import { getDatalist } from "../../store/selectors/appConfig";
import { getAuthorityTypeDisplayText } from "../../utils/getAuthoroityTypeDisplayText";
import { changeEditableStakeholder } from "../../store/actions/stakeholders";

export const FilledStakeholderCard = ({
  accountSigningInfo,
  index,
  kycDetails: { shareHoldingPercentage },
  isEditDisabled,
  stakeholderId
}) => {
  const dispatch = useDispatch();
  const datalist = useSelector(getDatalist);
  const stakeholdersName = useContext(StakeholdersNamesContext);
  const { firstName, lastName, middleName } =
    stakeholdersName.find(item => item.id === stakeholderId) || {};
  const authorityTypeDisplayText = getAuthorityTypeDisplayText(
    get(accountSigningInfo, "authorityType"),
    datalist.authorityType
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
      authorityTypeDisplayText={authorityTypeDisplayText}
      index={index}
    />
  );
};

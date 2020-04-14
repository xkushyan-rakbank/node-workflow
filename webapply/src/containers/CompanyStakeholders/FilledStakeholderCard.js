import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";

import { StakeholdersNamesContext } from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { FilledStakeholderCardComponent } from "./components/FilledStakeholderCard/FilledStakeholderCard";
import { getDatalist } from "../../store/selectors/appConfig";
import { getAuthorityTypeDisplayText } from "../../utils/getAuthoroityTypeDisplayText";

export const FilledStakeholderCard = ({
  accountSigningInfo,
  changeEditableStep,
  index,
  kycDetails: { shareHoldingPercentage } = {},
  isEditDisabled,
  id
}) => {
  const datalist = useSelector(getDatalist);
  const stakeholdersName = useContext(StakeholdersNamesContext);
  const { firstName, lastName, middleName } = stakeholdersName.find(item => item.id === id) || {};
  const authorityTypeValue = getAuthorityTypeDisplayText(
    get(accountSigningInfo, "authorityType"),
    datalist
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

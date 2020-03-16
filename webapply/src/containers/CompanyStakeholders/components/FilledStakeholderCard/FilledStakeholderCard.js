import React, { useCallback, useContext } from "react";
import cx from "classnames";
import get from "lodash/get";

import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { Avatar } from "../../../../components/Avatar/Avatar";
import { useStyles } from "./styled";
import { checkIsAccountInfoTypeNumber } from "../../../FinalQuestions/components/SignatorySummaryCard/utils";
import { UpdatedFullNameContext } from "../../../../components/UpdatedFullNameContext";

export const FilledStakeholderCard = ({
  firstName,
  middleName,
  lastName,
  accountSigningInfo,
  changeEditableStep,
  index,
  kycDetails: { shareHoldingPercentage } = {},
  datalist,
  editDisabled
}) => {
  const classes = useStyles();
  const newFullName = useContext(UpdatedFullNameContext);
  console.log(useContext(UpdatedFullNameContext));
  const editStakeholder = useCallback(() => changeEditableStep(index), [index, changeEditableStep]);
  const authorityTypeValueFromProspect = get(accountSigningInfo, "authorityType");
  const authorityTypeValue = checkIsAccountInfoTypeNumber(authorityTypeValueFromProspect, datalist);

  return (
    <div className={cx(classes.wrapper)}>
      <div className={classes.contentWrapper}>
        <Avatar firstName={firstName} lastName={lastName} index={index} />

        <div className={classes.userInfo}>
          <div className={classes.nameField}>{`${(newFullName && newFullName.firstName) ||
            firstName} ${(newFullName && newFullName.middleName) || middleName} ${(newFullName &&
            newFullName.lastName) ||
            lastName}`}</div>
          {accountSigningInfo && authorityTypeValueFromProspect && (
            <div className={classes.signatoryField}>{authorityTypeValue}</div>
          )}
          <div
            className={classes.shareholdingField}
          >{`Shareholding ${shareHoldingPercentage}%`}</div>
        </div>
        {!editDisabled && <LinkButton clickHandler={editStakeholder} />}
      </div>
    </div>
  );
};

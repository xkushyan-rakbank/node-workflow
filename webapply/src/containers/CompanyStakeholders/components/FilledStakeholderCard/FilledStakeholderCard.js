import React from "react";
import cx from "classnames";

import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { Avatar } from "../../../../components/Avatar/Avatar";
import { useStyles } from "./styled";

export const FilledStakeholderCard = ({
  firstName,
  middleName,
  lastName,
  accountSigningInfo,
  changeEditableStep,
  index,
  kycDetails: { shareHoldingPercentage } = {}
}) => {
  const classes = useStyles();

  const editStakeholder = () => changeEditableStep(index);

  return (
    <div className={cx(classes.wrapper)}>
      <div className={classes.contentWrapper}>
        <Avatar firstName={firstName} lastName={lastName} index={index} />

        <div className={classes.userInfo}>
          <div className={classes.nameField}>{`${firstName} ${middleName} ${lastName}`}</div>
          {accountSigningInfo && accountSigningInfo.authorityType && (
            <div className={classes.signatoryField}>{accountSigningInfo.authorityType}</div>
          )}
          <div
            className={classes.shareholdingField}
          >{`Shareholding ${shareHoldingPercentage}%`}</div>
        </div>

        <LinkButton clickHandler={editStakeholder} />
      </div>
    </div>
  );
};

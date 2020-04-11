import React from "react";

import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { Avatar } from "../../../../components/Avatar/Avatar";
import { useStyles } from "./styled";

export const FilledStakeholderCardComponent = ({
  firstName,
  middleName,
  lastName,
  index,
  authorityTypeValue,
  shareHoldingPercentage,
  editStakeholder,
  isEditDisabled
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapper}>
        <Avatar firstName={firstName} lastName={lastName} index={index} />

        <div className={classes.userInfo}>
          <div className={classes.nameField}>{`${firstName} ${middleName} ${lastName}`}</div>
          {authorityTypeValue && <div className={classes.signatoryField}>{authorityTypeValue}</div>}
          <div
            className={classes.shareholdingField}
          >{`Shareholding ${shareHoldingPercentage}%`}</div>
        </div>
        {!isEditDisabled && <LinkButton clickHandler={editStakeholder} />}
      </div>
    </div>
  );
};

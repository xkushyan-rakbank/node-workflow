import React from "react";
import cx from "classnames";

import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { UserAvatar as Avatar } from "../../../../components/Avatar/Avatar";
import { useStyles } from "./styled";

export const FilledStakeholderCard = ({
  firstName,
  middleName,
  lastName,
  signatoryRights,
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
          {signatoryRights && <div className={classes.signatoryField}>Signatory Rights</div>}
          <div
            className={classes.shareholdingField}
          >{`Shareholding ${shareHoldingPercentage}%`}</div>
        </div>

        <LinkButton clickHandler={editStakeholder} />
      </div>
    </div>
  );
};

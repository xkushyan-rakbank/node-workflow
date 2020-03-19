import React, { useContext } from "react";
import cx from "classnames";

import { StakeholdersNamesContext } from "../StakeholdersNameProvider/StakeholdersNameProvider";
import StatusLoader from "../../../../components/StatusLoader";
import { Avatar } from "../../../../components/Avatar/Avatar";
import { useStyles, EditButton } from "./styled";
import expandMoreIcon from "../../../../assets/icons/arrowDown.svg";

export const CompanyStakeholderCard = ({
  className,
  index,
  isStatusShown,
  isStatusLoading,
  children,
  isEditInProgress,
  editHandler,
  id
}) => {
  const classes = useStyles();
  const stakeholdersName = useContext(StakeholdersNamesContext);
  const { firstName, lastName, middleName } = stakeholdersName.find(item => item.id === id) || {};

  return (
    <div className={cx(classes.wrapper, className)}>
      <div className={classes.contentWrapper}>
        <Avatar
          firstName={firstName}
          lastName={lastName}
          index={index}
          isEmptyAvatar={!firstName}
        />

        <div className={classes.userInfo}>
          <div className={classes.nameField}>
            {[firstName, middleName, lastName].filter(item => item).join(" ") || "New Stakeholder"}
          </div>
          {isStatusShown && <StatusLoader loading={isStatusLoading} />}
          {isEditInProgress && (
            <EditButton onClick={editHandler}>
              <img src={expandMoreIcon} className={classes.arrow} alt="scroll up" />
            </EditButton>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

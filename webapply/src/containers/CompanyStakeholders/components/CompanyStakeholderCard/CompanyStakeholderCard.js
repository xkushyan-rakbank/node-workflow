import React from "react";

import { Avatar } from "../../../../components/Avatar/Avatar";
import StatusLoader from "../../../../components/StatusLoader";
import { EditButton, useStyles } from "./styled";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import expandMoreIcon from "../../../../assets/icons/arrowDown.svg";

export const CompanyStakeholderCardComponent = ({
  firstName,
  lastName,
  middleName,
  isStatusLoading,
  isStatusShown,
  isEditInProgress,
  editHandler,
  children,
  stakeholdersCount,
  isDisplayConfirmation,
  deleteHandler,
  index
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
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
      <div className={classes.formContent}>{children}</div>
      {isEditInProgress && stakeholdersCount > 1 && (
        <div className={classes.footerPart}>
          <LinkButton
            title={
              isDisplayConfirmation ? "Are you sure? All Data will be lost" : "Delete Stakeholder"
            }
            className={classes.button}
            clickHandler={deleteHandler}
          />
        </div>
      )}
    </div>
  );
};

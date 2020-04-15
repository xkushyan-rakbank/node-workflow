import React from "react";

import { Avatar } from "../../../../components/Avatar/Avatar";
import StatusLoader from "../../../../components/StatusLoader";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { EditButton, useStyles } from "./styled";
import expandMoreIcon from "../../../../assets/icons/arrowDown.svg";

export const CompanyStakeholderCardComponent = ({
  firstName,
  lastName,
  middleName,
  isStatusLoading,
  cancelEditHandler,
  children,
  stakeholdersCount,
  isDisplayConfirmation,
  deleteHandler,
  isAllStepsCompleted,
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
          {(!isAllStepsCompleted || isStatusLoading) && <StatusLoader loading={isStatusLoading} />}
          {isAllStepsCompleted && (
            <EditButton onClick={cancelEditHandler}>
              <img src={expandMoreIcon} className={classes.arrow} alt="scroll up" />
            </EditButton>
          )}
        </div>
      </div>
      <div className={classes.formContent}>{children}</div>
      {stakeholdersCount > 1 && (
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

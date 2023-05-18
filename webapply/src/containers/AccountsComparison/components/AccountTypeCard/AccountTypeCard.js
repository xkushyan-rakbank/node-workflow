/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { ContinueButton } from "../../../../components/Buttons/ContinueButton";

import { useStyles } from "./styled";

import { ReactComponent as CheckIcon } from "../../../../assets/images/icons/circle_checked_o.svg";
import { DialogPrompt } from "../../DialogPrompt";

export const AccountTypeCardComponent = ({
  Icon,
  title,
  description,
  buttonText,
  applyNowButton,
  handleSetAccountType,
  accountType,
  accountTypeName,
  handleApply
}) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
    setOpenModal(true);
  };
  const showPromptDialog = () => {
    setShowDialog(true);
  };

  const handleConfirm = () => {
    setShowDialog(false);
    handleApply(accountTypeName);
  };
  return (
    <div className={classes.container}>
      <div>
        <div className={classes.header}>
          <div>
            <Icon alt={title} />
          </div>
          <span>{title}</span>
        </div>
        <div className={classes.divider}> </div>
        <div className={classes.differencesContainer}>
          <ul className={classes.differences}>
            {description.map((difference, index) => (
              <li key={index}>
                <CheckIcon alt="check icon" />
                {difference}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DialogPrompt
        openModal={showDialog}
        handleClose={handleCloseDialog}
        accountType={accountType}
        handleConfirm={handleConfirm}
      />
      <div className={classes.buttonWrapper}>
        <ContinueButton
          handleClick={() => handleSetAccountType(accountType)}
          label={buttonText}
          classes={{ buttonStyle: classes.continueButtonRoot }}
        />
        <div className={classes.buttonDivider}> </div>
        <ContinueButton
          handleClick={() => showPromptDialog(accountType)}
          label={applyNowButton}
          handleClose={handleClose}
          classes={{ buttonStyle: classes.continueButtonRoot }}
        />
      </div>
    </div>
  );
};

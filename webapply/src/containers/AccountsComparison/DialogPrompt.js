import React from "react";
import { DialogComponent as Dialog } from "../../components/Modals/ConfirmDialog/Dialog";

export const DialogPrompt = ({ openModal, handleClose, accountType, handleConfirm }) => {
  return (
    <Dialog
      title={`You have selected ${accountType} Application, would you like to proceed?`}
      isOpen={openModal}
      handleClose={handleClose}
      confirmBtnText={"Yes"}
      cancelBtnText={"No"}
      handleConfirm={handleConfirm}
    />
  );
};

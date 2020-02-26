import React, { useState, useCallback } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { ContainedButton } from "../../Buttons/ContainedButton";
import { checkDeviceIsMobile } from "../../../utils/checkDeviceIsMobile";

import { ReactComponent as DesktopImg } from "../../../assets/images/desktop.svg";

import { useStyles } from "./styled";

export const MobileNotification = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const isMobileDevice = checkDeviceIsMobile();

  if (!isMobileDevice) return null;

  return (
    <>
      <ContainedButton
        withRightArrow
        justify="flex-start"
        label="Start application"
        handleClick={handleOpen}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Almost there!</h2>
            <DesktopImg alt="interrogation" />
            <p>
              Applying for your account is simply better when you’re not on the go. So get comfy and
              use your desktop.
            </p>
            <ContainedButton label="Got it" handleClick={handleClose} />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { ContainedButton } from "../../Buttons/ContainedButton";
import desktopImg from "../../../assets/images/desctop.svg";

import { useStyles } from "./styled";

export const MobileNotification = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <img src={desktopImg} alt="interrogation" />
            <p>
              Applying for your account is going to take a bit. Better to do it when you’re not on
              the go. So get comfy and use your desktop. See you there!
            </p>
            <ContainedButton label="Got it" handleClick={handleClose} />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

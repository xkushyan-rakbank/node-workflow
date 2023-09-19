import React, { useState } from "react";
import { Button, Modal } from "@material-ui/core";
// import { ReactComponent as VerifyMobileIcon } from "../../../../assets/icons/verify_mobile.svg";
import { ReactComponent as VerifyMobileIcon } from "../../../../assets/icons/phoneVerification.svg";
import { useStyles } from "./styled";
import { QRCodeScanModal } from "./QRCodeScanModal";
import { ContexualHelp } from "../../../../components/Notifications";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

export const ScanViaMobile = ({ disabled, getKycStatus }) => {
  const classes = useStyles();
  const [openMobileScanModal, setOpenMobileScanModal] = useState(false);
  const helperText =
    "You can upload or scan your documents and complete the face verification step via your phone. This is faster and more convenient for most people. When done, you'll be able to return to this desktop session to continue the application.";
  return (
    <>
      <div className={classes.verifyMobileWrapper}>
        <div className={classes.descriptionWrapper}>
          <VerifyMobileIcon
            alt="Continue verification on mobile browser"
            className={classes.verifyMobileIcon}
          />
          <div className={classes.moveToMobile}>
            <h6>Move to mobile (faster)</h6>
            <ContexualHelp title={helperText} placement="right" isDisableHoverListener={false}>
              <HelpOutlineIcon className={classes.helperIcon} />
            </ContexualHelp>
          </div>
        </div>
        <Button
          className={classes.continueBtn}
          disabled={disabled}
          onClick={() => setOpenMobileScanModal(true)}
        >
          Move to Mobile
        </Button>
      </div>
      <Modal open={openMobileScanModal}>
        <QRCodeScanModal
          getKycStatus={getKycStatus}
          handleClose={() => setOpenMobileScanModal(false)}
          individualId={"SID1"}
        />
      </Modal>
    </>
  );
};

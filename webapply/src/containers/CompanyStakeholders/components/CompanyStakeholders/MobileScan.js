import React, { useState } from "react";
import { Button, Modal } from "@material-ui/core";
import { ReactComponent as VerifyMobileIcon } from "../../../../assets/icons/verify_mobile.svg";
import { useStyles } from "./styled";
import { QRCodeScanModal } from "./QRCodeScanModal";
export const ScanViaMobile = ({ disabled, getKycStatus }) => {
  const classes = useStyles();
  const [openMobileScanModal, setOpenMobileScanModal] = useState(false);
  return (
    <>
      <div className={classes.verifyMobileWrapper}>
        <div className={classes.descriptionWrapper}>
          <VerifyMobileIcon
            alt="Continue verification on mobile browser"
            className={classes.verifyMobileIcon}
          />
          <div>
            <h6>Continue verification on mobile browser</h6>
            <p>
              You can upload or scan your documents and complete the face verification step via your
              phone. This is faster and more convenient for most people. When done, you'll be able
              to return to this desktop session to continue the application.
            </p>
          </div>
        </div>
        <Button
          variant="outlined"
          className={classes.continueBtn}
          disabled={disabled}
          onClick={() => setOpenMobileScanModal(true)}
        >
          Continue on mobile
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

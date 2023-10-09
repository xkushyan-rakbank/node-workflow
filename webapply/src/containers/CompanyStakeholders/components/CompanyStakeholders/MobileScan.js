import React, { useState } from "react";
import { Button, Modal } from "@material-ui/core";
import { ReactComponent as VerifyMobileIcon } from "../../../../assets/icons/phoneVerification.svg";
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
          <div className={classes.moveToMobile}>
            <h6>Move to mobile (faster)</h6>
            <p>
              Make sure to either have your Emirates ID and passport on hand for scanning or that
              you have clear images of them on your phone in JPG, PNG or PDF format.
            </p>
          </div>
        </div>
        <Button
          color="primary"
          variant="outlined"
          className={classes.actionButton}
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

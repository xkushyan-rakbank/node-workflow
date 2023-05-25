import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import cx from "classnames";

import { useStyles } from "./styled";

export const QRCodeScanModal = ({ handleClose }) => {
  const classes = useStyles();

  const [linkData, setLinkdata] = useState();

  return (
    <div className={cx(classes.paper, classes.qrCodeScanContainer)}>
      <CloseIcon onClick={handleClose} className={classes.uploadModalCloseIcon} />
      <img
        className={classes.qrCode}
        alt="link"
        src={`data:image/png;base64,${linkData?.qrCode}`}
      />
      <h3 className={classes.mainTitle}>
        Grab your phone and scan this QR code to continue via mobile
      </h3>
      <p className={classes.subTitle}>
        This is to take your picture and check that your face and photo ID match.
      </p>
      <div className={classes.qrScanInstructions}>
        <ol>
          <li>Open your phone&apos;s camera or code scanner.</li>
          <li>Point it at this screen to scan the code.</li>
          <li>You&apos;ll be redirected to the mobile website to finish the process.</li>
        </ol>
      </div>
      <a className={classes.getHelpLink}>Get help</a>
    </div>
  );
};

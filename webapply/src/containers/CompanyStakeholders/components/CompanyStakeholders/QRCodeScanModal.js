import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import cx from "classnames";

import { QR_CODE_SIZE, QR_CODE_REFRESH_BEFORE_SECONDS, SESSION_TYPE } from "../../../../constants";
import { webToMobile } from "../../../../api/apiClient";
import { getAuthorizationHeader, getProspectId } from "../../../../store/selectors/appConfig";
import { getTransactionId, getUserToken } from "../../../../store/selectors/kyc";
import { useStyles } from "./styled";

export const QRCodeScanModal = ({ handleClose, individualId }) => {
  const classes = useStyles();
  const prospectId = useSelector(getProspectId);
  const header = useSelector(getAuthorizationHeader);
  const transactionId = useSelector(getTransactionId);
  const userToken = useSelector(getUserToken);

  const [linkData, setLinkdata] = useState();

  const reqData = {
    sessionType: SESSION_TYPE,
    individualId,
    height: QR_CODE_SIZE,
    width: QR_CODE_SIZE
  };

  const generateQRCode = async () => {
    const generateQRData = {
      ...reqData,
      data: {
        prospectId,
        kycTransaction: {
          id: transactionId,
          userToken
        }
      }
    };
    const qrCodeResp = await webToMobile.generateQRCode(prospectId, generateQRData, header);
    setLinkdata(qrCodeResp);
  };

  const refreshQRCode = async () => {
    const webToMobileRefId = linkData.webToMobileRefId;
    const refreshCodeResp = await webToMobile.refreshQRCode(
      prospectId,
      webToMobileRefId,
      reqData,
      header
    );
    setLinkdata(refreshCodeResp);
  };
  useEffect(() => {
    let refreshTimeoutHandle;
    if (!linkData) {
      generateQRCode();
    } else {
      const qrCodeTimeOut =
        new Date(linkData.expiresAt).getTime() -
        new Date().getTime() -
        QR_CODE_REFRESH_BEFORE_SECONDS; // before 10 seconds of expiry
      refreshTimeoutHandle = setTimeout(refreshQRCode, qrCodeTimeOut);
    }
    return () => {
      console.log("Cleaning up", refreshTimeoutHandle);
      refreshTimeoutHandle && clearTimeout(refreshTimeoutHandle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkData]);

  return (
    <div className={cx(classes.paper, classes.qrCodeScanContainer)}>
      <CloseIcon onClick={handleClose} className={classes.uploadModalCloseIcon} />
      <div className={classes.qrCode}>
        <img alt="QR code link" src={`data:image/png;base64,${linkData?.qrCode}`} />
      </div>
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

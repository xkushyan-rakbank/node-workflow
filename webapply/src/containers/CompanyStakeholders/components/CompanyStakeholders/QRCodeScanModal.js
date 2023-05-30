import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { CircularProgress } from "@material-ui/core";
import cx from "classnames";

import {
  QR_CODE_SIZE,
  QR_CODE_REFRESH_BEFORE_SECONDS,
  SESSION_TYPE,
  WTM_STATUS
} from "../../../../constants";
import { webToMobile } from "../../../../api/apiClient";
import {
  getApplicantFullName,
  getAuthorizationHeader,
  getProspectId
} from "../../../../store/selectors/appConfig";
import { getTransactionId, getUserToken } from "../../../../store/selectors/kyc";
import { useStyles } from "./styled";

export const QRCodeScanModal = ({ handleClose, individualId }) => {
  const classes = useStyles();
  const prospectId = useSelector(getProspectId);
  const fullname = useSelector(getApplicantFullName);
  const header = useSelector(getAuthorizationHeader);
  const transactionId = useSelector(getTransactionId);
  const userToken = useSelector(getUserToken);

  const [linkData, setLinkdata] = useState();
  const [pollStatus, setPollStatus] = useState();

  const qrCodeContent = (
    <>
      <CloseIcon onClick={handleClose} className={classes.uploadModalCloseIcon} />
      <div className={classes.qrCode}>
        <img alt="QR code link" src={`data:image/png;base64,${linkData?.qrCode}`} />
      </div>
      <h3 className={classes.mainTitle}>
        Grab your phone and scan this QR code to continue via mobile
      </h3>
      <p className={classes.subTitle}>
        You'll then be able to upload or scan your documents and complete the face ID step.
      </p>
      <div className={classes.qrScanInstructions}>
        <ol>
          <li>Open your phone&apos;s camera or code scanner.</li>
          <li>Point it at this screen to scan the code.</li>
          <li>You&apos;ll be redirected to the mobile website to finish the process.</li>
        </ol>
      </div>
      <a className={classes.getHelpLink}>Get help</a>
    </>
  );

  const mobileSessionActiveContent = (
    <>
      <div className={classes.progressIcon}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          thickness={4}
          value={100}
          size={60}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle
          }}
          thickness={4}
          size={60}
        />
      </div>
      <h3 className={classes.mainTitle}>Your mobile session is active now….”</h3>
      <p className={classes.subTitle}>
        Please complete your document upload/scan and EFR via your mobile then you'll be able to
        continue the section in desktop once the mobile section is deactivated
      </p>
    </>
  );

  let content = qrCodeContent;

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
        fullname,
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
    const webToMobileRefId = linkData?.webToMobileRefId;
    const refreshCodeResp = await webToMobile.refreshQRCode(
      prospectId,
      webToMobileRefId,
      reqData,
      header
    );
    setLinkdata(refreshCodeResp);
  };

  const pollQRcode = async () => {
    const webToMobileRefId = linkData?.webToMobileRefId;
    const pollResp = await webToMobile.checkQRCodeStatus(prospectId, webToMobileRefId, header);
    setPollStatus(pollResp);
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

  useEffect(() => {
    let refreshPollInterval;
    if (pollStatus === WTM_STATUS.FINISHED) {
      clearInterval(refreshPollInterval);
      handleClose();
    }
    if (linkData) {
      refreshPollInterval = setInterval(pollQRcode, 20000);
    }

    return () => {
      refreshPollInterval && clearInterval(refreshPollInterval);
    };
  }, [linkData]);

  useEffect(() => {
    if (pollStatus === WTM_STATUS.IN_PROGRESS) {
      content = mobileSessionActiveContent;
    }
  }, [pollStatus]);

  return <div className={cx(classes.paper, classes.qrCodeScanContainer)}>{content}</div>;
};

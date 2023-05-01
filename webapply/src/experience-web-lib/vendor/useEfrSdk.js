/* eslint-disable no-undef */
import { useState } from "react";

const useEfrSdk = () => {
  // const [isLivenessSdkReady, setIsLivenessSdkReady] = useState(false);
  // const [livenessSdkError, setLivenessSdkError] = useState();
  const [isOcrSdkReady, setIsOcrSdkReady] = useState(false);
  const [ocrSdkError, setOcrSdkError] = useState();

  // const initializeLivenessSdk = async ({
  //   localizedMessagesLiveness,
  //   livenessChecklist,
  //   sdkConfig,
  //   tempKey
  // }) => {
  //   EfrSDK.getInstance.initialize({
  //     configValue: sdkConfig,
  //     secretKey: tempKey,
  //     on_success: function() {
  //       EfrSDK.getInstance.setLivenessChecks(livenessChecklist);
  //       EfrSDK.getInstance.setLocale(localizedMessagesLiveness);
  //       EfrSDK.getInstance.setTimeout(9000);
  //       setIsLivenessSdkReady(true);
  //       console.log(EfrSDK.getInstance.getVersion(), EfrSDK.getInstance.getExpiryDate());
  //     },
  //     on_error: setLivenessSdkError
  //   });
  // };

  // const startLivenessCheck = async options => {
  //   if (!isLivenessSdkReady) throw new Error("Liveness check SDK is not ready!");
  //   // eslint-disable-next-line no-undef
  //   return EfrSDK.getInstance.startProcess(options);
  // };

  // const executeLivenessFeedback = feedbackData =>
  //   new Promise((resolve, reject) => {
  //     console.log("feedbackData", feedbackData);
  //     EfrSDK.getInstance.executeFeedback({
  //       data: feedbackData,
  //       on_result: function(result) {
  //         resolve(result);
  //       },
  //       on_error: function(error) {
  //         reject(error);
  //       }
  //     });
  //   });

  const initializeOCRScanSdk = async ({ localizedMessagesOcr, sdkConfig }) => {
    console.log("hit");
    console.log("OCRSDK", OCRSDK);
    OCRSDK.getInstance.initialize({
      configValue: sdkConfig,
      locale: localizedMessagesOcr,
      on_complete(message) {
        console.log("OCR SDK READY");
        console.log(message);
        setIsOcrSdkReady(true);
      },
      on_error(err) {
        console.log(err);
        setOcrSdkError(error);
      }
    });
  };

  const startOcrScan = async options => {
    if (!isOcrSdkReady) throw new Error("OCR SDK is not ready!");
    // eslint-disable-next-line no-undef
    return OCRSDK.getInstance.startProcess(options);
  };

  const analyzeOcrScanResult = async ocrScanResult => {
    console.log(ocrScanResult);
    const data = {
      bundleId: "",
      document: ocrScanResult.images[0].replace("data:image/jpeg;base64,", "")
    };

    if (ocrScanResult.type === 1) {
      data.documentBack = ocrScanResult.images[1].replace("data:image/jpeg;base64,", "");
    }

    const headers = toAuthHeader(authToken);
    headers.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify(data),
      redirect: "follow"
    };

    try {
      const anayzeResp = await fetch(baseUrl + "v3/sdk/ocr/analyze", requestOptions);
      return {
        scanData: ocrScanResult,
        analysisData: JSON.parse(await anayzeResp.text())
      };
    } catch {
      console.error("Error in analyzing OCR scan", error);
    }
  };

  const stopOcrScan = async () => {
    OCRSDK.getInstance.close();
  };

  return {
    // initializeLivenessSdk,
    // isLivenessSdkReady,
    // livenessSdkError,
    // startLivenessCheck,
    // executeLivenessFeedback,
    initializeOCRScanSdk,
    isOcrSdkReady,
    ocrSdkError,
    startOcrScan,
    analyzeOcrScanResult,
    stopOcrScan
  };
};

export default useEfrSdk;

import { useEffect, useState } from "react";
import useEfrSdk from "../vendor/useEfrSdk";
import { defaultLocaleMessages } from "./defaults";

const useOcrScanner = options => {
  const { localizedMessagesOcr = defaultLocaleMessages, sdkConfig } = options;
  const [ocrScanError, setOcrScanError] = useState();
  const [ocrScanResult, setOcrScanResult] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanInProgess, setScanInprogress] = useState(false);

  const {
    initializeOCRScanSdk,
    isOcrSdkReady,
    ocrSdkError,
    startOcrScan: startSdkOcrScan,
    stopOcrScan
  } = useEfrSdk();

  const ocrScanOptions = ({ scanType, onScanData, onClose } = {}) => ({
    scanType,
    async on_result(scanResult) {
      setScanInprogress(false);
      setIsProcessing(true);
      setOcrScanResult(scanResult);
      onScanData && onScanData(scanResult);
      setIsProcessing(false);
    },
    on_progress() {
      setScanInprogress(true);
    },
    on_error(error) {
      setOcrScanError(error);
      setScanInprogress(false);
    },
    on_close(message) {
      resetState();
      onClose && onClose();
    }
  });

  const startOcrScan = ({ scanType, onScanData, onClose }) => {
    resetState();
    return startSdkOcrScan({ ...ocrScanOptions({ scanType, onScanData, onClose }), scanType });
  };

  useEffect(() => {
    if (sdkConfig) {
      initializeOCRScanSdk({ localizedMessagesOcr, sdkConfig });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkConfig]);

  const resetState = () => {
    setScanInprogress(false);
    setIsProcessing(false);
    setOcrScanError(null);
    setOcrScanResult(null);
  };

  const elementsProps = {
    isOcrScannerReady: isOcrSdkReady,
    scanInProgess,
    stopOcrScan
  };

  return {
    isOcrScannerReady: isOcrSdkReady,
    startOcrScan,
    ocrInitError: ocrSdkError,
    isProcessing,
    ocrScanError,
    ocrScanResult,
    stopOcrScan,
    elementsProps,
    scanInProgess
  };
};

export default useOcrScanner;

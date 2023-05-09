import { useEffect, useState } from "react";
import useEfrSdk from "../vendor/useEfrSdk";
import { defaultLivenessCheckList, defaultLocaleMessages } from "./defaults";

const useFaceScan = options => {
  const {
    localizedMessagesLiveness = defaultLocaleMessages,
    livenessChecklist = defaultLivenessCheckList,
    sdkConfig,
    tempKey
  } = options;
  const [livenessCheckError, setLivenessCheckError] = useState();
  const [livenessCheckResult, setLivenessCheckResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const {
    initializeLivenessSdk,
    isLivenessSdkReady,
    livenessSdkError,
    startLivenessCheck: startSdkLivenessCheck,
    executeLivenessFeedback
  } = useEfrSdk();

  const livenessCheckOptions = ({ onResult }) => ({
    on_progress() {
      setIsLoading(true);
    },
    async on_feedback(result) {
      setIsLoading(false);
      setLivenessCheckResult(result);

      onResult && onResult(result);
    },
    on_error(error) {
      setIsLoading(false);
      setLivenessCheckError(error);
    },
    on_close() {
      resetState();
    },
    on_timeout() {
      resetState();
      console.log("on_timeout========");
    }
  });

  const startLivenessCheck = ({ onResult }) => {
    resetState();
    return startSdkLivenessCheck(livenessCheckOptions({ onResult }));
  };

  useEffect(() => {
    if (sdkConfig && tempKey) {
      initializeLivenessSdk({
        localizedMessagesLiveness,
        livenessChecklist,
        sdkConfig,
        tempKey
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkConfig, tempKey]);

  const resetState = () => {
    setIsLoading(false);
    setLivenessCheckError(null);
    setLivenessCheckResult(null);
  };

  return {
    isLivenessCheckReady: isLivenessSdkReady,
    startLivenessCheck,
    executeLivenessFeedback,
    livenessInitError: livenessSdkError,
    isLoading,
    livenessCheckError,
    livenessCheckResult
  };
};

export default useFaceScan;

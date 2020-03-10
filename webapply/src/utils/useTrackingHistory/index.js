import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { sendGoogleAnalyticsMetrics } from "../../store/actions/googleAnalytics";
import { gaEventsMap } from "./constants";

export const useTrackingHistory = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (path, isReplaceHistory = false) => {
    dispatch(sendGoogleAnalyticsMetrics(gaEventsMap[path]));
    if (isReplaceHistory) {
      history.replace(path);
    } else {
      history.push(path);
    }
  };
};

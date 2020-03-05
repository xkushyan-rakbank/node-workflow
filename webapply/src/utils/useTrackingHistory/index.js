import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { sendGoogleAnalyticsMetrics } from "../../store/actions/googleAnalytics";
import { gaEventsMap, REPLACE } from "./constants";

export const useTrackingHistory = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (path, method) => {
    dispatch(sendGoogleAnalyticsMetrics(gaEventsMap[path]));
    if (method === REPLACE) {
      history.replace(path);
    } else {
      history.push(path);
    }
  };
};

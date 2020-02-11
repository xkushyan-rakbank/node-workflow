import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { sendGoogleAnalyticsMetrics } from "../../store/actions/googleAnalytics";
import { gaEventsMap } from "./constants";

export const useTrackingHistory = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return path => {
    dispatch(sendGoogleAnalyticsMetrics(gaEventsMap[path]));
    history.push(path);
  };
};

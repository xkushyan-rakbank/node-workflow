import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { sendGoogleAnalyticsMetrics } from "../../store/actions/googleAnalytics";
import { gaEventsMap } from "./constants";

export const useTrackingHistory = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (path, isReplaceHistory = false, state = null) => {
    dispatch(sendGoogleAnalyticsMetrics(gaEventsMap[path]));
    const goTo = isReplaceHistory ? history.replace : history.push;
    goTo(path, state);
  };
};

import get from "lodash/get";
import { GA } from "../utils/ga";

export const googleAnalyticsMiddleware = ({ eventType }) => GA.triggerEvent(eventType);
const handleAction = (_, next, action) => {
  const analytics = get(action, "meta.analytics");
  if (analytics) {
    const { eventType } = analytics;

    googleAnalyticsMiddleware({ eventType });
  }

  return next(action);
};

export function createGoogleAnalyticsMiddleware(options = {}) {
  return store => next => action => handleAction(store, next, action, options);
}

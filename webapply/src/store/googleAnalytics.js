import get from "lodash/get";
import { GA } from "../utils/ga";

export const googleAnalyticsMiddleware = ({ eventType }) => GA.triggerEvent(eventType);
const handleAction = (store, next, action) => {
  if (get(action, "meta.analytics")) {
    const { eventType } = action.meta.analytics;
    googleAnalyticsMiddleware({ eventType });
  }

  return next(action);
};

export function createGoogleAnalyticsMiddleware(options = {}) {
  return store => next => action => handleAction(store, next, action, options);
}

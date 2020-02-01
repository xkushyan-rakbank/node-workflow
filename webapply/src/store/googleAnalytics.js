import { GA } from "../utils/ga";

export const googleAnalyticsMiddleware = ({ eventType }) => GA.triggerEvent(eventType);
const handleAction = (store, next, action) => {
  if (!action.meta || !action.meta.analytics) {
    return next(action);
  }

  const { eventType } = action.meta.analytics;

  googleAnalyticsMiddleware({ eventType });

  return next(action);
};

export function createGoogleAnalyticsMiddleware(options = {}) {
  return store => next => action => handleAction(store, next, action, options);
}

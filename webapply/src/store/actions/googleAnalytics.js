import analytics from "redux-analytics";
import { GA } from "../../utils/ga";

export const googleAnalyticsMiddleware = analytics(({ type, payload }) =>
  GA.triggerEvent(type, payload)
);
const handleAction = (store, next, action, options) => {
  if (!action.meta || !action.meta.analytics) {
    return next(action);
  }

  const { eventType, eventPayload } = action.meta.analytics;

  googleAnalyticsMiddleware(eventType, eventPayload);

  return next(action);
};

export function createAnalytics(options = {}) {
  return store => next => action => handleAction(store, next, action, options);
}

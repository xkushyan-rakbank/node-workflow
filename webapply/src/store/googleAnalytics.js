import get from "lodash/get";
import { GA } from "../utils/ga";

export const googleAnalyticsMiddleware = data => GA.triggerEvent(data);

const handleAction = (store, next, action) => {
  const analytics = get(action, "meta.analytics");
  if (analytics) {
    const { accountType } = store.getState().appConfig.prospect.applicationInfo;
    const { eventType } = analytics;

    googleAnalyticsMiddleware({ event: eventType, accountType });
  }

  return next(action);
};

export function createGoogleAnalyticsMiddleware() {
  return store => next => action => handleAction(store, next, action);
}

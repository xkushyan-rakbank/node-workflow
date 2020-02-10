import get from "lodash/get";
import pick from "lodash/pick";
import { GA } from "../utils/ga";
import { store } from "../store";

export const googleAnalyticsMiddleware = data => GA.triggerEvent(data);
const handleAction = (_, next, action) => {
  const applicationInfo = store.getState().appConfig.prospect.applicationInfo;
  const { accountType } = pick(applicationInfo, ["accountType", "islamicBanking"]);
  const analytics = get(action, "meta.analytics");
  if (analytics) {
    const { event } = analytics;

    googleAnalyticsMiddleware({ event, accountType });
  }

  return next(action);
};

export function createGoogleAnalyticsMiddleware(options = {}) {
  return store => next => action => handleAction(store, next, action, options);
}

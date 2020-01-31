import analytics from "redux-analytics";
import { GA } from "../../utils/ga";

export const googleAnalyticsMiddleware = analytics(({ type, payload }) =>
  GA.triggerEvent(type, payload)
);

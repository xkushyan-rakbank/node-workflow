export const SEND_GOOGLE_ANALYTICS_METRICS = "SEND_GOOGLE_ANALYTICS_METRICS";

export const appendGaEventToAction = (action, gaEvent = null) => {
  if (gaEvent) {
    action.meta = {
      ...(action.meta || {}),
      analytics: {
        eventType: gaEvent
      }
    };
  }

  return action;
};

export function sendGoogleAnalyticsMetrics(event) {
  return {
    type: SEND_GOOGLE_ANALYTICS_METRICS,
    event,
    meta: {
      analytics: {
        eventType: event
      }
    }
  };
}

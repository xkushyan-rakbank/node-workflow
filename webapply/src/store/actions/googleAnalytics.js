export const SEND_GOOGLE_ANALYTICS_METRICS = "SEND_GOOGLE_ANALYTICS_METRICS";

export function addMeta(action, event) {
  const analytics = {
    eventType: event
  };

  return { ...action, meta: { analytics } };
}

export function sendGoogleAnalyticsMetrics(eventName) {
  return addMeta(
    {
      type: SEND_GOOGLE_ANALYTICS_METRICS,
      eventName
    },
    eventName
  );
}

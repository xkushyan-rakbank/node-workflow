export const SEND_GOOGLE_ANALYTICS_METRICS = "SEND_GOOGLE_ANALYTICS_METRICS";

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

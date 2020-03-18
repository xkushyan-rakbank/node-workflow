import {
  appendGaEventToAction,
  sendGoogleAnalyticsMetrics,
  SEND_GOOGLE_ANALYTICS_METRICS
} from "../googleAnalytics";

describe("google analytics actions", () => {
  it("should create an action to login loginInfoFormPromisify", () => {
    const action = {};
    const gaEvent = {};
    action.meta = {
      ...(action.meta || {}),
      analytics: {
        eventType: gaEvent
      }
    };
    expect(appendGaEventToAction(action)).toEqual(action);
  });

  it("should create an action to login loginInfoFormPromisify", () => {
    const action = {};
    expect(appendGaEventToAction(action)).toEqual(action);
  });

  it("should create an action to login infoFormSuccess", () => {
    const event = "";
    const expectedAction = {
      type: SEND_GOOGLE_ANALYTICS_METRICS,
      event,
      meta: {
        analytics: {
          eventType: event
        }
      }
    };
    expect(sendGoogleAnalyticsMetrics(event)).toEqual(expectedAction);
  });
});

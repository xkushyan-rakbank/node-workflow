import { GA } from "../../src/utils/ga";
import { createGoogleAnalyticsMiddleware } from "../../src/store/googleAnalytics";

describe("google analytics middlware test", () => {
  const accountType = "some account type";
  const eventType = "some event type";
  const store = {
    getState: () => ({ appConfig: { prospect: { applicationInfo: { accountType } } } })
  };

  it("should send event to GA", done => {
    const action = { meta: { analytics: { eventType } } };
    const next = act => {
      expect(act).toBe(action);
      done();
    };
    const spy = jest.spyOn(GA, "triggerEvent").mockReturnValue(null);

    createGoogleAnalyticsMiddleware()(store)(next)(action);
    expect(spy.mock.calls[0]).toEqual([{ event: eventType, accountType }]);

    spy.mockRestore();
  });

  it("should do nothing when eventType is not set", done => {
    const action = {};
    const next = act => {
      expect(act).toBe(action);
      done();
    };

    createGoogleAnalyticsMiddleware()(store)(next)(action);
  });
});

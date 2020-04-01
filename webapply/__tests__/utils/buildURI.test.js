import { buildURI, getQueryString } from "../../src/utils/buildURI";
import { store } from "../../src/store";
import { SEGMENT } from "../../src/api/apiClient";
import routes from "../../src/routes";
import { accountNames } from "../../src/constants";

jest.mock("../../src/store", () => ({
  store: {
    getState: jest.fn()
  }
}));

describe("buildURI test", () => {
  it("should return valid uri for customer", () => {
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: routes.MyApplications
      }
    }));

    store.getState.mockImplementation(() => ({ appConfig: { searchInfo: { segment: "sme" } } }));
    const expectValue = "/webapply/api/v1/usertypes/sme/prospects/123456";
    expect(buildURI("getProspectUri", 123456)).toEqual(expectValue);

    windowSpy.mockRestore();
  });

  it("should return valid uri for agent", () => {
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: routes.SearchedAppInfo
      }
    }));

    store.getState.mockImplementation(() => ({ appConfig: { searchInfo: { segment: "retail" } } }));
    const expectValue = "/webapply/api/v1/usertypes/retail/prospects/123456";
    expect(buildURI("getProspectUri", 123456)).toEqual(expectValue);

    windowSpy.mockRestore();
  });

  it("should return queryString without product parameter", () => {
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: routes.login
      }
    }));

    const qs = "?segment=sme&role=agent";
    expect(getQueryString(null, SEGMENT)).toEqual(qs);

    windowSpy.mockRestore();
  });

  it("should return queryString without product parameter", () => {
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: routes.accountsComparison
      }
    }));

    const qs = `?segment=sme&product=${accountNames.elite}&role=customer`;
    expect(getQueryString(accountNames.elite, SEGMENT)).toEqual(qs);

    windowSpy.mockRestore();
  });
});

import { composeInputKeyFromValidationData } from "../../src/utils/composeInputKeyFromValidationData";

describe("composeInputKeyFromValidationData tests", () => {
  it("should compose input keys from validation data", () => {
    const customPath = { fieldPath: "customPath" };
    const data = { fieldPath: "applicantInfo.email" };
    const dataProspect = { fieldPath: "prospect.applicantInfo.email" };
    const windowSpy = jest.spyOn(global, "window", "get");

    expect(composeInputKeyFromValidationData(customPath)).toStrictEqual("prospect.customPath");

    expect(composeInputKeyFromValidationData(dataProspect)).toStrictEqual(
      "prospect.applicantInfo.email"
    );

    windowSpy.mockImplementation(() => ({
      location: {
        pathname: "/agent/Login"
      }
    }));
    expect(composeInputKeyFromValidationData(data)).toStrictEqual("login.applicantInfo.email");

    windowSpy.mockImplementation(() => ({
      location: {
        pathname: "/agent/SearchProspect"
      }
    }));
    expect(composeInputKeyFromValidationData(data)).toStrictEqual("searchInfo.applicantInfo.email");

    windowSpy.mockRestore();
  });
});

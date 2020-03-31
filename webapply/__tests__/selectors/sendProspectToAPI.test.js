import {
  getSendProspectToAPIInfo,
  getIsSendingProspect,
  getScreeningError
} from "../../src/store/selectors/appConfig";

describe("sendProspectToAPI selector test", () => {
  const loading = true;
  const screeningError = "some error";
  const sendProspectToAPI = { loading, screeningError };

  it("should return sendProspectToAPI", () => {
    expect(getSendProspectToAPIInfo({ sendProspectToAPI })).toBe(sendProspectToAPI);
  });

  it("should return loading field value", () => {
    expect(getIsSendingProspect({ sendProspectToAPI })).toBe(loading);
  });

  it("should return screeningError", () => {
    expect(getScreeningError({ sendProspectToAPI })).toBe(screeningError);
  });
});

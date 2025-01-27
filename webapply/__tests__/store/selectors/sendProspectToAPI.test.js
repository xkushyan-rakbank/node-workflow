import {
  getIsSendingProspect,
  getScreeningError,
  getSendProspectToAPIInfo
} from "../../../src/store/selectors/sendProspectToAPI";

describe("sendProspectToAPI selector test", () => {
  const loading = true;
  const screeningError = "some error";
  const sendProspectToAPI = { loading, screeningError };

  it("should return sendProspectToAPI", () => {
    expect(getSendProspectToAPIInfo({ sendProspectToAPI })).toBe(sendProspectToAPI);
  });

  it("should return empty object when sendProspectToAPI is not set", () => {
    expect(getSendProspectToAPIInfo({})).toEqual({});
  });

  it("should return loading field value", () => {
    expect(getIsSendingProspect({ sendProspectToAPI })).toBe(loading);
  });

  it("should return screeningError", () => {
    expect(getScreeningError({ sendProspectToAPI })).toBe(screeningError);
  });
});

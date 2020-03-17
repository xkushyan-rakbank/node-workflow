import {
  SCREEN_PROSPECT_SEND,
  SCREEN_PROSPECT_REQUEST,
  SCREEN_PROSPECT_SUCCESS,
  SCREEN_PROSPECT_RESET,
  screenProspect,
  screenProspectRequest,
  screenProspectSuccess,
  screenProspectReset
} from "../screenProspect";

describe("actions for screenProspect", () => {
  it("should create an action to screen prospect send", () => {
    const prospectId = "12345";
    const expectedAction = {
      type: SCREEN_PROSPECT_SEND,
      payload: { prospectId }
    };
    expect(screenProspect(prospectId)).toEqual(expectedAction);
  });

  it("should create an action to screen prospect request", () => {
    const prospectId = "12345";
    const expectedAction = {
      type: SCREEN_PROSPECT_REQUEST,
      payload: { prospectId }
    };
    expect(screenProspectRequest(prospectId)).toEqual(expectedAction);
  });

  it("should create an action to screen prospect success", () => {
    const prospectId = "12345";
    const screeningResult = {};
    const expectedAction = {
      type: SCREEN_PROSPECT_SUCCESS,
      payload: { prospectId, screeningResult }
    };
    expect(screenProspectSuccess(prospectId, screeningResult)).toEqual(expectedAction);
  });

  it("should create an action to screen prospect reset", () => {
    const prospectId = "12345";
    const expectedAction = {
      type: SCREEN_PROSPECT_RESET,
      payload: { prospectId }
    };
    expect(screenProspectReset(prospectId)).toEqual(expectedAction);
  });
});

import reducer from "../../../src/store/reducers/screenProspect";
import {
  screenProspectRequest,
  screenProspectSuccess,
  screenProspectReset
} from "../../../src/store/actions/screenProspect";
import { REQUEST_LOADING, REQUEST_SUCCESS } from "../../../src/constants";

describe("screenProspect reducer test", () => {
  it("should handle SCREEN_PROSPECT_REQUEST action type", () => {
    const prospectId = "123456";

    expect(reducer(undefined, screenProspectRequest(prospectId))).toStrictEqual({
      [prospectId]: {
        status: REQUEST_LOADING
      }
    });
  });

  it("should handle SCREEN_PROSPECT_SUCCESS action type", () => {
    const prospectId = "123456";
    const screeningResult = {};

    expect(reducer(undefined, screenProspectSuccess(prospectId, screeningResult))).toStrictEqual({
      [prospectId]: {
        status: REQUEST_SUCCESS,
        data: { screeningResult, prospectId }
      }
    });
  });

  it("should handle SCREEN_PROSPECT_RESET action type", () => {
    const prospectId = "123456";
    const updatedState = {
      [prospectId]: {}
    };

    expect(reducer(updatedState, screenProspectReset(prospectId))).toStrictEqual({});
  });
});

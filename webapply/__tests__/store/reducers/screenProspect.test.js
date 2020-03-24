import reducer, { initialState } from "../../../src/store/reducers/screenProspect";
import {
  screenProspectRequest,
  screenProspectSuccess,
  screenProspectReset
} from "../../../src/store/actions/screenProspect";
import { REQUEST_LOADING, REQUEST_SUCCESS } from "../../../src/constants";

describe("screenProspect reducer test", () => {
  it("SCREEN_PROSPECT_REQUEST action type", () => {
    const prospectId = "123456";
    const expectedState = {
      ...initialState,
      [prospectId]: {
        status: REQUEST_LOADING
      }
    };
    expect(reducer(initialState, screenProspectRequest(prospectId))).toStrictEqual(expectedState);
  });

  it("SCREEN_PROSPECT_SUCCESS action type", () => {
    const prospectId = "123456";
    const screeningResult = {};
    const expectedState = {
      ...initialState,
      [prospectId]: {
        status: REQUEST_SUCCESS,
        data: { screeningResult, prospectId }
      }
    };
    expect(reducer(initialState, screenProspectSuccess(prospectId, screeningResult))).toStrictEqual(
      expectedState
    );
  });

  it("SCREEN_PROSPECT_RESET action type", () => {
    const [prospectId, secondProspectId] = ["123456", "654321"];
    const screeningResult = {};
    const updatedState = {
      ...initialState,
      [prospectId]: {
        status: REQUEST_SUCCESS,
        data: { screeningResult, prospectId }
      },
      [secondProspectId]: {
        status: REQUEST_SUCCESS,
        data: { screeningResult, prospectId: secondProspectId }
      }
    };

    const { [prospectId]: ommited, ...expectedState } = updatedState;
    expect(reducer(updatedState, screenProspectReset(prospectId))).toStrictEqual(expectedState);
  });
});

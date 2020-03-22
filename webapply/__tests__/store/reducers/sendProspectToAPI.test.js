import reducer, { initialState } from "../../../src/store/reducers/sendProspectToAPI";
import {
  sendProspectToAPI,
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  resetFormStep,
  setScreeningError,
  resetScreeningError
} from "../../../src/store/actions/sendProspectToAPI";
import { UNMATCHED_ACTION } from "../../../__mocks__/storeMock";

describe("sendProspectToAPI reducer test", () => {
  it("SEND_PROSPECT_TO_API action type", () => {
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(reducer(initialState, sendProspectToAPI())).toStrictEqual(expectedState);
  });

  it("SEND_PROSPECT_TO_API_SUCCESS action type", () => {
    const expectedState = {
      ...initialState,
      loading: false
    };
    expect(reducer({ ...initialState, loading: true }, sendProspectToAPISuccess())).toStrictEqual(
      expectedState
    );
  });

  it("SEND_PROSPECT_TO_API_FAIL action type", () => {
    const expectedState = {
      ...initialState,
      loading: false
    };
    expect(reducer({ ...initialState, loading: true }, sendProspectToAPIFail())).toStrictEqual(
      expectedState
    );
  });

  it("RESET_FORM_STEP action type", () => {
    const expectedState = {
      ...initialState,
      resetStep: true
    };
    expect(reducer(initialState, resetFormStep({ resetStep: true }))).toStrictEqual(expectedState);
  });

  it("SET_SCREENING_ERROR action type", () => {
    const screeningError = {
      error: "error message"
    };
    const expectedState = {
      ...initialState,
      screeningError
    };
    expect(reducer(initialState, setScreeningError(screeningError))).toStrictEqual(expectedState);
  });

  it("RESET_SCREENING_ERROR action type", () => {
    const screeningError = {
      error: "error message"
    };
    const updatedState = {
      ...initialState,
      screeningError
    };
    expect(reducer(updatedState, resetScreeningError())).toStrictEqual(initialState);
  });

  it("check default action type", () => {
    expect(reducer(initialState, UNMATCHED_ACTION)).toStrictEqual(initialState);
  });
});

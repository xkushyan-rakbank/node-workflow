import reducer, { initialState } from "../../../src/store/reducers/sendProspectToAPI";
import {
  sendProspectToAPI,
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  resetFormStep,
  setScreeningError,
  resetScreeningError
} from "../../../src/store/actions/sendProspectToAPI";

describe("sendProspectToAPI reducer test", () => {
  it("should handle SEND_PROSPECT_TO_API action type", () => {
    expect(reducer(undefined, sendProspectToAPI())).toMatchObject({
      loading: true
    });
  });

  it("should handle SEND_PROSPECT_TO_API_SUCCESS action type", () => {
    expect(reducer({ ...initialState, loading: true }, sendProspectToAPISuccess())).toMatchObject({
      loading: false
    });
  });

  it("should handle SEND_PROSPECT_TO_API_FAIL action type", () => {
    expect(reducer({ ...initialState, loading: true }, sendProspectToAPIFail())).toMatchObject({
      loading: false
    });
  });

  it("should handle RESET_FORM_STEP action type", () => {
    expect(reducer(undefined, resetFormStep(true))).toMatchObject({
      resetStep: true
    });
  });

  it("should handle SET_SCREENING_ERROR action type", () => {
    const screeningError = {
      error: "error message"
    };

    expect(reducer(undefined, setScreeningError(screeningError))).toMatchObject({
      screeningError
    });
  });

  it("should handle RESET_SCREENING_ERROR action type", () => {
    expect(
      reducer({ ...initialState, screeningError: "some error" }, resetScreeningError())
    ).toMatchObject({
      screeningError: {}
    });
  });
});

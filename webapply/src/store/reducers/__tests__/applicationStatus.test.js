import { initialState } from "../applicationStatus";
import applicationStatusReducer from "../applicationStatus";

import {
  applicationStatusProceed,
  applicationStatusStop,
  applicationStatusServerError,
  applicationStatusReset
} from "../../actions/applicationStatus";

describe("applicationStatus reducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise initialState as the value", () => {
      const { isProceed, serverErorr, screeningResults, uiError } = initialState;

      expect(isProceed).toBe(true);
      expect(serverErorr).toBe(false);
      expect(screeningResults).toEqual({});
      expect(uiError).toBe(false);
    });
  });

  describe("applicationStatusReducer", () => {
    it("applicationStatusProceed should update isProceed", () => {
      const state = applicationStatusReducer(initialState, applicationStatusProceed());
      const { isProceed } = state;
      expect(isProceed).toBe(true);
    });

    describe("applicationStatusStop", () => {
      const testScreeningResults = ["123abc", "abc321"];

      it(" should update isProceed and screeningResults", () => {
        const state = applicationStatusReducer(
          initialState,
          applicationStatusStop(testScreeningResults)
        );
        const { isProceed, screeningResults } = state;
        expect(isProceed).toBe(false);
        expect(screeningResults).toBe(testScreeningResults[0]);
      });
    });

    it("applicationStatusServerError should update serverErorr", () => {
      const state = applicationStatusReducer(initialState, applicationStatusServerError());
      const { serverErorr } = state;
      expect(serverErorr).toBe(true);
    });

    it("applicationStatusReset should update serverErorr,isProceed and screeningResults", () => {
      const state = applicationStatusReducer(initialState, applicationStatusReset());
      const { serverErorr, isProceed, screeningResults } = state;
      expect(serverErorr).toBe(false);
      expect(isProceed).toBe(true);
      expect(screeningResults).toEqual({});
    });
  });
});

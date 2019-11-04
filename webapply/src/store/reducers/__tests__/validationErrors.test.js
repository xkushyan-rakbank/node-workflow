import { initialState } from "../validationErrors";
import validationErrorsReducer from "../validationErrors";

import { updateValidationErrors } from "../../actions/validationErrors";

describe("applicationStatus reducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise initialState as the value", () => {
      expect(initialState).toEqual([{}]);
    });
  });

  describe("validationErrorsReducer", () => {
    const testData = [{ error: "please fill the value" }];

    it("updateValidationErrors should update isProceed", () => {
      const state = validationErrorsReducer(initialState, updateValidationErrors(testData));
      const { error } = state[0];
      expect(error).toBe(testData[0].error);
    });
  });
});

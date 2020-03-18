import {
  SET_INPUTS_ERRORS,
  RESET_INPUTS_ERRORS,
  setInputsErrors,
  resetInputsErrors
} from "../../../src/store/actions/serverValidation";

describe("actions for server validation", () => {
  it("should create an action to set inputs errors", () => {
    const payload = [];
    const expectedAction = {
      type: SET_INPUTS_ERRORS,
      payload
    };
    expect(setInputsErrors(payload)).toEqual(expectedAction);
  });

  it("should create an action to reset inputs errors", () => {
    const expectedAction = {
      type: RESET_INPUTS_ERRORS
    };
    expect(resetInputsErrors()).toEqual(expectedAction);
  });
});

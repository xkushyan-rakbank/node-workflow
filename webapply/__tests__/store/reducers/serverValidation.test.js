import reducer from "../../../src/store/reducers/serverValidation";
import { setInputsErrors, resetInputsErrors } from "../../../src/store/actions/serverValidation";
import { composeInputKeyFromValidationData } from "../../../src/utils/composeInputKeyFromValidationData";

jest.mock("../../../src/utils/composeInputKeyFromValidationData");

describe("serverValidation reducer test", () => {
  it("SET_INPUTS_ERRORS action type", () => {
    composeInputKeyFromValidationData.mockReturnValue("test");
    expect(reducer(undefined, setInputsErrors([{ message: "txt" }]))).toMatchObject({
      inputs: {
        test: {
          message: "txt"
        }
      }
    });
  });

  it("RESET_INPUTS_ERRORS action type", () => {
    expect(reducer({ inputs: "some inputs" }, resetInputsErrors())).toMatchObject({
      inputs: {}
    });
  });
});

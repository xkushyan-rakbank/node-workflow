import reducer, { initialState } from "../../../src/store/reducers/serverValidation";
import { setInputsErrors, resetInputsErrors } from "../../../src/store/actions/serverValidation";
import { FieldsValidationError } from "../../../src/api/serverErrors";
import { UNMATCHED_ACTION } from "../../../__mocks__/storeMock";

describe("serverValidation reducer test", () => {
  const exampleErrorMsg = new FieldsValidationError({
    message: "Error response from DEH Server",
    errorType: "FieldsValidation",
    errors: [
      {
        fieldPath: "applicantInfo.email",
        errorCode: "INV0001",
        errorType: "invalid",
        message: "The text entered is not a valid email format",
        developerText: "Invalid email formal for field applicantInfo.email, [format=email]"
      }
    ]
  });
  const errors = exampleErrorMsg.getInputsErrors();

  it("SET_INPUTS_ERRORS action type", () => {
    const expectedState = {
      ...initialState,
      inputs: {
        "prospect.applicantInfo.email": errors[0]
      }
    };

    expect(reducer(initialState, setInputsErrors(errors))).toStrictEqual(expectedState);
  });

  it("RESET_INPUTS_ERRORS action type", () => {
    const updatedState = {
      ...initialState,
      inputs: {
        "prospect.applicantInfo.email": errors[0]
      }
    };
    expect(reducer(updatedState, resetInputsErrors())).toStrictEqual(initialState);
  });

  it("check default action type", () => {
    expect(reducer(initialState, UNMATCHED_ACTION)).toStrictEqual(initialState);
  });
});

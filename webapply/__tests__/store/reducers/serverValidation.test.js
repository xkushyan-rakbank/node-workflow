import reducer, { initialState, composeInputKeyFromValidationData, replaceDollarsAndDot } from "../../../src/store/reducers/serverValidation";
import { setInputsErrors, resetInputsErrors } from "../../../src/store/actions/serverValidation";

describe("serverValidation reducer test", () => {
  const payload = [
    {
      fieldPath: "applicantInfo.email",
      errorCode: "INV0001",
      errorType: "invalid",
      message: "The text entered is not a valid email format",
      developerText: "Invalid email formal for field applicantInfo.email, [format=email]"
    }
  ]

  it("SET_INPUTS_ERRORS action type", () => {
    const expectedState = {
      ...initialState,
      inputs: {
        "prospect.applicantInfo.email": payload[0]
      }
    };

    expect(reducer(initialState, setInputsErrors(payload))).toStrictEqual(expectedState);
  });

  it("RESET_INPUTS_ERRORS action type", () => {
    const updatedState = {
      ...initialState,
      inputs: {}
    };
    expect(reducer(updatedState, resetInputsErrors())).toStrictEqual(initialState);
  });

  it('composeInputKeyFromValidationData function', () => {
    const data = { fieldPath: "applicantInfo.email" };
    const dataProspect = { fieldPath: "prospect.applicantInfo.email" };
    const windowSpy = jest.spyOn(global, 'window', 'get');
    const mock = jest.fn(composeInputKeyFromValidationData);
    
    expect(mock(dataProspect)).toStrictEqual("prospect.applicantInfo.email");

    windowSpy.mockImplementation(() => ({
      location: {
        pathname: '/agent/Login'
      }
    }));
    expect(mock(data)).toStrictEqual("login.applicantInfo.email");

    windowSpy.mockImplementation(() => ({
      location: {
        pathname: '/agent/SearchProspect'
      }
    }));
    expect(mock(data)).toStrictEqual("searchInfo.applicantInfo.email");
    windowSpy.mockRestore();
  })

  it('replaceDollarsAndDot function', () => {
    const mock = jest.fn(replaceDollarsAndDot);
    expect(mock("test.")).toStrictEqual("test");
    expect(mock(undefined)).toStrictEqual("");
  })
});

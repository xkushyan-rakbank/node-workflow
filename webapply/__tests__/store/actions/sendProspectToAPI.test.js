import { CALLBACK_ARGUMENT, ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";
import {
  PROSPECT_AUTO_SAVE,
  RESET_FORM_STEP,
  RESET_SCREENING_ERROR,
  SEND_PROSPECT_REQUEST,
  SEND_PROSPECT_TO_API,
  SEND_PROSPECT_TO_API_FAIL,
  SEND_PROSPECT_TO_API_SUCCESS,
  SET_SCREENING_ERROR,
  prospectAutoSave,
  resetFormStep,
  resetScreeningError,
  sendProspectToAPI,
  sendProspectToAPIFail,
  sendProspectToAPIPromisify,
  sendProspectToAPISuccess,
  setScreeningError,
  sendProspectRequest
} from "../../../src/store/actions/sendProspectToAPI";
import { NEXT, SAVE } from "../../../src/constants";
import { appendGaEventToAction } from "../../../src/store/actions/googleAnalytics";

jest.mock("../../../src/store/actions/googleAnalytics");

describe("actions for sendProspectToAPI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create send prospect to API action (default arguments)", () => {
    const expectedAction = {
      type: SEND_PROSPECT_TO_API,
      payload: {
        saveType: NEXT,
        actionType: SAVE
      }
    };
    expect(sendProspectToAPI()).toEqual(expectedAction);
  });

  it("should create send prospect to API action (custom arguments)", () => {
    const saveType = "anySaveType";
    const actionType = "anyActionType";
    const expectedAction = {
      type: SEND_PROSPECT_TO_API,
      payload: {
        saveType,
        actionType
      }
    };
    expect(sendProspectToAPI(saveType, actionType)).toEqual(expectedAction);
  });

  it("should create promisified send prospect to API action (default arguments", () => {
    const result = "some result";
    appendGaEventToAction.mockImplementation(() => result);

    expect(sendProspectToAPIPromisify()).toEqual(result);
    expect(appendGaEventToAction.mock.calls[0]).toMatchObject([
      {
        type: SEND_PROSPECT_TO_API,
        [WAIT_FOR_ACTION]: SEND_PROSPECT_TO_API_SUCCESS,
        [ERROR_ACTION]: SEND_PROSPECT_TO_API_FAIL,
        payload: { saveType: NEXT, actionType: SAVE, step: null }
      },
      null
    ]);
    expect(
      appendGaEventToAction.mock.calls[0][0][CALLBACK_ARGUMENT]({ payload: "some payload" })
    ).toEqual("some payload");
  });

  it("should create promisified send prospect to API action (custom arguments)", () => {
    const result = "some result";
    appendGaEventToAction.mockImplementation(() => result);

    const saveType = NEXT;
    const actionType = SAVE;
    const gaEvent = "some event";
    const step = { flowId: "companyInfo", activeStep: 3 };

    expect(sendProspectToAPIPromisify(saveType, gaEvent, actionType, step)).toEqual(result);
    expect(appendGaEventToAction.mock.calls[0]).toMatchObject([
      {
        type: SEND_PROSPECT_TO_API,
        [WAIT_FOR_ACTION]: SEND_PROSPECT_TO_API_SUCCESS,
        [ERROR_ACTION]: SEND_PROSPECT_TO_API_FAIL,
        payload: { saveType, actionType, step }
      },
      gaEvent
    ]);
    expect(
      appendGaEventToAction.mock.calls[0][0][CALLBACK_ARGUMENT]({ payload: "some payload" })
    ).toEqual("some payload");
  });

  it("should create send prospect to API success action", () => {
    const isScreeningError = true;
    const expectedAction = { type: SEND_PROSPECT_TO_API_SUCCESS, payload: isScreeningError };
    expect(sendProspectToAPISuccess(isScreeningError)).toEqual(expectedAction);
  });

  it("should create send prospect to API fail action", () => {
    const expectedAction = { type: SEND_PROSPECT_TO_API_FAIL };
    expect(sendProspectToAPIFail()).toEqual(expectedAction);
  });

  it("should create reset form step action", () => {
    const isResetStep = true;
    const expectedAction = { type: RESET_FORM_STEP, payload: isResetStep };
    expect(resetFormStep(isResetStep)).toEqual(expectedAction);
  });

  it("should create prospect auto save action", () => {
    const expectedAction = { type: PROSPECT_AUTO_SAVE };
    expect(prospectAutoSave()).toEqual(expectedAction);
  });

  it("should create set screening error action", () => {
    const error = {};
    const expectedAction = { type: SET_SCREENING_ERROR, payload: error };
    expect(setScreeningError(error)).toEqual(expectedAction);
  });

  it("should create reset screening error action", () => {
    const expectedAction = { type: RESET_SCREENING_ERROR };
    expect(resetScreeningError()).toEqual(expectedAction);
  });

  it("should create send prospect request action (default arguments", () => {
    const newProspect = {};
    const expectedAction = {
      type: SEND_PROSPECT_REQUEST,
      payload: { saveType: NEXT, actionType: SAVE, newProspect, step: null }
    };
    expect(sendProspectRequest(newProspect)).toEqual(expectedAction);
  });

  it("should create send prospect request action (custom arguments)", () => {
    const newProspect = {};
    const saveType = NEXT;
    const actionType = SAVE;
    const step = { flowId: "companyInfo", activeStep: 3 };
    const expectedAction = {
      type: SEND_PROSPECT_REQUEST,
      payload: { saveType, actionType, newProspect, step }
    };
    expect(sendProspectRequest(newProspect, saveType, actionType, step)).toEqual(expectedAction);
  });
});

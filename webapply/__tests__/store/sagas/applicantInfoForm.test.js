import { runSaga } from "redux-saga";

import applicantInfoSaga, {
  applicantInfoFormSaga
} from "../../../src/store/sagas/applicantInfoForm";
import {
  APPLICANT_INFO_FORM_SUCCESS,
  APPLICANT_INFO_FORM,
  APPLICANT_INFO_FORM_FAIL
} from "../../../src/store/actions/applicantInfoForm";
import { UPDATE_PROSPECT, UPDATE_PROSPECT_ID } from "../../../src/store/actions/appConfig";
import {
  RESET_INPUTS_ERRORS,
  SET_INPUTS_ERRORS
} from "../../../src/store/actions/serverValidation";
import { GENERATE_CODE_SUCCESS } from "../../../src/store/actions/otp";
import { log } from "../../../src/utils/loggger";
import { prospect } from "../../../src/api/apiClient";
import { FieldsValidationError } from "../../../src/api/serverErrors";

jest.mock("../../../src/utils/loggger");

describe("applicantInfoForm saga test", () => {
  let dispatched = [];
  const stateWithToken = {
    appConfig: { prospect: { applicationInfo: {} }, recaptchaEnable: true },
    reCaptcha: { token: "token" }
  };
  const state = {
    appConfig: { prospect: { applicationInfo: {} } }
  };
  const payload = {};
  const error = "some error";
  const stateHeaders = { headers: {} };
  const data = "some data";
  const prospectUpdated = {
    prospect: { applicationInfo: { actionType: "save", saveType: "next" }, applicantInfo: {} }
  };
  const prospectUpdatedWithToken = {
    prospect: {
      applicationInfo: { actionType: "save", saveType: "next" },
      applicantInfo: {},
      recaptchaToken: stateWithToken.reCaptcha.token
    }
  };
  const store = {
    dispatch: action => dispatched.push(action),
    getState: () => state
  };
  const storeWithToken = {
    dispatch: action => dispatched.push(action),
    getState: () => stateWithToken
  };

  beforeEach(() => {
    dispatched = [];
    jest.clearAllMocks();
  });

  it("should handle aplicant info saga", () => {
    const gen = applicantInfoSaga().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(APPLICANT_INFO_FORM);
  });

  it("should run applicant info form saga with token", async () => {
    const spy = jest.spyOn(prospect, "create").mockReturnValue({ data });

    await runSaga(storeWithToken, applicantInfoFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([{ ...prospectUpdatedWithToken.prospect }, stateHeaders]);
    expect(dispatched).toEqual([
      { type: UPDATE_PROSPECT, payload: prospectUpdated },
      { type: GENERATE_CODE_SUCCESS },
      { type: UPDATE_PROSPECT_ID, payload: undefined },
      { type: RESET_INPUTS_ERRORS },
      { type: APPLICANT_INFO_FORM_SUCCESS }
    ]);

    spy.mockRestore();
  });

  it("should run applicant info form saga", async () => {
    const spy = jest.spyOn(prospect, "create").mockReturnValue({ data });

    await runSaga(store, applicantInfoFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([{ ...prospectUpdated.prospect }, stateHeaders]);
    expect(dispatched).toEqual([
      { type: UPDATE_PROSPECT, payload: prospectUpdated },
      { type: GENERATE_CODE_SUCCESS },
      { type: UPDATE_PROSPECT_ID, payload: undefined },
      { type: RESET_INPUTS_ERRORS },
      { type: APPLICANT_INFO_FORM_SUCCESS }
    ]);

    spy.mockRestore();
  });

  it("should log error when creating prospect is failing", async () => {
    log.mockReturnValue(null);
    const spy = jest.spyOn(prospect, "create").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, applicantInfoFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([{ ...prospectUpdated.prospect }, stateHeaders]);
    expect(log.mock.calls[0]).toEqual([error]);
    expect(dispatched).toEqual([
      { type: UPDATE_PROSPECT, payload: prospectUpdated },
      { type: APPLICANT_INFO_FORM_FAIL, payload: error }
    ]);

    spy.mockRestore();
  });

  it("should log fileds validation error", async () => {
    const validationError = new FieldsValidationError({
      name: "name",
      message: "message",
      errorType: "errorType",
      errors: "errors"
    });

    log.mockReturnValue(null);
    const spy = jest.spyOn(prospect, "create").mockImplementation(() => {
      throw validationError;
    });

    await runSaga(store, applicantInfoFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([{ ...prospectUpdated.prospect }, stateHeaders]);
    expect(dispatched).toEqual([
      { type: UPDATE_PROSPECT, payload: prospectUpdated },
      { type: SET_INPUTS_ERRORS, payload: validationError.errors }
    ]);

    spy.mockRestore();
  });
});

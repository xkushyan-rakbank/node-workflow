import { runSaga } from "redux-saga";
import { channel } from "@redux-saga/core";
import {
  fork,
  take,
  cancel,
  delay,
  select,
  put,
  actionChannel,
  flush,
  call,
  all,
  takeLatest
} from "redux-saga/effects";
import { createMockTask } from "@redux-saga/testing-utils";

import sendProspectToAPISagas, {
  watchRequest,
  sendProspectToAPISaga,
  prospectAutoSaveFlowSaga,
  prospectAutoSave,
  sendProspectToAPI,
  setScreeningResults
} from "../../../src/store/sagas/sendProspectToAPI";
import {
  PROSPECT_AUTO_SAVE,
  SEND_PROSPECT_REQUEST,
  SEND_PROSPECT_TO_API,
  resetFormStep,
  sendProspectRequest,
  setScreeningError,
  sendProspectToAPISuccess,
  sendProspectToAPIFail
} from "../../../src/store/actions/sendProspectToAPI";
import {
  getAccountType,
  getAuthorizationHeader,
  getIsIslamicBanking,
  getProspect,
  getProspectId
} from "../../../src/store/selectors/appConfig";
import { resetInputsErrors, setInputsErrors } from "../../../src/store/actions/serverValidation";
import { updateAccountNumbers } from "../../../src/store/actions/accountNumbers";
import { getCompletedSteps } from "../../../src/store/selectors/completedSteps";
import { setErrorOccurredWhilePerforming } from "../../../src/store/actions/searchProspect";
import { updateProspect } from "../../../src/store/actions/appConfig";
import {
  APP_STOP_SCREEN_RESULT,
  AUTO,
  AUTO_SAVE_INTERVAL,
  CONTINUE,
  SCREENING_FAIL_REASONS,
  screeningStatus,
  screeningStatusDefault,
  STEP_STATUS,
  VIEW_IDS
} from "../../../src/constants";
import { getErrorScreensIcons } from "../../../src/utils/getErrorScreenIcons/getErrorScreenIcons";
import { ErrorOccurredWhilePerforming, FieldsValidationError } from "../../../src/api/serverErrors";
import { prospect } from "../../../src/api/apiClient";
import { getScreeningError } from "../../../src/store/selectors/sendProspectToAPI";

jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/store/selectors/completedSteps");

describe("sendProspectToAPI sagas tests", () => {
  let dispatched = [];
  const state = "some state";
  const store = {
    dispatch: action => dispatched.push(action),
    getState: () => state
  };

  beforeEach(() => {
    dispatched = [];
    jest.clearAllMocks();
  });

  it("should watch for sendProspectToAPI sagas", () => {
    const gen = sendProspectToAPISagas();

    expect(gen.next().value).toEqual(
      all([
        takeLatest(SEND_PROSPECT_TO_API, sendProspectToAPISaga),
        takeLatest(PROSPECT_AUTO_SAVE, prospectAutoSaveFlowSaga),
        fork(watchRequest)
      ])
    );
  });

  describe("should handle watchRequest", () => {
    it("with actions", () => {
      const chan = channel();
      const action = { payload: { saveType: CONTINUE } };
      const actions = [action];
      const gen = watchRequest();

      expect(gen.next().value).toEqual(actionChannel(SEND_PROSPECT_REQUEST));
      expect(gen.next(chan).value).toEqual(flush(chan));
      expect(gen.next(actions).value).toEqual(call(sendProspectToAPI, action));
      expect(gen.next().value).toEqual(delay(1000));
    });

    it("without actions", () => {
      const chan = channel();
      const actions = [];
      const gen = watchRequest();

      expect(gen.next().value).toEqual(actionChannel(SEND_PROSPECT_REQUEST));
      expect(gen.next(chan).value).toEqual(flush(chan));
      expect(gen.next(actions).value).toEqual(delay(1000));
    });

    it("with other saveType", () => {
      const saveType = "some save type";
      const chan = channel();
      const action = { payload: { saveType } };

      const actions = [action];
      const gen = watchRequest();

      expect(gen.next().value).toEqual(actionChannel(SEND_PROSPECT_REQUEST));
      expect(gen.next(chan).value).toEqual(flush(chan));
      expect(gen.next(actions).value).toEqual(call(sendProspectToAPI, action));
      expect(gen.next().value).toEqual(delay(1000));
    });
  });

  describe("should handle setScreeningResults", () => {
    const accountType = "some account type";
    const isIslamicBanking = true;
    const reasonNotes = "some reason notes";

    it("with custom error", async () => {
      const screeningType = screeningStatus[0].screeningType;
      const data = {
        preScreening: {
          screeningResults: [
            { screeningReason: SCREENING_FAIL_REASONS[0], screeningType, reasonNotes }
          ]
        }
      };

      getAccountType.mockReturnValue(accountType);
      getIsIslamicBanking.mockReturnValue(isIslamicBanking);

      await runSaga(store, setScreeningResults, data).toPromise();

      expect(getAccountType.mock.calls[0]).toEqual([state]);
      expect(getIsIslamicBanking.mock.calls[0]).toEqual([state]);
      expect(dispatched).toEqual([
        setScreeningError({
          ...screeningStatus[0],
          text: reasonNotes,
          icon: getErrorScreensIcons(accountType, isIslamicBanking, screeningType)
        })
      ]);
    });

    it("with default error", async () => {
      const screeningType = "some screening type";
      const data = {
        preScreening: {
          screeningResults: [
            { screeningReason: SCREENING_FAIL_REASONS[0], screeningType, reasonNotes }
          ]
        }
      };

      await runSaga(store, setScreeningResults, data).toPromise();

      expect(dispatched).toEqual([setScreeningError(screeningStatusDefault)]);
    });
  });

  it("should handle sendProspectToAPISaga", async () => {
    const prospect = "some prospect";
    const saveType = "some saveType";
    const actionType = "some actionType";
    const step = "some step";
    const action = {
      payload: {
        saveType,
        actionType,
        step
      }
    };

    getProspect.mockReturnValue(prospect);

    await runSaga(store, sendProspectToAPISaga, action).toPromise();

    expect(getProspect.mock.calls[0]).toEqual([state]);
    expect(dispatched).toEqual([
      resetInputsErrors(),
      resetFormStep(true),
      sendProspectRequest(prospect, saveType, actionType, step),
      resetFormStep(false)
    ]);
  });

  describe("should handle prospectAutoSave", () => {
    const prospect = {
      applicationInfo: {
        viewId: VIEW_IDS.CompanyInfo
      }
    };

    it("with enabled auto save", async () => {
      const screeningError = {
        error: false
      };

      const gen = prospectAutoSave();

      expect(gen.next().value).toEqual(delay(AUTO_SAVE_INTERVAL));
      expect(gen.next().value).toEqual(select(getProspect));
      expect(gen.next(prospect).value).toEqual(select(getScreeningError));
      expect(gen.next(screeningError).value).toEqual(put(sendProspectRequest(prospect, AUTO)));
    });

    it("with disabled auto save", () => {
      const screeningError = {
        error: true
      };

      const gen = prospectAutoSave();

      expect(gen.next().value).toEqual(delay(AUTO_SAVE_INTERVAL));
      expect(gen.next().value).toEqual(select(getProspect));
      expect(gen.next(prospect).value).toEqual(select(getScreeningError));
      expect(gen.next(screeningError).value).toEqual(delay(AUTO_SAVE_INTERVAL));
    });

    it("error throws", async () => {
      const error = "some error";

      const gen = prospectAutoSave();

      expect(gen.next().value).toEqual(delay(AUTO_SAVE_INTERVAL));
      expect(gen.throw(error).done).toEqual(true);
    });
  });

  describe("should handle sendProspectToAPI", () => {
    const newProspect = {
      accountInfo: [{}],
      applicationInfo: {
        saveType: "",
        actionType: ""
      }
    };
    const saveType = "some saveType";
    const actionType = "some actionType";
    const flowId = "some flowId";
    const activeStep = "some active step";
    const prospectId = "some prospect id";
    const headers = "some headers";
    const completedSteps = [{ flowId, step: activeStep }];
    const accountNo = "some account No";
    const expectedProspect = {
      accountInfo: [{ accountNo }],
      applicationInfo: { saveType, actionType },
      freeFieldsInfo: {
        freeField5: JSON.stringify({
          completedSteps
        })
      }
    };
    const step = { flowId, activeStep };
    const response = { data: { accountInfo: [{ accountNo }] } };

    getProspectId.mockReturnValue(prospectId);
    getAuthorizationHeader.mockReturnValue(headers);
    getCompletedSteps.mockReturnValue(completedSteps);

    it("with matching step", async () => {
      const action = { payload: { newProspect, saveType, actionType, step } };

      const expectedProspectWithChangedStep = {
        accountInfo: [{ accountNo }],
        applicationInfo: {
          saveType,
          actionType
        },
        freeFieldsInfo: {
          freeField5: JSON.stringify({
            completedSteps: [{ flowId, step: activeStep, status: STEP_STATUS.COMPLETED }]
          })
        }
      };

      const spy = jest.spyOn(prospect, "update").mockImplementation(() => response);

      await runSaga(store, sendProspectToAPI, action);
      expect(spy.mock.calls[0]).toEqual([prospectId, expectedProspectWithChangedStep, headers]);
      expect(dispatched).toEqual([
        updateAccountNumbers(response.data.accountInfo),
        sendProspectToAPISuccess(false)
      ]);
    });

    it("with not matching step", async () => {
      const notMatchingStep = {
        flowId: "another flowId",
        activeStep: "some active step"
      };
      const action = { payload: { newProspect, saveType, actionType, step: notMatchingStep } };

      const spy = jest.spyOn(prospect, "update").mockImplementation(() => response);

      await runSaga(store, sendProspectToAPI, action);
      expect(spy.mock.calls[0]).toEqual([prospectId, expectedProspect, headers]);
      expect(dispatched).toEqual([
        updateAccountNumbers(response.data.accountInfo),
        sendProspectToAPISuccess(false)
      ]);
    });

    it("without step", async () => {
      const action = { payload: { newProspect, saveType, actionType } };

      const spy = jest.spyOn(prospect, "update").mockImplementation(() => response);

      await runSaga(store, sendProspectToAPI, action);

      expect(spy.mock.calls[0]).toEqual([prospectId, expectedProspect, headers]);
      expect(dispatched).toEqual([
        updateAccountNumbers(response.data.accountInfo),
        sendProspectToAPISuccess(false)
      ]);
    });

    it("without accountInfo", async () => {
      const response = { data: {} };
      const action = { payload: { newProspect, saveType, actionType, step } };

      const expectedProspectWithChangedStep = {
        accountInfo: [{ accountNo }],
        applicationInfo: { saveType, actionType },
        freeFieldsInfo: {
          freeField5: JSON.stringify({
            completedSteps: [{ flowId, step: activeStep, status: STEP_STATUS.COMPLETED }]
          })
        }
      };

      const spy = jest.spyOn(prospect, "update").mockImplementation(() => response);

      await runSaga(store, sendProspectToAPI, action);
      expect(spy.mock.calls[0]).toEqual([prospectId, expectedProspectWithChangedStep, headers]);
      expect(dispatched).toEqual([sendProspectToAPISuccess(false)]);
    });

    it("with preScreening error", async () => {
      const responseWithPrescreeningError = {
        data: {
          accountInfo: [{ accountNo }],
          preScreening: { statusOverAll: APP_STOP_SCREEN_RESULT, screeningResults: [] }
        }
      };
      const action = { payload: { newProspect, saveType, actionType } };

      const spy = jest
        .spyOn(prospect, "update")
        .mockImplementation(() => responseWithPrescreeningError);

      await runSaga(store, sendProspectToAPI, action);

      expect(spy.mock.calls[0]).toEqual([prospectId, expectedProspect, headers]);
      expect(dispatched).toEqual([
        updateAccountNumbers(response.data.accountInfo),
        setScreeningError(screeningStatusDefault),
        sendProspectToAPISuccess(true)
      ]);
    });

    it("with preScreening info but without error", async () => {
      const statusOverAll = "some status";
      const responseWithPrescreeningError = {
        data: {
          accountInfo: [{ accountNo }],
          preScreening: { statusOverAll }
        }
      };
      const action = { payload: { newProspect, saveType, actionType } };

      const spy = jest
        .spyOn(prospect, "update")
        .mockImplementation(() => responseWithPrescreeningError);

      await runSaga(store, sendProspectToAPI, action);

      expect(spy.mock.calls[0]).toEqual([prospectId, expectedProspect, headers]);
      expect(dispatched).toEqual([
        updateAccountNumbers(response.data.accountInfo),
        updateProspect({
          "prospect.organizationInfo.screeningInfo": responseWithPrescreeningError.data.preScreening
        }),
        sendProspectToAPISuccess(false)
      ]);
    });

    it("throws ErrorOccurredWhilePerforming", async () => {
      const error = new ErrorOccurredWhilePerforming({
        errors: [{ errorCode: "some error code" }]
      });
      const action = { payload: { newProspect, saveType, actionType } };

      const spy = jest.spyOn(prospect, "update").mockImplementation(() => {
        throw error;
      });

      await runSaga(store, sendProspectToAPI, action);

      expect(spy.mock.calls[0]).toEqual([prospectId, expectedProspect, headers]);
      expect(dispatched).toEqual([
        setErrorOccurredWhilePerforming({ errorCode: error.getErrorCode() }),
        sendProspectToAPIFail()
      ]);
    });

    it("throws FieldsValidationError", async () => {
      const error = new FieldsValidationError({
        errors: [{ errorCode: "some error code" }]
      });
      const action = { payload: { newProspect, saveType, actionType } };

      const spy = jest.spyOn(prospect, "update").mockImplementation(() => {
        throw error;
      });

      await runSaga(store, sendProspectToAPI, action);

      expect(spy.mock.calls[0]).toEqual([prospectId, expectedProspect, headers]);
      expect(dispatched).toEqual([
        setInputsErrors(error.getInputsErrors()),
        sendProspectToAPIFail()
      ]);
    });

    it("throws not binded error", async () => {
      const error = "some error";
      const action = { payload: { newProspect, saveType, actionType } };

      const spy = jest.spyOn(prospect, "update").mockImplementation(() => {
        throw error;
      });

      await runSaga(store, sendProspectToAPI, action);

      expect(spy.mock.calls[0]).toEqual([prospectId, expectedProspect, headers]);
      expect(dispatched).toEqual([sendProspectToAPIFail()]);
    });
  });

  it("should handle prospectAutoSaveFlowSaga", () => {
    const watcher = createMockTask();
    const gen = prospectAutoSaveFlowSaga();

    expect(gen.next().value).toEqual(fork(prospectAutoSave));
    expect(gen.next(watcher).value).toEqual(take(SEND_PROSPECT_REQUEST));
    expect(gen.next().value).toEqual(cancel(watcher));
  });
});

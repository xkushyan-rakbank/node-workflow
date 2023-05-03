import {
  all,
  put,
  call,
  delay,
  select,
  takeLatest,
  take,
  cancel,
  fork,
  actionChannel,
  flush
} from "redux-saga/effects";

import { getErrorScreensIcons } from "../../utils/getErrorScreenIcons/getErrorScreenIcons";
import {
  SEND_PROSPECT_TO_API,
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  resetFormStep,
  PROSPECT_AUTO_SAVE,
  sendProspectRequest,
  SEND_PROSPECT_REQUEST,
  setScreeningError
} from "../actions/sendProspectToAPI";
import { log } from "../../utils/loggger";
import {
  getProspect,
  getProspectId,
  getAuthorizationHeader,
  getAccountType,
  getIsIslamicBanking,
  getAuthToken,
  getApplicationInfo
} from "../selectors/appConfig";
import { getCompletedSteps } from "../selectors/completedSteps";
import { getScreeningError } from "../selectors/sendProspectToAPI";
import { setErrorOccurredWhilePerforming } from "../actions/searchProspect";
import { resetInputsErrors, setInputsErrors } from "../actions/serverValidation";
import { updateAccountNumbers } from "../actions/accountNumbers";
import { prospect } from "../../api/apiClient";
import {
  APP_STOP_SCREEN_RESULT,
  screeningStatus,
  screeningStatusDefault,
  CONTINUE,
  AUTO,
  VIEW_IDS,
  STEP_STATUS,
  AUTO_SAVE_INTERVAL,
  applicationdedupe
} from "../../constants";
import { updateProspect } from "../actions/appConfig";
import { FieldsValidationError, ErrorOccurredWhilePerforming } from "../../api/serverErrors";
import { SCREENING_FAIL_REASONS } from "../../constants";
import { pageProspectPaylodMap } from "../../constants/config";

export function* watchRequest() {
  const chan = yield actionChannel(SEND_PROSPECT_REQUEST);
  while (true) {
    const actions = yield flush(chan);
    if (actions.length) {
      const action = actions.find(act => act.payload.saveType === CONTINUE) || actions[0];
      yield call(sendProspectToAPI, action);
    }
    yield delay(1000);
  }
}

export function* setScreeningResults({ preScreening }) {
  const currScreeningType = preScreening.screeningResults.find(screeningResult =>
    SCREENING_FAIL_REASONS.includes(screeningResult.screeningReason)
  );

  let screenError = screeningStatus.find(
    ({ screeningType }) => screeningType === (currScreeningType || {}).screeningType
  );

  if (screenError) {
    //ro-assist-brd1-3
    if (screenError.screeningType === screeningStatus[1].screeningType) {
      let buttons = applicationdedupe.find(
        ({ screeningNotes }) => screeningNotes === currScreeningType.screeningNotes
      );
      if (buttons !== undefined) {
        screenError = { ...screenError, ...buttons };
      }
    }
    const accountType = yield select(getAccountType);
    const isIslamicBanking = yield select(getIsIslamicBanking);
    const { screeningType, screeningNotes } = screenError;

    yield put(
      setScreeningError({
        ...screenError,
        text: currScreeningType.reasonNotes,
        icon: getErrorScreensIcons(accountType, isIslamicBanking, screeningType, screeningNotes)
      })
    );
  } else {
    yield put(setScreeningError(screeningStatusDefault));
  }
}

export function* sendProspectToAPISaga({ payload: { saveType, actionType, step } }) {
  try {
    yield put(resetInputsErrors());
    yield put(resetFormStep(true));

    const prospect = yield select(getProspect);

    yield put(sendProspectRequest(prospect, saveType, actionType, step));
  } finally {
    yield put(resetFormStep(false));
  }
}

export function* prospectAutoSave() {
  try {
    while (true) {
      yield delay(AUTO_SAVE_INTERVAL);

      const newProspect = yield select(getProspect);
      const screeningError = yield select(getScreeningError);
      const isScreeningError = screeningError.error;
      const viewId = newProspect.applicationInfo.viewId;
      const authToken = yield select(getAuthToken);

      const isAutoSaveEnabled =
        !isScreeningError &&
        authToken &&
        [
          VIEW_IDS.CompanyInfo,
          VIEW_IDS.StakeholdersInfo,
          VIEW_IDS.FinalQuestions,
          VIEW_IDS.UploadDocuments,
          VIEW_IDS.SelectServices
        ].includes(viewId);

      if (isAutoSaveEnabled) {
        yield put(sendProspectRequest(newProspect, AUTO));
      }
    }
  } catch (e) {
    log(e);
  }
}

const getRequestPayloadForNode = (key, prospect) => {
  let nodePayload;
  switch (key) {
    case "organizationInfo": {
      //transforming the proscpect industryMultiSelect to industry & industryAndSubCategory
      const { industryMultiSelect, ...rest } = prospect[key];
      const { industry, subCategory } = industryMultiSelect.reduce(
        (industryAndSubCategory, item) => {
          item.industry?.length && industryAndSubCategory.industry.push(item.industry[0]);
          item.subCategory?.length && industryAndSubCategory.subCategory.push(item.subCategory[0]);
          return industryAndSubCategory;
        },
        { industry: [], subCategory: [] }
      );
      nodePayload = { ...rest, industry, subCategory };
      break;
    }
    case "applicationInfo": {
      const { accountType, rakValuePackage } = prospect[key];
      nodePayload = { accountType, rakValuePackage };
      break;
    }
    default:
      nodePayload = prospect[key];
  }
  return nodePayload;
};

export function* sendProspectToAPI({ payload: { newProspect, saveType, actionType, step } }) {
  try {
    const prospectId = yield select(getProspectId);
    const headers = yield select(getAuthorizationHeader);
    const completedSteps = yield select(getCompletedSteps);
    const applicationInfo = yield select(getApplicationInfo);

    const viewId = applicationInfo.viewId;

    const newCompletedSteps = step
      ? completedSteps.map(completedStep => {
          if (completedStep.flowId === step.flowId && completedStep.step === step.activeStep) {
            return { ...completedStep, status: STEP_STATUS.COMPLETED };
          }
          return completedStep;
        })
      : completedSteps;

    newProspect.applicationInfo.saveType = saveType;
    newProspect.applicationInfo.actionType = actionType;
    newProspect.freeFieldsInfo = {
      ...(newProspect.freeFieldsInfo || {}),
      freeField5: JSON.stringify({ completedSteps: newCompletedSteps })
    };
    const payloadKeys = pageProspectPaylodMap[viewId];
    const createProspectPayload = {};

    payloadKeys &&
      payloadKeys.forEach(key => {
        if (newProspect[key]) {
          createProspectPayload[key] = getRequestPayloadForNode(key, newProspect);
        }
      });
    createProspectPayload["viewId"] = viewId;
    createProspectPayload["actionType"] = actionType;
    createProspectPayload["saveType"] = saveType;
    const { data } = yield call(prospect.update, prospectId, createProspectPayload, headers);

    if (data.accountInfo && Array.isArray(data.accountInfo)) {
      yield put(updateAccountNumbers(data.accountInfo));
      data.accountInfo.forEach(
        (_, index) =>
          (newProspect.accountInfo[index] = {
            ...newProspect.accountInfo[index],
            accountNo: data.accountInfo[index].accountNo
          })
      );
    }

    const { preScreening } = data;

    const isScreeningError = preScreening && preScreening.statusOverAll === APP_STOP_SCREEN_RESULT;

    if (isScreeningError) {
      yield fork(setScreeningResults, data);
    } else if (preScreening) {
      yield put(updateProspect({ "prospect.organizationInfo.screeningInfo": preScreening }));
    }

    yield put(sendProspectToAPISuccess(!!isScreeningError));
  } catch (error) {
    if (error instanceof ErrorOccurredWhilePerforming) {
      yield put(
        setErrorOccurredWhilePerforming({
          errorCode: error.getErrorCode()
        })
      );
    } else if (error instanceof FieldsValidationError) {
      yield put(setInputsErrors(error.getInputsErrors()));
    } else {
      log(error);
    }
    yield put(sendProspectToAPIFail());
  }
}

export function* prospectAutoSaveFlowSaga() {
  while (true) {
    const bgSyncAutoSave = yield fork(prospectAutoSave);

    yield take(SEND_PROSPECT_REQUEST);

    yield cancel(bgSyncAutoSave);
  }
}

export default function* sendProspectToAPISagas() {
  yield all([
    takeLatest(SEND_PROSPECT_TO_API, sendProspectToAPISaga),
    takeLatest(PROSPECT_AUTO_SAVE, prospectAutoSaveFlowSaga),
    fork(watchRequest)
  ]);
}

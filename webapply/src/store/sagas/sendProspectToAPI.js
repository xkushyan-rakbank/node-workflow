import {
  all,
  put,
  call,
  delay,
  select,
  takeLatest,
  take,
  cancel,
  cancelled,
  fork,
  actionChannel,
  flush
} from "redux-saga/effects";
import cloneDeep from "lodash/cloneDeep";

import { getErrorScreensIcons } from "../../utils/getErrorScreenIcons/getErrorScreenIcons";
import {
  SEND_PROSPECT_TO_API,
  sendProspectToAPISuccess,
  SEND_PROSPECT_TO_API_SUCCESS,
  sendProspectToAPIFail,
  resetFormStep,
  PROSPECT_AUTO_SAVE,
  sendProspectRequest,
  setScreeningError
} from "../actions/sendProspectToAPI";
import { log } from "../../utils/loggger";
import {
  getProspect,
  getProspectId,
  getAuthorizationHeader,
  getAccountType,
  getIsIslamicBanking
} from "../selectors/appConfig";
import { setLockStatusByROAgent } from "../actions/searchProspect";
import { resetInputsErrors, setInputsErrors } from "../actions/serverValidation";
import { updateAccountNumbers } from "../actions/accountNumbers";
import { prospect } from "../../api/apiClient";
import {
  APP_STOP_SCREEN_RESULT,
  screeningStatus,
  APP_COMPLETED_SCREENING_STATUS,
  screeningStatusDefault,
  CONTINUE,
  AUTO,
  SUBMIT
} from "../../constants";
import { updateProspect } from "../actions/appConfig";
import { ROError, FieldsValidationError } from "../../api/serverErrors";

function* watchRequest() {
  const chan = yield actionChannel("SEND_PROSPECT_REQUEST");
  while (true) {
    const actions = yield flush(chan);
    if (actions.length) {
      const action = actions.find(act => act.saveType === CONTINUE) || actions[0];
      yield call(sendProspectToAPI, action);
    }
    yield delay(1000);
  }
}

function* setScreeningResults({ preScreening }) {
  const currScreeningType = preScreening.screeningResults.find(
    screeningResult => screeningResult.screeningStatus !== APP_COMPLETED_SCREENING_STATUS
  );

  const screenError = screeningStatus.find(
    ({ screeningType }) => screeningType === (currScreeningType || {}).screeningType
  );

  if (screenError) {
    const state = yield select();
    const accountType = getAccountType(state);
    const isIslamicBanking = getIsIslamicBanking(state);
    const { screeningType } = screenError;

    yield put(
      setScreeningError({
        ...screenError,
        text: currScreeningType.reasonNotes,
        icon: getErrorScreensIcons(accountType, isIslamicBanking, screeningType)
      })
    );
  } else {
    yield put(setScreeningError(screeningStatusDefault));
  }
}

function* sendProspectToAPISaga({ payload: { saveType } }) {
  try {
    yield put(resetInputsErrors());
    yield put(resetFormStep({ resetStep: true }));

    const state = yield select();
    const prospect = getProspect(state);

    const newProspect = cloneDeep(prospect);
    newProspect.freeFieldsInfo.freeField5 = JSON.stringify({
      completedSteps: state.completedSteps
    });

    yield put(sendProspectRequest(saveType, newProspect));
  } finally {
    yield put(resetFormStep({ resetStep: false }));
  }
}

function* prospectAutoSave() {
  try {
    while (yield take(SEND_PROSPECT_TO_API_SUCCESS)) {
      const state = yield select();
      const newProspect = getProspect(state);

      yield put(sendProspectRequest(AUTO, newProspect));
      yield delay(40000);
    }
  } finally {
    if (yield cancelled()) {
      log("cancel");
    }
  }
}

function* sendProspectToAPI({ newProspect, saveType }) {
  try {
    const state = yield select();
    const prospectId = getProspectId(state);
    const headers = getAuthorizationHeader(state);

    newProspect.applicationInfo.saveType = saveType;
    const { data } = yield call(prospect.update, prospectId, newProspect, headers);

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

    if (preScreening && preScreening.statusOverAll === APP_STOP_SCREEN_RESULT) {
      yield fork(setScreeningResults, data);
    } else {
      if (preScreening) {
        yield put(updateProspect({ "prospect.organizationInfo.screeningInfo": preScreening }));
      }
      yield put(sendProspectToAPISuccess(newProspect));
    }
  } catch (error) {
    if (error instanceof ROError) {
      yield put(setLockStatusByROAgent(true));
    } else if (error instanceof FieldsValidationError) {
      yield put(setInputsErrors(error.getInputsErrors()));
    } else {
      log({ error });
      yield put(sendProspectToAPIFail(error));
    }
  }
}

function* prospectAutoSaveFlowSaga() {
  while (yield take("START_PROSPECT_AUTO_SAVE")) {
    const bgSyncAutoSave = yield fork(prospectAutoSave);
    const { actionType } = yield take("UPDATE_ACTION_TYPE");

    if (actionType === SUBMIT) {
      yield cancel(bgSyncAutoSave);
    }
  }
}

export default function* sendProspectToAPISagas() {
  yield all([
    takeLatest(SEND_PROSPECT_TO_API, sendProspectToAPISaga),
    takeLatest(PROSPECT_AUTO_SAVE, prospectAutoSaveFlowSaga),
    fork(watchRequest)
  ]);
}

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
import get from "lodash/get";

import {
  SEND_PROSPECT_TO_API,
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  setScreeningResults,
  resetFormStep,
  PROSPECT_AUTO_SAVE,
  sendProspectRequest,
  continueProspectUpdate
} from "../actions/sendProspectToAPI";
import { log } from "../../utils/loggger";
import { getProspect, getProspectId } from "../selectors/appConfig";
import { resetInputsErrors } from "../actions/serverValidation";
import { prospect } from "../../api/apiClient";
import { APP_STOP_SCREEN_RESULT } from "../../containers/FormLayout/constants";

function* watchRequest() {
  const chan = yield actionChannel("SEND_PROSPECT_REQUEST");
  while (true) {
    const actions = yield flush(chan);
    if (actions.length) {
      const continueActions = actions.filter(act => act.saveType === "continue");
      yield call(sendProspectToAPI, continueActions.length ? continueActions[0] : actions[0]);
    }
    yield delay(1000);
  }
}

function* sendProspectToAPISaga() {
  try {
    yield put(resetInputsErrors());
    yield put(resetFormStep({ resetStep: true }));

    const state = yield select();
    const newProspect = getProspect(state);

    yield put(sendProspectRequest("continue", newProspect));
    const { data } = yield take("CONTINUE_PROSPECT_UPDATE");

    if (get(data, "preScreening.statusOverAll") === APP_STOP_SCREEN_RESULT) {
      yield put(setScreeningResults(data.preScreening));
    }
  } finally {
    yield put(resetFormStep({ resetStep: false }));
  }
}

function* prospectAutoSave() {
  try {
    while (true) {
      const state = yield select();
      const newProspect = getProspect(state);

      yield put(sendProspectRequest("auto", newProspect));
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
    const prospectId = getProspectId(state) || "COSME0000000000000001";

    const { data } = yield call(prospect.update, prospectId, newProspect);
    newProspect.applicationInfo.saveType = saveType;

    yield put(sendProspectToAPISuccess(newProspect));
    yield put(continueProspectUpdate(data));
  } catch (error) {
    log({ error });
    yield put(sendProspectToAPIFail());
  }
}

function* prospectAutoSaveFlowSaga() {
  while (yield take("START_PROSPECT_AUTO_SAVE")) {
    const bgSyncAutoSave = yield fork(prospectAutoSave);
    const { actionType } = yield take("UPDATE_ACTION_TYPE");

    if (actionType === "submit") {
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

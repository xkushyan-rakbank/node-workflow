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
  actionChannel
} from "redux-saga/effects";
import get from "lodash/get";

import {
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  setScreeningResults,
  resetFormStep,
  PROSPECT_AUTO_SAVE
} from "../actions/sendProspectToAPI";
import { log } from "../../utils/loggger";
import { updateSaveType } from "./../actions/appConfig";
import { getProspect, getProspectId } from "../selectors/appConfig";
import { resetInputsErrors } from "../actions/serverValidation";
import { prospect } from "../../api/apiClient";
import { APP_STOP_SCREEN_RESULT } from "../../containers/FormLayout/constants";

function* watchRequest() {
  const requestChannel = yield actionChannel("SEND_PROSPECT_TO_API");
  while (true) {
    const { payload } = yield take(requestChannel);
    yield call(sendProspectToAPISaga, payload);
  }
}

function* sendProspectToAPISaga() {
  try {
    const state = yield select();
    const newProspect = getProspect(state);
    const prospectID = getProspectId(state) || "COSME0000000000000001";

    yield put(resetInputsErrors());
    yield put(resetFormStep({ resetStep: true }));
    const { data } = yield call(prospect.update, prospectID, newProspect);

    if (get(data, "preScreening.statusOverAll") !== APP_STOP_SCREEN_RESULT) {
      yield put(sendProspectToAPISuccess(newProspect));
    } else {
      yield put(setScreeningResults(data.preScreening));
    }
  } catch (error) {
    log({ error });
    yield put(sendProspectToAPIFail());
  } finally {
    yield put(updateSaveType("continue"));
    yield put(resetFormStep({ resetStep: false }));
  }
}

function* prospectAutoSave() {
  try {
    while (true) {
      const state = yield select();
      const newProspect = getProspect(state);
      const prospectId = getProspectId(state) || "COSME0000000000000001";

      yield call(prospect.update, prospectId, newProspect);
      yield put(updateSaveType("auto"));
      yield put(sendProspectToAPISuccess(newProspect));
      yield delay(40000);
    }
  } finally {
    if (yield cancelled()) {
      log("cancel");
    }
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
  yield all([takeLatest(PROSPECT_AUTO_SAVE, prospectAutoSaveFlowSaga), watchRequest()]);
}

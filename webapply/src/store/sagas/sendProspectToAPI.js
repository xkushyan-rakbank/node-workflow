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
  SEND_PROSPECT_TO_API_SUCCESS,
  sendProspectToAPIFail,
  resetFormStep,
  PROSPECT_AUTO_SAVE,
  sendProspectRequest,
  setScreeningError
} from "../actions/sendProspectToAPI";
import { log } from "../../utils/loggger";
import { getProspect, getProspectId } from "../selectors/appConfig";
import { resetInputsErrors } from "../actions/serverValidation";
import { prospect } from "../../api/apiClient";
import {
  APP_STOP_SCREEN_RESULT,
  screeningStatus,
  APP_DECLINE_SCREEN_REASON,
  screeningStatusDefault
} from "../../constants";

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

function* setScreeningResults({ preScreening }) {
  const currScreeningTypes = preScreening.screeningResults.reduce(
    (result, { screeningType, screeningReason, reasonNotes }) => {
      if (screeningReason === APP_DECLINE_SCREEN_REASON) {
        return [...result, { screeningType, reasonNotes }];
      }
      return result;
    },
    []
  );

  const screenError = screeningStatus.find(
    ({ screeningType }) => screeningType === currScreeningTypes[0].screeningType
  );
  if (screenError) {
    screenError.text = currScreeningTypes[0].reasonNotes;
    yield put(setScreeningError(screenError));
  } else {
    yield put(setScreeningError(screeningStatusDefault));
  }
}

function* sendProspectToAPISaga() {
  try {
    yield put(resetInputsErrors());
    yield put(resetFormStep({ resetStep: true }));

    const state = yield select();
    const newProspect = getProspect(state);

    yield put(sendProspectRequest("continue", newProspect));
  } finally {
    yield put(resetFormStep({ resetStep: false }));
  }
}

function* prospectAutoSave() {
  try {
    while (yield take(SEND_PROSPECT_TO_API_SUCCESS)) {
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

    if (get(data, "accountInfo[0].accountNo", "")) {
      data.accountInfo.forEach(
        (item, index) =>
          (newProspect.accountInfo[index].accountNo = data.accountInfo[index].accountNo)
      );
    }

    yield put(sendProspectToAPISuccess(newProspect));

    if (get(data, "preScreening.statusOverAll") === APP_STOP_SCREEN_RESULT) {
      yield fork(setScreeningResults, data);
    }
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

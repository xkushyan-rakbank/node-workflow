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
  fork
} from "redux-saga/effects";
import {
  SEND_PROSPECT_TO_API,
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  resetFormStep,
  PROSPECT_AUTO_SAVE
} from "../actions/sendProspectToAPI";
import { getProspect, getProspectId } from "../selectors/appConfig";
import { resetInputsErrors } from "../actions/serverValidation";
import apiClient from "../../api/apiClient";

function* sendProspectToAPISaga() {
  try {
    const state = yield select();
    const prospect = getProspect(state);
    const prospectID = getProspectId(state) || "COSME0000000000000001"; // remove hardcoded ID

    yield call(apiClient.prospect.update, prospectID, prospect);
    yield put(sendProspectToAPISuccess());
    yield put(resetFormStep({ resetStep: true }));
    yield put(resetInputsErrors());
    yield delay(500);
    yield put(resetFormStep({ resetStep: false }));
  } catch (error) {
    console.log({ error });
    yield call(sendProspectToAPIFail());
  }
}

function* prospectAutoSave() {
  try {
    while (true) {
      const state = yield select();
      const prospect = getProspect(state);
      const prospectId = getProspectId(state);

      yield call(apiClient.prospect.update, prospectId, prospect);
      yield delay(40000);
    }
  } finally {
    if (yield cancelled()) {
      console.log("cancel");
    }
  }
}

function* prospectAutoSaveFlow() {
  while (yield take("UPDATE_PROSPECT_ID")) {
    const bgSyncAutoSave = yield fork(prospectAutoSave);

    // wait for the user stop action
    const { actionType } = yield take("UPDATE_ACTION_TYPE");

    if (actionType === "submit") {
      // this will cause the forked bgSyncAutoSave task to jump into its finally block
      yield cancel(bgSyncAutoSave);
    }
  }
}

export default function* sendProspectToAPI() {
  yield all([takeLatest(SEND_PROSPECT_TO_API, sendProspectToAPISaga)]);
  yield all([takeLatest(PROSPECT_AUTO_SAVE, prospectAutoSaveFlow)]);
}

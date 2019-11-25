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
import isUndefined from "lodash/isUndefined";
import {
  SEND_PROSPECT_TO_API,
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  resetFormStep,
  PROSPECT_AUTO_SAVE
} from "../actions/sendProspectToAPI";
import { updateSaveType } from "./../actions/appConfig";
import { getProspect, getProspectId } from "../selectors/appConfig";
import { resetInputsErrors } from "../actions/serverValidation";
import { handleChangeStep } from "../actions/stakeholders";
import { prospect } from "../../api/apiClient";

function* sendProspectToAPISaga() {
  try {
    const state = yield select();
    const newProspect = getProspect(state);
    const prospectID = "COSME0000000000000001"; // remove hardcoded ID

    yield put(resetInputsErrors());
    yield put(resetFormStep({ resetStep: true }));
    yield call(prospect.update, prospectID, newProspect);
    yield put(sendProspectToAPISuccess(newProspect));
    yield put(updateSaveType("continue"));
    yield put(resetFormStep({ resetStep: false }));

    if (!isUndefined(state.stakeholders.editableStakeholder)) {
      yield put(handleChangeStep());
    }
  } catch (error) {
    console.error({ error });
    yield call(sendProspectToAPIFail());
  }
}

function* prospectAutoSave() {
  try {
    while (true) {
      const state = yield select();
      const newProspect = getProspect(state);
      const prospectId = getProspectId(state);

      yield call(prospect.update, prospectId, newProspect);
      yield put(updateSaveType("auto"));
      yield put(sendProspectToAPISuccess(newProspect));
      yield delay(40000);
    }
  } finally {
    if (yield cancelled()) {
      console.log("cancel");
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

export default function* sendProspectToAPI() {
  yield all([
    takeLatest(SEND_PROSPECT_TO_API, sendProspectToAPISaga),
    takeLatest(PROSPECT_AUTO_SAVE, prospectAutoSaveFlowSaga)
  ]);
}

import { call, put, takeLatest } from "redux-saga/effects";

import { screening } from "../../api/apiClient";
import {
  SCREEN_PROSPECT_SEND,
  screenProspectRequest,
  screenProspectSuccess
} from "../actions/screenProspect";
import { log } from "../../utils/loggger";

export function* screenProspectFormSaga({ payload: { prospectId } }) {
  put(screenProspectRequest(prospectId));
  try {
    const response = yield call(screening.send, prospectId);

    yield put(screenProspectSuccess(prospectId, response.data));
  } catch (error) {
    log(error);
  }
}

export default function* screenProspectSaga() {
  yield takeLatest(SCREEN_PROSPECT_SEND, screenProspectSaga);
}

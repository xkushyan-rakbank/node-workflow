import { call, put, takeLatest } from "redux-saga/effects";

import { screening } from "../../api/apiClient";
import {
  SCREEN_PROSPECT_SEND,
  screenProspectRequest,
  screenProspectSuccess
} from "../actions/screenProspect";
import { log } from "../../utils/loggger";

export function* screenProspectSaga({ payload: { prospectId } }) {
  put(screenProspectRequest(prospectId));
  try {
    const response = yield call(screening.send, prospectId);

    yield put(screenProspectSuccess(prospectId, response.data));
  } catch (error) {
    log({ error });
  }
}

export default function* loginInfoFormSaga() {
  yield takeLatest(SCREEN_PROSPECT_SEND, screenProspectSaga);
}

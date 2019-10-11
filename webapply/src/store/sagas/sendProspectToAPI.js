import { all, put, call, delay, select, takeLatest } from "redux-saga/effects";
import {
  SEND_PROSPECT_TO_API,
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  resetFormStep
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

export default function* sendProspectToAPI() {
  yield all([takeLatest(SEND_PROSPECT_TO_API, sendProspectToAPISaga)]);
}

import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  inviteCustomerFormSuccess,
  INVITE_CUSTOMER_FORM,
  inviteCustomerFormError
} from "../actions/agentFeatures";

import { createInvite } from "../../api/apiClient";
import { log } from "../../utils/loggger";

export function* inviteFormSaga({ payload }) {
  try {
    const response = yield call(createInvite.send, payload);
    yield put(inviteCustomerFormSuccess(response.data));
  } catch (error) {
    log(error);
    yield put(inviteCustomerFormError(error));
  }
}

export default function* agentFeaturesSaga() {
  yield all([takeLatest(INVITE_CUSTOMER_FORM, inviteFormSaga)]);
}

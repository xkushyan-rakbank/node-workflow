import { all, call, put, takeLatest } from "redux-saga/effects";
import { loginInfoFormSuccess, LOGIN_INFO_FORM, loginInfoFormError } from "../actions/loginForm";

import { authentication } from "../../api/apiClient";
import { log } from "../../utils/loggger";

export function* loginFormSaga({ payload }) {
  try {
    const response = yield call(authentication.login, payload);
    yield put(loginInfoFormSuccess(response.data));
  } catch (error) {
    log(error);
    yield put(loginInfoFormError(error));
  }
}

export default function* loginInfoFormSaga() {
  yield all([takeLatest(LOGIN_INFO_FORM, loginFormSaga)]);
}

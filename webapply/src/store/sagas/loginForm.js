import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  loginInfoFormSuccess,
  LOGIN_INFO_FORM,
  FORMAT_LOGIN,
  loginInfoFormError
} from "../actions/loginForm";
import { updateProspect } from "../actions/appConfig";

import { authentication } from "../../api/apiClient";
import { log } from "../../utils/loggger";

export function* loginFormSaga({ payload }) {
  try {
    const response = yield call(authentication.login, payload);
    yield put(loginInfoFormSuccess(response.data));
  } catch (error) {
    log(error);
    yield put(loginInfoFormError());
  }
}

function* formatLoginSaga() {
  const clearedLoginDetail = {
    "login.userName": "",
    "login.password": "",
    prospect: {}
  };
  yield put(updateProspect(clearedLoginDetail));
}

export default function* loginInfoFormSaga() {
  yield all([takeLatest(LOGIN_INFO_FORM, loginFormSaga)]);
  yield all([takeLatest(FORMAT_LOGIN, formatLoginSaga)]);
}

import { all, call, put, takeLatest } from "redux-saga/effects";
import { history } from "./..";
import { loginInfoFormSuccess, LOGIN_INFO_FORM, FORMAT_LOGIN } from "../actions/loginForm";
import { updateProspect } from "../actions/appConfig";

import { authentication } from "../../api/apiClient";
import routes from "./../../routes";
import { log } from "../../utils/loggger";

export function* loginFormSaga({ payload }) {
  try {
    const response = yield call(authentication.login, payload);
    yield put(loginInfoFormSuccess(response.data));
    yield call(history.push, routes.searchProspect);
  } catch (error) {
    log(error);
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

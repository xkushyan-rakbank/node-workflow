import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { history } from "./../configureStore";
import * as actions from "../actions/loginForm";
import { updateProspect } from "../actions/appConfig";

import apiClient from "../../api/apiClient";
import routes from "./../../routes";

export function* loginFormSaga(action) {
  try {
    const state = yield select();
    const recaptchaToken = state.reCaptcha && state.reCaptcha.token && state.reCaptcha.token;

    const param = {
      username: action.payload.userName || "",
      password: action.payload.password || "",
      recaptchaToken
    };
    const response = yield call(apiClient.authentication.login, param);
    if (response.status === 200) {
      yield put(actions.loginInfoFormSuccess(response.data));
      yield call(history.push, routes.searchProspect);
    } else {
      yield put(actions.loginInfoFormFail());
    }
  } catch (error) {
    console.log({ error });
  }
}

function* formatLoginSaga() {
  const clearedLoginDetail = {
    ["login.userName"]: "",
    ["login.password"]: ""
  };
  yield put(updateProspect(clearedLoginDetail));
}

export default function* loginInfoFormSaga() {
  yield all([takeLatest(actions.LOGIN_INFO_FORM, loginFormSaga)]);
  yield all([takeLatest(actions.FORMAT_LOGIN, formatLoginSaga)]);
}

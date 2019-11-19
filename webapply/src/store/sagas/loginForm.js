import { all, call, put, takeLatest } from "redux-saga/effects";
import { history } from "./../configureStore";
import * as actions from "../actions/loginForm";
import { updateProspect } from "../actions/appConfig";

import { authentication } from "../../api/apiClient";
import routes from "./../../routes";

export function* loginFormSaga(action) {
  try {
    const param = {
      username: action.payload.userName || "",
      password: action.payload.password || ""
    };
    const response = yield call(authentication.login, param);
    if (response.status === 200) {
      yield put(actions.loginInfoFormSuccess(response.data));
      yield call(history.push, routes.searchProspect);
    } else {
      yield put(actions.loginInfoFormFail());
    }
  } catch (error) {
    console.error({ error });
  }
}

function* formatLoginSaga() {
  const clearedLoginDetail = {
    "login.username": "",
    "login.password": ""
  };
  yield put(updateProspect(clearedLoginDetail));
}

export default function* loginInfoFormSaga() {
  yield all([takeLatest(actions.LOGIN_INFO_FORM, loginFormSaga)]);
  yield all([takeLatest(actions.FORMAT_LOGIN, formatLoginSaga)]);
}

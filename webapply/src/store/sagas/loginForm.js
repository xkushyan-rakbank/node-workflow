import { all, call, put, takeLatest } from "redux-saga/effects";
import { history } from "./../configureStore";
import * as actions from "../actions/loginForm";

import { setInputsErrors } from "./../actions/serverValidation";
import apiClient from "../../api/apiClient";
import routes from "./../../routes";

function* loginFormSaga(action) {
  try {
    const param = {
      username: action.payload.userName || "",
      password: action.payload.password || ""
    };
    const response = yield call(apiClient.authentication.login, param);
    if (response.status === 200) {
      yield put(actions.loginInfoFormSuccess(response.data));
      yield call(history.push, routes.searchProspect);
    } else {
      yield put(actions.loginInfoFormFail());
    }
  } catch (error) {
    const { errors } = error.response.data;
    yield put(setInputsErrors(errors));
  }
}

export default function* loginInfoFormSaga() {
  yield all([takeLatest(actions.LOGIN_INFO_FORM, loginFormSaga)]);
}

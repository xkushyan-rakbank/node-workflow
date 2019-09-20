import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  ABOUT_COMPANY_FORM,
  aboutCompanySuccess
} from "../actions/aboutCompany";
import * as appConfigSelectors from "../selectors/appConfig";
import * as appConfigActions from "../actions/appConfig";
import { setInputsErrors } from "../actions/serverValidation";
import routes from "../../routes";

function* aboutCompanyFormSaga() {
  try {
    const state = yield select();
    const prospect = appConfigSelectors.getProspect(state);
    // yield call(apiClient.prospect.update, prospect);
    yield put(aboutCompanySuccess());
    // yield put(appConfigActions.updateProspect(prospect));
  } catch (error) {
    const { errors } = error.response.data;
    yield put(setInputsErrors(errors));
  }
}

export default function* aboutCompanySaga() {
  yield all([takeLatest(ABOUT_COMPANY_FORM, aboutCompanyFormSaga)]);
}

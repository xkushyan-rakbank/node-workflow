import { all, put, call, delay, select, takeLatest } from "redux-saga/effects";
import {
  ABOUT_COMPANY_FORM,
  aboutCompanySuccess,
  aboutCompanyResetStep
} from "../actions/aboutCompany";
import { getProspect, getProspectId } from "../selectors/appConfig";
import { resetInputsErrors } from "../actions/serverValidation";
import apiClient from "../../api/apiClient";

function* aboutCompanyFormSaga() {
  try {
    const state = yield select();
    const prospect = getProspect(state);
    const prospectID = getProspectId(state) || "COSME0000000000000001"; // remove hardcoded ID

    yield call(apiClient.prospect.update, prospectID, prospect);
    yield put(aboutCompanySuccess());
    yield put(aboutCompanyResetStep({ resetStep: true }));
    yield put(resetInputsErrors());
    yield delay(500);
    yield put(aboutCompanyResetStep({ resetStep: false }));
  } catch (error) {
    console.log({ error });
  }
}

export default function* aboutCompanySaga() {
  yield all([takeLatest(ABOUT_COMPANY_FORM, aboutCompanyFormSaga)]);
}

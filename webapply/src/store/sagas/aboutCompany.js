import { all, put, call, delay, select, takeLatest } from "redux-saga/effects";
import {
  ABOUT_COMPANY_FORM,
  aboutCompanySuccess,
  aboutCompanyFail,
  aboutCompanyResetStep
} from "../actions/aboutCompany";
import { applicationStatusServerError } from "./../actions/applicationStatus";
import { getProspect, getProspectId } from "../selectors/appConfig";
import { setInputsErrors, resetInputsErrors } from "../actions/serverValidation";
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
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      const { errors } = error.response.data;
      yield put(setInputsErrors(errors));
      yield put(aboutCompanyFail());
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      yield put(applicationStatusServerError());
    } else {
      console.log({ error });
    }
  }
}

export default function* aboutCompanySaga() {
  yield all([takeLatest(ABOUT_COMPANY_FORM, aboutCompanyFormSaga)]);
}

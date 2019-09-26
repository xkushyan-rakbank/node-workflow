import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { APPLICANT_INFO_FORM, applicantInfoFormSuccess } from "../actions/applicantInfoForm";
import {
  applicationStatusProceed,
  applicationStatusStop,
  applicationStatusServerError
} from "./../actions/applicationStatus";
import { history } from "./../configureStore";
import * as appConfigActions from "../actions/appConfig";
import { setInputsErrors, resetInputsErrors } from "./../actions/serverValidation";
import apiClient from "../../api/apiClient";
import * as appConfigSelectors from "../selectors/appConfig";
import routes from "./../../routes";

function* applicantInfoFormSaga() {
  try {
    const state = yield select();
    const {
      data: { prospectId, preScreening }
    } = yield call(apiClient.prospect.create, appConfigSelectors.getProspect(state));

    if (preScreening.statusOverAll === "stop") {
      yield put(applicationStatusStop(preScreening.screeningResults));
    } else {
      yield put(applicationStatusProceed());
      yield put(applicantInfoFormSuccess());

      yield put(appConfigActions.updateProspectId(prospectId));

      yield call(history.push, routes.verifyOtp);
      yield put(resetInputsErrors());
    }
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      const { errors } = error.response.data;
      yield put(setInputsErrors(errors));
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

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}

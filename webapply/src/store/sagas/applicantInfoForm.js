import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  APPLICANT_INFO_FORM,
  applicantInfoFormSuccess
} from "../actions/applicantInfoForm";
import {
  applicationStatusProceed,
  applicationStatusStop
} from "./../actions/applicationStatus";
import { history } from "./../configureStore";
import * as appConfigActions from "../actions/appConfig";
import { setInputsErrors } from "./../actions/serverValidation";
import apiClient from "../../api/apiClient";
import * as appConfigSelectors from "../selectors/appConfig";
import routes from "./../../routes";

function* applicantInfoFormSaga() {
  try {
    const state = yield select();
    const {
      data: { prospectId, preScreening }
    } = yield call(
      apiClient.prospect.create,
      appConfigSelectors.getProspect(state)
    );

    if (preScreening.statusOverAll === "stop") {
      yield put(applicationStatusStop(preScreening.screeningResults));
    } else {
      yield put(applicationStatusProceed());
      yield put(applicantInfoFormSuccess());

      yield put(appConfigActions.updateProspectId(prospectId));

      yield call(history.push, routes.verifyOtp);
    }
  } catch (error) {
    const { errors } = error.response.data;
    yield put(setInputsErrors(errors));
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}

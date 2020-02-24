import { all, put, takeLatest, select } from "redux-saga/effects";
import { SET_STEP_STATUS, SET_INITIAL_STEPS, REMOVE_SIGNATORY } from "../actions/completedSteps";
import { log } from "../../utils/loggger";
import { updateProspect } from "../actions/appConfig";

function* setStepSaga() {
  try {
    const state = yield select();

    yield put(
      updateProspect({ "prospect.freeFieldsInfo.freeField5": JSON.stringify(state.completedSteps) })
    );
  } catch (error) {
    log(error);
  }
}

export default function* completedStepsSaga() {
  yield all([takeLatest([SET_STEP_STATUS, SET_INITIAL_STEPS, REMOVE_SIGNATORY], setStepSaga)]);
}

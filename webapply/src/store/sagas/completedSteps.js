import { all, put, takeLatest, select } from "redux-saga/effects";
import { SET_STEP_STATUS, SET_INITIAL_STEPS, REMOVE_SIGNATORY } from "../actions/completedSteps";
import { log } from "../../utils/loggger";
import { updateProspect } from "../actions/appConfig";

function* setStepSaga() {
  const {
    completedSteps,
    appConfig: { prospect }
  } = yield select();

  let freeField5 = {};

  try {
    freeField5 = JSON.parse(prospect.freeFieldsInfo.freeField5);
  } catch (err) {
    log(err);
  }

  yield put(
    updateProspect({
      "prospect.freeFieldsInfo.freeField5": JSON.stringify({ ...freeField5, completedSteps })
    })
  );
}

export default function* completedStepsSaga() {
  yield all([takeLatest([SET_STEP_STATUS, SET_INITIAL_STEPS, REMOVE_SIGNATORY], setStepSaga)]);
}

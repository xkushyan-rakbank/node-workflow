import { all, put, takeEvery, select } from "redux-saga/effects";
import {
  ADD_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  SET_DUAL_CITIZENSHIP
} from "../actions/stakeholders";
import { setProspect } from "../actions/appConfig";
import cloneDeep from "lodash/cloneDeep";

function* addNewStakeholderSaga() {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  config.prospect.signatoryInfo.push({});

  yield put(setProspect(config));
}

function* deleteStakeholderSaga(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  const updatedSignatories = config.prospect.signatoryInfo.filter(
    item => item.signatoryId !== action.stakeholderId
  );

  config.prospect.signatoryInfo = updatedSignatories;

  yield put(setProspect(config));
}

function* setDualCitizenshipSaga(action) {
  console.log(action);
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  if (!action.citizenship) {
    config.prospect.signatoryInfo[action.index].kycDetails.dualCitizenshipCountry = [{}];
  }
  // config.prospect.signatoryInfo.push({});
  console.log(config.prospect.signatoryInfo[action.index]);
  yield put(setProspect(config));
}

export default function* appConfigSaga() {
  yield all([
    takeEvery(ADD_NEW_STAKEHOLDER, addNewStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga),
    takeEvery(SET_DUAL_CITIZENSHIP, setDualCitizenshipSaga)
  ]);
}

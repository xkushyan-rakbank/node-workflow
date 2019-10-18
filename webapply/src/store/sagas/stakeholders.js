import { all, put, takeEvery, select } from "redux-saga/effects";
import {
  ADD_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  HANDLE_CITIZENSHIP
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

function* handleCitizenshipSaga(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  let passportDetails = config.prospect.signatoryInfo[action.index].kycDetails.passportDetails;
  if (action.value) {
    if (passportDetails.length < 5) {
      passportDetails.push({});
    }
    if (action.passportIndex === 0) {
      config.prospect.signatoryInfo[action.index].kycDetails.dualCitizenship = action.value;
    }
  }
  /*else {
    const updatedPassportDetails = passportDetails.filter(
      (item, index) => index !== action.passportIndex
    );
    passportDetails = updatedPassportDetails;
  }*/

  yield put(setProspect(config));
}

export default function* appConfigSaga() {
  yield all([
    takeEvery(ADD_NEW_STAKEHOLDER, addNewStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga),
    takeEvery(HANDLE_CITIZENSHIP, handleCitizenshipSaga)
  ]);
}

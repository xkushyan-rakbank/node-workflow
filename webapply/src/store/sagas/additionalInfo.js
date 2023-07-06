import { takeLatest, put, all } from "redux-saga/effects";
import {
  UPDATE_COMPANY_ADDITIONAL_INFO_STATUS,
  UPDATE_STAKEHOLDER_INFO_STATUS
} from "../actions/additionalInfo";
import { log } from "../../utils/loggger";

function* updateCompanyAdditionalInfoStatus(action) {
  try {
    yield put(updateCompanyAdditionalInfoStatus(action.payload));
  } catch (error) {
    log(error);
  }
}

function* updateStakeholderInfoStatus(action) {
  try {
    yield put(updateStakeholderInfoStatus(action.payload));
  } catch (error) {
    log(error);
  }
}

function* watchUpdateCompanyAdditionalInfoStatus() {
  yield takeLatest(UPDATE_COMPANY_ADDITIONAL_INFO_STATUS, updateCompanyAdditionalInfoStatus);
}

function* watchUpdateStakeholderInfoStatus() {
  yield takeLatest(UPDATE_STAKEHOLDER_INFO_STATUS, updateStakeholderInfoStatus);
}

export default function* addtionalInfoSaga() {
  yield all([watchUpdateCompanyAdditionalInfoStatus(), watchUpdateStakeholderInfoStatus()]);
}

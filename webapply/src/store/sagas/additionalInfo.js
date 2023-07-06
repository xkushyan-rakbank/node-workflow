import { takeLatest, put, all } from "redux-saga/effects";
import {
  UPDATE_COMPANY_ADDITIONAL_INFO_STATUS,
  UPDATE_STAKEHOLDER_INFO_STATUS,
  updateCompanyAdditionalInfoStatus,
  updateStakeholderInfoStatus
} from "../actions/additionalInfo";
import { log } from "../../utils/loggger";

function* updateCompanyAdditionalInfo(action) {
  try {
    yield put(updateCompanyAdditionalInfoStatus(action.payload));
  } catch (error) {
    log(error);
  }
}

function* updateStakeholderInfo(action) {
  try {
    yield put(updateStakeholderInfoStatus(action.payload));
  } catch (error) {
    log(error);
  }
}

export default function* addtionalInfoSaga() {
  yield all(
    takeLatest(UPDATE_STAKEHOLDER_INFO_STATUS, updateStakeholderInfo),
    takeLatest(UPDATE_COMPANY_ADDITIONAL_INFO_STATUS, updateCompanyAdditionalInfo)
  );
}

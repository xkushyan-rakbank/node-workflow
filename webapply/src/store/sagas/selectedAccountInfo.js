import { put, all, takeLatest } from "redux-saga/effects";
import { UPDATE_ACCOUNT_TYPE, UPDATE_ISLAMIC_TYPE } from "../actions/selectedAccountInfo";
import { updateProspect } from "../actions/appConfig";

function* updateAccountTypeSaga({ payload: accountType }) {
  yield put(updateProspect({ "prospect.applicationInfo.accountType": accountType }));
}

function* updateIslamicTypeSaga({ payload: isIslamicType }) {
  yield put(updateProspect({ "prospect.applicationInfo.islamicBanking": isIslamicType }));
}

export default function* selectedAccountInfoSagas() {
  yield all([
    takeLatest(UPDATE_ACCOUNT_TYPE, updateAccountTypeSaga),
    takeLatest(UPDATE_ISLAMIC_TYPE, updateIslamicTypeSaga)
  ]);
}

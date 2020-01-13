import { put, all, takeLatest } from "redux-saga/effects";
import { UPDATE_ACCOUNT_TYPE, UPDATE_ISLAMIC_TYPE } from "../actions/selectedAccountInfo";
import { updateProspect } from "../actions/appConfig";

function* updateAccountTypeSaga({ payload: accountType }) {
  window.localStorage.setItem("selectedAccountType", JSON.stringify(accountType));
  yield put(updateProspect({ "prospect.applicationInfo.accountType": accountType }));
}

function* updateIslamicTypeSaga({ payload: isIslamicType }) {
  window.localStorage.setItem("isIslamicType", JSON.stringify(isIslamicType));
  yield put(updateProspect({ "prospect.applicationInfo.islamicBanking": isIslamicType }));
}

export default function* selectedAccountInfoSagas() {
  yield all([
    takeLatest(UPDATE_ACCOUNT_TYPE, updateAccountTypeSaga),
    takeLatest(UPDATE_ISLAMIC_TYPE, updateIslamicTypeSaga)
  ]);
}

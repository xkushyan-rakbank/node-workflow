import { all, put, takeEvery, select } from "redux-saga/effects";
import cloneDeep from "lodash/cloneDeep";
import uniqueId from "lodash/uniqueId";

import {
  CREATE_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  changeEditableStakeholder,
  updateStakeholdersIds
} from "../actions/stakeholders";
import { setConfig } from "../actions/appConfig";

function* createNewStakeholderSaga() {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  const stakeholdersIds = [...state.stakeholders.stakeholdersIds];
  const stakeholderId = uniqueId();
  stakeholdersIds.push(stakeholderId);

  const signatoryInfoModel = cloneDeep(config.prospectModel.signatoryInfo[0]);
  config.prospect.signatoryInfo.push(signatoryInfoModel);
  const editableStakeholder = config.prospect.signatoryInfo.length - 1;

  yield put(updateStakeholdersIds(stakeholdersIds));
  yield put(changeEditableStakeholder(editableStakeholder));
  yield put(setConfig(config));
}

function* deleteStakeholderSaga(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  const stakeholdersIds = [...state.stakeholders.stakeholdersIds];
  const stakeholderIndex = stakeholdersIds.indexOf(action.stakeholderId);

  config.prospect.signatoryInfo.splice(stakeholderIndex, 1);
  yield put(setConfig(config));

  stakeholdersIds.splice(stakeholderIndex, 1);
  yield put(updateStakeholdersIds(stakeholdersIds));
  yield put(changeEditableStakeholder());
}

export default function* appConfigSaga() {
  yield all([
    takeEvery(CREATE_NEW_STAKEHOLDER, createNewStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga)
  ]);
}

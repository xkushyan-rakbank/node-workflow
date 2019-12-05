import { all, put, takeEvery, select, take } from "redux-saga/effects";
import cloneDeep from "lodash/cloneDeep";
import isUndefined from "lodash/isUndefined";
import uniqueId from "lodash/uniqueId";

import {
  ADD_NEW_STAKEHOLDER,
  CREATE_NEW_STAKEHOLDER,
  EDIT_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  createNewStakeholder,
  changeEditableStakeholder,
  openConfirmDialog,
  closeConfirmDialog,
  updateStakeholdersIds
} from "../actions/stakeholders";
import { setConfig, resetProspect } from "../actions/appConfig";

function* addNewStakeholderSaga() {
  const state = yield select();
  const stakeholderInfo = state.stakeholders;

  if (isUndefined(stakeholderInfo.editableStakeholder)) {
    yield put(createNewStakeholder());
  } else {
    yield put(openConfirmDialog());
    yield take("CONFIRM_HANDLER");
    const { result } = yield take("CONFIRM_HANDLER");
    const value = JSON.parse(result.currentTarget.value);

    if (value) {
      yield put(resetProspect());
      yield put(createNewStakeholder());
    } else {
      yield put(closeConfirmDialog());
    }
  }
}

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

function* editStakeholderSaga(action) {
  const state = yield select();
  const stakeholderInfo = state.stakeholders;

  if (isUndefined(stakeholderInfo.editableStakeholder)) {
    yield put(changeEditableStakeholder(action.index));
  } else {
    yield put(openConfirmDialog());
    // const { result } = yield take("CONFIRM_HANDLER");
    // const value = JSON.parse(result.currentTarget.value);
    // if (value) {
    yield put(resetProspect());
    yield put(changeEditableStakeholder(action.index));
    // } else {
    //   yield put(closeConfirmDialog());
    // }
  }
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
    takeEvery(ADD_NEW_STAKEHOLDER, addNewStakeholderSaga),
    takeEvery(CREATE_NEW_STAKEHOLDER, createNewStakeholderSaga),
    takeEvery(EDIT_STAKEHOLDER, editStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga)
  ]);
}

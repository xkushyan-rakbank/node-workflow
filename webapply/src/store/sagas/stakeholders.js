import { all, put, takeEvery, select } from "redux-saga/effects";
import cloneDeep from "lodash/cloneDeep";
import uniqueId from "lodash/uniqueId";

import {
  CREATE_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  changeEditableStakeholder,
  updateStakeholdersIds,
  SET_FILL_STAKEHOLDER
} from "../actions/stakeholders";
import { addSignatory, removeSignatory } from "../actions/completedSteps";
import { setConfig } from "../actions/appConfig";

function* createNewStakeholderSaga() {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  const stakeholdersIds = [...state.stakeholders.stakeholdersIds, { id: uniqueId(), done: false }];

  const signatoryInfoModel = cloneDeep(config.prospectModel.signatoryInfo[0]);
  config.prospect.signatoryInfo.push(signatoryInfoModel);
  const editableStakeholder = config.prospect.signatoryInfo.length - 1;

  yield put(updateStakeholdersIds(stakeholdersIds));
  yield put(addSignatory());
  yield put(changeEditableStakeholder(editableStakeholder));
  yield put(setConfig(config));
}

function* deleteStakeholderSaga(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  const stakeholdersIds = [...state.stakeholders.stakeholdersIds];
  const stakeholderIndex = stakeholdersIds.indexOf(action.stakeholderId);
  const removedIndex = stakeholdersIds.indexOf(
    stakeholdersIds.find(item => item.id === action.stakeholderId)
  );

  config.prospect.signatoryInfo.splice(stakeholderIndex, 1);
  yield put(setConfig(config));

  stakeholdersIds.splice(stakeholderIndex, 1);
  yield put(updateStakeholdersIds(stakeholdersIds));
  yield put(removeSignatory(removedIndex));
  yield put(changeEditableStakeholder());
}

function* setFillStakeholderSaga({ payload }) {
  const state = yield select();
  const stakeholdersIds = state.stakeholders.stakeholdersIds.reduce(
    (previousValue, currentValue, index) => [
      ...previousValue,
      {
        ...currentValue,
        done: payload.index === index ? payload.done : currentValue.done
      }
    ],
    []
  );

  yield put(updateStakeholdersIds(stakeholdersIds));
}

export default function* appConfigSaga() {
  yield all([
    takeEvery(CREATE_NEW_STAKEHOLDER, createNewStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga),
    takeEvery(SET_FILL_STAKEHOLDER, setFillStakeholderSaga)
  ]);
}

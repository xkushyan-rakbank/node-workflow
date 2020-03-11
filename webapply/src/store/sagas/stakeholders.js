import { all, put, takeEvery, select } from "redux-saga/effects";
import uniqueId from "lodash/uniqueId";

import {
  CREATE_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  changeEditableStakeholder,
  updateStakeholdersIds,
  SET_FILL_STAKEHOLDER,
  SET_EDIT_STAKEHOLDER
} from "../actions/stakeholders";
import { removeSignatory } from "../actions/completedSteps";
import { setConfig } from "../actions/appConfig";
import { UAE } from "../../constants";

function* createNewStakeholderSaga() {
  const state = yield select();
  const config = { ...state.appConfig };
  const stakeholderId = uniqueId();
  const stakeholdersIds = [
    ...state.stakeholders.stakeholdersIds,
    { id: stakeholderId, done: false }
  ];

  const signatoryInfoModel = { ...config.prospectModel.signatoryInfo[0] };
  signatoryInfoModel.kycDetails.residenceCountry = UAE;
  signatoryInfoModel.kycDetails.isUAEResident = true;
  config.prospect.signatoryInfo.push(signatoryInfoModel);
  const editableStakeholder = config.prospect.signatoryInfo.length - 1;

  yield put(updateStakeholdersIds(stakeholdersIds));
  yield put(changeEditableStakeholder(editableStakeholder));
  yield put(setConfig(config));
}

function* deleteStakeholderSaga(action) {
  const state = yield select();
  const config = { ...state.appConfig };
  const stakeholdersIds = [...state.stakeholders.stakeholdersIds];
  const removedIndex = stakeholdersIds.indexOf(
    stakeholdersIds.find(item => item.id === action.stakeholderId)
  );

  config.prospect.signatoryInfo.splice(removedIndex, 1);
  yield put(setConfig(config));

  stakeholdersIds.splice(removedIndex, 1);
  yield put(updateStakeholdersIds(stakeholdersIds));
  yield put(removeSignatory(action.stakeholderId));
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

function* setEditStakeholderSaga({ payload }) {
  const state = yield select();
  const stakeholdersIds = state.stakeholders.stakeholdersIds.reduce(
    (previousValue, currentValue, index) => [
      ...previousValue,
      {
        ...currentValue,
        isEditting: payload.index === index ? payload.isEditting : currentValue.isEditting
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
    takeEvery(SET_FILL_STAKEHOLDER, setFillStakeholderSaga),
    takeEvery(SET_EDIT_STAKEHOLDER, setEditStakeholderSaga)
  ]);
}

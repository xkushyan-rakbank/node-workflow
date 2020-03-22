import { all, put, takeEvery, select } from "redux-saga/effects";
import uniqueId from "lodash/uniqueId";

import { cloneDeep } from "../../utils/cloneDeep";

import {
  CREATE_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  changeEditableStakeholder,
  updateStakeholdersIds,
  SET_FILL_STAKEHOLDER,
  SET_EDIT_STAKEHOLDER
} from "../actions/stakeholders";
import { removeSignatory } from "../actions/completedSteps";
import { updateProspect } from "../actions/appConfig";
import { UAE } from "../../constants";
import { getSignatoryModel } from "../selectors/appConfig";
import { getStakeholders, getStakeholdersIds } from "../selectors/stakeholder";

function* createNewStakeholderSaga() {
  const stakeholders = select(getStakeholders);
  const stakeholdersIds = select(getStakeholdersIds);
  const newStakeholder = cloneDeep(select(getSignatoryModel));

  newStakeholder.kycDetails.residenceCountry = UAE;
  newStakeholder.kycDetails.isUAEResident = true;

  const stakeholderId = uniqueId();

  const updatedStakeholdersIds = [...stakeholdersIds, { id: stakeholderId, done: false }];

  yield put(updateStakeholdersIds(updatedStakeholdersIds));
  yield put(changeEditableStakeholder(updatedStakeholdersIds.length - 1));
  yield put(
    updateProspect({
      "prospect.signatoryInfo": [...stakeholders, newStakeholder]
    })
  );
}

function* deleteStakeholderSaga({ stakeholderId }) {
  const stakeholdersIds = yield select(getStakeholdersIds);
  const stakeholders = yield select(getStakeholders);

  const indexToRemove = stakeholdersIds.indexOf(
    stakeholdersIds.find(item => item.id === stakeholderId)
  );

  yield put(
    updateProspect({ "prospect.signatoryInfo": stakeholders.filter((_, i) => i !== indexToRemove) })
  );
  yield put(updateStakeholdersIds(stakeholdersIds.filter((_, i) => i !== indexToRemove)));
  yield put(removeSignatory(stakeholderId));
  yield put(changeEditableStakeholder());
}

function* setFillStakeholderSaga({ payload }) {
  const stakeholdersIds = yield select(getStakeholdersIds);
  const updatedStakeholdersIds = stakeholdersIds.map((currentValue, index) => ({
    ...currentValue,
    done: payload.index === index ? payload.done : currentValue.done
  }));

  yield put(updateStakeholdersIds(updatedStakeholdersIds));
}

function* setEditStakeholderSaga({ payload }) {
  const stakeholdersIds = yield select(getStakeholdersIds);
  const updatedStakeholdersIds = stakeholdersIds.map((currentValue, index) => ({
    ...currentValue,
    isEditting: payload.index === index ? payload.isEditting : currentValue.isEditting
  }));

  yield put(updateStakeholdersIds(updatedStakeholdersIds));
}

export default function* appConfigSaga() {
  yield all([
    takeEvery(CREATE_NEW_STAKEHOLDER, createNewStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga),
    takeEvery(SET_FILL_STAKEHOLDER, setFillStakeholderSaga),
    takeEvery(SET_EDIT_STAKEHOLDER, setEditStakeholderSaga)
  ]);
}

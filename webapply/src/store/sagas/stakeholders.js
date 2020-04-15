import { all, put, takeEvery, select } from "redux-saga/effects";
import nanoid from "nanoid";

import { cloneDeep } from "../../utils/cloneDeep";

import {
  CREATE_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  changeEditableStakeholder,
  updateStakeholdersIds
} from "../actions/stakeholders";
import { removeSignatory } from "../actions/completedSteps";
import { updateProspect } from "../actions/appConfig";
import { getSignatories, getSignatoryModel } from "../selectors/appConfig";
import { getStakeholdersIds } from "../selectors/stakeholders";

export function* createNewStakeholderSaga() {
  const stakeholders = yield select(getSignatories);
  const stakeholdersIds = yield select(getStakeholdersIds);
  const newStakeholder = cloneDeep(yield select(getSignatoryModel));

  const stakeholderId = nanoid();

  const updatedStakeholdersIds = [...stakeholdersIds, stakeholderId];

  yield put(updateStakeholdersIds(updatedStakeholdersIds));
  yield put(changeEditableStakeholder(stakeholderId));
  yield put(
    updateProspect({
      "prospect.signatoryInfo": [...stakeholders, newStakeholder]
    })
  );
}

export function* deleteStakeholderSaga({ payload: stakeholderId }) {
  const stakeholdersIds = yield select(getStakeholdersIds);
  const stakeholders = yield select(getSignatories);

  const indexToRemove = stakeholdersIds.indexOf(stakeholderId);

  yield put(
    updateProspect({ "prospect.signatoryInfo": stakeholders.filter((_, i) => i !== indexToRemove) })
  );
  yield put(updateStakeholdersIds(stakeholdersIds.filter(id => id !== stakeholderId)));
  yield put(removeSignatory(stakeholderId));
  yield put(changeEditableStakeholder(null));
}

export default function* stakeholderSaga() {
  yield all([
    takeEvery(CREATE_NEW_STAKEHOLDER, createNewStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga)
  ]);
}

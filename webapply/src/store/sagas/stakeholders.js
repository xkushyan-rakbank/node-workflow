import { all, put, takeEvery, select } from "redux-saga/effects";
import nanoid from "nanoid";

import { cloneDeep } from "../../utils/cloneDeep";

import {
  CREATE_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  changeEditableStakeholder,
  updateStakeholdersIds,
  RESET_STAKEHOLDER_INFO
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

export function* resetStakeholderSaga({ payload: staekholderIndex }) {
  const stakeholders = cloneDeep(yield select(getSignatories));
  const newStakeholder = yield select(getSignatoryModel);

  const resetedStakeholder = {
    ...newStakeholder,
    signatoryId: stakeholders[staekholderIndex].signatoryId,
    stakeholdersDocuments: stakeholders[staekholderIndex].stakeholdersDocuments,
    addressInfo: stakeholders[staekholderIndex].addressInfo
  };
  yield put(
    updateProspect({ [`prospect.signatoryInfo[${staekholderIndex}]`]: resetedStakeholder })
  );
}

export default function* stakeholderSaga() {
  yield all([
    takeEvery(CREATE_NEW_STAKEHOLDER, createNewStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga),
    takeEvery(RESET_STAKEHOLDER_INFO, resetStakeholderSaga)
  ]);
}

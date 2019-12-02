import { all, put, takeEvery, select, take } from "redux-saga/effects";
import {
  ADD_NEW_STAKEHOLDER,
  CREATE_NEW_STAKEHOLDER,
  EDIT_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  HANDLE_CITIZENSHIP,
  FORMAT_PERSONAL_INFORMATION,
  FORMAT_NATIONALITY,
  HANDLE_CHANGE_STEP,
  createNewStakeholder,
  changeEditableStakeholder,
  openConfirmDialog,
  closeConfirmDialog,
  changeStep,
  updateStakeholdersIds
} from "../actions/stakeholders";
import { updateProspect, setConfig, resetProspect } from "../actions/appConfig";
import { sendProspectToAPI } from "../actions/sendProspectToAPI";
import cloneDeep from "lodash/cloneDeep";
import isUndefined from "lodash/isUndefined";
import get from "lodash/get";
import uniqueId from "lodash/uniqueId";
import { stakeHoldersSteps } from "../../containers/StakeholderStepper/constants";

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

function* handleCitizenshipSaga(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  let passportDetails = config.prospect.signatoryInfo[action.index].kycDetails.passportDetails;

  if (action.passportIndex === 0) {
    config.prospect.signatoryInfo[action.index].kycDetails.dualCitizenship = action.value;
  }

  if (action.value) {
    if (passportDetails.length < 5 && action.passportIndex >= passportDetails.length - 1) {
      passportDetails.push({});
    }
  }

  yield put(setConfig(config));
}

function* formatPersonalInformationSaga(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);

  const kycDetails = config.prospect.signatoryInfo[action.index].kycDetails;

  if (kycDetails.isShareholderACompany) {
    const { index } = action;
    const clearedPersonalInfo = {
      [`prospect.signatoryInfo[${index}].firstName`]: "",
      [`prospect.signatoryInfo[${index}].middleName`]: "",
      [`prospect.signatoryInfo[${index}].lastName`]: "",
      [`prospect.signatoryInfo[${index}].dateOfBirth`]: null
    };
    yield put(updateProspect(clearedPersonalInfo));
  }
  yield put(sendProspectToAPI());
}

function* formatNationalitySaga(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);

  const kycDetails = config.prospect.signatoryInfo[action.index].kycDetails;
  if (!kycDetails.dualCitizenship) {
    kycDetails.passportDetails = [kycDetails.passportDetails[0]];
  } else {
    const activeNationalityIndexes = [0];
    kycDetails.passportDetails.forEach(
      (nationality, index) =>
        nationality.hasAnotherCitizenship && activeNationalityIndexes.push(index + 1)
    );
    kycDetails.passportDetails = kycDetails.passportDetails.filter((nat, idx) =>
      activeNationalityIndexes.includes(idx)
    );
  }
  yield put(setConfig(config));

  yield put(sendProspectToAPI());
}

function* handleChangeStepSaga(action) {
  const state = yield select();
  const stakeholderInfo = state.stakeholders;
  const currentStep = get(action.step, "step");
  let step = currentStep || stakeholderInfo.step + 1;

  if (stakeholderInfo.step === stakeHoldersSteps.length && !currentStep) {
    yield put(changeStep({ isFinalScreenShown: true, isNewStakeholder: false }));
  } else {
    let completedStep = null;
    if (stakeholderInfo.isNewStakeholder) {
      completedStep = currentStep ? stakeholderInfo.completedStep : stakeholderInfo.step;
    } else {
      completedStep = stakeHoldersSteps.length;
    }
    const isStatusShown = true;
    yield put(changeStep({ step, completedStep, isStatusShown, isFinalScreenShown: false }));
  }
}

export default function* appConfigSaga() {
  yield all([
    takeEvery(ADD_NEW_STAKEHOLDER, addNewStakeholderSaga),
    takeEvery(CREATE_NEW_STAKEHOLDER, createNewStakeholderSaga),
    takeEvery(EDIT_STAKEHOLDER, editStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga),
    takeEvery(HANDLE_CITIZENSHIP, handleCitizenshipSaga),
    takeEvery(FORMAT_PERSONAL_INFORMATION, formatPersonalInformationSaga),
    takeEvery(FORMAT_NATIONALITY, formatNationalitySaga),
    takeEvery(HANDLE_CHANGE_STEP, handleChangeStepSaga)
  ]);
}

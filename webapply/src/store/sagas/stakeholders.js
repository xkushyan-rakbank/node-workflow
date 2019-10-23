import { all, put, takeEvery, select } from "redux-saga/effects";
import {
  ADD_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  HANDLE_CITIZENSHIP,
  FORMAT_PERSONAL_INFORMATION,
  FORMAT_NATIONALITY
} from "../actions/stakeholders";
import { updateProspect, setProspect } from "../actions/appConfig";
import { sendProspectToAPI } from "../actions/sendProspectToAPI";
import cloneDeep from "lodash/cloneDeep";

function* addNewStakeholderSaga() {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  config.prospect.signatoryInfo.push({});

  yield put(setProspect(config));
}

function* deleteStakeholderSaga(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  const updatedSignatories = action.stakeholderId
    ? config.prospect.signatoryInfo.filter(item => item.signatoryId !== action.stakeholderId)
    : config.prospect.signatoryInfo.splice(-1, 1);

  config.prospect.signatoryInfo = updatedSignatories;

  yield put(setProspect(config));
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

  yield put(setProspect(config));
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
  yield put(setProspect(config));

  yield put(sendProspectToAPI());
}

export default function* appConfigSaga() {
  yield all([
    takeEvery(ADD_NEW_STAKEHOLDER, addNewStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga),
    takeEvery(HANDLE_CITIZENSHIP, handleCitizenshipSaga),
    takeEvery(FORMAT_PERSONAL_INFORMATION, formatPersonalInformationSaga),
    takeEvery(FORMAT_NATIONALITY, formatNationalitySaga)
  ]);
}

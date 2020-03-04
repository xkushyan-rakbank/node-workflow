import {
  all,
  put,
  call,
  delay,
  select,
  takeLatest,
  take,
  cancel,
  cancelled,
  fork,
  actionChannel,
  flush
} from "redux-saga/effects";
import cloneDeep from "lodash/cloneDeep";

import { getErrorScreensIcons } from "../../utils/getErrorScreenIcons/getErrorScreenIcons";
import {
  SEND_PROSPECT_TO_API,
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  resetFormStep,
  PROSPECT_AUTO_SAVE,
  sendProspectRequest,
  SEND_PROSPECT_REQUEST,
  setScreeningError
} from "../actions/sendProspectToAPI";
import { log } from "../../utils/loggger";
import {
  getProspect,
  getProspectId,
  getAuthorizationHeader,
  getAccountType,
  getIsIslamicBanking,
  getScreeningError
} from "../selectors/appConfig";
import { setLockStatusByROAgent } from "../actions/searchProspect";
import { resetInputsErrors, setInputsErrors } from "../actions/serverValidation";
import { updateAccountNumbers } from "../actions/accountNumbers";
import { prospect } from "../../api/apiClient";
import {
  APP_STOP_SCREEN_RESULT,
  screeningStatus,
  screeningStatusDefault,
  CONTINUE,
  AUTO,
  VIEW_IDS
} from "../../constants";
import { updateProspect } from "../actions/appConfig";
import { ROError, FieldsValidationError } from "../../api/serverErrors";
import { SCREENING_FAIL_REASONS } from "../../constants";

function* watchRequest() {
  const chan = yield actionChannel(SEND_PROSPECT_REQUEST);
  while (true) {
    const actions = yield flush(chan);
    if (actions.length) {
      const action = actions.find(act => act.payload.saveType === CONTINUE) || actions[0];
      yield call(sendProspectToAPI, action);
    }
    yield delay(1000);
  }
}

function* setScreeningResults({ preScreening }) {
  const currScreeningType = preScreening.screeningResults.find(screeningResult =>
    SCREENING_FAIL_REASONS.includes(screeningResult.screeningReason)
  );

  const screenError = screeningStatus.find(
    ({ screeningType }) => screeningType === (currScreeningType || {}).screeningType
  );

  if (screenError) {
    const state = yield select();
    const accountType = getAccountType(state);
    const isIslamicBanking = getIsIslamicBanking(state);
    const { screeningType } = screenError;

    yield put(
      setScreeningError({
        ...screenError,
        text: currScreeningType.reasonNotes,
        icon: getErrorScreensIcons(accountType, isIslamicBanking, screeningType)
      })
    );
  } else {
    yield put(setScreeningError(screeningStatusDefault));
  }
}

function* sendProspectToAPISaga({ payload: { saveType, actionType } }) {
  try {
    yield put(resetInputsErrors());
    yield put(resetFormStep({ resetStep: true }));

    const state = yield select();
    const prospect = getProspect(state);

    const newProspect = cloneDeep(prospect);
    newProspect.freeFieldsInfo = {
      ...(newProspect.freeFieldsInfo || {}),
      freeField5: JSON.stringify({ completedSteps: state.completedSteps })
    };

    yield put(sendProspectRequest(newProspect, saveType, actionType));
  } finally {
    yield put(resetFormStep({ resetStep: false }));
  }
}

function* prospectAutoSave() {
  try {
    while (true) {
      yield delay(40000);

      const newProspect = yield select(getProspect);
      const screeningError = yield select(getScreeningError);
      const isScreeningError = screeningError.error;
      const viewId = newProspect.applicationInfo.viewId;

      const isAutoSaveEnabled =
        !isScreeningError &&
        [
          VIEW_IDS.CompanyInfo,
          VIEW_IDS.StakeholdersInfo,
          VIEW_IDS.FinalQuestions,
          VIEW_IDS.UploadDocuments,
          VIEW_IDS.SelectServices
        ].includes(viewId);

      if (isAutoSaveEnabled) {
        yield put(sendProspectRequest(newProspect, AUTO));
      }
    }
  } finally {
    if (yield cancelled()) {
      log("refresh auto save interval");
    }
  }
}

function* sendProspectToAPI({ payload: { newProspect, saveType, actionType } }) {
  try {
    const state = yield select();
    const prospectId = getProspectId(state);
    const headers = getAuthorizationHeader(state);

    newProspect.applicationInfo.saveType = saveType;
    newProspect.applicationInfo.actionType = actionType;
    const { data } = yield call(prospect.update, prospectId, newProspect, headers);

    if (data.accountInfo && Array.isArray(data.accountInfo)) {
      yield put(updateAccountNumbers(data.accountInfo));
      data.accountInfo.forEach(
        (_, index) =>
          (newProspect.accountInfo[index] = {
            ...newProspect.accountInfo[index],
            accountNo: data.accountInfo[index].accountNo
          })
      );
    }

    const { preScreening } = data;

    const isScreeningError = preScreening && preScreening.statusOverAll === APP_STOP_SCREEN_RESULT;

    if (isScreeningError) {
      yield fork(setScreeningResults, data);
    } else {
      if (preScreening) {
        yield put(updateProspect({ "prospect.organizationInfo.screeningInfo": preScreening }));
      }
    }
    yield put(sendProspectToAPISuccess(isScreeningError));
  } catch (error) {
    if (error instanceof ROError) {
      yield put(setLockStatusByROAgent(true));
    } else if (error instanceof FieldsValidationError) {
      yield put(setInputsErrors(error.getInputsErrors()));
    } else {
      log({ error });
      yield put(sendProspectToAPIFail(error));
    }
  }
}

function* prospectAutoSaveFlowSaga() {
  while (true) {
    const bgSyncAutoSave = yield fork(prospectAutoSave);

    yield take(SEND_PROSPECT_REQUEST);

    yield cancel(bgSyncAutoSave);
  }
}

export default function* sendProspectToAPISagas() {
  yield all([
    takeLatest(SEND_PROSPECT_TO_API, sendProspectToAPISaga),
    takeLatest(PROSPECT_AUTO_SAVE, prospectAutoSaveFlowSaga),
    fork(watchRequest)
  ]);
}

import {
  all,
  put,
  call,
  delay,
  select,
  takeLatest,
  take,
  cancel,
  fork,
  actionChannel,
  flush,
  takeEvery
} from "redux-saga/effects";

import { get } from "lodash";
import { getErrorScreensIcons } from "../../utils/getErrorScreenIcons/getErrorScreenIcons";
import {
  SEND_PROSPECT_TO_API,
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  resetFormStep,
  PROSPECT_AUTO_SAVE,
  sendProspectRequest,
  SEND_PROSPECT_REQUEST,
  setScreeningError,
  PROSPECT_SAVE_ONCLICK,
  sendProspectToAPIAutoSaveSuccess,
  updateAutoSaveProspectHash
} from "../actions/sendProspectToAPI";
import { log } from "../../utils/loggger";
import {
  getProspect,
  getProspectId,
  getAuthorizationHeader,
  getAccountType,
  getIsIslamicBanking,
  getAuthToken,
  getApplicationInfo,
  getSignatories,
  getIsAutoSaveEnabled
} from "../selectors/appConfig";
import { checkLoginStatus, getLoginResponse } from "../selectors/loginSelector";
import { getCompletedSteps } from "../selectors/completedSteps";
import { getProspectAutoSaveHash, getScreeningError } from "../selectors/sendProspectToAPI";
import { setErrorOccurredWhilePerforming } from "../actions/searchProspect";
import { resetInputsErrors, setInputsErrors } from "../actions/serverValidation";
import { updateAccountNumbers } from "../actions/accountNumbers";
import { prospect } from "../../api/apiClient";
import {
  APP_STOP_SCREEN_RESULT,
  screeningStatus,
  screeningStatusDefault,
  CONTINUE,
  AUTO,
  VIEW_IDS,
  STEP_STATUS,
  AUTO_SAVE_INTERVAL,
  applicationError,
  operatorLoginScheme,
  EFR_CHECK_ERROR,
  EFR_CHECK
} from "../../constants";
import { resetProspect, setTat, updateProspect } from "../actions/appConfig";
import { FieldsValidationError, ErrorOccurredWhilePerforming } from "../../api/serverErrors";
import { SCREENING_FAIL_REASONS } from "../../constants";
import { pageProspectPaylodMap } from "../../constants/config";
import { NOTIFY_HOST } from "../actions/kyc";
import { OPE_EDIT } from "../../containers/AgentPages/SearchedAppInfo/constants";
import { getSearchResults } from "../selectors/searchProspect";

function checkIsAutoSaveViewId(viewId) {
  return [
    VIEW_IDS.CompanyInfo,
    VIEW_IDS.StakeholdersInfo,
    VIEW_IDS.StakeholdersInfoPreview,
    VIEW_IDS.ConsentInfo,
    VIEW_IDS.AdditionalInfo,
    VIEW_IDS.CompanyAdditionalInfo,
    VIEW_IDS.StakeholdersAdditionalInfo,
    VIEW_IDS.AccountInfo,
    VIEW_IDS.SubmitApplication,
    VIEW_IDS.AdditionaData,
    VIEW_IDS.AccountServices,
    VIEW_IDS.FinalQuestions,
    VIEW_IDS.UploadDocuments,
    VIEW_IDS.UploadDocuments,
    VIEW_IDS.SelectServices
  ].includes(viewId);
}

export function* watchRequest() {
  const chan = yield actionChannel(SEND_PROSPECT_REQUEST);

  while (true) {
    const actions = yield flush(chan);
    if (actions.length) {
      const newProspect = yield select(getProspect);
      const viewId = newProspect.applicationInfo.viewId;
      const isAutosaveViewId = checkIsAutoSaveViewId(viewId);
      const action = actions.find(act => act.payload.saveType === CONTINUE) || actions[0];
      if (isAutosaveViewId) {
        yield call(sendProspectToAPI, action);
      }
    }
    yield delay(1000);
  }
}

export function* setScreeningResults({ preScreening }) {
  const currScreeningType = preScreening.screeningResults.find(screeningResult =>
    SCREENING_FAIL_REASONS.includes(screeningResult.screeningReason)
  );

  let screenError = screeningStatus.find(
    ({ screeningType }) => screeningType === (currScreeningType || {}).screeningType
  );

  if (screenError) {
    //ro-assist-brd1-3
    if (
      screenError.screeningType?.toLowerCase() === screeningStatus[1].screeningType.toLowerCase()
    ) {
      let buttons = applicationError.find(
        ({ screeningNotes }) =>
          screeningNotes.toLowerCase() === currScreeningType.screeningNotes?.toLowerCase()
      );
      if (buttons !== undefined) {
        screenError = { ...screenError, ...buttons };
      }
    }
    const accountType = yield select(getAccountType);
    const isIslamicBanking = yield select(getIsIslamicBanking);
    const { screeningType, screeningNotes } = screenError;
    if (screenError.screeningType?.toLowerCase() === EFR_CHECK.toLowerCase()) {
      yield put(
        setScreeningError({
          ...screenError,
          text: EFR_CHECK_ERROR,
          icon: "",
          screeningType: 403
        })
      );
    } else {
      yield put(
        setScreeningError({
          ...screenError,
          text: currScreeningType.reasonNotes,
          icon: getErrorScreensIcons(accountType, isIslamicBanking, screeningType, screeningNotes)
        })
      );
    }
  } else {
    yield put(setScreeningError(screeningStatusDefault));
  }
}

export function* sendProspectToAPISaga({ payload: { saveType, actionType, step } }) {
  try {
    yield put(resetInputsErrors());
    yield put(resetFormStep(true));

    const prospect = yield select(getProspect);

    yield put(sendProspectRequest(prospect, saveType, actionType, step));
  } finally {
    yield put(resetFormStep(false));
  }
}

function* saveProspectData() {
  try {
    const newProspect = yield select(getProspect);
    const screeningError = yield select(getScreeningError);
    const isScreeningError = screeningError.error;
    const viewId = newProspect.applicationInfo.viewId;
    const authToken = yield select(getAuthToken);
    const isSaveEnabled = !isScreeningError && authToken && checkIsAutoSaveViewId(viewId);
    return { isSaveEnabled, newProspect };
  } catch (e) {
    log(e);
    return { isSaveEnabled: false, newProspect: null };
  }
}
export function* prospectSaveOnClick() {
  try {
    const { isSaveEnabled, newProspect } = yield call(saveProspectData);
    if (isSaveEnabled && newProspect) {
      yield put(sendProspectRequest(newProspect, AUTO));
    }

    yield put(resetProspect);

    return { isSaveEnabled, newProspect };
  } catch (e) {
    log(e);
  }
}

export async function generateHash(value) {
  // Convert the JSON string to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(value));

  // Use the SubtleCrypto API to create a hash (SHA-256 in this example)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
}

export function* prospectAutoSave() {
  try {
    const autoSave = yield select(getIsAutoSaveEnabled);
    const isAutoSaveEnabled = autoSave?.[0]?.displayText === "true";
    while (true && isAutoSaveEnabled) {
      yield delay(AUTO_SAVE_INTERVAL);

      const { isSaveEnabled, newProspect } = yield call(saveProspectData);
      const isAutoSaveEnabled = isSaveEnabled;

      if (isAutoSaveEnabled) {
        const currentProspectHash = yield call(generateHash, newProspect);
        const lastSavedProspectHash = yield select(getProspectAutoSaveHash);
        yield put(updateAutoSaveProspectHash(currentProspectHash));
        if (lastSavedProspectHash !== currentProspectHash) {
          yield put(sendProspectRequest(newProspect, AUTO));
        }
      }
    }
  } catch (e) {
    log(e);
  }
}

const getRequestPayloadForNode = (key, prospect, viewId, isAgent, isEditable) => {
  let nodePayload;
  switch (key) {
    case "organizationInfo": {
      //transforming the proscpect industryMultiSelect to industry & industryAndSubCategory
      const { industryMultiSelect, ...rest } = prospect[key];
      const { industry, subCategory } = industryMultiSelect?.reduce(
        (industryAndSubCategory, item) => {
          item.industry?.length && industryAndSubCategory.industry.push(item.industry[0]);
          item.subCategory?.length && industryAndSubCategory.subCategory.push(item.subCategory[0]);
          return industryAndSubCategory;
        },
        { industry: [], subCategory: [] }
      );
      nodePayload = { ...rest, industry, subCategory };
      break;
    }
    case "applicationInfo": {
      const { accountType, rakValuePackage, islamicBanking } = prospect[key];
      nodePayload = { accountType, rakValuePackage, islamicBanking };
      break;
    }
    case "signatoryInfo": {
      if (viewId === "/ConsentInfo") {
        const { consentInfo } = prospect[key][0];
        nodePayload = [{ consentInfo }];
      } else if (viewId === "/StakeholdersAdditionalInfo") {
        const { stakeholderAdditionalInfo, showSOF } = prospect[key][0];
        nodePayload = [{ stakeholderAdditionalInfo, showSOF }];
      } else if (viewId === "/AccountInfo") {
        const { debitCardInfo } = prospect[key][0];
        nodePayload = [{ debitCardInfo }];
      } else if (viewId === "/StakeholdersInfo") {
        if (prospect[key][0]) {
          const { isEFRCheckLimitExceeded, signatoryId } = prospect[key][0];
          if (isEFRCheckLimitExceeded) {
            nodePayload = [{ isEFRCheckLimitExceeded, signatoryId }];
          }
        }
      } else if (viewId === "/StakeholdersInfoPreview" && isEditable) {
        const {
          editedFullName,
          firstName,
          middleName,
          lastName,
          debitCardInfo,
          mothersMaidenName,
          kycDetails,
          isEFRDataCorrect
        } = prospect[key][0];
        nodePayload = [
          {
            editedFullName,
            firstName,
            middleName,
            lastName,
            debitCardInfo,
            mothersMaidenName,
            kycDetails,
            isEFRDataCorrect
          }
        ];
      } else {
        const {
          editedFullName,
          debitCardInfo,
          mothersMaidenName,
          kycDetails,
          isEFRDataCorrect
        } = prospect[key][0];
        nodePayload = [
          {
            editedFullName,
            debitCardInfo,
            mothersMaidenName,
            kycDetails,
            isEFRDataCorrect
          }
        ];
      }

      break;
    }
    case "kycAnnexure": {
      if (isAgent) {
        nodePayload = prospect[key];
      }
      break;
    }
    case "applicantInfo": {
      if (viewId === "/AccountInfo") {
        const { roCode, allianceCode } = prospect[key];
        nodePayload = { roCode, allianceCode };
      } else {
        nodePayload = prospect[key];
      }
      break;
    }
    default:
      nodePayload = prospect[key];
  }
  return nodePayload;
};

export function* sendProspectToAPI({ payload: { newProspect, saveType, actionType, step } }) {
  try {
    const { scheme } = yield select(getLoginResponse);
    const prospectId = yield select(getProspectId);
    const headers = yield select(getAuthorizationHeader);
    const completedSteps = yield select(getCompletedSteps);
    const applicationInfo = yield select(getApplicationInfo);
    const signatoryInfo = yield select(getSignatories);
    const isAgent = yield select(checkLoginStatus);
    const searchResults = yield select(getSearchResults);
    const currentProspect = searchResults.find(item => item.prospectId === prospectId);

    const viewId = applicationInfo.viewId;
    const isFrontCorrection = get(currentProspect, "status.statusType") === OPE_EDIT;
    const isOperator = scheme === operatorLoginScheme;
    const isEditable = isOperator && isFrontCorrection;

    const newCompletedSteps = step
      ? completedSteps.map(completedStep => {
          if (completedStep.flowId === step.flowId && completedStep.step === step.activeStep) {
            return { ...completedStep, status: STEP_STATUS.COMPLETED };
          }
          return completedStep;
        })
      : completedSteps;

    newProspect.applicationInfo.saveType = saveType;
    newProspect.applicationInfo.actionType = actionType;
    newProspect.freeFieldsInfo = {
      ...(newProspect.freeFieldsInfo || {}),
      freeField5: JSON.stringify({ completedSteps: newCompletedSteps })
    };
    const payloadKeys = pageProspectPaylodMap[viewId];
    const createProspectPayload = {};

    payloadKeys &&
      payloadKeys.forEach(key => {
        if (newProspect[key]) {
          createProspectPayload[key] = getRequestPayloadForNode(
            key,
            newProspect,
            viewId,
            isAgent,
            isEditable
          );
        }
      });

    createProspectPayload["viewId"] = viewId;
    createProspectPayload["actionType"] = actionType;
    createProspectPayload["saveType"] = saveType;

    const { data } = yield call(prospect.update, prospectId, createProspectPayload, headers);

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

    if (data.signatoryInfo && Array.isArray(data.signatoryInfo)) {
      yield put(
        updateProspect({
          "prospect.signatoryInfo": [{ ...signatoryInfo[0], ...data.signatoryInfo[0] }]
        })
      );
    }

    if (viewId === "/SubmitApplication") {
      yield put(setTat(data.TAT));
    }

    const { preScreening } = data;

    const isScreeningError = preScreening && preScreening.statusOverAll === APP_STOP_SCREEN_RESULT;

    if (isScreeningError) {
      yield fork(setScreeningResults, data);
    } else if (preScreening) {
      yield put(updateProspect({ "prospect.organizationInfo.screeningInfo": preScreening }));
    }
    if (saveType !== "auto") {
      yield put(sendProspectToAPISuccess(!!isScreeningError));
    } else {
      yield put(sendProspectToAPIAutoSaveSuccess(!!isScreeningError));
    }
  } catch (error) {
    if (error instanceof ErrorOccurredWhilePerforming) {
      yield put(
        setErrorOccurredWhilePerforming({
          errorCode: error.getErrorCode()
        })
      );
    } else if (error instanceof FieldsValidationError) {
      yield put(setInputsErrors(error.getInputsErrors()));
    } else {
      log(error);
    }
    yield put(sendProspectToAPIFail());
  }
}

export function* prospectAutoSaveFlowSaga() {
  while (true) {
    const bgSyncAutoSave = yield fork(prospectAutoSave);

    yield take([SEND_PROSPECT_REQUEST, NOTIFY_HOST]);

    yield cancel(bgSyncAutoSave);
  }
}

export default function* sendProspectToAPISagas() {
  yield all([
    takeEvery(SEND_PROSPECT_TO_API, sendProspectToAPISaga),
    takeLatest(PROSPECT_AUTO_SAVE, prospectAutoSaveFlowSaga),
    takeLatest(PROSPECT_SAVE_ONCLICK, prospectSaveOnClick),
    fork(watchRequest)
  ]);
}

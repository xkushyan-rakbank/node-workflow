import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  retrieveApplicantInfoSuccess,
  getProspectInfoSuccess,
  getProspectInfoFail,
  RETRIEVE_APPLICANT_INFO,
  GET_PROSPECT_INFO_REQUEST
} from "../actions/retrieveApplicantInfo";
import { setConfig, loadMetaData } from "../actions/appConfig";
import { search as searchApi, prospect as prospectApi } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import { getAuthorizationHeader, getSignatoryModel } from "../selectors/appConfig";
import { updateStakeholdersIds } from "../actions/stakeholders";
import { COMPANY_STAKEHOLDER_ID } from "../../containers/CompanyStakeholders/constants";
import { VIEW_IDS } from "../../constants";

export function* retrieveApplicantInfoSaga({ payload }) {
  try {
    const headers = yield select(getAuthorizationHeader);
    const inputParam = {
      applicantName: payload.fullName || "",
      countryCode: payload.countryCode || "",
      mobileNo: payload.mobileNo || "",
      leadNumber: payload.leadNumber || "",
      tradeLicenseNo: payload.tradeLicenseNo || "",
      email: payload.email || "",
      eidNumber: ""
    };

    const response = yield call(searchApi.searchApplication, inputParam, headers);
    yield put(retrieveApplicantInfoSuccess(response.data));
  } catch (error) {
    log(error);
  }
}

export function* getProspectIdInfo({ payload }) {
  try {
    const headers = yield select(getAuthorizationHeader);
    const response = yield call(prospectApi.get, payload.prospectId, headers);
    const config = { prospect: response.data };
    const freeFieldsInfo = config.prospect.freeFieldsInfo;
    const newStakeholder = yield select(getSignatoryModel);

    if (
      !config.prospect.signatoryInfo.length &&
      config.prospect.applicationInfo.viewId.includes(VIEW_IDS.StakeholdersInfo)
    ) {
      config.prospect.signatoryInfo = [newStakeholder];
    }

    yield put(setConfig(config));

    if (freeFieldsInfo) {
      yield put(loadMetaData(freeFieldsInfo));
      if (freeFieldsInfo.freeField5) {
        try {
          const { completedSteps = [] } = JSON.parse(freeFieldsInfo.freeField5);
          const stakeholdersIds = completedSteps
            .filter(({ flowId }) => flowId.startsWith(COMPANY_STAKEHOLDER_ID))
            .reduce((acc, { flowId }) => {
              const id = flowId.split("_")[1];
              return {
                ...acc,
                [id]: { id, isEditting: false }
              };
            }, {});
          yield put(updateStakeholdersIds(Object.values(stakeholdersIds)));
        } catch (error) {
          log(error);
        }
      }
    }

    yield put(getProspectInfoSuccess(config.prospect));
  } catch (error) {
    log(error);
    yield put(getProspectInfoFail());
  }
}

export default function* retrieveApplicantSaga() {
  yield all([
    takeLatest(RETRIEVE_APPLICANT_INFO, retrieveApplicantInfoSaga),
    takeLatest(GET_PROSPECT_INFO_REQUEST, getProspectIdInfo)
  ]);
}

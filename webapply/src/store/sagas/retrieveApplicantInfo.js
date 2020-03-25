import { all, call, put, takeLatest, select } from "redux-saga/effects";
import * as actions from "../actions/retrieveApplicantInfo";
import { setConfig, loadMetaData } from "../actions/appConfig";
import { retrieveApplicantInfos, prospect as prospectApi } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import { getAuthorizationHeader } from "../selectors/appConfig";
import { updateStakeholdersIds } from "../actions/stakeholders";
import { COMPANY_STAKEHOLDER_ID } from "../../containers/CompanyStakeholders/constants";

function* retrieveApplicantInfoSaga({ payload }) {
  try {
    const inputParam = {
      applicantName: payload.fullName || "",
      countryCode: payload.countryCode || "",
      mobileNo: payload.mobileNo || "",
      leadNumber: payload.leadNumber || "",
      tradeLicenseNo: payload.tradeLicenseNo || "",
      email: payload.email || "",
      eidNumber: ""
    };

    const response = yield call(retrieveApplicantInfos.applicant, inputParam);
    yield put(actions.retrieveApplicantInfoSuccess(response.data));
  } catch (error) {
    log(error);
  }
}

function* getProspectIdInfo({ payload }) {
  try {
    const state = yield select();
    const headers = getAuthorizationHeader(state);
    const response = yield call(prospectApi.get, payload.prospectId, headers);
    const config = { prospect: response.data };
    const freeFieldsInfo = config.prospect.freeFieldsInfo;

    yield put(setConfig(config));

    if (freeFieldsInfo) {
      yield put(loadMetaData(freeFieldsInfo));
      if (freeFieldsInfo.freeField5) {
        const { completedSteps = [] } = JSON.parse(freeFieldsInfo.freeField5);
        const stakeholdersIds = completedSteps
          .filter(({ flowId }) => flowId.startsWith(COMPANY_STAKEHOLDER_ID))
          .map(({ flowId }) => ({ id: flowId.split("_")[1], isEditting: false }))
          .reduce((acc, i) => {
            if (!acc.some(a => a.id === i.id)) acc.push(i);
            return acc;
          }, []);
        yield put(updateStakeholdersIds(stakeholdersIds));
      }
    }

    yield put(actions.getProspectInfoSuccess(config.prospect));
  } catch (error) {
    log(error);
    yield put(actions.getProspectInfoFail());
  }
}

export default function* retrieveApplicantSaga() {
  yield all([takeLatest(actions.RETRIEVE_APPLICANT_INFO, retrieveApplicantInfoSaga)]);
  yield all([takeLatest(actions.GET_PROSPECT_INFO_REQUEST, getProspectIdInfo)]);
}

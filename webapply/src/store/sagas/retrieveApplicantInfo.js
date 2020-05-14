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
import { VIEW_IDS, COMPANY_SIGNATORY_ID, FINAL_QUESTIONS_COMPANY_ID } from "../../constants";
import { COMPANY_INFO_PAGE_ID } from "../../containers/CompanyInfo/constants";
import { SELECT_SERVICES_PAGE_ID } from "../../containers/SelectServices/constants";

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

          let stakeholderStep = 0;
          let signatoryStep = 0;

          let newSteps = [];

          completedSteps.map(step => {
            step.flowId.startsWith(COMPANY_STAKEHOLDER_ID) &&
              (stakeholderStep = stakeholderStep + 1);

            step.flowId.startsWith(COMPANY_SIGNATORY_ID) && (signatoryStep = signatoryStep + 1);

            step.flowId.includes(COMPANY_INFO_PAGE_ID) && newSteps.push(step);

            step.flowId.includes(FINAL_QUESTIONS_COMPANY_ID) && newSteps.push(step);

            step.flowId.includes(SELECT_SERVICES_PAGE_ID) && newSteps.push(step);

            if (stakeholderStep < config.prospect.signatoryInfo.length * 6 + 1) {
              step.flowId.startsWith(COMPANY_STAKEHOLDER_ID) && newSteps.push(step);
            }

            if (signatoryStep < config.prospect.signatoryInfo.length * 4 + 1) {
              step.flowId.startsWith(COMPANY_SIGNATORY_ID) && newSteps.push(step);
            }
          });

          freeFieldsInfo.freeField5 = JSON.stringify({ completedSteps: newSteps });

          yield put(loadMetaData(freeFieldsInfo));

          const stakeholdersIds = [
            ...newSteps.reduce((acc, { flowId }) => {
              if (flowId.startsWith(COMPANY_STAKEHOLDER_ID)) {
                acc.add(flowId.split(COMPANY_STAKEHOLDER_ID)[1]);
              }
              return acc;
            }, new Set())
          ];
          yield put(updateStakeholdersIds(stakeholdersIds));
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

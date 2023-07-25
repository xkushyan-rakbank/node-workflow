import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  retrieveApplicantInfoSuccess,
  getProspectInfoSuccess,
  getProspectInfoFail,
  RETRIEVE_APPLICANT_INFO,
  GET_PROSPECT_INFO_REQUEST
} from "../actions/retrieveApplicantInfo";
import { setConfig, loadMetaData, updateProspect } from "../actions/appConfig";
import {
  search as searchApi,
  prospect as prospectApi,
  decisions as decisionsAPIClient
} from "../../api/apiClient";
import { log } from "../../utils/loggger";
import {
  getAuthorizationHeader,
  getSignatoryModel,
  getOrganizationInfoModel
} from "../selectors/appConfig";
import { updateStakeholdersIds } from "../actions/stakeholders";
import { COMPANY_STAKEHOLDER_ID } from "../../containers/CompanyStakeholders/constants";
import { VIEW_IDS, COMPANY_SIGNATORY_ID, FINAL_QUESTIONS_COMPANY_ID } from "../../constants";
import { COMPANY_INFO_PAGE_ID } from "../../containers/CompanyInfo/constants";
import { SELECT_SERVICES_PAGE_ID } from "../../containers/SelectServices/constants";
import { OUTSIDE_BASE_PATH } from "../../containers/FinalQuestions/components/CompanySummaryCard/CompanySummarySteps/CompanyPreferredMailingAddress/constants";
import { signatoryCompanyInfo, kycAnnexure } from "../../constants/prospectPatches";
import { termsAndConditionsAccepted } from "../actions/termsAndConditions";
import { getAppConfig } from "../selectors/appConfig";
import { setDecisions } from "../actions/decisions";

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

const concatAddressInfo = (configAddress, existAddress) => {
  return configAddress.map((address, addressIndex) => {
    if (address.officeAddressDifferent) {
      return {
        ...address,
        addressDetails: existAddress[addressIndex]
          ? existAddress[addressIndex].addressDetails
          : address.addressDetails,
        officeAddressDifferent:
          existAddress[addressIndex] && existAddress[addressIndex].officeAddressDifferent
            ? existAddress[addressIndex].officeAddressDifferent
            : address.officeAddressDifferent
      };
    } else {
      return {
        ...address,
        addressDetails: existAddress[addressIndex]
          ? existAddress[addressIndex].addressDetails
          : address.addressDetails
      };
    }
  });
};

function removeNullUndefinedKeys(obj, initialProspect) {
  let newObj = JSON.parse(JSON.stringify(obj));
  for (let key in newObj) {
    if (newObj[key] === null || newObj[key] === undefined) {
      newObj[key] = initialProspect[key];
    }
  }
  return newObj;
}

export function* getProspectIdInfo({ payload }) {
  try {
    const headers = yield select(getAuthorizationHeader);
    const organizationInfoModel = yield select(getOrganizationInfoModel);
    const initialConfig = yield select(getAppConfig);
    const initialProspect = initialConfig.prospect;
    const response = yield call(prospectApi.get, payload.prospectId, headers);
    const config = { prospect: removeNullUndefinedKeys(response.data, initialProspect) };
    const prospectId = response.data.generalInfo.prospectId;
    // console.log(config);
    if (
      config.prospect?.organizationInfo?.addressInfo &&
      !config.prospect?.organizationInfo?.addressInfo[0]?.typeOfAddress
    ) {
      config.prospect.organizationInfo.addressInfo = concatAddressInfo(
        organizationInfoModel.addressInfo,
        config.prospect.organizationInfo.addressInfo
      );
    }
    const freeFieldsInfo = config.prospect?.freeFieldsInfo;
    const newStakeholder = yield select(getSignatoryModel);
    if (
      !config.prospect?.signatoryInfo?.length &&
      config.prospect?.applicationInfo?.viewId?.includes(VIEW_IDS.StakeholdersInfo)
    ) {
      config.prospect.signatoryInfo = [newStakeholder];
    }

    //ro-assist-brd1-5
    let prospect = {};
    //set signatory edited name
    try {
      if (config.prospect?.signatoryInfo && config.prospect?.signatoryInfo[0]) {
        const signatoryDetails =
          config.prospect?.signatoryInfo && config.prospect?.signatoryInfo[0];
        signatoryDetails["editedFullName"] = signatoryDetails.fullName;
        prospect["signatoryInfo[0].editedFullName"] = signatoryDetails.fullName;

        //consent screen
        if (signatoryDetails.consentInfo) {
          yield put(
            termsAndConditionsAccepted({
              kfs: signatoryDetails.consentInfo?.kfsConsent?.accept,
              authorisation: signatoryDetails.consentInfo?.efrConsent?.accept,
              generalTCs: signatoryDetails.consentInfo?.otherTncConsent?.accept
            })
          );
        }
      }
    } catch (e) {
      log(e);
    }
    //to incooperate industry mapping
    try {
      if (config.prospect?.organizationInfo) {
        prospect["organizationInfo.industryMultiSelect"] = [
          {
            industry: config.prospect?.organizationInfo.industry,
            subCategory: config.prospect?.organizationInfo.subCategory
          }
        ];
        config.prospect.organizationInfo["industryMultiSelect"] = [
          {
            industry: config.prospect?.organizationInfo.industry,
            subCategory: config.prospect?.organizationInfo.subCategory
          }
        ];
      }
    } catch (e) {
      log(e);
    }
    try {
      prospect[`${OUTSIDE_BASE_PATH}.isSameAsRegisteredAddress`] =
        config.prospect.organizationInfo?.addressInfo[0]?.officeAddressDifferent === "No";
      // eslint-disable-next-line prettier/prettier
      if (
        config.prospect.organizationInfo?.addressInfo[0]?.addressDetails[0].preferredAddress ===
        "Yes"
      ) {
        prospect[`${OUTSIDE_BASE_PATH}.preferredMailingAddrs`] = true;
        // eslint-disable-next-line prettier/prettier
      } else if (
        config.prospect.organizationInfo?.addressInfo[1].addressDetails[0]?.preferredAddress ===
        "Yes"
      ) {
        prospect[`${OUTSIDE_BASE_PATH}.preferredMailingAddrs`] = false;
      } else {
        prospect[`${OUTSIDE_BASE_PATH}.preferredMailingAddrs`] = "";
      }
      config.prospect?.signatoryInfo &&
        config.prospect.signatoryInfo.forEach((element, index) => {
          if (
            element?.addressInfo &&
            element?.addressInfo[0]?.addressDetails[0]?.preferredAddress === "Yes"
          ) {
            prospect[`signatoryInfo[${index}].signoPreferredMailingAddrs`] = true;
          } else if (
            element?.addressInfo[1] &&
            element?.addressInfo[1].addressDetails[0].preferredAddress === "Yes"
          ) {
            prospect[`signatoryInfo[${index}].signoPreferredMailingAddrs`] = false;
          } else {
            prospect[`signatoryInfo[${index}].signoPreferredMailingAddrs`] = "";
          }
          if (
            newStakeholder.addressInfo.length >
            config.prospect.signatoryInfo[index].addressInfo.length
          ) {
            config.prospect.signatoryInfo[index].addressInfo = concatAddressInfo(
              newStakeholder.addressInfo,
              config.prospect.signatoryInfo[index].addressInfo
            );
          }
          if (!element.kycDetails?.isShareholderACompany) {
            config.prospect.signatoryInfo[index].kycDetails.isShareholderACompany = false;
          }
          if (!element?.signatoryCompanyInfo) {
            config.prospect.signatoryInfo[index].signatoryCompanyInfo = signatoryCompanyInfo;
          }
        });
      if (!config.prospect?.kycAnnexure) {
        config.prospect.kycAnnexure = kycAnnexure;
      }
    } catch (error) {
      prospect[`${OUTSIDE_BASE_PATH}.isSameAsRegisteredAddress`] = false;
      prospect[`${OUTSIDE_BASE_PATH}.preferredMailingAddrs`] = "";
      config.prospect?.signatoryInfo &&
        config.prospect.signatoryInfo.forEach((element, index) => {
          prospect[`signatoryInfo[${index}].signoPreferredMailingAddrs`] = "";
        });
      log(error);
    }
    //ro-assist-brd1-5
    yield put(updateProspect(prospect));

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
            ...newSteps?.reduce((acc, { flowId }) => {
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
    const updatedHeaders = yield select(getAuthorizationHeader);
    const decisionValue = yield call(decisionsAPIClient.get, prospectId, updatedHeaders);
    yield put(setDecisions(decisionValue));
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

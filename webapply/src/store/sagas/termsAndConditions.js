import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { startCase } from "lodash";

import { log } from "../../utils/loggger";

import {
  SEND_CUSTOMER_CONSENT_TO_CPF,
  SEND_KFS_MAIL,
  termsAndConditionsAccepted
} from "../actions/termsAndConditions";
import {
  getAccountType,
  getApplicantEmail,
  getAuthorizationHeader,
  getDatalist,
  getIsIslamicBanking,
  getRoEmail,
  getSignatories
} from "../selectors/appConfig";
import { cpfCustomerConsent, kfsAcknowledgement } from "../../api/apiClient";
import { AccountDetails, CONVENTIONAL, ISLAMIC } from "../../constants";
import { updateProspect } from "../actions/appConfig";
import { formattedAccTimeStamp } from "../../utils/getAcceptedTimeStamp/getAcceptedTimeStamp";

export function* sendKfsMail({ payload: { docModificationInfo } }) {
  try {
    const headers = yield select(getAuthorizationHeader);
    headers.headers["client-id"] = "WBA";
    const signatories = yield select(getSignatories);
    const customerName = startCase(signatories[0].editedFullName.toLowerCase());
    const individualId = signatories[0].signatoryId;

    const customerEmailAddress = yield select(getApplicantEmail);
    const accountType = yield select(getAccountType);
    const isIslamic = yield select(getIsIslamicBanking);
    const roEmail = yield select(getRoEmail);
    const dataList = yield select(getDatalist);
    const isElite = accountType === "RAKelite";
    const entitySubType = isIslamic ? "ISL" : "CON";
    const dataListBccIds = dataList.kfsBCCEmail[0]?.displayText;
    const bccIds = roEmail ? [dataListBccIds, roEmail] : [dataListBccIds];
    const accountCategory = isIslamic ? ISLAMIC : CONVENTIONAL;
    const subProductCode = AccountDetails[accountType].subProductCode[accountCategory];
    const body = {
      customerName,
      customerEmailAddress,
      subProductCode,
      isElite,
      customerSegment: "SME",
      entitySubType,
      productClassificationSubType: "ACT",
      toIds: [customerEmailAddress],
      bccIds,
      docModificationInfo,
      individualId
    };
    yield call(kfsAcknowledgement.sendMail, body, headers);
    yield put(
      termsAndConditionsAccepted({
        kfs: true
      })
    );
    yield put(
      updateProspect({
        "prospect.signatoryInfo[0].consentInfo": {
          ...signatories[0]?.consentInfo,
          kfsConsent: { accept: true, timestamp: formattedAccTimeStamp(new Date()) }
        }
      })
    );
  } catch (error) {
    log(error);
    yield put(
      termsAndConditionsAccepted({
        kfs: false
      })
    );
  }
}

export function* sendCustomerConsentToCPF({ payload: { docModificationInfo, consentType } }) {
  try {
    const headers = yield select(getAuthorizationHeader);
    headers.headers["client-id"] = "WBA";
    const signatories = yield select(getSignatories);
    const individualId = signatories[0].signatoryId;

    const isIslamic = yield select(getIsIslamicBanking);
    const body = {
      processName: consentType,
      type: isIslamic ? ISLAMIC : CONVENTIONAL,
      individualId,
      consentRequests: [
        {
          key: consentType,
          value: "YES"
        }
      ],
      docModificationInfo
    };
    yield call(cpfCustomerConsent.send, body, headers);
    const acceptedTimeStamp = formattedAccTimeStamp(new Date());
    if (consentType === "TNC_CONSENT") {
      yield put(
        updateProspect({
          "prospect.signatoryInfo[0].consentInfo": {
            ...signatories[0].consentInfo,
            otherTncConsent: { accept: true, timestamp: acceptedTimeStamp }
          }
        })
      );
      yield put(
        termsAndConditionsAccepted({
          generalTCs: true
        })
      );
    } else {
      yield put(
        updateProspect({
          "prospect.signatoryInfo[0].consentInfo": {
            ...signatories[0]?.consentInfo,
            aecbConsent: { accept: true, timestamp: acceptedTimeStamp },
            ftsConsent: { accept: true, timestamp: acceptedTimeStamp },
            norblocConsent: { accept: true, timestamp: acceptedTimeStamp }
          }
        })
      );
      yield put(
        termsAndConditionsAccepted({
          authorisation: true
        })
      );
    }
  } catch (error) {
    log(error);
    if (consentType === "TNC_CONSENT") {
      yield put(
        termsAndConditionsAccepted({
          generalTCs: false
        })
      );
    } else {
      yield put(
        termsAndConditionsAccepted({
          authorisation: false
        })
      );
    }
  }
}

export default function* termsAndConditionsSaga() {
  yield all([takeLatest(SEND_KFS_MAIL, sendKfsMail)]);
  yield all([takeLatest(SEND_CUSTOMER_CONSENT_TO_CPF, sendCustomerConsentToCPF)]);
}

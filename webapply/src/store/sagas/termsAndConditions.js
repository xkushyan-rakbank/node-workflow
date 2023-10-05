import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { log } from "../../utils/loggger";
import { SEND_KFS_MAIL, termsAndConditionsAccepted } from "../actions/termsAndConditions";
import {
  getAccountType,
  getApplicantEmail,
  getAuthorizationHeader,
  getDatalist,
  getIsIslamicBanking,
  getRoEmail,
  getSignatories
} from "../selectors/appConfig";
import { kfsAcknowledgement } from "../../api/apiClient";
import { AccountDetails, CONVENTIONAL, ISLAMIC } from "../../constants";

export function* sendKfsMail({ payload: { docModificationInfo } }) {
  try {
    const headers = yield select(getAuthorizationHeader);
    headers.headers["client-id"] = "WBA";
    const signatories = yield select(getSignatories);
    const customerName = signatories[0].editedFullName;

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
      docModificationInfo
    };
    yield call(kfsAcknowledgement.sendMail, body, headers);
    yield put(
      termsAndConditionsAccepted({
        kfs: true
      })
    );
  } catch (error) {
    log(error);
  }
}

export default function* termsAndConditionsSaga() {
  yield all([takeLatest(SEND_KFS_MAIL, sendKfsMail)]);
}

import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { log } from "../../utils/loggger";
import { SEND_KFS_MAIL, termsAndConditionsAccepted } from "../actions/termsAndConditions";
import {
  getAccountType,
  getApplicantEmail,
  getApplicantFullName,
  getAuthorizationHeader,
  getCompanyName,
  getDatalist,
  getIsIslamicBanking,
  getRoEmail
} from "../selectors/appConfig";
import { kfsAcknowledgement } from "../../api/apiClient";
import { AccountDetails, CONVENTIONAL, ISLAMIC } from "../../constants";

const accountTypeMap = {
  "Current Account": "KFSDynamicDataForPrint_CurrentAccount",
  RAKStarter: "KFSDynamicDataForPrint_RAKStarter",
  RAKelite: "KFSDynamicDataForPrint_RAKElite"
};

const CONV = "CONV";
const ISLA = "ISLA";
const DATE = "KDAT";
const COMPANY_NAME = "CNME";
const SIGNATORY = "SIGN";
const getCoordinates = obj => {
  let parsedObj = JSON.parse(obj);
  let coordinates = {
    xCoordinate: parsedObj.x,
    yCoordinate: parsedObj.y
  };
  return coordinates;
};

const getModInfo = (accountType, isIslamic, { customerName, companyName }) => {
  if (!accountType) {
    return null;
  }
  const selectedAccountTypeData = accountType.find(eachData => {
    if (isIslamic) {
      return eachData.code === ISLA;
    } else {
      return eachData.code === CONV;
    }
  });
  const pageNumber = parseInt(JSON.parse(selectedAccountTypeData.displayText).pageNumber) + 1;
  const corrdinateDetails = [];
  const today = new Date().toLocaleDateString();
  selectedAccountTypeData.subGroup.forEach(element => {
    const coordinates = getCoordinates(element.displayText);
    switch (element.code) {
      case DATE:
        corrdinateDetails.push({
          pageNumber,
          text: today,
          ...coordinates
        });

        break;
      case COMPANY_NAME:
        corrdinateDetails.push({
          pageNumber,
          text: companyName,
          ...coordinates
        });

        break;
      case SIGNATORY:
        corrdinateDetails.push({
          pageNumber,
          text: customerName,
          ...coordinates
        });
        break;
      default:
        break;
    }
  });

  return corrdinateDetails;
};

export function* sendKfsMail() {
  try {
    const headers = yield select(getAuthorizationHeader);
    headers.headers["client-id"] = "WBA";
    const customerName = yield select(getApplicantFullName);
    const companyName = yield select(getCompanyName);
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
    const docModificationInfo = getModInfo(dataList[accountTypeMap[accountType]], isIslamic, {
      customerName,
      companyName
    });
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
    yield put(
      termsAndConditionsAccepted({
        kfs: true
      })
    );
    const response = yield call(kfsAcknowledgement.sendMail, body, headers);
    console.log(response);
  } catch (error) {
    log(error);
  }
}

export default function* termsAndConditionsSaga() {
  yield all([takeLatest(SEND_KFS_MAIL, sendKfsMail)]);
}

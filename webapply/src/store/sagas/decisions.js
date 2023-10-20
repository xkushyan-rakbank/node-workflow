import { all, call, put, select, takeLatest } from "redux-saga/effects";
import get from "lodash/get";

import { decisions as decisionsAPIClient } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import {
  DECISIONS_TRIGGERED,
  GET_DECISIONS,
  disableInputFeild,
  enableInputField,
  hideInputFeild,
  setLabel,
  showInputField,
  decisionsLoading
} from "../actions/decisions";
import {
  getAppConfig,
  getAuthorizationHeader,
  getProspect,
  getProspectId
} from "../selectors/appConfig";
import { updateProspectFromDecision } from "../actions/appConfig";
import appConfig from "../../config/appConfig.json";
import { getLoginResponse } from "../selectors/loginSelector";
import { operatorLoginScheme } from "../../constants";

function* processDecisionOutput(decision, changedFieldValues, prospect, isComeBack) {
  switch (decision.action_type) {
    case "SHOW_FIELD":
      return yield put(showInputField(decision.output_key));
    case "HIDE_FIELD":
      return yield put(hideInputFeild(decision.output_key));
    case "ENABLE_FIELD":
      return yield put(enableInputField(decision.output_key));
    case "DISABLE_FIELD":
      return yield put(disableInputFeild(decision.output_key));
    case "SET_LABEL_TEXT":
      return yield put(setLabel(decision.output_key, decision.output_value[0]));
    case "SET_FIELD_VALUE":
    case "RESET_FIELD_VALUE": {
      const { scheme } = yield select(getLoginResponse);
      const isOperator = scheme === operatorLoginScheme;
      const storeAppConfig = yield select(getAppConfig);
      if (isOperator) {
        return;
      }
      const prospectValue = get(storeAppConfig, decision.output_key);
      const defaultValue = get(appConfig, decision.output_key);
      let decisionValue = decision.output_value[0];
      // converting " " -> "" due to limitation in the decisons table to add null/""
      if (decision.action_type === "RESET_FIELD_VALUE") {
        decisionValue = "";
      }
      if (isComeBack && prospectValue === defaultValue) {
        changedFieldValues[decision.output_key] = decisionValue;
      }
      if (!isComeBack) {
        changedFieldValues[decision.output_key] = decisionValue;
      }
      break;
    }
    default:
      break;
  }
}

export const sortRules = arr => {
  arr &&
    arr.sort(function(a, b) {
      let timeStampA = new Date(a.timestamp);
      let timeStampB = new Date(b.timestamp);
      if (timeStampA < timeStampB) return -1;
      if (timeStampA > timeStampB) return 1;
      return 0;
    });
  return arr;
};

export function* setDecisions(response, onValuesChanged = null, isComeBack = false) {
  let { decision_output: rulesOutput } = response;
  sortRules(rulesOutput);
  const prospect = yield select(getProspect);

  const changedFieldValues = {};

  for (let index = 0; index < rulesOutput.length; index++) {
    const rule = rulesOutput[index];
    for (let j = 0; j < rule.decisions.length; j++) {
      const decision = rule.decisions[j];
      yield processDecisionOutput(decision, changedFieldValues, prospect, isComeBack);
    }
  }
  // if there are dependantFields to be changed then trigger callback
  if (Object.keys(changedFieldValues).length > 0) {
    yield put(updateProspectFromDecision(changedFieldValues));
    onValuesChanged && onValuesChanged(changedFieldValues);
  }
}

export function* getDecisions({ payload }) {
  yield call(setDecisions, payload.data, null, true);
}

export function* makeDecisions({ payload }) {
  try {
    const prospectId = yield select(getProspectId);
    const headers = yield select(getAuthorizationHeader);
    const { onValuesChanged, inputFields: decision_input } = payload;
    yield put(decisionsLoading({ [decision_input.decision_input[0]?.input_key]: true }));
    //api call
    const response = yield call(decisionsAPIClient.make, prospectId, decision_input, headers);
    if (response?.data) {
      yield call(setDecisions, response.data, onValuesChanged);
    }
    yield put(decisionsLoading({ [decision_input.decision_input[0]?.input_key]: false }));
  } catch (error) {
    log(error);
  }
}

export default function* decisionsSaga() {
  yield all([
    takeLatest(DECISIONS_TRIGGERED, makeDecisions),
    takeLatest(GET_DECISIONS, getDecisions)
  ]);
}

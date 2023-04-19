import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { decisions as decisionsAPIClient } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import {
  DECISIONS_TRIGGERED,
  disableInputFeild,
  enableInputField,
  hideInputFeild,
  showInputField
} from "../actions/decisions";
import { getAuthorizationHeader, getProspectId } from "../selectors/appConfig";
import { updateProspect } from "../actions/appConfig";

function* processDecisionOutput(decision, changedFieldValues) {
  switch (decision.action_type) {
    case "SHOW_FIELD":
      return yield put(showInputField(decision.output_key));
    case "HIDE_FIELD":
      return yield put(hideInputFeild(decision.output_key));
    case "ENABLE_FIELD":
      return yield put(enableInputField(decision.output_key));
    case "DISABLE_FIELD":
      return yield put(disableInputFeild(decision.output_key));
    case "SET_FIELD_VALUE":
      changedFieldValues[decision.output_key] = decision.output_value[0];
      break;
    default:
      break;
  }
}

export function* makeDecisions({ payload }) {
  try {
    const prospectId = yield select(getProspectId);
    const headers = yield select(getAuthorizationHeader);
    const { onValuesChanged, inputFields: decision_input } = payload;
    //api call
    const response = yield call(decisionsAPIClient.make, prospectId, { decision_input }, headers);
    let { decision_output: rulesOutput } = response.data;

    const changedFieldValues = {};

    for (let index = 0; index < rulesOutput.length; index++) {
      const rule = rulesOutput[index];
      for (let j = 0; j < rule.decisions.length; j++) {
        const decision = rule.decisions[j];
        yield processDecisionOutput(decision, changedFieldValues);
      }
    }
    // if there are dependantFields to be changed then trigger callback
    if (Object.keys(changedFieldValues).length > 0) {
      yield put(updateProspect(changedFieldValues));
      onValuesChanged(changedFieldValues);
    }
  } catch (error) {
    log(error);
  }
}

export default function* decisionsSaga() {
  yield all([takeLatest(DECISIONS_TRIGGERED, makeDecisions)]);
}

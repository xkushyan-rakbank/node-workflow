import { select, all, put, takeEvery } from "@redux-saga/core/effects";
import get from "lodash/get";
import set from "lodash/set";
import { UPDATE_PROSPECT } from "../actions/appConfig";
import { setStepsStatus } from "../actions/completedSteps";
import { getStakeholdersIds } from "../selectors/stakeholders";
import { getCompletedSteps } from "../selectors/completedSteps";

import { COMPANY_SIGNATORY_ID, STEP_STATUS } from "../../constants";
import { COMPANY_STAKEHOLDER_ID, STEP_6 } from "../../containers/CompanyStakeholders/constants";
import {
  STEP_1,
  STEP_2,
  STEP_3,
  STEP_4
} from "../../containers/FinalQuestions/components/SignatorySummaryCard/constants";

export function* signatoryStepsSaga({ payload }) {
  const prospect = Object.entries(payload).reduce(
    (acc, [name, value]) => set(acc, name, value),
    {}
  );
  const signatoryInfo = get(prospect, "prospect.signatoryInfo", []);
  const indexes = signatoryInfo.reduce((acc, item, index) => {
    if (get(item, "kycDetails.isSignatory")) {
      return [...acc, index];
    }
    return acc;
  }, []);

  if (indexes.length) {
    const stakeholdersIds = yield select(getStakeholdersIds);
    const completedSteps = yield select(getCompletedSteps);
    let steps = indexes.reduce((acc, index) => {
      const stakeholderId = stakeholdersIds[index];
      return [
        ...acc,
        ...[STEP_1, STEP_2, STEP_3, STEP_4].map(step => ({
          flowId: `${COMPANY_SIGNATORY_ID}${stakeholderId}`,
          step
        })),
        {
          flowId: `${COMPANY_STAKEHOLDER_ID}${stakeholderId}`,
          step: STEP_6
        }
      ];
    }, []);

    steps = steps.filter(item => {
      const findStep = completedSteps.find(
        step => step.flowId === item.flowId && step.step === item.step
      );
      return findStep && findStep.status === STEP_STATUS.COMPLETED;
    });

    if (steps.length) {
      yield put(setStepsStatus(steps, STEP_STATUS.AVAILABLE));
    }
  }
}
export default function* completedStepsSaga() {
  yield all([takeEvery(UPDATE_PROSPECT, signatoryStepsSaga)]);
}

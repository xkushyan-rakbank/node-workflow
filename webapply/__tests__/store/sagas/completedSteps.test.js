import { runSaga } from "redux-saga";
import completedStepsSaga, { signatoryStepsSaga } from "../../../src/store/sagas/completedSteps";
import { setStepsStatus } from "../../../src/store/actions/completedSteps";
import { COMPANY_SIGNATORY_ID, STEP_STATUS } from "../../../src/constants";
import {
  STEP_1,
  STEP_2,
  STEP_3,
  STEP_4
} from "../../../src/containers/FinalQuestions/components/SignatorySummaryCard/constants";
import {
  COMPANY_STAKEHOLDER_ID,
  STEP_6
} from "../../../src/containers/CompanyStakeholders/constants";
import { getStakeholdersIds } from "../../../src/store/selectors/stakeholders";
import { getCompletedSteps } from "../../../src/store/selectors/completedSteps";
import { UPDATE_PROSPECT } from "../../../src/store/actions/appConfig";
import { getSignatories } from "../../../src/store/selectors/appConfig";

jest.mock("../../../src/store/selectors/stakeholders");
jest.mock("../../../src/store/selectors/completedSteps");
jest.mock("../../../src/store/selectors/appConfig");

describe("completedSteps tests", () => {
  let dispatched = [];
  const state = "some state";
  const payload = {
    "prospect.signatoryInfo[0].kycDetails.isSignatory": true
  };
  const store = {
    dispatch: action => dispatched.push(action),
    getState: () => state
  };
  const stakeholderId = "some id";
  getStakeholdersIds.mockReturnValue([stakeholderId]);

  beforeEach(() => {
    dispatched = [];
    getSignatories.mockReturnValue([{ kycDetails: { isSignatory: false } }]);
    getCompletedSteps.mockReturnValue([
      {
        flowId: `${COMPANY_SIGNATORY_ID}${stakeholderId}`,
        step: STEP_1,
        status: STEP_STATUS.COMPLETED
      },
      {
        flowId: `${COMPANY_SIGNATORY_ID}${stakeholderId}`,
        step: STEP_2,
        status: STEP_STATUS.COMPLETED
      },
      {
        flowId: `${COMPANY_SIGNATORY_ID}${stakeholderId}`,
        step: STEP_3,
        status: STEP_STATUS.COMPLETED
      },
      {
        flowId: `${COMPANY_SIGNATORY_ID}${stakeholderId}`,
        step: STEP_4,
        status: STEP_STATUS.NOT_AVAILABLE
      },
      {
        flowId: `${COMPANY_STAKEHOLDER_ID}${stakeholderId}`,
        step: STEP_6,
        status: STEP_STATUS.COMPLETED
      }
    ]);
    jest.clearAllMocks();
  });

  it("should handle completedSteps sagas", () => {
    const gen = completedStepsSaga().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(UPDATE_PROSPECT);
    expect(gen.payload[0].payload.args[1]).toEqual(signatoryStepsSaga);
  });

  it("should put action to update steps when isSignatory is changed", async () => {
    await runSaga(store, signatoryStepsSaga, { payload }).toPromise();

    expect(dispatched).toEqual([
      setStepsStatus(
        [
          { flowId: `${COMPANY_SIGNATORY_ID}${stakeholderId}`, step: STEP_1 },
          { flowId: `${COMPANY_SIGNATORY_ID}${stakeholderId}`, step: STEP_2 },
          { flowId: `${COMPANY_SIGNATORY_ID}${stakeholderId}`, step: STEP_3 },
          { flowId: `${COMPANY_STAKEHOLDER_ID}${stakeholderId}`, step: STEP_6 }
        ],
        STEP_STATUS.AVAILABLE
      )
    ]);
  });

  it("should do nothing if value of isSignatory was not changed", async () => {
    getSignatories.mockReturnValue([{ kycDetails: { isSignatory: true } }]);
    await runSaga(store, signatoryStepsSaga, { payload }).toPromise();
    expect(dispatched).toEqual([]);
  });

  it("should do nothing if no COMPLETED steps for this signatory", async () => {
    getCompletedSteps.mockReturnValue([]);
    await runSaga(store, signatoryStepsSaga, { payload }).toPromise();

    expect(dispatched).toEqual([]);
  });

  it("should do nothing if some other field in prospect is changed", async () => {
    const payload = {
      "some field": "some value"
    };

    await runSaga(store, signatoryStepsSaga, { payload }).toPromise();

    expect(dispatched).toEqual([]);
  });

  it("should do nothing if some other field in signatory object is changed", async () => {
    const payload = {
      "prospect.signatoryInfo[1]": "some value"
    };

    await runSaga(store, signatoryStepsSaga, { payload }).toPromise();

    expect(dispatched).toEqual([]);
  });
});

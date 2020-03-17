import {
  SET_STEP_STATUS,
  SET_INITIAL_STEPS,
  REMOVE_SIGNATORY,
  setStepStatus,
  setInitialSteps,
  removeSignatory
} from "../completedSteps";

describe("actions for completedSteps", () => {
  it("should set step", () => {
    const flowId = "companyInfo";
    const step = 1;
    const status = "COMPLETED";
    const expectedAction = {
      type: SET_STEP_STATUS,
      payload: { flowId, step, status }
    };
    expect(setStepStatus(flowId, step, status)).toEqual(expectedAction);
  });
  it("should set initial steps", () => {
    const steps = [];
    const expectedAction = {
      type: SET_INITIAL_STEPS,
      payload: { steps }
    };
    expect(setInitialSteps(steps)).toEqual(expectedAction);
  });
  it("should remove signatory", () => {
    const signatoryId = 1;
    const expectedAction = {
      type: REMOVE_SIGNATORY,
      payload: { signatoryId }
    };
    expect(removeSignatory(signatoryId)).toEqual(expectedAction);
  });
});

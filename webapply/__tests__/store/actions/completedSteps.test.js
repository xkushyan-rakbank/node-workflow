import {
  SET_STEP_STATUS,
  SET_STEPS_STATUS,
  SET_INITIAL_STEPS,
  REMOVE_SIGNATORY,
  setStepStatus,
  setStepsStatus,
  setInitialSteps,
  removeSignatory
} from "../../../src/store/actions/completedSteps";

describe("actions for completedSteps", () => {
  it("should create an action to set step", () => {
    const flowId = "companyInfo";
    const step = 1;
    const status = "COMPLETED";
    const expectedAction = {
      type: SET_STEP_STATUS,
      payload: { flowId, step, status }
    };
    expect(setStepStatus(flowId, step, status)).toEqual(expectedAction);
  });

  it("should create an action to set steps", () => {
    const steps = "some steps";
    const status = "some status";
    const expectedAction = {
      type: SET_STEPS_STATUS,
      payload: { steps, status }
    };
    expect(setStepsStatus(steps, status)).toEqual(expectedAction);
  });

  it("should create an action to set initial steps", () => {
    const steps = [];
    const expectedAction = {
      type: SET_INITIAL_STEPS,
      payload: { steps }
    };
    expect(setInitialSteps(steps)).toEqual(expectedAction);
  });

  it("should create an action to remove signatory", () => {
    const signatoryId = "1";
    const expectedAction = {
      type: REMOVE_SIGNATORY,
      payload: { signatoryId }
    };
    expect(removeSignatory(signatoryId)).toEqual(expectedAction);
  });
});

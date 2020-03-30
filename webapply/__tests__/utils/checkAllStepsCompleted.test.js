import { checkAllStepsCompleted } from "../../src/utils/checkAllStepsCompleted";
import { STEP_STATUS } from "../../src/constants";

describe("checkAllStepsCompleted test", () => {
  it("should return true", () => {
    const steps = [{ status: STEP_STATUS.COMPLETED }, { status: STEP_STATUS.COMPLETED }];
    expect(checkAllStepsCompleted(steps)).toBe(true);
  });

  it("should return false", () => {
    const steps = [{ status: STEP_STATUS.COMPLETED }, { status: STEP_STATUS.AVAILABLE }];
    expect(checkAllStepsCompleted()).toBe(false);
    expect(checkAllStepsCompleted(steps)).toBe(false);
  });
});

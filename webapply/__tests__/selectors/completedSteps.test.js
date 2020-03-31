import {
  getCompletedSteps,
  getIsAnyStakeholderStepsCompleted,
  getIsStakeholderStepsCompleted,
  getStakeholderSteps
} from "../../src/store/selectors/completedSteps";
import { getCompanySteps, getSignatoriesSteps } from "../../src/store/selectors/appConfig";

describe("completedSteps selector test", () => {
  const companyStep = { flowId: "companyInfo", step: 1, status: "COMPLETED" };
  const completedCompanyStakeholderStep = {
    flowId: "companyStakeholder_1",
    step: 1,
    status: "COMPLETED"
  };
  const notCompletedCompanyStakeholderStep = {
    flowId: "companyStakeholder_1",
    step: 2,
    status: "NOT_AVAILABLE"
  };
  const finalQuestionStep = {
    flowId: "finalQuestionsCompany",
    step: 1,
    status: "COMPLETED"
  };
  const companySignatoryStep = {
    flowId: "companySignatory_1",
    step: 1,
    status: "COMPLETED"
  };
  const completedSteps = [
    companyStep,
    completedCompanyStakeholderStep,
    notCompletedCompanyStakeholderStep,
    finalQuestionStep,
    companySignatoryStep
  ];
  const state = { completedSteps };

  it("should return completed steps", () => {
    expect(getCompletedSteps(state)).toEqual(completedSteps);
  });

  it("should return empty array when completed steps is not set", () => {
    expect(getCompletedSteps({})).toEqual([]);
  });

  it("should return company stakeholders steps", () => {
    expect(getStakeholderSteps(state)).toEqual([
      completedCompanyStakeholderStep,
      notCompletedCompanyStakeholderStep
    ]);
  });

  it("should return false when not any stakeholder steps have completed status", () => {
    expect(getIsAnyStakeholderStepsCompleted(state)).toBe(false);
  });

  it("should return true when any stakeholder steps have completed status", () => {
    expect(
      getIsAnyStakeholderStepsCompleted({ completedSteps: [completedCompanyStakeholderStep] })
    ).toBe(true);
  });

  it("should return false when not all stakeholder steps have completed status", () => {
    expect(getIsStakeholderStepsCompleted(state)).toBe(false);
  });

  it("should return true when all stakeholder steps have completed status", () => {
    expect(
      getIsStakeholderStepsCompleted({ completedSteps: [completedCompanyStakeholderStep] })
    ).toBe(true);
  });

  it("should return final questions steps", () => {
    expect(getCompanySteps(state)).toEqual([finalQuestionStep])
  });

  it("should return company signatory steps", () => {
    expect(getSignatoriesSteps(state)).toEqual([companySignatoryStep]);
  });
});

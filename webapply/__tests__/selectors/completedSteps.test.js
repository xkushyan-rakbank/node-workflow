import {
    getCompletedSteps,
    getIsAnyStakeholderStepsCompleted,
    getIsStakeholderStepsCompleted,
    getStakeholderSteps
} from "../../src/store/selectors/completedSteps";

describe("completedSteps selector test", () => {
    const completedSteps = [
        { flowId: "companyInfo", step: 1, status: "COMPLETED" },
        { flowId: "finalQuestionsCompany", step: 1, status: "COMPLETED" },
        { flowId: "companySignatory_8", step: 2, status: "NOT_AVAILABLE" },
        { flowId: "companyStakeholder_4", step: 2, status: "COMPLETED" },
        { flowId: "companyStakeholder_3", step: 2, status: "NOT_AVAILABLE" }
    ];
    it("should return completed steps array", () => {
        expect(getCompletedSteps({ completedSteps })).toEqual(completedSteps);
    });

    it("should return company stakeholders steps array ", () => {
        expect(getStakeholderSteps({ completedSteps })).toEqual([
            { flowId: "companyStakeholder_4", step: 2, status: "COMPLETED" },
            { flowId: "companyStakeholder_3", step: 2, status: "NOT_AVAILABLE" }
        ]);
    });

    it("should return IsAnyStakeholderStepsCompleted status", () => {
        expect(getIsAnyStakeholderStepsCompleted({ completedSteps })).toBe(false);
    });

    it("should return IsStakeholderStepsCompleted status", () => {
        expect(getIsStakeholderStepsCompleted({ completedSteps })).toBe(false);
    });
});

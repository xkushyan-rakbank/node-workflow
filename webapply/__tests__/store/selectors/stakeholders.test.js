import {
  getStakeholdersState,
  getEditableStakeholder,
  getStakeholdersIds,
  getStakeholders,
  getPercentage,
  getPercentageWithoutCurrentStakeholder,
  checkIsHasSignatories
} from "../../../src/store/selectors/stakeholders";
import { getSignatories } from "../../../src/store/selectors/appConfig";

jest.mock("../../../src/store/selectors/appConfig");

describe("stakeholders selectors test", () => {
  const stakeholderId = "some stakeholder id";
  const stakeholdersIds = [{ id: stakeholderId }];
  const editableStakeholder = "some stakeholder";
  const stakeholders = {
    stakeholderId,
    editableStakeholder,
    stakeholdersIds
  };
  const state = { stakeholders };
  const signatory = {
    name: "some signatory",
    kycDetails: { shareHoldingPercentage: 100, isSignatory: true }
  };

  beforeEach(() => {
    getSignatories.mockReturnValue([signatory]);
  });

  it("should return value of stakeholders state", () => {
    expect(getStakeholdersState(state)).toBe(stakeholders);
  });

  it("should return value of editableStakeholder", () => {
    expect(getEditableStakeholder(state)).toBe(editableStakeholder);
  });

  it("should return value of stakeholdersIds", () => {
    expect(getStakeholdersIds(state)).toBe(stakeholdersIds);
  });

  it("should return value of stakeholders", () => {
    expect(getStakeholders(state)).toEqual([{ id: stakeholderId, ...signatory }]);
  });

  it("should return value of stakeholders when array of signatory is empty", () => {
    expect(getStakeholders({ stakeholders: { stakeholdersIds: [] } })).toEqual([
      { id: undefined, ...signatory }
    ]);
  });

  it("should return total percentage of shares", () => {
    expect(getPercentage(state)).toBe(100);
    expect(getPercentageWithoutCurrentStakeholder(state, 10)).toBe(100);
  });

  it("should check signatories is exists", () => {
    expect(checkIsHasSignatories(state)).toBe(true);
  });
});

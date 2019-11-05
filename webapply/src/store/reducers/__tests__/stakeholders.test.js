import { initialState } from "../stakeholders";
import stakeholders from "../stakeholders";

import {
  addNewStakeholder,
  openConfirmDialog,
  closeConfirmDialog,
  changeEditableStakeholder,
  changeStep,
  finishStakeholderEdit
} from "../../actions/stakeholders";

describe("applicationStatus reducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise initialState as the value", () => {
      const {
        isNewStakeholder,
        isConfirmDialogOpen,
        editableStakeholder,
        isFinalScreenShown,
        step,
        confirmation,
        isStatusShown,
        completedStep
      } = initialState;

      expect(isNewStakeholder).toBe(false);
      expect(isConfirmDialogOpen).toBe(false);
      expect(editableStakeholder).toEqual(undefined);
      expect(isFinalScreenShown).toBe(false);
      expect(step).toEqual(1);
      expect(confirmation).toBe(false);
      expect(isStatusShown).toBe(false);
      expect(completedStep).toEqual(0);
    });
  });

  describe("stakeholders", () => {
    it("addNewStakeholder should update isNewStakeholder and step", () => {
      const state = stakeholders(initialState, addNewStakeholder());
      const { isNewStakeholder, step } = state;
      expect(isNewStakeholder).toBe(true);
      expect(step).toBe(initialState.step);
    });

    it("openConfirmDialog should update isConfirmDialogOpen", () => {
      const state = stakeholders(initialState, openConfirmDialog());
      const { isConfirmDialogOpen } = state;
      expect(isConfirmDialogOpen).toBe(true);
    });

    it("closeConfirmDialog should update isConfirmDialogOpen", () => {
      const state = stakeholders(initialState, closeConfirmDialog());
      const { isConfirmDialogOpen } = state;
      expect(isConfirmDialogOpen).toBe(false);
    });

    describe("changeEditableStakeholder", () => {
      const testEditableStakeHolder = { testData: "123abcXYZ" };

      it("changeEditableStakeholder should update editableStakeholder, step and isConfirmDialogOpen", () => {
        const state = stakeholders(
          initialState,
          changeEditableStakeholder(testEditableStakeHolder)
        );
        const { editableStakeholder, step, isConfirmDialogOpen } = state;
        expect(editableStakeholder).toBe(testEditableStakeHolder);
        expect(step).toBe(initialState.step);
        expect(isConfirmDialogOpen).toBe(false);
      });
    });

    describe("changeStep", () => {
      const testStep = { step: 2 };

      it("changeStep should update step", () => {
        const state = stakeholders(initialState, changeStep(testStep));
        const { step } = state;
        expect(step).toBe(testStep.step);
      });
    });
    it("finishStakeholderEdit should update editableStakeholder and finishStakeholderEdit", () => {
      const state = stakeholders(initialState, finishStakeholderEdit());
      const { editableStakeholder, isFinalScreenShown } = state;
      expect(editableStakeholder).toBe(undefined);
      expect(isFinalScreenShown).toBe(false);
    });
  });
});

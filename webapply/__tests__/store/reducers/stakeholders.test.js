import reducer, { initialState } from "../../../src/store/reducers/stakeholders";
import {
  changeEditableStakeholder,
  updateStakeholdersIds
} from "../../../src/store/actions/stakeholders";

describe("stakeholders reducer test", () => {
  it("CHANGE_EDITABLE_STAKEHOLDER action type", () => {
    const stakeholderIndex = 2;
    const expectedState = {
      ...initialState,
      editableStakeholder: stakeholderIndex
    };
    expect(reducer(initialState, changeEditableStakeholder(stakeholderIndex))).toStrictEqual(
      expectedState
    );
  });

  it("UPDATE_STAKEHOLDERS_IDS action type", () => {
    const stakeholdersIds = []
    const expectedState = {
      ...initialState,
      stakeholdersIds
    };

    expect(reducer(initialState, updateStakeholdersIds(stakeholdersIds))).toStrictEqual(
      expectedState
    );
  });
});

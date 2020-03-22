import reducer, { initialState } from "../../../src/store/reducers/stakeholders";
import uniqueId from "lodash/uniqueId";
import {
  changeEditableStakeholder,
  updateStakeholdersIds
} from "../../../src/store/actions/stakeholders";
import { UNMATCHED_ACTION } from "../../../__mocks__/storeMock";

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
    const id = uniqueId();
    const stakeholdersIds = Array(10)
      .fill(null)
      .map(() => ({
        id,
        done: false,
        isEditting: false
      }));
    const expectedState = {
      ...initialState,
      stakeholdersIds
    };

    expect(reducer(initialState, updateStakeholdersIds(stakeholdersIds))).toStrictEqual(
      expectedState
    );
  });

  it("check default action type", () => {
    expect(reducer(undefined, UNMATCHED_ACTION)).toStrictEqual(initialState);
  });
});

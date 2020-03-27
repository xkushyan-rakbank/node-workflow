import reducer from "../../../src/store/reducers/stakeholders";
import {
  changeEditableStakeholder,
  updateStakeholdersIds
} from "../../../src/store/actions/stakeholders";

describe("stakeholders reducer test", () => {
  it("CHANGE_EDITABLE_STAKEHOLDER action type", () => {
    const stakeholderIndex = 2;

    expect(reducer(undefined, changeEditableStakeholder(stakeholderIndex))).toMatchObject({
      editableStakeholder: stakeholderIndex
    });
  });

  it("UPDATE_STAKEHOLDERS_IDS action type", () => {
    const stakeholdersIds = [];

    expect(reducer(undefined, updateStakeholdersIds(stakeholdersIds))).toMatchObject({
      stakeholdersIds
    });
  });
});

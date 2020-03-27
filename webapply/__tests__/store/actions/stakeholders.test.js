import { appendGaEventToAction } from "../../../src/store/actions/googleAnalytics";
import { GA_EVENTS } from "../../../src/utils/ga";

import {
  CREATE_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  CHANGE_EDITABLE_STAKEHOLDER,
  UPDATE_STAKEHOLDERS_IDS,
  SET_EDIT_STAKEHOLDER,
  createNewStakeholder,
  deleteStakeholder,
  changeEditableStakeholder,
  updateStakeholdersIds,
  setEditStakeholder
} from "../../../src/store/actions/stakeholders";

describe("stakeholders actions", () => {
  it("should create an action to create new stakeholder", () => {
    const expectedAction = { type: CREATE_NEW_STAKEHOLDER };
    const gaEvent = GA_EVENTS.COMPANY_STAKEHOLDER_ADD_NEW_CONTINUE;

    const appendGaEvent = appendGaEventToAction(expectedAction, gaEvent);
    expect(createNewStakeholder()).toEqual(appendGaEvent);
  });

  it("should create an action to delete stakeholder", () => {
    const stakeholderId = {};

    expect(deleteStakeholder(stakeholderId)).toStrictEqual({
      type: DELETE_STAKEHOLDER,
      payload: stakeholderId
    });
  });

  it("should create an action to change editable stakeholder", () => {
    const editableStakeholder = {};

    expect(changeEditableStakeholder(editableStakeholder)).toStrictEqual({
      type: CHANGE_EDITABLE_STAKEHOLDER,
      payload: editableStakeholder
    });
  });

  it("should create an action to update stakeholder", () => {
    const stakeholdersIds = [];

    expect(updateStakeholdersIds(stakeholdersIds)).toStrictEqual({
      type: UPDATE_STAKEHOLDERS_IDS,
      payload: stakeholdersIds
    });
  });

  it("should create an action to set edit stakeholder", () => {
    const index = {};
    const isEditting = {};

    expect(setEditStakeholder(index, isEditting)).toStrictEqual({
      type: SET_EDIT_STAKEHOLDER,
      payload: { index, isEditting }
    });
  });
});

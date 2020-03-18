import { appendGaEventToAction } from "../../../src/store/actions/googleAnalytics";
import { GA_EVENTS } from "../../../src/utils/ga";

import {
  CREATE_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  CHANGE_EDITABLE_STAKEHOLDER,
  UPDATE_STAKEHOLDERS_IDS,
  SET_FILL_STAKEHOLDER,
  SET_EDIT_STAKEHOLDER,
  createNewStakeholder,
  deleteStakeholder,
  changeEditableStakeholder,
  updateStakeholdersIds,
  setFillStakeholder,
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
    const expectedAction = {
      type: DELETE_STAKEHOLDER,
      stakeholderId
    };
    expect(deleteStakeholder(stakeholderId)).toEqual(expectedAction);
  });

  it("should create an action to change editable stakeholder", () => {
    const editableStakeholder = {};
    const expectedAction = {
      type: CHANGE_EDITABLE_STAKEHOLDER,
      editableStakeholder
    };
    expect(changeEditableStakeholder(editableStakeholder)).toEqual(expectedAction);
  });

  it("should create an action to update stakeholder", () => {
    const stakeholdersIds = {};
    const expectedAction = {
      type: UPDATE_STAKEHOLDERS_IDS,
      stakeholdersIds
    };
    expect(updateStakeholdersIds(stakeholdersIds)).toEqual(expectedAction);
  });

  it("should create an action to set fill stakeholder", () => {
    const index = {};
    const done = {};
    const expectedAction = {
      type: SET_FILL_STAKEHOLDER,
      payload: { index, done }
    };
    expect(setFillStakeholder(index, done)).toEqual(expectedAction);
  });

  it("should create an action to set edit stakeholder", () => {
    const index = {};
    const isEditting = {};
    const expectedAction = {
      type: SET_EDIT_STAKEHOLDER,
      payload: { index, isEditting }
    };
    expect(setEditStakeholder(index, isEditting)).toEqual(expectedAction);
  });
});

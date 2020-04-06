import { runSaga } from "redux-saga";
import uniqueId from "lodash/uniqueId";

import stakeholderSaga, {
  createNewStakeholderSaga,
  deleteStakeholderSaga,
  setEditStakeholderSaga
} from "../../../src/store/sagas/stakeholders";
import {
  CREATE_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
  SET_EDIT_STAKEHOLDER,
  CHANGE_EDITABLE_STAKEHOLDER,
  UPDATE_STAKEHOLDERS_IDS
} from "../../../src/store/actions/stakeholders";
import { getStakeholdersIds } from "../../../src/store/selectors/stakeholders";
import { getSignatories, getSignatoryModel } from "../../../src/store/selectors/appConfig";
import { cloneDeep } from "../../../src/utils/cloneDeep";
import { UPDATE_PROSPECT } from "../../../src/store/actions/appConfig";
import { REMOVE_SIGNATORY } from "../../../src/store/actions/completedSteps";

jest.mock("../../../src/utils/cloneDeep");
jest.mock("../../../src/store/selectors/stakeholders");
jest.mock("../../../src/store/selectors/appConfig");
jest.mock("lodash/uniqueId");

describe("stakeholders saga tests", () => {
  let dispatched = [];
  const state = "some state";
  const store = {
    dispatch: action => dispatched.push(action),
    getState: () => state
  };
  const stakeholderId = { id: "some stakeholder id", isEditting: false };
  const stakeholder = { id: stakeholderId.id, value: "some stakeholder" };

  beforeEach(() => {
    dispatched = [];
    jest.clearAllMocks();
    getSignatories.mockReturnValue([stakeholder]);
    getStakeholdersIds.mockReturnValue([stakeholderId]);
  });

  it("should handle stakeholder saga", () => {
    const gen = stakeholderSaga().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(CREATE_NEW_STAKEHOLDER);
    expect(gen.payload[1].payload.args[0]).toEqual(DELETE_STAKEHOLDER);
    expect(gen.payload[2].payload.args[0]).toEqual(SET_EDIT_STAKEHOLDER);
  });

  it("should create new stakeholder", async () => {
    const signatoryModel = { value: "some signatory model" };
    getSignatoryModel.mockReturnValue(signatoryModel);
    cloneDeep.mockReturnValue({ value: "some stakeholder 2", kycDetails: {} });
    uniqueId.mockReturnValue("some unique id");

    await runSaga(store, createNewStakeholderSaga).toPromise();

    expect(getSignatories.mock.calls[0]).toEqual([state]);
    expect(getStakeholdersIds.mock.calls[0]).toEqual([state]);
    expect(getSignatoryModel.mock.calls[0]).toEqual([state]);
    expect(cloneDeep.mock.calls[0]).toEqual([signatoryModel]);
    expect(dispatched).toEqual([
      {
        type: UPDATE_STAKEHOLDERS_IDS,
        payload: [stakeholderId, { id: "some unique id" }]
      },
      { type: CHANGE_EDITABLE_STAKEHOLDER, payload: 1 },
      {
        type: UPDATE_PROSPECT,
        payload: {
          "prospect.signatoryInfo": [
            stakeholder,
            {
              value: "some stakeholder 2",
              kycDetails: {
                isUAEResident: true,
                residenceCountry: "AE"
              }
            }
          ]
        }
      }
    ]);
  });

  it("should delete stakeholder", async () => {
    await runSaga(store, deleteStakeholderSaga, { payload: stakeholderId.id }).toPromise();

    expect(getSignatories.mock.calls[0]).toEqual([state]);
    expect(getStakeholdersIds.mock.calls[0]).toEqual([state]);
    expect(dispatched).toEqual([
      {
        type: UPDATE_PROSPECT,
        payload: { "prospect.signatoryInfo": [] }
      },
      { type: UPDATE_STAKEHOLDERS_IDS, payload: [] },
      {
        type: REMOVE_SIGNATORY,
        payload: { signatoryId: stakeholderId.id }
      },
      { type: CHANGE_EDITABLE_STAKEHOLDER, payload: null }
    ]);
  });

  it("it should set edit stakeholder when index exists in state", async () => {
    await runSaga(store, setEditStakeholderSaga, {
      payload: { index: 0, isEditting: true }
    }).toPromise();

    expect(getStakeholdersIds.mock.calls[0]).toEqual([state]);
    expect(dispatched).toEqual([
      { type: UPDATE_STAKEHOLDERS_IDS, payload: [{ id: stakeholderId.id, isEditting: true }] }
    ]);
  });

  it("it should set edit stakeholder when index not exists in state", async () => {
    await runSaga(store, setEditStakeholderSaga, {
      payload: { index: 1, isEditting: true }
    }).toPromise();

    expect(getStakeholdersIds.mock.calls[0]).toEqual([state]);
    expect(dispatched).toEqual([
      { type: UPDATE_STAKEHOLDERS_IDS, payload: [{ id: stakeholderId.id, isEditting: false }] }
    ]);
  });
});

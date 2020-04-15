import { runSaga } from "redux-saga";
import nanoid from "nanoid";

import stakeholderSaga, {
  createNewStakeholderSaga,
  deleteStakeholderSaga
} from "../../../src/store/sagas/stakeholders";
import {
  CREATE_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER,
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
jest.mock("nanoid");

describe("stakeholders saga tests", () => {
  let dispatched = [];
  const state = "some state";
  const store = {
    dispatch: action => dispatched.push(action),
    getState: () => state
  };
  const stakeholderId = "some stakeholder id";
  const stakeholder = { id: "some stakeholder id", value: "some stakeholder" };
  const signatoryModel = { value: "some signatory model" };
  const uniqueStakeholderId = "some unique id";

  beforeEach(() => {
    dispatched = [];
    getSignatories.mockReturnValue([stakeholder]);
    getStakeholdersIds.mockReturnValue([stakeholderId]);
    getSignatoryModel.mockReturnValue(signatoryModel);
    cloneDeep.mockReturnValue(signatoryModel);
    nanoid.mockReturnValue(uniqueStakeholderId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle stakeholder saga", () => {
    const gen = stakeholderSaga().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(CREATE_NEW_STAKEHOLDER);
    expect(gen.payload[1].payload.args[0]).toEqual(DELETE_STAKEHOLDER);
  });

  it("should create new stakeholder", async () => {
    await runSaga(store, createNewStakeholderSaga).toPromise();

    expect(getSignatories.mock.calls[0]).toEqual([state]);
    expect(getStakeholdersIds.mock.calls[0]).toEqual([state]);
    expect(getSignatoryModel.mock.calls[0]).toEqual([state]);
    expect(cloneDeep.mock.calls[0]).toEqual([signatoryModel]);
    expect(dispatched).toEqual([
      {
        type: UPDATE_STAKEHOLDERS_IDS,
        payload: [stakeholderId, uniqueStakeholderId]
      },
      { type: CHANGE_EDITABLE_STAKEHOLDER, payload: uniqueStakeholderId },
      {
        type: UPDATE_PROSPECT,
        payload: {
          "prospect.signatoryInfo": [stakeholder, signatoryModel]
        }
      }
    ]);
  });

  it("should delete stakeholder", async () => {
    await runSaga(store, deleteStakeholderSaga, { payload: stakeholderId }).toPromise();

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
        payload: { signatoryId: stakeholderId }
      },
      { type: CHANGE_EDITABLE_STAKEHOLDER, payload: null }
    ]);
  });
});

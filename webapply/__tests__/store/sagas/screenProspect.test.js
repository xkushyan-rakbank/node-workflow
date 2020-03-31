import { runSaga } from "redux-saga";

import loginInfoFormSaga, { screenProspectSaga } from "../../../src/store/sagas/screenProspect";
import {
  SCREEN_PROSPECT_SEND,
  SCREEN_PROSPECT_SUCCESS
} from "../../../src/store/actions/screenProspect";
import { log } from "../../../src/utils/loggger";
import { screening } from "../../../src/api/apiClient";

jest.mock("../../../src/utils/loggger");

describe("screenProspect saga test", () => {
  let dispatched = [];
  const state = "some state";
  const payload = { prospectId: "some id" };
  const data = "some data";
  const error = "some error";
  const store = {
    dispatch: action => dispatched.push(action),
    getState: () => state
  };

  beforeEach(() => {
    dispatched = [];
    jest.clearAllMocks();
  });

  it("should handle screenProspectSaga", () => {
    const gen = loginInfoFormSaga().next().value;
    expect(gen.type).toEqual("FORK");
    expect(gen.payload.args[0]).toEqual(SCREEN_PROSPECT_SEND);
  });

  it("should screening prospect success", async () => {
    const spy = jest.spyOn(screening, "send").mockReturnValue({ data });

    await runSaga(store, screenProspectSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([payload.prospectId]);
    expect(dispatched).toMatchObject([
      { type: SCREEN_PROSPECT_SUCCESS, payload: { ...payload, screeningResult: data } }
    ]);

    spy.mockRestore();
  });

  it("should log error when screenProspect is failed", async () => {
    log.mockReturnValue(null);
    const spy = jest.spyOn(screening, "send").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, screenProspectSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([payload.prospectId]);
    expect(log.mock.calls[0]).toEqual([error]);

    spy.mockRestore();
  });
});

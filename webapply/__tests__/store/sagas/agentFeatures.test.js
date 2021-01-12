import { runSaga } from "redux-saga";

import agentFeaturesSaga, { inviteFormSaga } from "../../../src/store/sagas/agentFeatures";
import {
  INVITE_CUSTOMER_FORM,
  INVITE_CUSTOMER_FORM_SUCCESS,
  INVITE_CUSTOMER_FORM_ERROR
} from "../../../src/store/actions/agentFeatures";
import { log } from "../../../src/utils/loggger";
import { createInvite } from "../../../src/api/apiClient";

jest.mock("../../../src/utils/loggger");

describe("agentFeaturesSaga test", () => {
  let dispatched = [];
  const state = "some state";
  const payload = "some payload";
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

  it("should handle inviteCustomerForm saga", () => {
    const gen = agentFeaturesSaga().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(INVITE_CUSTOMER_FORM);
  });

  it("should send invite to customer", async () => {
    const spy = jest.spyOn(createInvite, "send").mockReturnValue({ data });

    await runSaga(store, inviteFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([payload]);
    expect(dispatched).toEqual([{ type: INVITE_CUSTOMER_FORM_SUCCESS, payload: data }]);

    spy.mockRestore();
  });

  it("should log error when login is failed", async () => {
    log.mockReturnValue(null);
    const spy = jest.spyOn(createInvite, "send").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, inviteFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([payload]);
    expect(log.mock.calls[0]).toEqual([error]);
    expect(dispatched).toEqual([{ type: INVITE_CUSTOMER_FORM_ERROR, error }]);

    spy.mockRestore();
  });
});

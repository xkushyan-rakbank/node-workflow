import { runSaga } from "redux-saga";

import loginInfoFormSaga, { loginFormSaga } from "../../../src/store/sagas/loginForm";
import {
  LOGIN_INFO_FORM,
  LOGIN_INFO_FORM_SUCCESS,
  LOGIN_INFO_FORM_ERROR
} from "../../../src/store/actions/loginForm";
import { log } from "../../../src/utils/loggger";
import { authentication } from "../../../src/api/apiClient";

jest.mock("../../../src/utils/loggger");

describe("otp saga test", () => {
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

  it("should handle otpSagas saga", () => {
    const gen = loginInfoFormSaga().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(LOGIN_INFO_FORM);
  });

  it("should login user", async () => {
    const spy = jest.spyOn(authentication, "login").mockReturnValue({ data });

    await runSaga(store, loginFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([payload]);
    expect(dispatched).toEqual([{ type: LOGIN_INFO_FORM_SUCCESS, payload: data }]);

    spy.mockRestore();
  });

  it("should log error when login is failed", async () => {
    log.mockReturnValue(null);
    const spy = jest.spyOn(authentication, "login").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, loginFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([payload]);
    expect(log.mock.calls[0]).toEqual([error]);
    expect(dispatched).toEqual([{ type: LOGIN_INFO_FORM_ERROR, error }]);

    spy.mockRestore();
  });
});

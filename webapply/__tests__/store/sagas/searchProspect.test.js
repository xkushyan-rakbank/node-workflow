import { runSaga } from "redux-saga";
import pick from "lodash/pick";

import searchProspectSaga, {
  searchProspectFormSaga,
  getProspectOverviewSaga
} from "../../../src/store/sagas/searchProspect";
import {
  SEARCH_APPLICATIONS_SUCCESS,
  SEARCH_APPLICATIONS_REQUEST,
  SEARCH_APPLICATIONS_FAILURE,
  GET_PROSPECT_OVERVIEW_SUCCESS,
  GET_PROSPECT_OVERVIEW_REQUEST,
  GET_PROSPECT_OVERVIEW_FAIL
} from "../../../src/store/actions/searchProspect";
import { getAuthorizationHeader } from "../../../src/store/selectors/appConfig";
import { search } from "../../../src/api/apiClient";
import { prospect as prospectApi } from "../../../src/api/apiClient";
import { log } from "../../../src/utils/loggger";

jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/utils/loggger");

describe("searchProspect saga test", () => {
  let dispatched = [];
  const error = "some error";
  const state = "some state";
  const header = "some header";
  const prospectId = "some prospectId";
  const store = {
    dispatch: action => dispatched.push(action),
    getState: () => state
  };

  beforeEach(() => {
    dispatched = [];
    jest.clearAllMocks();
    getAuthorizationHeader.mockReturnValue(header);
    log.mockReturnValue(null);
  });

  it("should handle searchProspect saga", () => {
    const gen = searchProspectSaga().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(SEARCH_APPLICATIONS_REQUEST);
    expect(gen.payload[1].payload.args[0]).toEqual(GET_PROSPECT_OVERVIEW_REQUEST);
  });

  it("should search prospect", async () => {
    const data = "some data";
    const input = {
      applicantName: "",
      mobileNo: "",
      countryCode: "",
      leadNumber: "",
      tradeLicenseNo: "",
      email: "",
      eidNumber: ""
    };

    const spy = jest
      .spyOn(search, "searchApplication")
      .mockReturnValue({ data: { searchResult: data } });
    await runSaga(store, searchProspectFormSaga, { payload: {} }).toPromise();
    expect(spy.mock.calls[0]).toEqual([input, header]);
    expect(dispatched).toEqual([{ type: SEARCH_APPLICATIONS_SUCCESS, payload: data }]);
    spy.mockRestore();
  });

  it("should log error when prospect form is failed", async () => {
    const payload = {
      fullName: "some fullName",
      mobileNo: "some mobileNo",
      countryCode: "some countryCode",
      leadNumber: "some leadNumber",
      tradeLicenseNo: "some tradeLicenseNo",
      email: "some email"
    };
    const input = {
      applicantName: payload.fullName,
      ...pick(payload, ["countryCode", "mobileNo", "leadNumber", "tradeLicenseNo", "email"]),
      eidNumber: ""
    };

    const spy = jest.spyOn(search, "searchApplication").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, searchProspectFormSaga, { payload }).toPromise();
    expect(spy.mock.calls[0]).toEqual([input, header]);
    expect(log.mock.calls[0]).toEqual([error]);
    expect(dispatched).toEqual([{ type: SEARCH_APPLICATIONS_FAILURE, payload: {}  }]);
    spy.mockRestore();
  });

  it("should handle get prospect overview", async () => {
    const prospect = "some prospect";
    const spy = jest.spyOn(prospectApi, "get").mockReturnValue({ data: prospect });

    await runSaga(store, getProspectOverviewSaga, { payload: { prospectId } }).toPromise();
    expect(spy.mock.calls[0]).toEqual([prospectId, header]);
    expect(dispatched).toEqual([{ type: GET_PROSPECT_OVERVIEW_SUCCESS, payload: { prospect } }]);
    spy.mockRestore();
  });

  it("should log error when prospect overview is failed", async () => {
    const spy = jest.spyOn(prospectApi, "get").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, getProspectOverviewSaga, { payload: { prospectId } }).toPromise();
    expect(spy.mock.calls[0]).toEqual([prospectId, header]);
    expect(log.mock.calls[0]).toEqual([error]);
    expect(dispatched).toEqual([{ type: GET_PROSPECT_OVERVIEW_FAIL, error }]);
    spy.mockRestore();
  });
});

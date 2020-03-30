import { runSaga } from "redux-saga";

import otpSagas, { generateOtp, verifyOtp } from "../../../src/store/sagas/otp";
import {
  GENERATE_OTP_CODE,
  VERIFY_OTP,
  SET_GENERATING,
  GENERATE_CODE_SUCCESS,
  VERIFY_CODE_SUCCESS,
  SET_PENDING,
  VERIFY_CODE_FAILED
} from "../../../src/store/actions/otp";
import {
  getAuthorizationHeader,
  getProspectId,
  getApplicantInfo
} from "../../../src/store/selectors/appConfig";
import { otp } from "../../../src/api/apiClient";
import { log } from "../../../src/utils/loggger";

jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/utils/loggger");

describe("otp saga test", () => {
  let dispatched = [];
  const state = "some state";
  const header = "some header";
  const prospectId = "some prospect id";
  const otpToken = "some token";
  const applicantInfo = {
    email: "some email",
    mobileNo: "some mobile number",
    countryCode: "some country code"
  };
  const error = "some error";
  const store = {
    dispatch: action => dispatched.push(action),
    getState: () => state
  };

  beforeEach(() => {
    dispatched = [];
    jest.clearAllMocks();
    getAuthorizationHeader.mockReturnValue(header);
    getProspectId.mockReturnValue(prospectId);
    getApplicantInfo.mockReturnValue(applicantInfo);
    log.mockReturnValue(null);
  });

  it("should handle otpSagas saga", () => {
    const gen = otpSagas().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(GENERATE_OTP_CODE);
    expect(gen.payload[1].payload.args[0]).toEqual(VERIFY_OTP);
  });

  it("should generate otp", async () => {
    const payload = { test: "some payload" };
    const spy = jest.spyOn(otp, "generate").mockReturnValue(null);

    await runSaga(store, generateOtp, { payload }).toPromise();

    expect(getAuthorizationHeader.mock.calls[0]).toEqual([state]);
    expect(getProspectId.mock.calls[0]).toEqual([state]);
    expect(spy.mock.calls[0]).toEqual([{ ...payload, prospectId }, header]);
    expect(dispatched).toEqual([
      { type: GENERATE_CODE_SUCCESS },
      { type: SET_GENERATING, payload: false }
    ]);

    spy.mockRestore();
  });

  it("should log error when generate otp is failed", async () => {
    const payload = { test: "some payload" };
    const spy = jest.spyOn(otp, "generate").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, generateOtp, { payload }).toPromise();

    expect(getAuthorizationHeader.mock.calls[0]).toEqual([state]);
    expect(getProspectId.mock.calls[0]).toEqual([state]);
    expect(spy.mock.calls[0]).toEqual([{ ...payload, prospectId }, header]);
    expect(log.mock.calls[0]).toEqual([error]);
    expect(dispatched).toEqual([{ type: SET_GENERATING, payload: false }]);

    spy.mockRestore();
  });

  it("should handle verify otp successful", async () => {
    const spy = jest.spyOn(otp, "verify").mockReturnValue({ data: { verified: true } });

    await runSaga(store, verifyOtp, { payload: otpToken }).toPromise();

    expect(getAuthorizationHeader.mock.calls[0]).toEqual([state]);
    expect(getProspectId.mock.calls[0]).toEqual([state]);
    expect(getApplicantInfo.mock.calls[0]).toEqual([state]);
    expect(spy.mock.calls[0]).toEqual([{ ...applicantInfo, otpToken, prospectId }, header]);
    expect(dispatched).toEqual([
      { type: VERIFY_CODE_SUCCESS },
      { type: SET_PENDING, payload: false }
    ]);

    spy.mockRestore();
  });

  it("should handle verify otp failed", async () => {
    const spy = jest.spyOn(otp, "verify").mockReturnValue({ data: { verified: false } });

    await runSaga(store, verifyOtp, { payload: otpToken }).toPromise();

    expect(getAuthorizationHeader.mock.calls[0]).toEqual([state]);
    expect(getProspectId.mock.calls[0]).toEqual([state]);
    expect(getApplicantInfo.mock.calls[0]).toEqual([state]);
    expect(spy.mock.calls[0]).toEqual([{ ...applicantInfo, otpToken, prospectId }, header]);
    expect(dispatched).toEqual([
      { type: VERIFY_CODE_FAILED },
      { type: SET_PENDING, payload: false }
    ]);

    spy.mockRestore();
  });

  it("should handle verify otp failed", async () => {
    const spy = jest.spyOn(otp, "verify").mockReturnValue({ data: { verified: false } });

    await runSaga(store, verifyOtp, { payload: otpToken }).toPromise();

    expect(getAuthorizationHeader.mock.calls[0]).toEqual([state]);
    expect(getProspectId.mock.calls[0]).toEqual([state]);
    expect(getApplicantInfo.mock.calls[0]).toEqual([state]);
    expect(spy.mock.calls[0]).toEqual([{ ...applicantInfo, otpToken, prospectId }, header]);
    expect(dispatched).toEqual([
      { type: VERIFY_CODE_FAILED },
      { type: SET_PENDING, payload: false }
    ]);

    spy.mockRestore();
  });

  it("should log error when verify otp is failed", async () => {
    const spy = jest.spyOn(otp, "verify").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, verifyOtp, { payload: otpToken }).toPromise();

    expect(getAuthorizationHeader.mock.calls[0]).toEqual([state]);
    expect(getProspectId.mock.calls[0]).toEqual([state]);
    expect(getApplicantInfo.mock.calls[0]).toEqual([state]);
    expect(spy.mock.calls[0]).toEqual([{ ...applicantInfo, otpToken, prospectId }, header]);
    expect(log.mock.calls[0]).toEqual([error]);
    expect(dispatched).toEqual([{ type: SET_PENDING, payload: false }]);

    spy.mockRestore();
  });
});

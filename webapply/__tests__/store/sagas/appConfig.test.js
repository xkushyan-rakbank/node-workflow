import { runSaga } from "redux-saga";
import { all, takeLatest } from "redux-saga/effects";

import {
  getAccountType,
  getIsIslamicBanking,
  getProspect
} from "../../../src/store/selectors/appConfig";
import appConfigSaga, {
  receiveAppConfigSaga,
  updateProspectSaga,
  updateViewIdSaga
} from "../../../src/store/sagas/appConfig";
import {
  RECEIVE_APPCONFIG,
  UPDATE_PROSPECT,
  UPDATE_VIEW_ID,
  saveSignatoryModel,
  receiveAppConfigSuccess,
  receiveAppConfigFail,
  updateProspect,
  setConfig
} from "../../../src/store/actions/appConfig";
import {
  sendProspectToAPI,
  sendProspectToAPISuccess
} from "../../../src/store/actions/sendProspectToAPI";
import { cloneDeep } from "../../../src/utils/cloneDeep";
import { CONTINUE, UAE, UAE_CODE, UAE_CURRENCY } from "../../../src/constants";
import { config } from "../../../src/api/apiClient";

jest.mock("../../../src/utils/cloneDeep");
jest.mock("../../../src/store/selectors/appConfig");

describe("appConfig sagas tests", () => {
  let dispatched = [];

  beforeEach(() => {
    dispatched = [];
    jest.clearAllMocks();
  });

  it("should handle appConfig", () => {
    const gen = appConfigSaga();
    expect(gen.next().value).toEqual(
      all([
        takeLatest(RECEIVE_APPCONFIG, receiveAppConfigSaga),
        takeLatest(UPDATE_PROSPECT, updateProspectSaga),
        takeLatest(UPDATE_VIEW_ID, updateViewIdSaga)
      ])
    );
  });

  describe("should handle receiveAppConfigSaga", () => {
    const state = "some state";
    const isIslamicBanking = true;
    const signatory = {};
    const response = {
      data: {
        prospect: {
          signatoryInfo: [signatory],
          accountInfo: [{ accountCurrency: "" }],
          applicantInfo: { countryCode: "" },
          applicationInfo: { accountType: "", islamicBanking: "" },
          organizationInfo: {
            addressInfo: [{ addressDetails: [{ country: "", preferredAddress: "" }] }]
          }
        }
      }
    };

    it("with defined account type", async () => {
      const accountType = "some account type";
      const newConfig = {
        prospect: {
          signatoryInfo: [],
          accountInfo: [{ accountCurrency: UAE_CURRENCY }],
          applicantInfo: { countryCode: UAE_CODE },
          applicationInfo: { accountType, islamicBanking: isIslamicBanking },
          organizationInfo: {
            addressInfo: [{ addressDetails: [{ country: UAE, preferredAddress: "Y" }] }]
          }
        }
      };

      const spy = jest.spyOn(config, "load").mockReturnValue(response);
      getAccountType.mockReturnValue(accountType);
      getIsIslamicBanking.mockReturnValue(isIslamicBanking);
      cloneDeep.mockReturnValue(signatory);

      await runSaga(
        { dispatch: action => dispatched.push(action), getState: () => state },
        receiveAppConfigSaga
      );

      expect(spy.mock.calls[0]).toEqual([accountType]);
      expect(dispatched).toEqual([
        saveSignatoryModel(signatory),
        receiveAppConfigSuccess(newConfig),
        sendProspectToAPISuccess()
      ]);
    });
    it("with not defined account type", async () => {
      const accountType = "";
      const newConfig = {
        prospect: {
          signatoryInfo: [],
          accountInfo: [{ accountCurrency: UAE_CURRENCY }],
          applicantInfo: { countryCode: UAE_CODE },
          applicationInfo: { accountType, islamicBanking: isIslamicBanking },
          organizationInfo: {
            addressInfo: [{ addressDetails: [{ country: UAE, preferredAddress: "Y" }] }]
          }
        }
      };

      const spy = jest.spyOn(config, "load").mockReturnValue(response);
      getAccountType.mockReturnValue(accountType);
      getIsIslamicBanking.mockReturnValue(isIslamicBanking);
      cloneDeep.mockReturnValue(signatory);

      await runSaga(
        { dispatch: action => dispatched.push(action), getState: () => state },
        receiveAppConfigSaga
      );

      expect(spy.mock.calls[0]).toEqual([null]);
      expect(dispatched).toEqual([
        saveSignatoryModel(signatory),
        receiveAppConfigSuccess(newConfig),
        sendProspectToAPISuccess()
      ]);
    });
    it("call returns empty prospect", async () => {
      const accountType = "some account type";
      const response = {
        data: {}
      };

      const spy = jest.spyOn(config, "load").mockReturnValue(response);
      getAccountType.mockReturnValue(accountType);

      await runSaga(
        { dispatch: action => dispatched.push(action), getState: () => state },
        receiveAppConfigSaga
      );

      expect(spy.mock.calls[0]).toEqual([accountType]);
      expect(dispatched).toEqual([receiveAppConfigSuccess({}), sendProspectToAPISuccess()]);
    });
    it("should throw error", async () => {
      const accountType = "some account type";
      const error = "some error";

      const spy = jest.spyOn(config, "load").mockImplementation(() => {
        throw error;
      });
      getAccountType.mockReturnValue(accountType);

      await runSaga(
        { dispatch: action => dispatched.push(action), getState: () => state },
        receiveAppConfigSaga
      );

      expect(spy.mock.calls[0]).toEqual([accountType]);
      expect(dispatched).toEqual([receiveAppConfigFail(error)]);
    });
  });

  it("should handle updateProspectSaga", async () => {
    const prospect = { some: "field" };
    const state = { appConfig: { prospect } };
    const action = { payload: { "prospect.another": "field" } };
    const newConfig = {
      prospect: {
        some: "field",
        another: "field"
      }
    };

    getProspect.mockReturnValue(prospect);
    cloneDeep.mockReturnValue(prospect);

    await runSaga(
      { dispatch: action => dispatched.push(action), getState: () => state },
      updateProspectSaga,
      action
    ).toPromise();

    expect(getProspect.mock.calls[0]).toEqual([state]);
    expect(cloneDeep.mock.calls[0]).toEqual([prospect]);
    expect(dispatched).toEqual([setConfig(newConfig)]);
  });

  describe("should handle updateViewIdSaga", () => {
    const viewId = "some viewId";

    it("without sentToApi action", async () => {
      const isSendToApi = false;
      const action = { payload: { viewId, isSendToApi } };

      await runSaga({ dispatch: action => dispatched.push(action) }, updateViewIdSaga, action);

      expect(dispatched).toEqual([updateProspect({ "prospect.applicationInfo.viewId": viewId })]);
    });

    it("with sendToApi action", async () => {
      const isSendToApi = true;
      const action = { payload: { viewId, isSendToApi } };

      await runSaga({ dispatch: action => dispatched.push(action) }, updateViewIdSaga, action);

      expect(dispatched).toEqual([
        updateProspect({ "prospect.applicationInfo.viewId": viewId }),
        sendProspectToAPI(CONTINUE)
      ]);
    });
  });
});

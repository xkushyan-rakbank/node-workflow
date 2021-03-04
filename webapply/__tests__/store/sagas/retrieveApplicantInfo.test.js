import { runSaga } from "redux-saga";

import retrieveApplicantSaga, {
  getProspectIdInfo,
  retrieveApplicantInfoSaga
} from "../../../src/store/sagas/retrieveApplicantInfo";
import { SET_CONFIG, LOAD_META_DATA, UPDATE_PROSPECT } from "../../../src/store/actions/appConfig";
import { UPDATE_STAKEHOLDERS_IDS } from "../../../src/store/actions/stakeholders";
import {
  RETRIEVE_APPLICANT_INFO,
  GET_PROSPECT_INFO_REQUEST,
  RETRIEVE_APPLICANT_INFO_SUCCESS,
  GET_PROSPECT_INFO_FAIL,
  GET_PROSPECT_INFO_SUCCESS
} from "../../../src/store/actions/retrieveApplicantInfo";
import {
  getAuthorizationHeader,
  getSignatoryModel,
  getProspect
} from "../../../src/store/selectors/appConfig";
import { search, prospect } from "../../../src/api/apiClient";
import { log } from "../../../src/utils/loggger";
import { VIEW_IDS } from "../../../src/constants";

jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/utils/loggger");

describe("searchProspect saga test", () => {
  let dispatched = [];
  const header = "some headers";
  const model = {
    addressInfo: [
      {
        typeOfAddress: "RESIDENCE",
        addressDetails: []
      },
      {
        typeOfAddress: "OFFICE",
        addressDetails: []
      },
      {
        typeOfAddress: "Home",
        addressDetails: []
      }
    ]
  };
  const state = "some state";
  const failed_outside_prospect_values = {
    "organizationInfo.isSameAsRegisteredAddress": false,
    "organizationInfo.preferredMailingAddrs": "",
    "signatoryInfo[0].signoPreferredMailingAddrs": ""
  };
  const inputParam = {
    applicantName: "",
    countryCode: "",
    mobileNo: "",
    leadNumber: "",
    tradeLicenseNo: "",
    email: "",
    eidNumber: ""
  };
  const prospectId = "some prospect id";
  const getProspectInfoPayload = {
    prospectId
  };
  const retrieveApplicantInfoPayload = {
    fullName: "",
    mobileNo: "",
    countryCode: "",
    leadNumber: "",
    tradeLicenseNo: "",
    email: ""
  };
  const data = {
    freeFieldsInfo: {
      freeField5: JSON.stringify({
        completedSteps: [{ flowId: "companyStakeholder_1" }, { flowId: "companyStakeholder_2" }]
      })
    },
    signatoryInfo: [],
    applicationInfo: { viewId: VIEW_IDS.StakeholdersInfo },
    organizationInfo: { addressInfo: [] }
  };
  const configProspectData = {
    organizationInfo: {
      addressInfo: [
        {
          typeOfAddress: "Registered",
          officeAddressDifferent: "No",
          addressDetails: []
        },
        {
          typeOfAddress: "OFFICE",
          officeAddressDifferent: "No",
          addressDetails: []
        }
      ]
    }
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
    getSignatoryModel.mockReturnValue(model);
    getProspect.mockReturnValue(configProspectData);
    log.mockReturnValue(null);
  });

  it("should handle retrieveApplicant saga", () => {
    const gen = retrieveApplicantSaga().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(RETRIEVE_APPLICANT_INFO);
    expect(gen.payload[1].payload.args[0]).toEqual(GET_PROSPECT_INFO_REQUEST);
  });

  it("should retrieve applicant info", async () => {
    const spy = jest.spyOn(search, "searchApplication").mockReturnValue({ data: {} });

    await runSaga(store, retrieveApplicantInfoSaga, {
      payload: retrieveApplicantInfoPayload
    }).toPromise();

    expect(spy.mock.calls[0]).toEqual([inputParam, header]);
    expect(dispatched).toEqual([{ type: RETRIEVE_APPLICANT_INFO_SUCCESS, payload: {} }]);
  });

  it("should log error when search applicant info request is failed", async () => {
    const spy = jest.spyOn(search, "searchApplication").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, retrieveApplicantInfoSaga, {
      payload: retrieveApplicantInfoPayload
    }).toPromise();

    expect(log.mock.calls[0]).toEqual([error]);
    spy.mockRestore();
  });

  it("should log prospect id info saga errors", async () => {
    const spy = jest.spyOn(prospect, "get").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, getProspectIdInfo, { payload: getProspectInfoPayload }).toPromise();

    expect(log.mock.calls[0]).toEqual([error]);
    expect(dispatched).toEqual([{ type: GET_PROSPECT_INFO_FAIL, error: undefined }]);
    spy.mockRestore();
  });

  it("should log prospect id info saga ", async () => {
    const spy = jest.spyOn(prospect, "get").mockReturnValue({ data });

    await runSaga(store, getProspectIdInfo, { payload: getProspectInfoPayload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectId, header]);
    expect(dispatched).toMatchObject([
      {
        type: UPDATE_PROSPECT,
        payload: failed_outside_prospect_values
      },
      { type: SET_CONFIG, payload: { prospect: data } },
      { type: LOAD_META_DATA, payload: data.freeFieldsInfo.freeField5 },
      { type: LOAD_META_DATA, payload: data.freeFieldsInfo.freeField5 },
      {
        type: UPDATE_STAKEHOLDERS_IDS,
        payload: ["1", "2"]
      },
      {
        type: GET_PROSPECT_INFO_SUCCESS,
        payload: { prospect: { ...data, signatoryInfo: [model] } }
      }
    ]);
    spy.mockRestore();
  });

  it("should log prospect id info saga with initial completed steps ", async () => {
    const failedData = {
      freeFieldsInfo: {
        freeField5: JSON.stringify({
          completedSteps: []
        })
      },
      signatoryInfo: [],
      applicationInfo: { viewId: VIEW_IDS.StakeholdersInfo },
      organizationInfo: { addressInfo: [] }
    };

    const spy = jest.spyOn(prospect, "get").mockReturnValue({ data: failedData });

    await runSaga(store, getProspectIdInfo, { payload: getProspectInfoPayload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectId, header]);
    expect(dispatched).toMatchObject([
      {
        type: UPDATE_PROSPECT,
        payload: failed_outside_prospect_values
      },
      { type: SET_CONFIG, payload: { prospect: failedData } },
      { type: LOAD_META_DATA, payload: failedData.freeFieldsInfo.freeField5 },
      { type: LOAD_META_DATA, payload: failedData.freeFieldsInfo.freeField5 },
      { type: UPDATE_STAKEHOLDERS_IDS, payload: [] },
      {
        type: GET_PROSPECT_INFO_SUCCESS,
        payload: { prospect: { ...failedData, signatoryInfo: [model] } }
      }
    ]);
    spy.mockRestore();
  });

  it("should load values to ouside of prospect to select Residential Address", async () => {
    const failedData = {
      freeFieldsInfo: {
        freeField5: JSON.stringify({
          completedSteps: []
        })
      },
      signatoryInfo: [
        {
          addressInfo: [
            { addressDetails: [{ preferredAddress: "Yes" }] },
            { addressDetails: [{ preferredAddress: "No" }] }
          ]
        }
      ],
      organizationInfo: {
        addressInfo: [
          { officeAddressDifferent: "Yes", addressDetails: [{ preferredAddress: "Yes" }] },
          { officeAddressDifferent: "No", addressDetails: [{ preferredAddress: "No" }] }
        ]
      },
      applicationInfo: { viewId: VIEW_IDS.StakeholdersInfo }
    };

    const spy = jest.spyOn(prospect, "get").mockReturnValue({ data: failedData });

    await runSaga(store, getProspectIdInfo, { payload: getProspectInfoPayload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectId, header]);
    expect(dispatched[0]).toMatchObject({
      type: UPDATE_PROSPECT,
      payload: {
        "organizationInfo.isSameAsRegisteredAddress": true,
        "organizationInfo.preferredMailingAddrs": true,
        "signatoryInfo[0].signoPreferredMailingAddrs": true
      }
    });
    spy.mockRestore();
  });

  it("should load values to ouside of prospect to select Office Address", async () => {
    const failedData = {
      freeFieldsInfo: {
        freeField5: JSON.stringify({
          completedSteps: []
        })
      },
      signatoryInfo: [
        {
          addressInfo: [
            { addressDetails: [{ preferredAddress: "No" }] },
            { addressDetails: [{ preferredAddress: "Yes" }] }
          ]
        }
      ],
      organizationInfo: {
        addressInfo: [
          { officeAddressDifferent: "Yes", addressDetails: [{ preferredAddress: "No" }] },
          { officeAddressDifferent: "No", addressDetails: [{ preferredAddress: "Yes" }] }
        ]
      },
      applicationInfo: { viewId: VIEW_IDS.StakeholdersInfo }
    };

    const spy = jest.spyOn(prospect, "get").mockReturnValue({ data: failedData });

    await runSaga(store, getProspectIdInfo, { payload: getProspectInfoPayload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectId, header]);
    expect(dispatched[0]).toMatchObject({
      type: UPDATE_PROSPECT,
      payload: {
        "organizationInfo.isSameAsRegisteredAddress": true,
        "organizationInfo.preferredMailingAddrs": false,
        "signatoryInfo[0].signoPreferredMailingAddrs": false
      }
    });
    spy.mockRestore();
  });

  it("should load values to ouside of prospect to select Office Address", async () => {
    const failedData = {
      freeFieldsInfo: {
        freeField5: JSON.stringify({
          completedSteps: []
        })
      },
      signatoryInfo: [
        {
          addressInfo: [
            { addressDetails: [{ preferredAddress: "" }] },
            { addressDetails: [{ preferredAddress: "" }] }
          ]
        }
      ],
      organizationInfo: {
        addressInfo: [
          { officeAddressDifferent: "Yes", addressDetails: [{ preferredAddress: "" }] },
          { officeAddressDifferent: "No", addressDetails: [{ preferredAddress: "" }] }
        ]
      },
      applicationInfo: { viewId: VIEW_IDS.StakeholdersInfo }
    };

    const spy = jest.spyOn(prospect, "get").mockReturnValue({ data: failedData });

    await runSaga(store, getProspectIdInfo, { payload: getProspectInfoPayload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectId, header]);
    expect(dispatched[0]).toMatchObject({
      type: UPDATE_PROSPECT,
      payload: {
        "organizationInfo.isSameAsRegisteredAddress": true,
        "organizationInfo.preferredMailingAddrs": "",
        "signatoryInfo[0].signoPreferredMailingAddrs": ""
      }
    });
    spy.mockRestore();
  });

  it("should log info saga errors with JSON", async () => {
    const failedData = {
      freeFieldsInfo: { freeField5: {} },
      signatoryInfo: [],
      applicationInfo: { viewId: VIEW_IDS.StakeholdersInfo },
      organizationInfo: { addressInfo: [] }
    };
    const spy = jest.spyOn(prospect, "get").mockReturnValue({ data: failedData });
    log.mockReturnValue(error);

    await runSaga(store, getProspectIdInfo, { payload: getProspectInfoPayload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectId, header]);
    expect(log).toBeCalled();
    expect(dispatched).toEqual([
      {
        type: UPDATE_PROSPECT,
        payload: failed_outside_prospect_values
      },
      { type: SET_CONFIG, payload: { prospect: failedData } },
      { type: LOAD_META_DATA, payload: {} },
      {
        type: GET_PROSPECT_INFO_SUCCESS,
        payload: { prospect: { ...failedData, signatoryInfo: [model] } }
      }
    ]);
    spy.mockRestore();
  });

  it("should log error when freeFieldsInfo is undefined and signatory info length is true", async () => {
    const failedData = {
      freeFieldsInfo: "",
      signatoryInfo: [{}],
      applicationInfo: { viewId: VIEW_IDS.StakeholdersInfo },
      organizationInfo: { addressInfo: [] }
    };
    const spy = jest.spyOn(prospect, "get").mockReturnValue({ data: failedData });

    await runSaga(store, getProspectIdInfo, { payload: getProspectInfoPayload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectId, header]);
    expect(dispatched).toMatchObject([
      {
        type: UPDATE_PROSPECT,
        payload: failed_outside_prospect_values
      },
      { type: SET_CONFIG, payload: { prospect: failedData } },
      { type: GET_PROSPECT_INFO_SUCCESS, payload: { prospect: failedData } }
    ]);
    spy.mockRestore();
  });

  it("should log error when freeField5 is undefined", async () => {
    const failedData = {
      freeFieldsInfo: "info",
      signatoryInfo: [{}],
      organizationInfo: { addressInfo: [] }
    };
    const spy = jest.spyOn(prospect, "get").mockReturnValue({ data: failedData });

    await runSaga(store, getProspectIdInfo, { payload: getProspectInfoPayload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectId, header]);
    expect(dispatched).toMatchObject([
      {
        type: UPDATE_PROSPECT,
        payload: failed_outside_prospect_values
      },
      { type: SET_CONFIG, payload: { prospect: failedData } },
      { type: LOAD_META_DATA, payload: "" },
      { type: GET_PROSPECT_INFO_SUCCESS, payload: { prospect: failedData } }
    ]);
    spy.mockRestore();
  });
});

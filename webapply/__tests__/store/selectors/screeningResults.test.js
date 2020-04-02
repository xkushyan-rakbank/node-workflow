import {
  getCompanyChecks,
  getOrganizationScreeningResults,
  getProspectRiskScore
} from "../../../src/store/selectors/screeningResults";
import {
  getOverviewApplicationInfo,
  getOverviewOrganizationInfo
} from "../../../src/store/selectors/searchProspect";

jest.mock("../../../src/store/selectors/searchProspect");
jest.mock("../../../src/constants", () => ({
  COMPANY_CHECK_NAMES: [
    {
      screeningType: "Dedupe Check",
      screeningStatus: "Not completed"
    }
  ]
}));

describe("screeningResults test", () => {
  const screeningResults = {
    screeningType: "Dedupe Check",
    screeningStatus: "Completed"
  };
  const riskScore = 1;
  const state = {
    searchProspect: {
      prospectOverview: {
        applicationInfo: { riskScore },
        organizationInfo: { screeningInfo: { screeningResults: [screeningResults] } }
      }
    }
  };

  it("should return screeningResults value", () => {
    getOverviewOrganizationInfo.mockReturnValue({
      screeningInfo: { screeningResults: [screeningResults] }
    });
    expect(getOrganizationScreeningResults(state)).toEqual([screeningResults]);
  });

  it("should return empty array when screeningResults is not set", () => {
    getOverviewOrganizationInfo.mockReturnValue({ screeningInfo: {} });
    expect(getOrganizationScreeningResults(state)).toEqual([]);
  });

  it("should return riskScore value", () => {
    getOverviewApplicationInfo.mockReturnValue({ riskScore });
    expect(getProspectRiskScore(state)).toBe(1);
  });

  it("should get default companyChecks value when screeningResults and riskScore are not set", () => {
    getOverviewApplicationInfo.mockReturnValue({ riskScore: 0 });
    getOverviewOrganizationInfo.mockReturnValue({ screeningInfo: {} });
    expect(
      getCompanyChecks({
        searchProspect: {
          prospectOverview: {
            applicationInfo: {},
            organizationInfo: { screeningInfo: {} }
          }
        }
      })
    ).toEqual([
      { screeningType: "Dedupe Check", screeningStatus: "Not completed" },
      {
        screeningReason: "Null",
        screeningStatus: "Incomplete"
      }
    ]);
  });

  it("should return companyChecks", () => {
    getOverviewApplicationInfo.mockReturnValue({ riskScore });
    getOverviewOrganizationInfo.mockReturnValue({
      screeningInfo: { screeningResults: [screeningResults] }
    });

    expect(getCompanyChecks(state)).toEqual([
      { ...screeningResults },
      { screeningReason: 1, screeningStatus: "Completed" }
    ]);
  });
});

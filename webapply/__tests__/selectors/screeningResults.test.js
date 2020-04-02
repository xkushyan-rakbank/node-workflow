import {
  getCompanyChecks,
  getOrganizationScreeningResults,
  getProspectRiskScore
} from "../../src/store/selectors/screeningResults";
import {
  BLACKLIST_CHECK,
  COUNTRYOFINCORPORATION_CHECK,
  ISSHAREHOLDERACOMPANY_CHECK,
  VIRTUAL_CURRENCY_CHECK,
  NEGATIVE_LIST_CHECK,
  RAKSTARTER_ACCOUNT_CHECK,
  TOO_MANY_STAKEHOLDERS,
  RISK_RATING,
  COMPANY_CHECK_NAMES
} from "../../src/constants";

describe("screeningResults test", () => {
  const dedup = {
    screeningType: "Dedupe Check",
    screeningStatus: "Completed",
    screeningLabel: "Dedupe",
    screeningReason: "Match"
  };
  const company_check_name = [
    { ...dedup },
    { ...BLACKLIST_CHECK },
    { ...NEGATIVE_LIST_CHECK },
    { ...COUNTRYOFINCORPORATION_CHECK },
    { ...VIRTUAL_CURRENCY_CHECK },
    { ...RAKSTARTER_ACCOUNT_CHECK },
    { ...ISSHAREHOLDERACOMPANY_CHECK },
    { ...TOO_MANY_STAKEHOLDERS },
    { ...RISK_RATING, screeningStatus: "Completed", screeningReason: 1 }
  ];

  const state = {
    searchProspect: {
      prospectOverview: {
        applicationInfo: { riskScore: 1 },
        organizationInfo: {
          screeningInfo: {
            screeningResults: [dedup]
          }
        }
      }
    }
  };

  it("should return screeningResults value", () => {
    expect(getOrganizationScreeningResults(state)).toEqual([dedup]);
  });

  it("should return empty array when screeningResults is not set", () => {
    expect(
      getOrganizationScreeningResults({
        searchProspect: { prospectOverview: { organizationInfo: { screeningInfo: {} } } }
      })
    ).toEqual([]);
  });

  it("should return riskScore value", () => {
    expect(getProspectRiskScore(state)).toBe(1);
  });

  it("should return default company checks array when screeningResults and riskScore are not set", () => {
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
      ...COMPANY_CHECK_NAMES,
      { ...RISK_RATING, screeningStatus: "Incomplete", screeningReason: "Null" }
    ]);
  });

  it("should return company checks array", () => {
    expect(getCompanyChecks(state)).toEqual(company_check_name);
  });
});

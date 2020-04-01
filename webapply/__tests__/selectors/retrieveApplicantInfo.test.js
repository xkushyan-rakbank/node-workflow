import {
  getApplicantInfo,
  getApplicantProspectInfo
} from "../../src/store/selectors/retrieveApplicantInfo";

describe("retrieveApplicantInfo test", () => {
  const searchResult = "some search result";
  const prospectResults = "some prospectResults";
  const state = { retrieveApplicantInfo: { searchResults: { searchResult }, prospectResults } };

  it("should return searchResult", () => {
    expect(getApplicantInfo(state)).toBe(searchResult);
  });

  it("should return empty object when searchResult is not set", () => {
    expect(getApplicantInfo({ retrieveApplicantInfo: { searchResults: {} } })).toEqual({});
  });

  it("should return prospectResults", () => {
    expect(getApplicantProspectInfo(state)).toBe(prospectResults);
  });
});

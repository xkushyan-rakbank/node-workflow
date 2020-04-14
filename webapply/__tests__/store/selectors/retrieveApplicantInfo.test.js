import {
  getApplicantInfo,
  getApplicantProspectInfo,
  getLoadingProspectId
} from "../../../src/store/selectors/retrieveApplicantInfo";

describe("retrieveApplicantInfo test", () => {
  const searchResult = "some search result";
  const loadingProspectId = "some prospect id";
  const prospectResults = "some results";
  const state = {
    retrieveApplicantInfo: { searchResults: { searchResult }, prospectResults, loadingProspectId }
  };

  it("should return searchResult", () => {
    expect(getApplicantInfo(state)).toBe(searchResult);
  });

  it("should return loadingProspectId", () => {
    expect(getLoadingProspectId(state)).toBe(loadingProspectId);
  });

  it("should return empty object when searchResult is not set", () => {
    expect(getApplicantInfo({ retrieveApplicantInfo: { searchResults: {} } })).toEqual({});
  });

  it("should return prospectResults", () => {
    expect(getApplicantProspectInfo(state)).toBe(prospectResults);
  });
});

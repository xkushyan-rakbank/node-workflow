import {
  getOverviewSignatories,
  getOverviewApplicationInfo,
  getErrorCode,
  getIsEditableStatusSearchInfo,
  getIsLoadingSearchProspects,
  getOverviewDocuments,
  getOverviewOrganizationInfo,
  getProspectOverview,
  getProspectOverviewId,
  getProspectStatus,
  getSearchResultById,
  getSearchResults,
  getSearchResultsStatuses,
  getViewIdOfSearchResultById
} from "../../../src/store/selectors/searchProspect";
import { getProspectId } from "../../../src/store/selectors/appConfig";

jest.mock("../../../src/store/selectors/appConfig");

describe("searchProspect test", () => {
  const prospectId = "123";
  const statusText = "proceed";
  const status = { statusNotes: statusText };
  const viewId = "some view id value";
  const searchResults = { prospectId, status, applicationInfo: { viewId } };
  const documents = "some documents value";
  const signatoryInfo = "some signatoryInfo value";
  const organizationInfo = "some organizationInfo value";
  const applicationInfo = "some applicationInfo value";
  const isApplyEditApplication = true;
  const isSearchLoading = true;
  const generalInfo = { prospectId };
  const errorCode = "some error code";
  const prospectOverview = {
    documents,
    signatoryInfo,
    organizationInfo,
    applicationInfo,
    generalInfo
  };
  const state = {
    appConfig: { prospect: { generalInfo: { prospectId } } },
    searchProspect: {
      errorCode,
      searchResults: [searchResults],
      isApplyEditApplication,
      isSearchLoading,
      prospectOverview
    }
  };

  it("should return searchResults", () => {
    expect(getSearchResults(state)).toEqual([searchResults]);
  });

  it("should return prospectOverview", () => {
    expect(getProspectOverview(state)).toEqual(prospectOverview);
  });

  it("should return prospectId", () => {
    expect(getProspectOverviewId(state)).toEqual(prospectId);
  });

  it("should return documents", () => {
    expect(getOverviewDocuments(state)).toBe(documents);
  });

  it("should return empty array when signatoryInfo is not set", () => {
    expect(getOverviewSignatories({ searchProspect: { prospectOverview: {} } })).toEqual([]);
  });

  it("should return signatoryInfo", () => {
    expect(getOverviewSignatories(state)).toBe(signatoryInfo);
  });

  it("should return empty array when organizationInfo is not set", () => {
    expect(getOverviewOrganizationInfo({ searchProspect: { prospectOverview: {} } })).toEqual([]);
  });

  it("should return organizationInfo", () => {
    expect(getOverviewOrganizationInfo(state)).toBe(organizationInfo);
  });

  it("should return empty object when applicationInfo is not set", () => {
    expect(getOverviewApplicationInfo({ searchProspect: { prospectOverview: {} } })).toEqual({});
  });

  it("should return applicationInfo", () => {
    expect(getOverviewApplicationInfo(state)).toBe(applicationInfo);
  });

  it("should return isApplyEditApplication", () => {
    expect(getIsEditableStatusSearchInfo(state)).toBe(isApplyEditApplication);
  });

  it("should return isSearchLoading", () => {
    expect(getIsLoadingSearchProspects(state)).toBe(isSearchLoading);
  });

  it("should return empty object when search result is not set", () => {
    getProspectId.mockReturnValue(undefined);
    expect(getSearchResultById({ searchProspect: {} })).toMatchObject({});
  });

  it("should return searchResult by id", () => {
    getProspectId.mockReturnValue(prospectId);
    expect(getSearchResultById(state)).toEqual(searchResults);
  });

  it("should add prospectId and status to searchResult object", () => {
    expect(getSearchResultsStatuses(state)).toEqual([
      {
        prospectId,
        status: statusText
      }
    ]);
  });

  it("should return viewId", () => {
    expect(getViewIdOfSearchResultById(state)).toBe(viewId);
  });

  it("should return statusNotes", () => {
    expect(getProspectStatus(state)).toBe(statusText);
  });

  it("should return errorCode", () => {
    expect(getErrorCode(state)).toBe(errorCode);
  });
});

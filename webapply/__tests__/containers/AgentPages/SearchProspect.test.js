import React from "react";
import { act, render } from "@testing-library/react";

import { SearchProspectPage } from "../../../src/containers/AgentPages/SearchProspect/SearchProspectPage";
import { SearchProspect } from "../../../src/containers/AgentPages/SearchProspect/components/SearchProspect/SearchProspect";

jest.mock(
  "../../../src/containers/AgentPages/SearchProspect/components/SearchProspect/SearchProspect",
  () => ({ SearchProspect: jest.fn().mockImplementation(() => null) })
);

describe("SearchProspect test", () => {
  const searchApplications = jest.fn();
  const resetProspect = jest.fn();
  const searchResults = "some resutls";
  const values = "some values";
  const isLoading = "some boolean";
  const props = { isLoading, searchResults, resetProspect, searchApplications };

  beforeEach(() => {
    jest.clearAllMocks();
    render(<SearchProspectPage {...props} />);
  });

  it("should pass all props", () => {
    expect(SearchProspect).toHaveBeenCalledTimes(1);
    expect(SearchProspect.mock.calls[0][0]).toMatchObject({
      searchResults,
      isLoading,
      isSearchLaunched: false
    });
  });

  it("should call resetProspect on mount", () => {
    expect(SearchProspect).toHaveBeenCalledTimes(1);
    expect(resetProspect).toBeCalled();
  });

  it("should call searchApplications with values", () => {
    expect(SearchProspect).toHaveBeenCalledTimes(1);

    act(() => {
      SearchProspect.mock.calls[0][0].onSearch(values);
    });

    expect(searchApplications).toBeCalledWith(values);
  });

  it("should change isSearchLaunched to true when search was started", () => {
    expect(SearchProspect).toHaveBeenCalledTimes(1);

    act(() => {
      SearchProspect.mock.calls[0][0].onSearch(values);
    });

    expect(SearchProspect.mock.calls[1][0].isSearchLaunched).toEqual(true);
  });
});

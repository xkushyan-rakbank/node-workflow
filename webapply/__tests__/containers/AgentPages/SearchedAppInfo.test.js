import React from "react";
import { act, render } from "@testing-library/react";
import { useFormNavigation } from "../../../src/components/FormNavigation/FormNavigationProvider";
import { useDisplayScreenBasedOnViewId } from "../../../src/utils/useDisplayScreenBasedOnViewId";
import { SearchedAppInfoContainer } from "../../../src/containers/AgentPages/SearchedAppInfo/SearchedAppInfo";
import { SearchedAppInfoComponent } from "../../../src/containers/AgentPages/SearchedAppInfo/components/SearchedAppInfo";
import { searchProspectStepper } from "../../../src/constants";

jest.mock("../../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../../src/containers/AgentPages/SearchedAppInfo/components/SearchedAppInfo", () => {
  return { SearchedAppInfoComponent: jest.fn().mockImplementation(() => null) };
});
jest.mock("../../../src/utils/useDisplayScreenBasedOnViewId");

describe("SearchedAppInfoContainer test", () => {
  const pushDisplayScreenToHistory = jest.fn();
  const params = { id: "some id" }
  const match = { params };
  const searchResults = [];
  const isDisplayConfirmDialog = "some boolean";
  const getProspectOverview = jest.fn();
  const setIsDisplayConfirmDialog = jest.fn();
  const prospectOverview = "some prospectOverview value";
  const getProspectInfo = jest.fn().mockImplementation(() => Promise.resolve());
  const updateProspectId = jest.fn();
  const resetProspect = jest.fn();
  const props = {
    isDisplayConfirmDialog,
    setIsDisplayConfirmDialog,
    pushDisplayScreenToHistory,
    match,
    searchResults,
    getProspectOverview,
    prospectOverview,
    getProspectInfo,
    updateProspectId,
    resetProspect
  };

  beforeEach(() => {
    useFormNavigation.mockImplementation(() => {});
    useDisplayScreenBasedOnViewId.mockReturnValue({ pushDisplayScreenToHistory });

    jest.clearAllMocks();

  });

  it("should call useFormNavigation", () => {
    render(<SearchedAppInfoContainer {...props} />);

    expect(useFormNavigation).toBeCalledWith([false, false, searchProspectStepper]);
  });

  it("should run redirectUserPage ", () => {
    render(<SearchedAppInfoContainer {...props} />);

    act(() => {
      SearchedAppInfoComponent.mock.calls[0][0].redirectUserPage();
    });

    expect(SearchedAppInfoComponent.mock.calls[0][0].isDisplayConfirmDialog).toBe(true);
  });

  it("should pass all props", () => {
    render(<SearchedAppInfoContainer {...props} />);

    expect(SearchedAppInfoComponent).toHaveBeenCalledTimes(1);
    expect(SearchedAppInfoComponent.mock.calls[0][0]).toMatchObject({
      isDisplayConfirmDialog: false,
      step: 1,
      isDisabled: false
    });
  });

  it("should run confirmDialogHandler ", () => {
    render(<SearchedAppInfoContainer {...props} />);

    act(() => {
      SearchedAppInfoComponent.mock.calls[0][0].confirmDialogHandler();
    });

    expect(SearchedAppInfoComponent.mock.calls[0][0].isDisplayConfirmDialog).toBe(false);
  });
  //
  // it("should run confirmHandler when getProspectInfo is called (resolved)", async () => {
  //   render(<SearchedAppInfoContainer {...props} />);
  //
  //   await act(async () => {
  //     await SearchedAppInfoComponent.mock.calls[0][0].confirmHandler();
  //   });
  //   expect(updateProspectId).toHaveBeenCalledWith(match.params.id);
  //   expect(getProspectInfo).toHaveBeenCalled();
  //   expect(pushDisplayScreenToHistory).toHaveBeenCalledWith(prospectOverview);
  // });
  //
  // it("should run confirmHandler when getProspectInfo is called (reject)", async () => {
  //   render(<SearchedAppInfoContainer {...props} />);
  //
  //   const getProspectInfo = jest.fn().mockImplementation(() => Promise.reject());
  //   render(<SearchedAppInfoContainer {...props} getProspectInfo={getProspectInfo} />);
  //
  //   await act(async () => {
  //     await SearchedAppInfoComponent.mock.calls[0][0].confirmHandler();
  //   });
  //   expect(updateProspectId).toHaveBeenCalledWith(match.params.id);
  // });
  //
  // it("should resetProspect", () => {
  //   render(<SearchedAppInfoContainer {...props} />);
  //
  //   expect(resetProspect).toHaveBeenCalled();
  //   expect(getProspectOverview).toHaveBeenCalledWith(match.params.id);
  // });
});

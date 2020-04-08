import React from "react";
import { useDispatch } from "react-redux";
import { render, act } from "@testing-library/react";

import { MyApplications } from "../../src/containers/MyApplications/MyApplications";
import { MyApplications as MyApplicationsComponent } from "../../src/containers/MyApplications/components/MyApplications";
import { getApplicantInfo } from "../../src/store/selectors/appConfig";
import { searchApplications } from "../../src/store/actions/searchProspect";
import { getProspectInfoPromisify } from "../../src/store/actions/retrieveApplicantInfo";
import { useDisplayScreenBasedOnViewId } from "../../src/utils/useDisplayScreenBasedOnViewId";

jest.mock("../../src/store/selectors/appConfig");
jest.mock("../../src/utils/useDisplayScreenBasedOnViewId");
jest.mock("../../src/store/actions/searchProspect");
jest.mock("../../src/store/actions/retrieveApplicantInfo");
jest.mock("../../src/containers/MyApplications/components/MyApplications");

const inputParams = { email: "some_email@g.com" };
const mockPushDisplayScreenToHistory = jest.fn();

jest.mock("react-redux", () => ({
  __esModule: true,
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn(() => () => {}),
  connect: jest.fn(() => () => {})
}));

describe("MyApplications tests", () => {
  beforeEach(() => {
    getApplicantInfo.mockReturnValue(inputParams);
    useDisplayScreenBasedOnViewId.mockReturnValue({
      pushDisplayScreenToHistory: mockPushDisplayScreenToHistory
    });
    MyApplicationsComponent.mockImplementation(() => null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch searchApplications action  on mount", () => {
    render(<MyApplications />);
    expect(searchApplications).toBeCalledWith(inputParams);
  });

  it("should call pushDisplayScreenToHistory with prospectId", async () => {
    const prospectId = "some prospectId";
    const asynсDispatchMock = jest.fn().mockResolvedValue(prospectId);
    useDispatch.mockImplementation(() => asynсDispatchMock);

    render(<MyApplications />);

    await act(() => MyApplicationsComponent.mock.calls[0][0].getProspectInfo(prospectId));
    expect(getProspectInfoPromisify).toBeCalledWith(prospectId);
    expect(mockPushDisplayScreenToHistory).toBeCalledWith(prospectId);
  });
});

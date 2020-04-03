import { renderHook, act } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";

import { useDisplayScreenBasedOnViewId } from "../../src/utils/useDisplayScreenBasedOnViewId";
import routes from "../../src/routes";
import { VIEW_IDS, ACTION_TYPES, PROSPECT_STATUSES } from "../../src/constants";

const mockDefaultApplicationInfo = {
  viewId: VIEW_IDS.ApplicationSubmitted,
  actionType: "",
  retrieveMode: false
};

const mockSubmitApplicationInfo = {
  viewId: VIEW_IDS.SubmitApplication,
  actionType: ACTION_TYPES.submit,
  retrieveMode: true
};
const mockProspectId = 1234;
const mockIsROScreensFalse = false;
const mockIsROScreensTrue = true;
const mockDefaultStatuses = [{ prospectId: mockProspectId, status: PROSPECT_STATUSES.ASSESSING }];
const mockDocumentNeededStatuses = [
  { prospectId: mockProspectId, status: PROSPECT_STATUSES.DOCUMENTS_NEEDED }
];

const prospect = {
  applicationInfo: { ...mockSubmitApplicationInfo, retrieveMode: false },
  generalInfo: { prospectId: mockProspectId }
};

const mockPush = jest.fn();

jest.mock("react-router-dom", () => ({
  __esModule: true,
  useHistory: () => ({ push: mockPush }),
  useLocation: () => ({ pathname: "/SearchedAppInfo" })
}));
jest.mock("react-redux", () => ({
  __esModule: true,
  useSelector: jest.fn()
}));

describe("useDisplayScreenBasedOnViewId ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should take prospect from store if prospect was not provided", () => {
    useSelector
      .mockReturnValueOnce(mockSubmitApplicationInfo)
      .mockReturnValueOnce(mockProspectId)
      .mockReturnValueOnce(mockIsROScreensTrue)
      .mockReturnValueOnce(mockDefaultStatuses);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toHaveBeenCalledWith(routes.companyInfo);
  });

  it("should redirect to company info page when app was sumbitted and RO mode", () => {
    useSelector
      .mockReturnValueOnce(mockSubmitApplicationInfo)
      .mockReturnValueOnce(mockProspectId)
      .mockReturnValueOnce(mockIsROScreensTrue)
      .mockReturnValueOnce(mockDefaultStatuses);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toHaveBeenCalledWith(routes.companyInfo);
  });

  it("should redirect to company info page when viewId is ApplicationSubmitted/ReUploadDocuments and RO mode", () => {
    useSelector
      .mockReturnValueOnce(mockDefaultApplicationInfo)
      .mockReturnValueOnce(mockProspectId)
      .mockReturnValueOnce(mockIsROScreensTrue)
      .mockReturnValueOnce(mockDefaultStatuses);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toHaveBeenCalledWith(routes.companyInfo);
  });

  it("should redirect to reupload documents page when status is Document Needed and RO mode", () => {
    useSelector
      .mockReturnValueOnce(mockDefaultApplicationInfo)
      .mockReturnValueOnce(mockProspectId)
      .mockReturnValueOnce(mockIsROScreensFalse)
      .mockReturnValueOnce(mockDocumentNeededStatuses);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory(prospect);
    });
    expect(mockPush).toHaveBeenCalledWith(routes.reUploadDocuments);
  });

  it("should redirect to reupload documents page when app is submitted, Customer mode and retrive mode enable", () => {
    useSelector
      .mockReturnValueOnce(mockSubmitApplicationInfo)
      .mockReturnValueOnce(mockProspectId)
      .mockReturnValueOnce(mockIsROScreensFalse)
      .mockReturnValueOnce(mockDefaultStatuses);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory(prospect);
    });
    expect(mockPush).toHaveBeenCalledWith(routes.reUploadDocuments);
  });

  it("should redirect to application submitted page when app is submitted, Customer mode and no additional docs needed", () => {
    useSelector
      .mockReturnValueOnce(mockSubmitApplicationInfo)
      .mockReturnValueOnce(mockProspectId)
      .mockReturnValueOnce(mockIsROScreensFalse)
      .mockReturnValueOnce(mockDefaultStatuses);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toHaveBeenCalledWith(routes.ApplicationSubmitted);
  });

  it("should take companyInfo path when no viewId provided", () => {
    useSelector
      .mockReturnValueOnce({ ...mockDefaultApplicationInfo, viewId: "" })
      .mockReturnValueOnce(mockProspectId)
      .mockReturnValueOnce(mockIsROScreensFalse)
      .mockReturnValueOnce(mockDefaultStatuses);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toBeCalled();
  });

  it("should take undefined prospectStatus when it did not find matches with the prospectId", () => {
    useSelector
      .mockReturnValueOnce(mockDefaultApplicationInfo)
      .mockReturnValueOnce(mockProspectId)
      .mockReturnValueOnce(mockIsROScreensFalse)
      .mockReturnValueOnce([{ prospectId: 0 }]);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toBeCalled();
  });
});

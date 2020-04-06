import { renderHook, act } from "@testing-library/react-hooks";

import { useDisplayScreenBasedOnViewId } from "../../src/utils/useDisplayScreenBasedOnViewId";
import routes from "../../src/routes";
import { VIEW_IDS, ACTION_TYPES, PROSPECT_STATUSES } from "../../src/constants";
import { getApplicationInfo, getProspectId } from "../../src/store/selectors/appConfig";
import {
  getIsEditableStatusSearchInfo,
  getSearchResultsStatuses
} from "../../src/store/selectors/searchProspect";

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

jest.mock("../../src/store/selectors/appConfig");
jest.mock("../../src/store/selectors/searchProspect");

jest.mock("react-router-dom", () => ({
  __esModule: true,
  useHistory: () => ({ push: mockPush }),
  useLocation: () => ({ pathname: "/SearchedAppInfo" })
}));

jest.mock("react-redux", () => ({
  __esModule: true,
  useSelector: jest.fn(fn => fn())
}));

describe("useDisplayScreenBasedOnViewId ", () => {
  beforeEach(() => {
    getApplicationInfo.mockReturnValue(mockDefaultApplicationInfo);
    getProspectId.mockReturnValue(mockProspectId);
    getIsEditableStatusSearchInfo.mockReturnValue(mockIsROScreensFalse);
    getSearchResultsStatuses.mockReturnValue(mockDefaultStatuses);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should take prospect from store if prospect was not provided", () => {
    getApplicationInfo.mockReturnValue(mockSubmitApplicationInfo);
    getIsEditableStatusSearchInfo.mockReturnValue(mockIsROScreensTrue);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toBeCalledWith(routes.companyInfo);
  });

  it("should redirect to company info page when app was sumbitted and RO mode", () => {
    getApplicationInfo.mockReturnValue(mockSubmitApplicationInfo);
    getIsEditableStatusSearchInfo.mockReturnValue(mockIsROScreensTrue);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toBeCalledWith(routes.companyInfo);
  });

  it("should redirect to company info page when viewId is ApplicationSubmitted/ReUploadDocuments and RO mode", () => {
    getIsEditableStatusSearchInfo.mockReturnValue(mockIsROScreensTrue);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toBeCalledWith(routes.companyInfo);
  });

  it("should redirect to reupload documents page when status is Document Needed and RO mode", () => {
    getSearchResultsStatuses.mockReturnValue(mockDocumentNeededStatuses);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory(prospect);
    });
    expect(mockPush).toBeCalledWith(routes.reUploadDocuments);
  });

  it("should redirect to reupload documents page when app is submitted, Customer mode and retrive mode enable", () => {
    getApplicationInfo.mockReturnValue(mockSubmitApplicationInfo);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory(prospect);
    });
    expect(mockPush).toBeCalledWith(routes.reUploadDocuments);
  });

  it("should redirect to application submitted page when app is submitted, Customer mode and no additional docs needed", () => {
    getApplicationInfo.mockReturnValue(mockSubmitApplicationInfo);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toBeCalledWith(routes.ApplicationSubmitted);
  });

  it("should redirect to companyInfo page when no viewId was provided", () => {
    getApplicationInfo.mockReturnValue({ ...mockDefaultApplicationInfo, viewId: "" });
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toBeCalledWith(routes.companyInfo);
  });

  it("should redirect to application submitted page when prospectStatus is undefined", () => {
    getSearchResultsStatuses.mockReturnValue([{ prospectId: 0 }]);
    const { result } = renderHook(() => useDisplayScreenBasedOnViewId());
    act(() => {
      result.current.pushDisplayScreenToHistory();
    });
    expect(mockPush).toBeCalledWith(routes.ApplicationSubmitted);
  });
});

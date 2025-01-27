import React from "react";
import { useDispatch } from "react-redux";
import { render, act } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

import { ReUploadDocumentsComponent } from "../../src/containers/ReUploadDocuments/components/ReUploadDocuments/ReUploadDocuments";
import { UploadLimitComponent } from "../../src/containers/UploadDocuments/components/UploadLimit/UploadLimit";
import { ReUploadDocuments } from "../../src/containers/ReUploadDocuments/ReUploadDocuments";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../../src/containers/FormLayout/LayoutProvider";
import { getOtherDocuments, getCompanyDocuments } from "../../src/store/selectors/appConfig";
import { getProgress, getUploadErrors } from "../../src/store/selectors/uploadDocuments";
import { useTrackingHistory } from "../../src/utils/useTrackingHistory";
import { useViewId } from "../../src/utils/useViewId";
import {
  addOtherDocument,
  cancelDocUpload,
  deleteOtherDocument,
  docUpload,
  retrieveDocDetails
} from "../../src/store/actions/uploadDocuments";
import { sendProspectToAPIPromisify } from "../../src/store/actions/sendProspectToAPI";
import { NEXT, SUBMIT, UPLOADED } from "../../src/constants";
import routes from "../../src/routes";

jest.mock("../../src/containers/ReUploadDocuments/components/ReUploadDocuments/ReUploadDocuments");
jest.mock("../../src/containers/UploadDocuments/components/UploadLimit/UploadLimit");
jest.mock("../../src/store/selectors/appConfig");
jest.mock("../../src/store/selectors/uploadDocuments");
jest.mock("../../src/utils/useTrackingHistory");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/containers/FormLayout/LayoutProvider");
jest.mock("../../src/store/actions/uploadDocuments");
jest.mock("../../src/store/actions/sendProspectToAPI");
jest.mock("../../src/utils/useViewId");
jest.mock("react-redux", () => ({
  useSelector: jest.fn().mockImplementation(fn => fn()),
  useDispatch: jest
    .fn()
    .mockImplementation(() => jest.fn())
    .mockReturnValue(fn => fn)
}));

describe("ReUploadDocuments container tests", () => {
  const history = createMemoryHistory();
  const pushHistory = jest.fn();
  const otherDocument = {
    uploadStatus: UPLOADED
  };
  const otherDocuments = [otherDocument];
  const companyDocuments = [{ DocumentUploadCnt: 20, DocumentUplTotalCnt: 0 }];
  const progress = "some progress";
  const uploadErrors = "some errors";

  getOtherDocuments.mockReturnValue(otherDocuments);
  getCompanyDocuments.mockReturnValue(companyDocuments);
  getProgress.mockReturnValue(progress);
  getUploadErrors.mockReturnValue(uploadErrors);
  useTrackingHistory.mockReturnValue(pushHistory);
  ReUploadDocumentsComponent.mockImplementation(() => null);
  UploadLimitComponent.mockImplementation(() => null);
  useFormNavigation.mockImplementation(() => {});
  useViewId.mockImplementation(() => {});
  useLayoutParams.mockImplementation(() => {});

  beforeEach(() => {
    sendProspectToAPIPromisify.mockImplementation(() => Promise.resolve());

    jest.clearAllMocks();
  });

  it("should pass default props", () => {
    render(<ReUploadDocuments />);

    expect(ReUploadDocumentsComponent).toHaveBeenCalledTimes(2);
    expect(ReUploadDocumentsComponent.mock.calls[0][0]).toMatchObject({
      isSubmitButtonActive: true,
      otherDocuments,
      progress,
      uploadErrors
    });
  });

  it("should call `useViewId` hook", () => {
    render(<ReUploadDocuments />);

    expect(useViewId).toHaveBeenCalledWith();
  });

  it("should call `useFormNavigation` hook", () => {
    render(<ReUploadDocuments />);

    expect(useFormNavigation).toHaveBeenCalledWith([true, false]);
  });

  it("should dispatch retrieveDocDetails on mount", () => {
    render(<ReUploadDocuments />);

    expect(retrieveDocDetails).toHaveBeenCalled();
  });

  it("should disable submit button", () => {
    getOtherDocuments.mockReturnValue([]);
    render(<ReUploadDocuments />);

    expect(ReUploadDocumentsComponent).toHaveBeenCalledTimes(2);
    expect(ReUploadDocumentsComponent.mock.calls[0][0]).toMatchObject({
      isSubmitButtonActive: false
    });
  });

  it("should upload document", () => {
    const file = "some file";
    render(<ReUploadDocuments />);

    expect(ReUploadDocumentsComponent).toHaveBeenCalledTimes(2);
    jest.useFakeTimers();
    ReUploadDocumentsComponent.mock.calls[0][0].uploadDocument(file);
    act(() => {
      jest.runAllTimers();
    });
    expect(addOtherDocument).toHaveBeenCalled();
    expect(docUpload).toHaveBeenCalled();
  });

  it("should remove document", () => {
    const documentKey = "some document key";
    render(<ReUploadDocuments />);

    expect(ReUploadDocumentsComponent).toHaveBeenCalledTimes(2);
    ReUploadDocumentsComponent.mock.calls[0][0].removeDocument(documentKey);
    expect(cancelDocUpload).toHaveBeenCalledWith(documentKey);
    expect(deleteOtherDocument).toHaveBeenCalledWith(documentKey);
  });

  it("should submit form successfully", async () => {
    render(<ReUploadDocuments />);

    expect(ReUploadDocumentsComponent).toHaveBeenCalledTimes(2);
    await ReUploadDocumentsComponent.mock.calls[0][0].submitForm();
    expect(sendProspectToAPIPromisify).toHaveBeenCalledWith(NEXT, null, SUBMIT);
    expect(pushHistory).toHaveBeenCalledWith(routes.MyApplications);
  });

  it("should submit form with some error", async () => {
    sendProspectToAPIPromisify.mockImplementation(() => Promise.reject());

    useDispatch.mockReturnValue(fn => fn);
    render(<ReUploadDocuments />);

    expect(ReUploadDocumentsComponent).toHaveBeenCalledTimes(2);
    await ReUploadDocumentsComponent.mock.calls[0][0].submitForm();
    expect(sendProspectToAPIPromisify).toHaveBeenCalledWith(NEXT, null, SUBMIT);
    expect(pushHistory).toHaveBeenCalledTimes(0);
  });

  it("check docUploadLimit > currentUplCnt", () => {
    const companyDocuments = [{ DocumentUploadCnt: 20, DocumentUplTotalCnt: 21 }];
    getCompanyDocuments.mockReturnValue(companyDocuments);
    render(
      <Router history={history}>
        <ReUploadDocuments />
      </Router>
    );
    expect(UploadLimitComponent).toHaveBeenCalled();
  });

  it("check company documents not defined", () => {
    const companyDocuments = [];
    getCompanyDocuments.mockReturnValue(companyDocuments);
    render(
      <Router history={history}>
        <ReUploadDocuments />
      </Router>
    );
    expect(ReUploadDocumentsComponent).toHaveBeenCalled();
  });
});

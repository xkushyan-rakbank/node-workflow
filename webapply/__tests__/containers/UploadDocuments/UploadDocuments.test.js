import React from "react";
import { render, act } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

import { UploadDocuments } from "../../../src/containers/UploadDocuments/UploadDocuments";
import { useFormNavigation } from "../../../src/components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../../../src/containers/FormLayout";
import { UploadDocumentsComponent } from "../../../src/containers/UploadDocuments/components/UploadDocuments/UploadDocuments";
import { useViewId } from "../../../src/utils/useViewId";
import { useTrackingHistory } from "../../../src/utils/useTrackingHistory";
import { formStepper, NEXT } from "../../../src/constants";
import routes from "../../../src/routes";

jest.mock("../../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../../src/store/actions/uploadDocuments");
jest.mock("../../../src/utils/useTrackingHistory");
jest.mock("../../../src/containers/FormLayout");
jest.mock("../../../src/utils/useViewId");
jest.mock(
  "../../../src/containers/UploadDocuments/components/UploadDocuments/UploadDocuments",
  () => ({
    UploadDocumentsComponent: jest.fn().mockImplementation(() => null)
  })
);

describe("UploadDocuments container tests", () => {
  const history = createMemoryHistory();
  const pushHistory = jest.fn();
  const retrieveDocDetails = jest.fn();
  const sendProspectToAPI = jest.fn();
  const companyDocuments = [{ DocumentUploadCnt: 20, DocumentUplTotalCnt: 0 }];
  const stakeholdersDocuments = "some docs";
  const companyName = "some company name";
  const signatories = "some signatories";
  const isRequiredDocsUploaded = true;
  const isLoadingDocuments = true;
  const prospectStatusInfo = "some info";
  const isApplyEditApplication = true;

  const props = {
    companyDocuments,
    stakeholdersDocuments,
    companyName,
    signatories,
    isRequiredDocsUploaded,
    isLoadingDocuments,
    prospectStatusInfo,
    isApplyEditApplication,
    retrieveDocDetails,
    sendProspectToAPI
  };

  useTrackingHistory.mockReturnValue(pushHistory);
  useFormNavigation.mockImplementation(() => {});
  useLayoutParams.mockImplementation(() => {});
  useViewId.mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call `useFormNavigation` hook on mount", () => {
    render(
      <Router history={history}>
        <UploadDocuments {...props} />
      </Router>
    );

    expect(useFormNavigation).toHaveBeenCalledWith([false, true, formStepper]);
  });

  it("should call `useViewId` hook on mount", () => {
    render(
      <Router history={history}>
        <UploadDocuments {...props} />
      </Router>
    );

    expect(useViewId).toHaveBeenCalledWith();
  });

  it("should dispatch `receiveDocDetails` action on mount", () => {
    render(
      <Router history={history}>
        <UploadDocuments {...props} />
      </Router>
    );

    expect(retrieveDocDetails).toHaveBeenCalled();
  });

  it("should pass default props", () => {
    render(
      <Router history={history}>
        <UploadDocuments {...props} />
      </Router>
    );

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(2);
    expect(UploadDocumentsComponent.mock.calls[0][0]).toMatchObject({
      isLoadingDocuments,
      companyDocuments,
      stakeholdersDocuments,
      isDisabledNextStep: false,
      isLoading: false,
      signatories,
      companyName
    });
  });

  it("should handle goToSelectService callback without screening error", async () => {
    sendProspectToAPI.mockImplementation(() => Promise.resolve(false));
    render(
      <Router history={history}>
        <UploadDocuments {...props} />
      </Router>
    );

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(2);
    await act(async () => {
      UploadDocumentsComponent.mock.calls[0][0].goToSelectService();
    });

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(3);
    expect(UploadDocumentsComponent.mock.calls[0][0].isLoading).toBe(false);
    expect(UploadDocumentsComponent.mock.calls[2][0].isLoading).toBe(true);
    expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
    expect(pushHistory).toHaveBeenCalledWith(routes.selectServices, true);
  });

  it("should handle goToSelectService callback with screening error", async () => {
    sendProspectToAPI.mockImplementation(() => Promise.resolve(true));
    render(
      <Router history={history}>
        <UploadDocuments {...props} />
      </Router>
    );

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(2);
    await act(async () => {
      UploadDocumentsComponent.mock.calls[0][0].goToSelectService();
    });

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(3);
    expect(UploadDocumentsComponent.mock.calls[0][0].isLoading).toBe(false);
    expect(UploadDocumentsComponent.mock.calls[2][0].isLoading).toBe(true);
    expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
    expect(pushHistory).toHaveBeenCalledTimes(0);
  });

  it("should handle goToSelectService callback with some error", async () => {
    sendProspectToAPI.mockImplementation(() => Promise.reject(true));
    render(
      <Router history={history}>
        <UploadDocuments {...props} />
      </Router>
    );

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(2);
    await act(async () => {
      UploadDocumentsComponent.mock.calls[0][0].goToSelectService();
    });

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(4);
    expect(UploadDocumentsComponent.mock.calls[0][0].isLoading).toBe(false);
    expect(UploadDocumentsComponent.mock.calls[2][0].isLoading).toBe(true);
    expect(UploadDocumentsComponent.mock.calls[3][0].isLoading).toBe(false);
    expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
    expect(pushHistory).toHaveBeenCalledTimes(0);
  });

  it("should handle company documents count not set condition", async () => {
    const companyDocuments = {};
    props.companyDocuments = companyDocuments;
    render(
      <Router history={history}>
        <UploadDocuments {...props} />
      </Router>
    );

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(1);
  });
  
  it("should handle DocumentUploadCnt && DocumentUplTotalCnt same condition", async () => {
    const companyDocuments = [{ DocumentUploadCnt: 20, DocumentUplTotalCnt: 20 }];
    props.companyDocuments = companyDocuments;
    render(
      <Router history={history}>
        <UploadDocuments {...props} />
      </Router>
    );

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(1);
  });
});

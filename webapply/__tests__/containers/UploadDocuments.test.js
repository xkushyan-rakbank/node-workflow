import React from "react";
import { render, act } from "@testing-library/react";
import { useTrackingHistory } from "../../src/utils/useTrackingHistory";
import { UploadDocuments } from "../../src/containers/UploadDocuments/UploadDocuments";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { formStepper, NEXT } from "../../src/constants";
import { UploadDocumentsComponent } from "../../src/containers/UploadDocuments/components/UploadDocuments/UploadDocuments";
import routes from "../../src/routes";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/store/actions/uploadDocuments");
jest.mock("../../src/utils/useTrackingHistory");
jest.mock(
  "../../src/containers/UploadDocuments/components/UploadDocuments/UploadDocuments",
  () => ({
    UploadDocumentsComponent: jest.fn().mockImplementation(() => null)
  })
);

describe("UploadDocuments container tests", () => {
  const pushHistory = jest.fn();
  const retrieveDocDetails = jest.fn();
  const sendProspectToAPI = jest.fn();
  const companyDocuments = "some docs";
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should useFormNavigation on mount", () => {
    render(<UploadDocuments {...props} />);

    expect(useFormNavigation).toHaveBeenCalledWith([false, true, formStepper]);
  });

  it("should receiveDocDetails on mount", () => {
    render(<UploadDocuments {...props} />);

    expect(retrieveDocDetails).toHaveBeenCalled();
  });

  it("should pass default props", () => {
    render(<UploadDocuments {...props} />);

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(1);
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
    render(<UploadDocuments {...props} />);

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(1);
    await act(async () => {
      UploadDocumentsComponent.mock.calls[0][0].goToSelectService();
    });

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(2);
    expect(UploadDocumentsComponent.mock.calls[0][0].isLoading).toBe(false);
    expect(UploadDocumentsComponent.mock.calls[1][0].isLoading).toBe(true);
    expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
    expect(pushHistory).toHaveBeenCalledWith(routes.selectServices, true);
  });

  it("should handle goToSelectService callback with screening error", async () => {
    sendProspectToAPI.mockImplementation(() => Promise.resolve(true));
    render(<UploadDocuments {...props} />);

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(1);
    await act(async () => {
      UploadDocumentsComponent.mock.calls[0][0].goToSelectService();
    });

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(2);
    expect(UploadDocumentsComponent.mock.calls[0][0].isLoading).toBe(false);
    expect(UploadDocumentsComponent.mock.calls[1][0].isLoading).toBe(true);
    expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
    expect(pushHistory).toHaveBeenCalledTimes(0);
  });

  it("should handle goToSelectService callback with some error", async () => {
    sendProspectToAPI.mockImplementation(() => Promise.reject(true));
    render(<UploadDocuments {...props} />);

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(1);
    await act(async () => {
      UploadDocumentsComponent.mock.calls[0][0].goToSelectService();
    });

    expect(UploadDocumentsComponent).toHaveBeenCalledTimes(3);
    expect(UploadDocumentsComponent.mock.calls[0][0].isLoading).toBe(false);
    expect(UploadDocumentsComponent.mock.calls[1][0].isLoading).toBe(true);
    expect(UploadDocumentsComponent.mock.calls[2][0].isLoading).toBe(false);
    expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
    expect(pushHistory).toHaveBeenCalledTimes(0);
  });
});

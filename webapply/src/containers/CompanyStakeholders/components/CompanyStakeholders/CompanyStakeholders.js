import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { isEmpty } from "lodash";
import { isDesktop } from "react-device-detect";

import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import { FaceRecognition } from "../../../../components/FaceRecognition/FaceRecognition";
import { UploadFileWrapper } from "../../../../components/UploadFileWrapper/UploadFileWrapper";
import StakeholdersDetail from "./StakeholdersDetail";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";
import { getOcrFieldValueBySource, removeEncodingPrefix } from "../../../../utils/ocr";

import { getSdkConfig } from "../../../../store/selectors/sdkConfig";
import { createSdkCofig } from "../../../../store/actions/sdkConfig";
import { getKyc, getTransactionId } from "../../../../store/selectors/kyc";
import {
  analyseOcr,
  createFaceScanKey,
  removeEidOcrData,
  removePassportOcrData,
  setEidPreviewData,
  setPassportPreviewData,
  setEidActionType,
  setPassportActionType,
  analyseOcrAgeRestriction
} from "../../../../store/actions/kyc";

import { useStyles } from "./styled";
import { OCRScanner } from "./OCRScanner";
import { OverlayLoader } from "../../../../components/Loader";
import { AGE_RESTRICTION, DOC_TYPE_EID, DOC_TYPE_PASSPORT } from "../../../../constants";
import { UploadFileModal } from "./UploadFileModal";
import { ScanViaMobile } from "./MobileScan";
import { InfoModal } from "../../../../components/Modals/InfoModal";
import { Footer } from "../../../../components/Footer";

export const CompanyStakeholdersComponent = ({
  fullName,
  companyCategory,
  handleClickNextStep,
  isDisableNextStep,
  isLoading,
  sessionType,
  openInfo,
  handleInfoModalClose,
  getKycStatus
}) => {
  const { sdkConfig } = useSelector(getSdkConfig);

  const {
    loading,
    analysedEidData,
    analysedPassportData,
    error,
    faceScanKey,
    faceLivelinessFeedback,
    confirmEntity,
    kycUploadedDocs,
    actionType,
    confirmEntityError,
    ageRestrictionError,
    loadKYCDocuments
  } = useSelector(getKyc);
  const transactionId = useSelector(getTransactionId);

  const classes = useStyles();
  const [openDocUpload, setOpenDocUpload] = useState(false);
  const [docUploadType, setDocUploadType] = useState(null);

  const dispatch = useDispatch();

  const openDocUploadModal = type => {
    onRemoveOcrData(type);
    setOpenDocUpload(true);
    setDocUploadType(type);
  };

  let modalTitle = "";
  if (docUploadType === DOC_TYPE_EID) {
    modalTitle = isDesktop ? "Let's upload your Emirates ID" : "Upload Emirates ID";
  } else {
    modalTitle = isDesktop ? "Let's upload your passport" : "Upload passport";
  }

  const [openEidScanner, setOpenEidScanner] = useState(false);
  const [openPassportScanner, setOpenPassportScanner] = useState(false);

  useEffect(() => {
    if (transactionId) {
      dispatch(createSdkCofig());
      dispatch(createFaceScanKey());
    }
  }, [transactionId]);

  useEffect(() => {
    if (analysedEidData.age) {
      const age = getOcrFieldValueBySource(analysedEidData?.age, "mrz");
      if (age < 18) {
        dispatch(analyseOcrAgeRestriction(AGE_RESTRICTION));
      }
    }
  }, [analysedEidData]);

  const onScanEid = () => {
    onRemoveOcrData(DOC_TYPE_EID);
    setOpenEidScanner(true);
    dispatch(setEidActionType("Scanned"));
  };

  const onScanPassport = () => {
    onRemoveOcrData(DOC_TYPE_PASSPORT);
    setOpenPassportScanner(true);
    dispatch(setPassportActionType("Scanned"));
  };

  const analyzeData = async data => {
    if (data.images.length == 2) {
      const ocrData = {
        docFront: removeEncodingPrefix(data.images[0]),
        docBack: removeEncodingPrefix(data.images[1])
      };
      const docFront = await fetch(data.images[0]).then(res => res.blob());
      const docBack = await fetch(data.images[1]).then(res => res.blob());

      dispatch(
        setEidPreviewData({
          front: {
            ...docFront,
            name: "Emirates_front.jpg",
            link: data.images[0]
          },
          back: {
            ...docBack,
            name: "Emirates_back.jpg",
            link: data.images[1]
          }
        })
      );

      dispatch(
        analyseOcr({
          ocrData,
          documentType: DOC_TYPE_EID
        })
      );
    } else if (data.images.length == 1) {
      const ocrData = {
        docFront: removeEncodingPrefix(data.images[0])
      };
      const passport = await fetch(data.images[0]).then(res => res.blob());
      dispatch(setPassportPreviewData({ ...passport, name: "Passport.jpg", link: data.images[0] }));

      dispatch(
        analyseOcr({
          ocrData,
          documentType: DOC_TYPE_PASSPORT
        })
      );
    }
  };

  const onEidScanData = async data => {
    setOpenEidScanner(false);
    await analyzeData(data);
  };

  const onPassportScanData = async data => {
    setOpenPassportScanner(false);
    await analyzeData(data);
  };

  const onRemoveOcrData = type => {
    if (type === DOC_TYPE_EID) {
      dispatch(removeEidOcrData());
    }
    dispatch(removePassportOcrData());
  };

  //TODO: handle NEXT button disable for multiple stakeholder.

  return (
    <>
      <h3 className={classes.mainTitle}>Now let&apos;s talk about you</h3>
      <p className={classes.subTitle}>
        We have to verify your identity to check it&apos;s really you
      </p>
      {isDesktop && (
        <ScanViaMobile
          disabled={
            !isEmpty(analysedEidData) && !isEmpty(analysedPassportData) && confirmEntity?.success
          }
          getKycStatus={getKycStatus}
        />
      )}
      {isDesktop && <div className={classes.horizontalLine} />}
      <StakeholdersDetail name={fullName} companyCategory={companyCategory} />
      <div className={classes.uploadComponent}>
        <UploadFileWrapper
          fieldDescription="Emirates ID (both sides)"
          helperText="Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"
          uploadedContent={
            !isEmpty(analysedEidData) && !isEmpty(kycUploadedDocs.eidFront)
              ? `${kycUploadedDocs.eidFront.name} | ${kycUploadedDocs.eidBack.name}`
              : ""
          }
          successText={`Succcesfully ${actionType?.eid}`}
          handleScan={onScanEid}
          isSuccess={isEmpty(analysedEidData) ? false : true}
          handleRemove={() => onRemoveOcrData(DOC_TYPE_EID)}
          handleUpload={() => openDocUploadModal(DOC_TYPE_EID)}
          showPreview={!isEmpty(analysedEidData)}
          type={DOC_TYPE_EID}
          mobileLabel="Upload/ Scan your Emirates ID"
        />
      </div>
      {((isEmpty(analysedEidData) && error) || ageRestrictionError) && (
        <div className={classes.uploadModalErrorWrapper}>
          <ErrorOutlineIcon className={classes.errorIcon} />
          {error || ageRestrictionError}
        </div>
      )}

      <div className={classes.uploadComponent}>
        <UploadFileWrapper
          fieldDescription="Passport (photo page)"
          helperText="Supported formats: PDF, JPG, PNG | 5MB max. | 10KB min."
          uploadedContent={
            !isEmpty(analysedPassportData) && !isEmpty(kycUploadedDocs.passport)
              ? `${kycUploadedDocs?.passport?.name}`
              : ""
          }
          isSuccess={isEmpty(analysedPassportData) ? false : true}
          successText={`Succcesfully ${actionType?.passport}`}
          isStepActive={!isEmpty(analysedEidData)}
          disabledReason={"You'll be able to do this step after uploading your Emirates ID."}
          showPreview={!isEmpty(analysedPassportData)}
          handleScan={onScanPassport}
          handleRemove={() => onRemoveOcrData(DOC_TYPE_PASSPORT)}
          handleUpload={() => openDocUploadModal(DOC_TYPE_PASSPORT)}
          type={DOC_TYPE_PASSPORT}
          mobileLabel="Upload/ Scan your passport"
        />
      </div>
      {!isEmpty(analysedEidData) && error && (
        <div className={classes.uploadModalErrorWrapper}>
          <ErrorOutlineIcon className={classes.errorIcon} />
          {error}
        </div>
      )}

      <div className={classes.uploadComponent}>
        <FaceRecognition
          fieldDescription="Scan your face"
          helperText="Confirm that your face and photo match via your camera."
          isStepActive={!isEmpty(analysedEidData) && !isEmpty(analysedPassportData)}
          disabledReason={
            "You'll be able to do this step after uploading your Emirates ID and passport."
          }
          livenessData={faceLivelinessFeedback}
          transactionId={transactionId}
          dispatch={dispatch}
          tempKey={faceScanKey}
          sdkConfig={sdkConfig}
        />
      </div>
      {confirmEntityError && (
        <div className={classes.uploadModalErrorWrapper}>
          <ErrorOutlineIcon className={classes.errorIcon} />
          {confirmEntityError}
        </div>
      )}

      <Footer extraClasses={!sessionType ? "" : "oneElement"}>
        {!sessionType && <BackLink path={routes.companyInfo} isTypeButton={true} />}
        <NextStepButton
          type="button"
          handleClick={handleClickNextStep}
          isDisplayLoader={isLoading}
          disabled={
            !(!isEmpty(analysedEidData) && !isEmpty(analysedPassportData) && confirmEntity?.success)
          }
          label={sessionType ? "Done" : "Next"}
          justify="flex-end"
        />
      </Footer>
      <Modal open={openEidScanner}>
        <OCRScanner
          scanType={1}
          sdkConfig={sdkConfig}
          onScanData={onEidScanData}
          onClose={() => setOpenEidScanner(false)}
        />
      </Modal>
      <Modal open={openPassportScanner}>
        <OCRScanner
          scanType={2}
          sdkConfig={sdkConfig}
          onScanData={onPassportScanData}
          onClose={() => setOpenPassportScanner(false)}
        />
      </Modal>
      <OverlayLoader
        open={loadKYCDocuments || loading}
        text={
          loadKYCDocuments ? "Loading" : "Scanning your documents....this might take few moments"
        }
      />

      <InfoModal
        open={openInfo}
        info={"Your progress has been saved"}
        text={"Please continue the application on desktop/laptop."}
        handleClose={handleInfoModalClose}
      />

      {openDocUpload && (
        <UploadFileModal
          isOpen={openDocUpload}
          typeOfUpload={docUploadType}
          title={modalTitle}
          handleClose={() => setOpenDocUpload(false)}
        />
      )}
    </>
  );
};

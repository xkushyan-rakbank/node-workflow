import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { Form, Formik } from "formik";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { isEmpty } from "lodash";

import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import { FaceRecognition } from "../../../../components/FaceRecognition/FaceRecognition";
import { UploadFileWrapper } from "../../../../components/UploadFileWrapper/UploadFileWrapper";
import StakeholdersDetail from "./StakeholdersDetail";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";
import { removeEncodingPrefix } from "../../../../utils/ocr";

import { getSdkConfig } from "../../../../store/selectors/sdkConfig";
import { createSdkCofig } from "../../../../store/actions/sdkConfig";
import { getKyc, getTransactionId } from "../../../../store/selectors/kyc";
import { analyseOcr, removeEidOcrData, removePassportOcrData } from "../../../../store/actions/kyc";

import { useStyles } from "./styled";
import { OCRScanner } from "./OCRScanner";
import { OverlayLoader } from "../../../../components/Loader";
import { DOC_TYPE_EID, DOC_TYPE_PASSPORT } from "../../../../constants";
import { UploadFileModal } from "./UploadFileModal";
import { ScanViaMobile } from "./MobileScan";

export const CompanyStakeholdersComponent = ({
  fullName,
  companyCategory,
  goToFinalQuestions,
  isLoading,
  isDisableNextStep
}) => {
  const { sdkConfig } = useSelector(getSdkConfig);
  const { loading, analysedEidData, analysedPassportData, error } = useSelector(getKyc);
  const transactionId = useSelector(getTransactionId);

  const classes = useStyles();
  const [openDocUpload, setOpenDocUpload] = useState(false);
  const [docUploadType, setDocUploadType] = useState(null);
  const [actionType, setActionType] = useState(null);

  const openDocUploadModal = type => {
    onRemoveOcrData(type);
    setOpenDocUpload(true);
    setDocUploadType(type);
  };

  let modalTitle = docUploadType === DOC_TYPE_EID ? "Upload Emirates ID" : "Upload passport";
  const dispatch = useDispatch();

  const [openEidScanner, setOpenEidScanner] = useState(false);
  const [openPassportScanner, setOpenPassportScanner] = useState(false);

  const [eidFile, setEidFile] = useState({ docFront: "", docBack: "" });
  const [passportFile, setPassportFile] = useState({});

  useEffect(() => {
    if (transactionId) {
      dispatch(createSdkCofig());
    }
  }, [transactionId]);

  const onScanEid = () => {
    onRemoveOcrData(DOC_TYPE_EID);
    setOpenEidScanner(true);
    setActionType("Scanned");
  };

  const onScanPassport = () => {
    onRemoveOcrData(DOC_TYPE_PASSPORT);
    setOpenPassportScanner(true);
    setActionType("Scanned");
  };

  const analyzeData = async (data, nameOfUploadedFile) => {
    if (data.images.length == 2) {
      const ocrData = {
        docFront: removeEncodingPrefix(data.images[0]),
        docBack: removeEncodingPrefix(data.images[1])
      };
      const docFront = await fetch(data.images[0]).then(res => res.blob());
      const docBack = await fetch(data.images[1]).then(res => res.blob());

      setEidFile({
        docFront: {
          ...docFront,
          name: nameOfUploadedFile ? nameOfUploadedFile.front : "Emirates_front.jpg",
          link: data.images[0]
        },
        docBack: {
          ...docBack,
          name: nameOfUploadedFile ? nameOfUploadedFile.back : "Emirates_back.jpg",
          link: data.images[1]
        }
      });

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
      setPassportFile({ ...passport, name: "Passport.jpg", link: data.images[0] });

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

  // const onSaveUploadDataFromModal = async (files, fileName, docType) => {
  //   await analyzeData(files, fileName);
  // };

  return (
    <>
      <h3 className={classes.mainTitle}>Now let&apos;s talk about you</h3>
      <p className={classes.subTitle}>
        We have to verify your identity to check it&apos;s really you
      </p>
      <Formik>
        {props => (
          <Form>
            <ScanViaMobile />
            <div className={classes.horizontalLine} />
            <StakeholdersDetail name={fullName} companyCategory={companyCategory} />
            <div className={classes.uploadComponent}>
              <UploadFileWrapper
                fieldDescription="Emirates ID (both sides)"
                helperText="Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"
                uploadedContent={
                  !isEmpty(analysedEidData) && eidFile?.docFront?.name
                    ? `${eidFile.docFront.name} | ${eidFile.docBack.name}`
                    : ""
                }
                successText={`Succcesfully ${actionType}`}
                handleScan={onScanEid}
                isSuccess={isEmpty(analysedEidData) ? false : true}
                handleRemove={() => onRemoveOcrData(DOC_TYPE_EID)}
                handleUpload={() => openDocUploadModal(DOC_TYPE_EID)}
                showPreview={!isEmpty(analysedEidData)}
                type={DOC_TYPE_EID}
                data={eidFile}
              />
            </div>
            {isEmpty(analysedEidData) && error && (
              <div className={classes.uploadModalErrorWrapper}>
                <ErrorOutlineIcon className={classes.errorIcon} />
                {error}
              </div>
            )}

            <div className={classes.uploadComponent}>
              <UploadFileWrapper
                fieldDescription="Passport (photo page)"
                helperText="Supported formats: PDF, JPG, PNG | 5MB max. | 10KB min."
                uploadedContent={!isEmpty(analysedPassportData) ? `${passportFile.name}` : ""}
                isSuccess={isEmpty(analysedPassportData) ? false : true}
                successText={`Succcesfully ${actionType}`}
                isStepActive={!isEmpty(analysedEidData)}
                disabledReason={"You'll be able to do this step after uploading your Emirates ID."}
                showPreview={!isEmpty(analysedPassportData)}
                handleScan={onScanPassport}
                handleRemove={() => onRemoveOcrData(DOC_TYPE_PASSPORT)}
                handleUpload={() => openDocUploadModal(DOC_TYPE_PASSPORT)}
                type={DOC_TYPE_PASSPORT}
                data={passportFile}
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
              />
            </div>
            <div className="linkContainer">
              <BackLink path={routes.companyInfo} />

              <NextStepButton
                handleClick={goToFinalQuestions}
                isDisplayLoader={isLoading}
                disabled={isDisableNextStep}
                label="Next"
                justify="flex-end"
              />
            </div>
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
              open={loading}
              text={"Scanning your documents....this might take a few moments"}
            />
            {openDocUpload && (
              <UploadFileModal
                isOpen={openDocUpload}
                typeOfUpload={docUploadType}
                title={modalTitle}
                handleClose={() => setOpenDocUpload(false)}
                setEidDetails={data => {
                  setEidFile({
                    docFront: data.front,
                    docBack: data.back
                  });
                  setActionType("Uploaded");
                }}
                setPassportDetails={data => setPassportFile(data)}
              />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

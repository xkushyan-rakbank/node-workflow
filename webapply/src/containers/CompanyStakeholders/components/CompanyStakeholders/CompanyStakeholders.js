import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "@material-ui/core";
import { isEmpty } from "lodash";

import { ReactComponent as VerifyMobileIcon } from "../../../../assets/icons/verify_mobile.svg";
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

export const CompanyStakeholdersComponent = ({
  fullName,
  companyCategory,
  goToFinalQuestions,
  isLoading,
  isDisableNextStep
}) => {
  const { sdkConfig } = useSelector(getSdkConfig);
  const { loading, analysedEidData } = useSelector(getKyc);
  const transactionId = useSelector(getTransactionId);

  const classes = useStyles();
  const dispatch = useDispatch();

  const [openEidScanner, setOpenEidScanner] = useState(false);
  const [openPassportScanner, setOpenPassportScanner] = useState(false);

  const [eidFile, setEidFile] = useState({ docFront: "", docBack: "" });

  useEffect(() => {
    if (transactionId !== "") {
      dispatch(createSdkCofig());
    }
  }, [transactionId]);

  const onScanEid = () => {
    setOpenEidScanner(true);
  };

  const onScanPassport = () => {
    setOpenPassportScanner(true);
  };

  const analyzeData = async data => {
    if (data.images.length == 2) {
      const ocrData = {
        docFront: removeEncodingPrefix(data.images[0]),
        docBack: removeEncodingPrefix(data.images[1])
      };
      const docFront = await fetch(data.images[0]).then(res => res.blob());
      const docBack = await fetch(data.images[1]).then(res => res.blob());

      setEidFile({
        docFront: { ...docFront, name: "Emirates_front.jpg" },
        docBack: { ...docBack, name: "Emirates_back.jpg" }
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
    const ocrAnalysisData = await analyzeData(data);
    console.log("data>>> passport", data);
    console.log("ocrAnalysisData", ocrAnalysisData);
  };

  const onPassportScanData = async data => {
    setOpenPassportScanner(false);
  };

  const onRemoveOcrData = type => {
    if (type === DOC_TYPE_EID) {
      dispatch(removeEidOcrData());
    }
    dispatch(removePassportOcrData());
  };

  return (
    <>
      <h3 className={classes.mainTitle}>Now let's talk about you</h3>
      <p className={classes.subTitle}>We have to verify your identity to check it's really you</p>
      <div className={classes.verifyMobileWrapper}>
        <div className={classes.descriptionWrapper}>
          <VerifyMobileIcon
            alt="Continue verification on mobile"
            className={classes.verifyMobileIcon}
          />
          <div>
            <h6>Continue verification on mobile browser</h6>
            <p>
              You can do this if you have documents on your phone or want to use your phone's camera
              to scan your face.
            </p>
          </div>
        </div>
        <Button variant="outlined" className={classes.continueBtn}>
          Continue on mobile
        </Button>
      </div>

      <div className={classes.horizontalLine} />

      <StakeholdersDetail name={fullName} companyCategory={companyCategory} />

      <div className={classes.uploadComponent}>
        <UploadFileWrapper
          fieldDescription="Emirates ID (both sides)"
          helperText="Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"
          uploadedContent={
            eidFile?.docFront?.name ? `${eidFile.docFront.name} | ${eidFile.docBack.name}` : ""
          }
          successText={"Successfully scanned"}
          handleScan={onScanEid}
          isSuccess={isEmpty(analysedEidData) ? false : true}
          handleRemove={() => onRemoveOcrData(DOC_TYPE_EID)}
        />
      </div>

      <div className={classes.uploadComponent}>
        <UploadFileWrapper
          fieldDescription="Passport (photo page)"
          helperText="Supported formats: PDF, JPG, PNG | 5MB max. | 10KB min."
          isStepActive={false}
          disabledReason={"You'll be able to do this step after uploading your Emirates ID."}
          handleScan={onScanPassport}
        />
      </div>

      <div className={classes.uploadComponent}>
        <FaceRecognition
          fieldDescription="Scan your face"
          helperText="Confirm that your face and photo match via your camera."
          isStepActive={false}
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
    </>
  );
};

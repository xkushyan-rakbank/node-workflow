import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { Formik, Form } from "formik";

import routes from "../../../../routes";

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

// import { OverlayLoader } from "../../../../components/Loader";
import { BackLink } from "../../../../components/Buttons/BackLink";

import StakeholdersDetail from "./StakeholdersDetail";
import { UploadFileModal } from "./UploadFileModal";
import { ScanViaMobile } from "./MobileScan";

import { DOC_TYPE_EID, DOC_TYPE_PASSPORT } from "../../../../constants";

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

      <StakeholdersDetail name={fullName} companyCategory={companyCategory}/>

      <div className={classes.uploadComponent}>
        <UploadFileWrapper
          fieldDescription="Emirates ID (both sides)"
          helperText="Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"
        />
      </div>

      <div className={classes.uploadComponent}>
        <UploadFileWrapper
          fieldDescription="Passport (photo page)"
          helperText="Supported formats: PDF, JPG, PNG | 5MB max. | 10KB min."
          isStepActive={false}
          disabledReason={"You'll be able to do this step after uploading your Emirates ID."}
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
    </>
  );
};

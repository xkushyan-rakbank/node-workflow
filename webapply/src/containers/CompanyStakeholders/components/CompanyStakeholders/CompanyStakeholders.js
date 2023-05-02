import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { Formik, Form } from "formik";

import routes from "../../../../routes";

import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import { FaceRecognition } from "../../../../components/FaceRecognition/FaceRecognition";
import { UploadFileWrapper } from "../../../../components/UploadFileWrapper/UploadFileWrapper";
// import { OverlayLoader } from "../../../../components/Loader";
import { BackLink } from "../../../../components/Buttons/BackLink";

import StakeholdersDetail from "./StakeholdersDetail";
import { UploadFileModal } from "./UploadFileModal";
import { ScanViaMobile } from "./MobileScan";

import { DOC_TYPE_EID, DOC_TYPE_PASSPORT } from "../../../../constants";

import { useStyles } from "./styled";

export const CompanyStakeholdersComponent = ({
  fullName,
  companyCategory,
  goToFinalQuestions,
  isLoading,
  isDisableNextStep
}) => {
  const classes = useStyles();
  const [openDocUpload, setOpenDocUpload] = useState(false);
  const [docUploadType, setDocUploadType] = useState(null);

  const openDocUploadModal = type => {
    console.log("openUploadModal", type);
    setOpenDocUpload(true);
    setDocUploadType(type);
  };

  let modalTitle = docUploadType === DOC_TYPE_EID ? "Upload Emirates ID" : "Upload passport";
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
                // handleScan={onScanEid}
                handleUpload={() => openDocUploadModal(DOC_TYPE_EID)}
              />
            </div>

            <div className={classes.uploadComponent}>
              <UploadFileWrapper
                fieldDescription="Passport (photo page)"
                helperText="Supported formats: PDF, JPG, PNG | 5MB max. | 10KB min."
                isStepActive={false}
                disabledReason={"You'll be able to do this step after uploading your Emirates ID."}
                // handleScan={onScanPassport}
                handleUpload={() => openDocUploadModal(DOC_TYPE_PASSPORT)}
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

            {openDocUpload && (
              <UploadFileModal
                isOpen={openDocUpload}
                typeOfUpload={docUploadType}
                title={modalTitle}
                handleClose={() => setOpenDocUpload(false)}
                // checkOCRScan={handleOCRScanning}
                // setEidDetails={data => setEIDFile(data)}
              />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

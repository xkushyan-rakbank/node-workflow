/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { Field } from "formik";
import cx from "classnames";

import { useStyles } from "./styled";
import { Upload } from "../../../../components/Upload";
import {
  EID_PASSPORT_ACCEPTED_FILE_TYPES,
  EID_PASSPORT_FILE_SIZE,
  DOC_TYPE_EID,
  DOC_TYPE_PASSPORT
} from "../../../../constants";

import { analyseOcr, removeEidOcrData, removePassportOcrData } from "../../../../store/actions/kyc";
import { OverlayLoader } from "../../../../components/Loader";
import { getKyc } from "../../../../store/selectors/kyc";
import { removeEncodingPrefix } from "../../../../utils/ocr";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
}

export const UploadFileModal = ({
  isOpen,
  typeOfUpload,
  title,
  handleClose,
  setEidDetails,
  setPassportDetails
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, analysedEidDataStatus, analysedPassportDataStatus } = useSelector(getKyc);

  const [modalStyle] = useState(getModalStyle);
  const [values, setFieldValue] = useState({
    emiratesIDFront: "",
    emiratesIDBack: "",
    passport: ""
  });
  const [uploadedFileName, setUploadedFileName] = useState({
    emiratesIDFront: "",
    emiratesIDBack: "",
    passport: ""
  });

  const analyzeData = () => {
    if (typeOfUpload === DOC_TYPE_EID) {
      const ocrData = {
        docFront: removeEncodingPrefix(values.emiratesIDFront),
        docBack: removeEncodingPrefix(values.emiratesIDBack)
      };
      dispatch(
        analyseOcr({
          ocrData,
          documentType: "id"
        })
      );
    }

    if (typeOfUpload === DOC_TYPE_PASSPORT) {
      const ocrData = {
        docFront: removeEncodingPrefix(values.passport)
      };
      dispatch(
        analyseOcr({
          ocrData,
          documentType: "passport"
        })
      );
    }
  };

  const handleDropFile = useCallback((acceptedFiles, name) => {
    const file = acceptedFiles[0];
    setUploadedFileName(prev => ({
      ...prev,
      [name]: file?.name
    }));

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFieldValue(prev => ({
        ...prev,
        [name]: reader.result
      }));
    };
  }, []);

  const removeValue = (field, value) => {
    setFieldValue(prev => ({
      ...prev,
      [field]: value
    }));
    setUploadedFileName(prev => ({
      ...prev,
      [field]: value
    }));
    if (typeOfUpload === DOC_TYPE_EID) {
      dispatch(removeEidOcrData());
    } else {
      dispatch(removePassportOcrData());
    }
  };

  const sendUploadedData = () => {
    if (typeOfUpload === DOC_TYPE_EID) {
      setEidDetails({
        front: {
          name: uploadedFileName.emiratesIDFront,
          link: values.emiratesIDFront
        },
        back: {
          name: uploadedFileName.emiratesIDBack,
          link: values.emiratesIDBack
        }
      });
    } else {
      setPassportDetails({
        name: uploadedFileName.passport,
        link: values.passport
      });
    }
    handleClose();
  };

  const passEmiratesIDData = async () => {
    await analyzeData();
  };

  const isSaveDisabled = () => {
    return typeOfUpload === DOC_TYPE_EID
      ? values.emiratesIDFront.length > 0 && values.emiratesIDBack.length > 0
      : values.passport.length > 0;
  };

  useEffect(() => {
    isSaveDisabled();
  }, [values]);

  useEffect(() => {
    if (analysedEidDataStatus === "success" && typeOfUpload === DOC_TYPE_EID) {
      sendUploadedData();
    }
  }, [analysedEidDataStatus]);

  useEffect(() => {
    if (analysedPassportDataStatus === "success") {
      sendUploadedData();
    }
  }, [analysedPassportDataStatus]);

  return (
    <>
      {!loading && (
        <Modal open={isOpen}>
          <div style={modalStyle} className={classes.paper}>
            <CloseIcon onClick={handleClose} className={classes.uploadModalCloseIcon} />
            <h2 className={classes.uploadModalTitle}>{title}</h2>
            {error && (
              <div className={classes.uploadModalErrorWrapper}>
                <ErrorOutlineIcon className={classes.errorIcon} />
                {error}
              </div>
            )}
            {typeOfUpload === DOC_TYPE_EID && (
              <>
                <Field
                  name="eid_front"
                  fieldDescription="Front side"
                  helperText={"Supported formats: PDF, JPG, PNG | 5MB max. | 10KB min."}
                  maxFiles={1}
                  accept={EID_PASSPORT_ACCEPTED_FILE_TYPES}
                  fileSize={EID_PASSPORT_FILE_SIZE}
                  onDrop={acceptedFile => handleDropFile(acceptedFile, "emiratesIDFront")}
                  isInsideForm={false}
                  file={values.emiratesIDFront}
                  onDelete={() => removeValue("emiratesIDFront", "")}
                  content={uploadedFileName.emiratesIDFront}
                  showUploadSuccessIcon={false}
                  component={Upload}
                />
                <div style={{ marginTop: "24px" }}>
                  <Field
                    name="eid_back"
                    fieldDescription="Back side"
                    helperText={"Supported formats: PDF, JPG, PNG | 5MB max. | 10KB min."}
                    maxFiles={1}
                    accept={EID_PASSPORT_ACCEPTED_FILE_TYPES}
                    fileSize={EID_PASSPORT_FILE_SIZE}
                    onDrop={acceptedFile => handleDropFile(acceptedFile, "emiratesIDBack")}
                    isInsideForm={false}
                    file={values.emiratesIDBack}
                    content={uploadedFileName.emiratesIDBack}
                    showUploadSuccessIcon={false}
                    onDelete={() => removeValue("emiratesIDBack", "")}
                    component={Upload}
                  />
                </div>
              </>
            )}
            {typeOfUpload === DOC_TYPE_PASSPORT && (
              <Field
                name="passport"
                fieldDescription="Photo page"
                helperText={"Supported formats: PDF, JPG, PNG | 5MB max. | 10KB min."}
                maxFiles={1}
                accept={EID_PASSPORT_ACCEPTED_FILE_TYPES}
                fileSize={EID_PASSPORT_FILE_SIZE}
                onDrop={acceptedFile => handleDropFile(acceptedFile, "passport")}
                isInsideForm={false}
                file={values && values.passport}
                content={uploadedFileName.passport}
                showUploadSuccessIcon={false}
                onDelete={() => removeValue("passport", "")}
                component={Upload}
              />
            )}
            <Button
              color="primary"
              variant="contained"
              className={cx(classes.uploadModalSaveBtn, classes.uploadBtnContained)}
              disabled={!isSaveDisabled()}
              onClick={() => {
                passEmiratesIDData();
              }}
            >
              Save
            </Button>
          </div>
        </Modal>
      )}
      <OverlayLoader
        open={loading}
        text={"Uploading your documents....this might take a few moments"}
      />
    </>
  );
};
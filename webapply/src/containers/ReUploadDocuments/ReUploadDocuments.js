import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import nanoid from "nanoid";
import * as Yup from "yup";

import {
  addOtherDocument,
  docUpload,
  retrieveDocDetails
} from "../../store/actions/getProspectDocuments";
import { getOtherDocuments } from "../../store/selectors/appConfig";
import { updateActionType } from "../../store/actions/appConfig";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";

import { DocumentRow } from "./components/DocumentRow/DocumentRow";
import { ContainedButton } from "../../components/Buttons/ContainedButton";
import { BackLink } from "../../components/Buttons/BackLink";
import { ReUploadSuccess } from "./components/ReUploadSuccess/ReUploadSuccess";

import { MAX_OTHER_DOCUMENTS } from "./constants";
import { NEXT, OTHER_DOCUMENTS, SUBMIT } from "../../constants";
import { FILE_SIZE, SUPPORTED_FORMATS } from "../../utils/validation";
import routes from "../../routes";

import { useStyles } from "./styled";

import { ReactComponent as AddIcon } from "../../assets/icons/add-icon.svg";
import { ReactComponent as FileIcon } from "../../assets/icons/file.svg";
import { ReactComponent as AlertIcon } from "../../assets/icons/alert.svg";

const validationFileSchema = Yup.object().shape({
  file: Yup.mixed()
    .test("size", "File size exceeded (5Mb maximum)", value => value && value.size <= FILE_SIZE)
    .test(
      "type",
      "Supported formats are PDF, JPG and PNG",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
});

export const ReUploadDocuments = () => {
  const classes = useStyles();
  const [isSubmitted, setSubmitted] = useState(false);
  const otherDocuments = useSelector(getOtherDocuments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveDocDetails());
    dispatch(updateActionType(SUBMIT));
  }, [dispatch]);

  const [error, setError] = useState("");
  const resetError = () => setError("");

  const inputEl = useRef(null);

  const fileUploadClick = event => (event.target.value = null);
  const fileUploadChange = useCallback(() => {
    const file = inputEl.current.files[0];

    try {
      validationFileSchema.validateSync({ file }, { abortEarly: false });
    } catch (error) {
      return setError(error.message);
    }

    const documentKey = nanoid();
    const documentType = "Others";

    dispatch(
      addOtherDocument({
        documentType,
        documentKey,
        fileName: null,
        fileData: null,
        fileFormat: null,
        fileSize: file.size,
        fileDescription: file.name,
        submittedBy: null,
        submittedDt: null,
        uploadStatus: "NotUploaded"
      })
    );

    const data = new FormData();
    data.append("fileInfo", JSON.stringify({ documentKey, documentType }));
    data.append("file", file);

    const successfulUploadProps = {
      uploadStatus: "Uploaded",
      submittedDt: file.lastModifiedDate,
      fileFormat: file.type
    };

    dispatch(
      docUpload({
        data,
        docProps: successfulUploadProps,
        docOwner: OTHER_DOCUMENTS,
        userFileName: file.name,
        documentType,
        documentKey
      })
    );
    setError(null);
  }, [otherDocuments.length, dispatch]);

  const submitForm = () => {
    dispatch(sendProspectToAPIPromisify(NEXT, null, SUBMIT)).then(() => {
      setSubmitted(true);
    });
  };

  const isSubmitButtonActive =
    otherDocuments.length && otherDocuments.every(doc => doc.uploadStatus === "Uploaded");

  if (isSubmitted) {
    return <ReUploadSuccess />;
  }

  return (
    <div className={classes.root}>
      <input
        className={classes.fileInput}
        name="file"
        type="file"
        onChange={fileUploadChange}
        onClick={fileUploadClick}
        ref={inputEl}
      />
      <h3 className={classes.heading}>Almost done! We need a few extra documents</h3>
      <p className={classes.subtitle}>
        One of our agents asked you for some more documents? Please upload them here.
      </p>
      {otherDocuments.map((document, index) => (
        <DocumentRow key={document.documentKey} {...document} documentIndex={index} />
      ))}
      {otherDocuments.length < MAX_OTHER_DOCUMENTS && (
        <div className={classes.uploadButton} onClick={() => inputEl.current.click()}>
          {error ? (
            <FileIcon className={classes.errorIcon} width={18} height={24} />
          ) : (
            <AddIcon className={classes.addIcon} width={24} height={24} />
          )}
          <div className={classes.textContainer}>
            <span className={classes.uploadButtonText}>
              {!otherDocuments.length ? "Add another document" : "Upload document"}
            </span>
            {error && (
              <span className={classes.error}>
                <AlertIcon className={classes.alertIcon} />
                {error}. Please
                <span className={classes.errorLink} onClick={resetError}>
                  try again.
                </span>
              </span>
            )}
          </div>
        </div>
      )}
      <div className={classes.footer}>
        <BackLink text="Back To Applications" path={routes.MyApplications} />
        <ContainedButton
          onClick={submitForm}
          type="submit"
          disabled={!isSubmitButtonActive}
          label="Submit documents"
          className={classes.submitBtn}
        />
      </div>
    </div>
  );
};

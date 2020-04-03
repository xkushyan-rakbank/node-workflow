import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import nanoid from "nanoid";

import { ContainedButton } from "../../components/Buttons/ContainedButton";
import { BackLink } from "../../components/Buttons/BackLink";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { DocumentRow } from "./components/DocumentRow/DocumentRow";
import { UploadButton } from "./components/UploadButton/UploadButton";
import {
  addOtherDocument,
  cancelDocUpload,
  deleteOtherDocument,
  docUpload,
  retrieveDocDetails
} from "../../store/actions/getProspectDocuments";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { getProgress, getUploadErrors } from "../../store/selectors/getProspectDocuments";
import { getOtherDocuments } from "../../store/selectors/appConfig";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { NEXT, OTHER_DOCUMENTS, SUBMIT, UPLOADED } from "../../constants";
import routes from "../../routes";

import { MAX_OTHER_DOCUMENTS } from "./constants";
import { useStyles } from "./styled";

export const ReUploadDocuments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const otherDocuments = useSelector(getOtherDocuments);
  const progress = useSelector(getProgress);
  const uploadErrors = useSelector(getUploadErrors);
  const pushHistory = useTrackingHistory();

  useFormNavigation([true, false]);

  useEffect(() => {
    dispatch(retrieveDocDetails());
  }, [dispatch]);

  const uploadDocument = useCallback(
    file => {
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
        uploadStatus: UPLOADED,
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
    },
    [dispatch]
  );

  const removeDocument = documentKey => {
    dispatch(cancelDocUpload(documentKey));
    dispatch(deleteOtherDocument(documentKey));
  };

  const isSubmitButtonActive =
    otherDocuments.length && otherDocuments.every(doc => doc.uploadStatus === UPLOADED);

  const submitForm = useCallback(() => {
    dispatch(sendProspectToAPIPromisify(NEXT, null, SUBMIT)).then(
      () => pushHistory(routes.MyApplications),
      () => {}
    );
  }, [dispatch, pushHistory]);

  return (
    <div className={classes.root}>
      <h3 className={classes.heading}>Almost done! We need a few extra documents</h3>
      <p className={classes.subtitle}>
        One of our agents asked you for some more documents? Please upload them here.
      </p>
      {otherDocuments.map(({ documentKey, ...rest }) => (
        <DocumentRow
          key={documentKey}
          error={uploadErrors[documentKey]}
          documentProgress={progress[documentKey]}
          removeDocument={() => removeDocument(documentKey)}
          {...rest}
        />
      ))}
      {otherDocuments.length < MAX_OTHER_DOCUMENTS && (
        <UploadButton uploadDocument={uploadDocument} isFirstDocument={!otherDocuments.length} />
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

import React from "react";

import { DocumentRow } from "../DocumentRow/DocumentRow";
import { MAX_OTHER_DOCUMENTS } from "../../constants";
import { UploadButton } from "../UploadButton/UploadButton";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";
import { ContainedButton } from "../../../../components/Buttons/ContainedButton";

import { useStyles } from "./styled";

export const ReUploadDocumentsComponent = ({
  otherDocuments,
  uploadDocument,
  uploadErrors,
  progress,
  removeDocument,
  submitForm,
  isSubmitButtonActive
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Upload your documents</h3>
      <h4 className={classes.heading}>Almost done! We need a few extra documents</h4>
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

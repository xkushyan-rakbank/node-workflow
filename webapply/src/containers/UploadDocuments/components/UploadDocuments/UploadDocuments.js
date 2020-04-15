import React from "react";

import { DocumentsSkeleton } from "../DocumentsSkeleton";
import { SectionTitle } from "../../../../components/SectionTitle";
import { CompanyDocuments } from "../CompanyDocuments";
import { SignatoriesDocuments } from "../SignatoriesDocuments";
import { BackLink } from "../../../../components/Buttons/BackLink";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import routes from "../../../../routes";

import { useStyles } from "./styled";

export const UploadDocumentsComponent = ({
  isLoadingDocuments,
  companyDocuments,
  stakeholdersDocuments,
  isDisabledNextStep,
  isLoading,
  goToSelectService,
  signatories,
  companyName
}) => {
  const classes = useStyles();

  return (
    <>
      <h2>Upload your documents</h2>
      <p className="formDescription">
        Remember we asked you to have the papers ready? Now it’s time to upload them.
      </p>
      {isLoadingDocuments ? (
        <DocumentsSkeleton />
      ) : (
        <>
          <div className={classes.sectionContainer}>
            <SectionTitle title="Company documents" classes={{ wrapper: classes.title }} />
            <CompanyDocuments documents={companyDocuments} companyName={companyName} />
          </div>
          {stakeholdersDocuments && (
            <div className={classes.sectionContainer}>
              <SectionTitle title="Stakeholders documents" />
              <SignatoriesDocuments documents={stakeholdersDocuments} signatories={signatories} />
            </div>
          )}
        </>
      )}

      <div className="linkContainer">
        <BackLink path={routes.finalQuestions} />
        <SubmitButton
          disabled={isDisabledNextStep}
          isDisplayLoader={isLoading}
          handleClick={goToSelectService}
          label="Next Step"
          justify="flex-end"
        />
      </div>
    </>
  );
};

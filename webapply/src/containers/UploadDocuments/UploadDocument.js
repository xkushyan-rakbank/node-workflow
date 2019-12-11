import React, { useEffect } from "react";
import routes from "../../routes";
import SectionTitle from "../../components/SectionTitle";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanyDocuments } from "./../UploadDocuments/components/CompanyDocument";
import { SignatoriesDocuments } from "./../UploadDocuments/components/SignatoryDocument";
import { BackLink } from "../../components/Buttons/BackLink";
import { useStyles } from "./styled";

export const UploadDocument = ({
  retrieveDocDetails,
  documents,
  companyName,
  signatories,
  uploadedDocsCount,
  requiredDocCount,
  history
}) => {
  const classes = useStyles();

  useEffect(() => {
    retrieveDocDetails();
  }, [retrieveDocDetails]);

  const goToSelectService = () => history.push(routes.selectServices);

  return (
    <>
      <h2>Upload your documents</h2>
      <p className="formDescription">
        Remember we asked you to have the papers ready? Now it’s time to upload them.
      </p>
      {documents && (
        <>
          <div className={classes.sectionContainer}>
            <SectionTitle title="Company documents" className={classes.title} />
            <CompanyDocuments documents={documents.companyDocuments} companyName={companyName} />
          </div>
          {documents.stakeholdersDocuments && (
            <div className={classes.sectionContainer}>
              <SectionTitle title="Stakeholders documents" />
              <SignatoriesDocuments
                documents={documents.stakeholdersDocuments}
                signatories={signatories}
              />
            </div>
          )}
        </>
      )}

      <div className="linkContainer">
        <BackLink path={routes.finalQuestions} />
        <SubmitButton
          handleClick={goToSelectService}
          label="Next Step"
          justify="flex-end"
          disabled={requiredDocCount !== uploadedDocsCount}
        />
      </div>
    </>
  );
};

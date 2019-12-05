import React, { useEffect } from "react";
import get from "lodash/get";
import routes from "../../routes";
import SectionTitle from "../../components/SectionTitle";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanyDocuments } from "./../uploadDocuments/components/CompanyDocument";
import SignatoriesDocuments from "./../../components/UploadDocument/SignatoriesDocuments";
import { BackLink } from "../../components/Buttons/BackLink";
import { useStyles } from "./styled";

const uploadedStatus = "Uploaded";

export const UploadDocument = ({
  retrieveDocDetails,
  documents,
  companyName,
  getSignatories,
  history
}) => {
  const classes = useStyles();

  useEffect(() => {
    retrieveDocDetails();
  }, [retrieveDocDetails]);

  let uploadedDocsCount = 0;
  let requiredDocCount = 0;
  if (documents && Object.keys(documents).length) {
    requiredDocCount = requiredDocCount + documents.companyDocuments.length;
    get(documents, "companyDocuments", []).length &&
      documents.companyDocuments.map(doc => {
        if (doc.uploadStatus === uploadedStatus) {
          uploadedDocsCount = uploadedDocsCount + 1;
        }
      });
    documents.stakeholdersDocuments &&
      Object.keys(documents.stakeholdersDocuments).length &&
      Object.keys(documents.stakeholdersDocuments).map(userDoc => {
        requiredDocCount = requiredDocCount + documents.stakeholdersDocuments[userDoc].length;
        documents.stakeholdersDocuments[userDoc].map(doc => {
          if (doc.uploadStatus === uploadedStatus) {
            uploadedDocsCount = uploadedDocsCount + 1;
          }
        });
      });
  }

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
              <SignatoriesDocuments DocDetails={{ documents, getSignatories }} />
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

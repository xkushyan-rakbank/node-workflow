import React, { useEffect } from "react";
import routes from "../../routes";
import SectionTitle from "../../components/SectionTitle";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanyDocuments } from "./components/CompanyDocuments";
import { SignatoriesDocuments } from "./components/SignatoriesDocuments";
import { BackLink } from "../../components/Buttons/BackLink";
import { useStyles } from "./styled";

export const UploadDocument = ({
  retrieveDocDetails,
  documents,
  docUpload,
  cancelDocUpload,
  companyName,
  signatories,
  history,
  progress
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
            <CompanyDocuments
              documents={documents.companyDocuments}
              companyName={companyName}
              docUpload={docUpload}
              cancelDocUpload={cancelDocUpload}
              progress={progress}
            />
          </div>
          {documents.stakeholdersDocuments && (
            <div className={classes.sectionContainer}>
              <SectionTitle title="Signatories documents" />
              <SignatoriesDocuments
                documents={documents.stakeholdersDocuments}
                signatories={signatories}
                docUpload={docUpload}
                cancelDocUpload={cancelDocUpload}
                progress={progress}
              />
            </div>
          )}
        </>
      )}

      <div className="linkContainer">
        <BackLink path={routes.finalQuestions} />
        <SubmitButton handleClick={goToSelectService} label="Next Step" justify="flex-end" />
      </div>
    </>
  );
};

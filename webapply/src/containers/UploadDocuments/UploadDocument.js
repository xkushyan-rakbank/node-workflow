import React, { useEffect } from "react";
import routes from "../../routes";
import SectionTitle from "../../components/SectionTitle";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanyDocuments } from "./components/CompanyDocuments";
import { SignatoriesDocuments } from "./components/SignatoriesDocuments";
import { BackLink } from "../../components/Buttons/BackLink";
import { NEXT } from "../../constants";
import { useStyles } from "./styled";
import { DocumentsSkeleton } from "./components/DocumentsSkeleton";

export const UploadDocument = ({
  retrieveDocDetails,
  isLoading,
  documents,
  history,
  isRequiredDocsUploaded,
  ...rest
}) => {
  const classes = useStyles();

  useEffect(() => {
    retrieveDocDetails();
  }, [retrieveDocDetails]);

  const goToSelectService = () => {
    rest.sendProspectToAPI(NEXT).then(isScreeningError => {
      if (!isScreeningError) history.push(routes.selectServices);
    });
  };

  return (
    <>
      <h2>Upload your documents</h2>
      <p className="formDescription">
        Remember we asked you to have the papers ready? Now it’s time to upload them.
      </p>
      {isLoading ? (
        <DocumentsSkeleton />
      ) : (
        <>
          <div className={classes.sectionContainer}>
            <SectionTitle title="Company documents" className={classes.title} />
            <CompanyDocuments documents={documents.companyDocuments} {...rest} />
          </div>
          {documents.stakeholdersDocuments && (
            <div className={classes.sectionContainer}>
              <SectionTitle title="Stakeholders documents" />
              <SignatoriesDocuments documents={documents.stakeholdersDocuments} {...rest} />
            </div>
          )}
        </>
      )}

      <div className="linkContainer">
        <BackLink path={routes.finalQuestions} />
        <SubmitButton
          disabled={!rest.isApplyEditApplication && !isRequiredDocsUploaded}
          handleClick={goToSelectService}
          label="Next Step"
          justify="flex-end"
        />
      </div>
    </>
  );
};

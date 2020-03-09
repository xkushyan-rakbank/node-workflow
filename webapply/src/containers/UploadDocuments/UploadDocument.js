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
import { DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS } from "./constants";

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

  const isDisabledNextStep = rest.isApplyEditApplication
    ? DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS.includes(rest.prospectStatusInfo)
      ? false
      : !isRequiredDocsUploaded
    : !isRequiredDocsUploaded;

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
          disabled={isDisabledNextStep}
          handleClick={goToSelectService}
          label="Next Step"
          justify="flex-end"
        />
      </div>
    </>
  );
};

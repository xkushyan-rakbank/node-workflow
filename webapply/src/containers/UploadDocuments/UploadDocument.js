import React, { useEffect, useState } from "react";

import SectionTitle from "../../components/SectionTitle";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { BackLink } from "../../components/Buttons/BackLink";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { DocumentsSkeleton } from "./components/DocumentsSkeleton";
import { CompanyDocuments } from "./components/CompanyDocuments";
import { SignatoriesDocuments } from "./components/SignatoriesDocuments";
import { formStepper, NEXT } from "../../constants";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";

import { DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS } from "./constants";
import { useStyles } from "./styled";

export const UploadDocument = ({
  retrieveDocDetails,
  isLoadingDocuments,
  documents,
  isRequiredDocsUploaded,
  ...rest
}) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  const [isLoading, setIsLoading] = useState(false);
  useFormNavigation([false, true, formStepper]);

  useEffect(() => {
    retrieveDocDetails();
  }, [retrieveDocDetails]);

  const goToSelectService = () => {
    setIsLoading(true);
    rest.sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) pushHistory(routes.selectServices, true);
      },
      () => setIsLoading(false)
    );
  };

  const isDisabledNextStep =
    !(
      rest.isApplyEditApplication &&
      DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS.includes(rest.prospectStatusInfo)
    ) && !isRequiredDocsUploaded;

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
          isDisplayLoader={isLoading}
          handleClick={goToSelectService}
          label="Next Step"
          justify="flex-end"
        />
      </div>
    </>
  );
};

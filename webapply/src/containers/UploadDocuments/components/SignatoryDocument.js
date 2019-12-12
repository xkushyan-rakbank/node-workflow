import React from "react";
import Avatar from "./../../../components/Avatar";
import UploadDocuments from "./UploadDocument";

import { useStyles } from "./styled";

export const SignatoriesDocuments = ({ documents, signatories }) => {
  const classes = useStyles();

  return signatories.map((signatorie, index) => {
    const docUploadDetails = documents[`${index}_${signatorie.firstName}`];
    return (
      docUploadDetails && (
        <div className={classes.signatoreyContainer} key={signatorie.signatoryId}>
          <div className={classes.contentWrapper}>
            <Avatar firstName={signatorie.firstName} lastName={signatorie.lastName} />
            <div className={classes.userInfo}>
              <div className={classes.nameField}>{signatorie.firstName}</div>
              <div className={classes.SignatoryRights}>{signatorie.roles}</div>
              <div className={classes.shareholdingField}>
                {signatorie.kycDetails.shareHoldingPercentage
                  ? `Shareholding ${signatorie.kycDetails.shareHoldingPercentage} %`
                  : "No shareholding"}
              </div>
            </div>
          </div>
          {docUploadDetails.map(
            document =>
              signatorie.firstName === document.signatoryName && (
                <UploadDocuments
                  key={document.documentKey}
                  documents={document}
                  type="stakeholdersDocuments"
                />
              )
          )}
        </div>
      )
    );
  });
};

import React from "react";

import { Avatar } from "./../../../components/Avatar/Avatar";
import { UploadDocuments } from "./UploadDocument";
import { useStyles } from "./styled";

export const SignatoriesDocuments = ({
  documents,
  signatories,
  docUpload,
  cancelDocUpload,
  progress
}) => {
  const classes = useStyles();

  return signatories.map((signatorie, index) => {
    const docUploadDetails = documents[`${index}_${signatorie.fullName}`];

    return (
      docUploadDetails && (
        <div className={classes.signatoreyContainer} key={signatorie.signatoryId}>
          <div className={classes.contentWrapper}>
            <Avatar firstName={signatorie.firstName} lastName={signatorie.lastName} index={index} />
            <div className={classes.userInfo}>
              <div className={classes.nameField}>{signatorie.fullName}</div>
              <div className={classes.SignatoryRights}>{signatorie.roles}</div>
              <div className={classes.shareholdingField}>
                {signatorie.kycDetails.shareHoldingPercentage
                  ? `Shareholding ${signatorie.kycDetails.shareHoldingPercentage} %`
                  : "No shareholding"}
              </div>
            </div>
          </div>
          {(docUploadDetails.documents || []).map(document => (
            <UploadDocuments
              key={document.documentKey}
              document={document}
              type="stakeholdersDocuments"
              docUpload={docUpload}
              cancelDocUpload={cancelDocUpload}
              progress={progress}
            />
          ))}
        </div>
      )
    );
  });
};

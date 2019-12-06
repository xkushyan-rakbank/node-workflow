import React from "react";
import Avatar from "./../../../components/Avatar";
import UploadDocuments from "./../../../components/UploadDocument/UploadDocument";

import { useStyles } from "./styled";

export const SignatoriesDocuments = ({ documents, signatories }) => {
  const classes = useStyles();

  return signatories.map((signatorie, index) => {
    return (
      documents[index + "_" + signatorie.firstName] && (
        <div className={classes.signatoreyContainer} key={index}>
          <div className={classes.contentWrapper}>
            <Avatar firstName={signatorie.firstName} lastName={signatorie.lastName} />
            <div className={classes.userInfo}>
              <div className={classes.nameField}>{signatorie.firstName}</div>
              <div className={classes.SignatoryRights}>{signatorie.roles}</div>
              <div className={classes.shareholdingField}>
                {signatorie.kycDetails.shareHoldingPercentage ? (
                  <>
                    Shareholding
                    {signatorie.kycDetails.shareHoldingPercentage} %
                  </>
                ) : (
                  "No shareholding"
                )}
              </div>
            </div>
          </div>
          {documents[index + "_" + signatorie.firstName].map((documents, index) => {
            if (signatorie.firstName === documents.signatoryName) {
              return (
                <UploadDocuments
                  key={index}
                  documents={documents}
                  type="stakeholdersDocuments"
                  docUploadDetails={documents[index + "_" + signatorie.firstName]}
                />
              );
            }
            return null;
          })}
        </div>
      )
    );
  });
};

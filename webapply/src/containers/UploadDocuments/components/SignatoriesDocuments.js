import React from "react";

import { Avatar } from "./../../../components/Avatar/Avatar";
import { DocumentRow } from "../DocumentRow";
import { MultiDocumentRow } from "./MultiDocumentRow/MultiDocumentRow";
import { getDocumentInfoMessage } from "../constants";
import { useStyles } from "./styled";
import { PERSONAL_BANK_STATEMENTS, PERSONAL_BACKGROUND } from "../../../constants";

export const SignatoriesDocuments = ({ documents, signatories }) => {
  const classes = useStyles();

  return signatories.map((signatorie, index) => {
    const stakeholderIndex = `${index}_${signatorie.fullName}`;
    const docUploadDetails = documents[stakeholderIndex];

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
          {(docUploadDetails.documents || []).map((document, index) => (
            <DocumentRow
              key={document.documentKey || document.documentTitle}
              document={document}
              index={index}
              stakeholderIndex={stakeholderIndex}
              type="stakeholdersDocuments"
            />
          ))}
          {/* ro-assist-brd2-1 */}
          {docUploadDetails.personalBankStatements &&
            docUploadDetails.personalBankStatements.documents && (
              <MultiDocumentRow
                documents={docUploadDetails.personalBankStatements.documents}
                limit={docUploadDetails.personalBankStatements.limit}
                stakeholderIndex={stakeholderIndex}
                type={PERSONAL_BANK_STATEMENTS}
                infoMessage={getDocumentInfoMessage(PERSONAL_BANK_STATEMENTS)}
              />
            )}
          {docUploadDetails.personalBackground && docUploadDetails.personalBackground.documents && (
            <MultiDocumentRow
              documents={docUploadDetails.personalBackground.documents}
              limit={docUploadDetails.personalBackground.limit}
              stakeholderIndex={stakeholderIndex}
              type={PERSONAL_BACKGROUND}
              infoMessage={getDocumentInfoMessage(PERSONAL_BACKGROUND)}
            />
          )}
        </div>
      )
    );
  });
};

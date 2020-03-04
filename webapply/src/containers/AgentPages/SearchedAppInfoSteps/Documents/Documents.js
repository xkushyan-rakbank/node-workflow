import React, { useCallback } from "react";
import get from "lodash/get";
import cx from "classnames";

import { Avatar } from "../../../../components/Avatar/Avatar";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { titles, errorMsgs, STATUS_NOT_ELIGIBLE } from "./constants";

import { useStyles } from "./styled";

export const DocumentsComponent = ({
  docs = {},
  downloadDocumentFile,
  prospectId,
  signatoryInfo
}) => {
  const classes = useStyles();
  const downloadDocument = useCallback(
    (documentKey, fileName) => downloadDocumentFile(prospectId, documentKey, fileName),
    [prospectId, downloadDocumentFile]
  );
  const headingClassName = cx(classes.checkListData, classes.heading);

  return (
    <>
      <h4 className={classes.title}>{titles.COMPANY_TITLE}</h4>
      {get(docs, "companyDocuments", []).length ? (
        <div className={classes.wrapper}>
          <div className={classes.applicationRow}>
            <div className={headingClassName}>{titles.DOCUMENT_TITLE}</div>
            <div className={headingClassName}>{titles.UPLOAD_STATUS_TITLE}</div>
            <div className={headingClassName}>{titles.ACTIONS_TITLE}</div>
          </div>
          {docs.companyDocuments.map((application, index) => (
            <div className={classes.applicationRow} key={index}>
              <div className={classes.checkListData}>
                {application.fileDescription || application.documentTitle}
              </div>
              <div className={classes.checkListData}>{application.uploadStatus}</div>
              <div className={classes.checkListData}>
                <LinkButton
                  index={index}
                  title={titles.PRINT_DOWNLOAD_TITLE}
                  onClick={() => downloadDocument(application.fileName, application.fileName)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.COMPANY_DOCUMENT_ERROR}</div>
      )}
      <br />
      <h4 className={classes.title}>{titles.STAKEHOLDER_TITLE}</h4>
      {Object.keys(docs.stakeholdersDocuments || {}).length ? (
        (signatoryInfo || []).length &&
        signatoryInfo.map((user, index) => (
          <div key={index}>
            <div className={classes.contentWrapper}>
              <Avatar fullName={user.fullName} index={index} />
              <div className={classes.userInfo}>
                <div className={classes.nameField}>{user.fullName}</div>
              </div>
            </div>
            <div className={classes.wrapper}>
              <div className={classes.applicationRow}>
                <div className={headingClassName}>{titles.DOCUMENT_TITLE}</div>
                <div className={headingClassName}>{titles.UPLOAD_STATUS_TITLE}</div>
                <div className={headingClassName}>{titles.ACTIONS_TITLE}</div>
              </div>
              {get(docs, `stakeholdersDocuments[${index}_${user.fullName}].documents`, []).map(
                (doc, index) => (
                  <div className={classes.applicationRow} key={index}>
                    <div className={classes.checkListData}>
                      {doc.fileDescription || doc.documentTitle}
                    </div>
                    <div className={classes.checkListData}>{doc.uploadStatus}</div>
                    {!STATUS_NOT_ELIGIBLE.includes(doc.uploadStatus) && (
                      <div className={classes.checkListData}>
                        <LinkButton
                          index={index}
                          title={titles.PRINT_DOWNLOAD_TITLE}
                          onClick={() => downloadDocument(doc.fileName, doc.fileName)}
                        />
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.STAKEHOLDERS_DOCUMENT_ERROR}</div>
      )}
    </>
  );
};

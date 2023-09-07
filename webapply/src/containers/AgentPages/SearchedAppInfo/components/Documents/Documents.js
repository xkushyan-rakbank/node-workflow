import React from "react";
import get from "lodash/get";
import cx from "classnames";

import { Avatar } from "../../../../../components/Avatar/Avatar";
import { LinkButton } from "../../../../../components/Buttons/LinkButton";
import { titles, errorMsgs, STATUS_NOT_ELIGIBLE, UPLOAD } from "./constants";

import { useStyles } from "./styled";

export const Documents = ({ signatoryInfo, downloadDocument, docs }) => {
  const classes = useStyles();
  const headingClassName = cx(classes.checkListData, classes.heading);
  //ro-assist-brd3-1
  const listDocuments = (docs, classes, downloadDocument, docType) => {
    const docList = get(docs, docType, []) ? get(docs, docType, []) : [];
    return docList.map((application, index) => (
      <div className={classes.applicationRow} key={index}>
        <div className={classes.checkListData}>
          {STATUS_NOT_ELIGIBLE.includes(application.uploadStatus)
            ? application.documentTitle
            : application.documentTitle && application.documentTitle !== ""
            ? application.documentTitle.replace(UPLOAD, "") + " "
            : ""}

          <br />
          {application.fileName}
        </div>
        <div className={classes.checkListData}>Uploaded</div>
        {!STATUS_NOT_ELIGIBLE.includes(application.uploadStatus) && (
          <div className={classes.checkListData}>
            <LinkButton
              index={index}
              title={titles.PRINT_DOWNLOAD_TITLE}
              onClick={() => downloadDocument(application.fileName, application.fileName)}
            />
          </div>
        )}
      </div>
    ));
  };
  return (
    <>
      <h4 className={classes.title}>{titles.COMPANY_TITLE}</h4>
      {get(docs || {}, "companyDocuments", [])?.length ? (
        <div className={classes.wrapper}>
          <div className={classes.applicationRow}>
            <div className={headingClassName}>{titles.DOCUMENT_TITLE}</div>
            <div className={headingClassName}>{titles.UPLOAD_STATUS_TITLE}</div>
            <div className={headingClassName}>{titles.ACTIONS_TITLE}</div>
          </div>
          {listDocuments(docs, classes, downloadDocument, "companyDocuments")}
          {listDocuments(docs, classes, downloadDocument, "companyBankStatements.documents")}
          {listDocuments(docs, classes, downloadDocument, "companyInvoices.documents")}
          {listDocuments(docs, classes, downloadDocument, "companyAddressProof.documents")}
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
              {listDocuments(
                docs,
                classes,
                downloadDocument,
                `stakeholdersDocuments['${index}_${user.fullName}'].documents`
              )}
              {listDocuments(
                docs,
                classes,
                downloadDocument,
                // eslint-disable-next-line max-len
                `stakeholdersDocuments['${index}_${user.fullName}'].personalBankStatements.documents`
              )}
              {listDocuments(
                docs,
                classes,
                downloadDocument,
                `stakeholdersDocuments['${index}_${user.fullName}'].personalBackground.documents`
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

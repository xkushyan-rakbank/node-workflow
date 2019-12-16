import React from "react";
import get from "lodash/get";
import cx from "classnames";

import { Avatar } from "../../../../components/Avatar/Avatar";
import { titles, errorMsgs } from "./constants";

import { useStyles } from "./styled";

export const DocumentsComponent = ({ docs = {}, prospectInfo, endpointsUrl }) => {
  const classes = useStyles();
  const signatoryInfo = prospectInfo.signatoryInfo;
  const documentBaseUrl = `${endpointsUrl.baseUrl || ""}${endpointsUrl.getDocumentByIdUri || ""}`;
  const headingClassName = cx(classes.checkListData, classes.heading);

  return (
    <>
      <h4 className={classes.title}>{titles.COMPANY_TITLE}</h4>
      {get(docs, "companyDocuments", []).length ? (
        <div className={classes.wrapper}>
          <div className={classes.applicationRow}>
            <div>
              <div className={headingClassName}>{titles.DOCUMENT_TITLE}</div>
            </div>
            <div>
              <div className={headingClassName}>{titles.UPLOAD_STATUS_TITLE}</div>
            </div>
            <div>
              <div className={headingClassName}>{titles.ACTIONS_TITLE}</div>
            </div>
          </div>
          {docs.companyDocuments.map((application, index) => (
            <div className={classes.applicationRow} key={index}>
              <div>
                <div className={classes.checkListData}>{application.documentType}</div>
              </div>
              <div>
                <div className={classes.checkListData}>{application.uploadStatus}</div>
              </div>
              <div>
                <a
                  index={index}
                  href={documentBaseUrl
                    .replace("{prospectId}", prospectInfo.prospectId)
                    .replace("{documentKey}", application.documentKey)}
                  className={classes.link}
                >
                  {titles.PRINT_DOWNLOAD_TITLE}
                </a>
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
                <div>
                  <div className={headingClassName}>{titles.DOCUMENT_TITLE}</div>
                </div>
                <div>
                  <div className={headingClassName}>{titles.UPLOAD_STATUS_TITLE}</div>
                </div>
                <div>
                  <div className={headingClassName}>{titles.ACTIONS_TITLE}</div>
                </div>
              </div>
              {(docs.stakeholdersDocuments[`${index}_${user.fullName}`] || []).map((doc, index) => (
                <div className={classes.applicationRow} key={index}>
                  <div>
                    <div className={classes.checkListData}>{doc.documentType}</div>
                  </div>
                  <div>
                    <div className={classes.checkListData}>{doc.uploadStatus}</div>
                  </div>
                  {doc.uploadStatus !== "NotUploaded" && (
                    <div>
                      <a
                        index={index}
                        href={documentBaseUrl
                          .replace("{prospectId}", prospectInfo.prospectId)
                          .replace("{documentKey}", doc.documentKey)}
                        className={classes.link}
                      >
                        {titles.PRINT_DOWNLOAD_TITLE}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.STAKEHOLDERS_DOCUMENT_ERROR}</div>
      )}
    </>
  );
};

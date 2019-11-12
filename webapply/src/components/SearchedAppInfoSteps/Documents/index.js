import React from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "../../../components/Avatar";
import * as appConfigSelector from "./../../../store/selectors/appConfig";
import { style } from "./style";
import { titles, errorMsgs, DUMMY_PROSPECT_ID, DUMMY_DOCUMENT_KEY } from "./constants";

const Documents = props => {
  const { classes, docs, prospectInfo, endpointsUrl } = props;

  const signatoryInfo = prospectInfo.signatoryInfo;

  const documentBaseUrl = `${endpointsUrl.baseUrl || ""}${endpointsUrl.getDocumentByIdUri || ""}`;
  const headingClassName = `${classes.checkListData} ${classes.heading}`;
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
                    .replace("{prospectId}", DUMMY_PROSPECT_ID)
                    .replace("{documentKey}", DUMMY_DOCUMENT_KEY)}
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
      {get(docs, "stakeholdersDocuments").length ? (
        signatoryInfo.length > 0 &&
        signatoryInfo.map((user, index) => (
          <div key={index}>
            <div className={classes.contentWrapper}>
              <Avatar firstName={user.fullName} />
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
              {docs.stakeholdersDocuments[`${index}_${user.fullName}`] &&
                docs.stakeholdersDocuments[`${index}_${user.fullName}`].map((doc, index) => (
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
                            .replace("{prospectId}", DUMMY_PROSPECT_ID)
                            .replace("{documentKey}", DUMMY_DOCUMENT_KEY)}
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

const mapStateToProps = state => {
  return {
    docs: appConfigSelector.getProspectDocuments(state),
    endpointsUrl: appConfigSelector.getEndpoints(state)
  };
};

const mapDispatchToProps = {};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Documents)
);

import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "../../components/Avatar";
import * as appConfigSelector from "./../../store/selectors/appConfig";

const styles = {
  documents: {
    fontSize: "14px",
    lineHeight: 1.33,
    color: "#86868b",
    height: "45px"
  },
  link: {
    fontSize: "14px",
    lineHeight: 1.33,
    height: "45px"
  },
  title: {
    marginTop: "0px",
    color: "#373737",
    fontSize: "15px",
    alignItems: "center",
    fontWeight: "600"
  },
  wrapper: {
    marginTop: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    marginBottom: "20px"
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      border: "none"
    },
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1fr",
    alignItems: "center",
    padding: "24px 20px 19px 30px"
  },
  checkListData: {
    fontSize: "14px",
    lineHeight: 1.33,
    color: "#86868b",
    marginTop: 5
  },
  heading: {
    fontWeight: 600,
    color: "#000"
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    height: "62px",
    margin: "20px 35px 20px 25px"
  },
  nameField: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#373737"
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "0 16px"
  },
  errorMsg: {
    fontWeight: 600,
    fontSize: "20px",
    marginBottom: "24px"
  }
};

export const mockCompanyDocData = [
  {
    documentType: "Trade License",
    documentTitle: "Trade License",
    uploadStatus: "Uploaded"
  },
  {
    documentType: "Memorandum of Association",
    documentTitle: "Memorandum of Association",
    uploadStatus: "Uploaded"
  }
];

export const mockSignatoriesDocData = [
  {
    documentType: "Passport",
    documentTitle: "Passport",
    uploadStatus: "Uploaded"
  },
  {
    documentType: "Emirates ID",
    documentTitle: "Emirates ID",
    uploadStatus: "Uploaded"
  },
  {
    documentType: "Visa",
    documentTitle: "Visa",
    uploadStatus: "Uploaded"
  }
];

const Documents = props => {
  const { classes, docs, prospectInfo, getEndpointsUrl } = props;

  const signatoryInfo = prospectInfo.signatoryInfo;

  const documentBaseUrl =
    getEndpointsUrl &&
    (getEndpointsUrl.baseUrl && getEndpointsUrl.baseUrl) +
      (getEndpointsUrl.getDocumentByIdUri && getEndpointsUrl.getDocumentByIdUri);

  const dummyProspectId = "MGHN43MD75";
  const dummyDocumentKey = "MGHN43MD75_TL";

  return (
    <>
      <h4 className={classes.title}>Company Documents</h4>
      {docs && docs.companyDocuments && docs.companyDocuments.length > 0 ? (
        <div className={classes.wrapper}>
          <div className={classes.applicationRow}>
            <div>
              <div className={classes.checkListData + " " + classes.heading}>Document Title</div>
            </div>
            <div>
              <div className={classes.checkListData + " " + classes.heading}>Upload Status</div>
            </div>
            <div>
              <div className={classes.checkListData + " " + classes.heading}>Actions</div>
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
                    .replace("{prospectId}", dummyProspectId)
                    .replace("{documentKey}", dummyDocumentKey)}
                  className={classes.link}
                >
                  Print / Download
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.errorMsg}>Company documents are not found</div>
      )}
      <br />
      <h4 className={classes.title}>Stakeholder Documents</h4>
      {docs && docs.stakeholdersDocuments && Object.keys(docs.stakeholdersDocuments).length != 0 ? (
        signatoryInfo &&
        signatoryInfo.length > 0 &&
        signatoryInfo.map((user, index) => (
          <div key={index}>
            <div className={classes.contentWrapper}>
              <Avatar firstName={user.fullName && user.fullName} />
              <div className={classes.userInfo}>
                <div className={classes.nameField}>{user.fullName && user.fullName}</div>
              </div>
            </div>
            <div className={classes.wrapper}>
              <div className={classes.applicationRow}>
                <div>
                  <div className={classes.checkListData + " " + classes.heading}>
                    Document Title
                  </div>
                </div>
                <div>
                  <div className={classes.checkListData + " " + classes.heading}>Upload Status</div>
                </div>
                <div>
                  <div className={classes.checkListData + " " + classes.heading}>Actions</div>
                </div>
              </div>
              {docs.stakeholdersDocuments[index + "_" + (user.fullName && user.fullName)].map(
                (doc, index) => (
                  <div className={classes.applicationRow} key={index}>
                    <div>
                      <div className={classes.checkListData}>
                        {doc.documentType && doc.documentType}
                      </div>
                    </div>
                    <div>
                      <div className={classes.checkListData}>
                        {doc.uploadStatus && doc.uploadStatus}
                      </div>
                    </div>
                    {doc.uploadStatus !== "NotUploaded" && (
                      <div>
                        <a
                          index={index}
                          href={documentBaseUrl
                            .replace("{prospectId}", dummyProspectId)
                            .replace("{documentKey}", dummyDocumentKey)}
                          className={classes.link}
                        >
                          Print / Download
                        </a>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={classes.errorMsg}>Stakeholder documents are not found</div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    docs: state.uploadedDocs.docs,
    getEndpointsUrl: appConfigSelector.getEndpoints(state)
  };
};

const mapDispatchToProps = {};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Documents)
);

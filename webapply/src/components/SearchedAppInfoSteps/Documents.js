import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "../../components/Avatar";

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
  const { classes } = props;

  return (
    <>
      <h4 className={classes.title}>Company Documents</h4>
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
        {mockCompanyDocData.map((application, index) => (
          <div className={classes.applicationRow} key={index}>
            <div>
              <div className={classes.checkListData}>{application.documentTitle}</div>
            </div>
            <div>
              <div className={classes.checkListData}>{application.uploadStatus}</div>
            </div>
            <div>
              <a
                index={index}
                href="http://localhost:9091/webapply/api/v1/banks/RAK/prospects/MGHN43MD75/documents/MGHN43MD75_TL"
                className={classes.link}
              >
                Print / Download
              </a>
            </div>
          </div>
        ))}
      </div>
      <br />
      <h4 className={classes.title}>Stakeholder Documents</h4>
      <div className={classes.contentWrapper}>
        <Avatar firstName="Anjali" lastName="Tandon" />
        <div className={classes.userInfo}>
          <div className={classes.nameField}>Abhi</div>
        </div>
      </div>
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
        {mockSignatoriesDocData.map((application, index) => (
          <div className={classes.applicationRow} key={index}>
            <div>
              <div className={classes.checkListData}>{application.documentTitle}</div>
            </div>
            <div>
              <div className={classes.checkListData}>{application.uploadStatus}</div>
            </div>
            <div>
              <a
                index={index}
                href="http://localhost:9091/webapply/api/v1/banks/RAK/prospects/MGHN43MD75/documents/MGHN43MD75_TL"
                className={classes.link}
              >
                Print / Download
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.contentWrapper}>
        <Avatar firstName="Aanchal" lastName="Tandon" />
        <div className={classes.userInfo}>
          <div className={classes.nameField}>Bhakta</div>
        </div>
      </div>
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
        {mockSignatoriesDocData.map((application, index) => (
          <div className={classes.applicationRow} key={index}>
            <div>
              <div className={classes.checkListData}>{application.documentTitle}</div>
            </div>
            <div>
              <div className={classes.checkListData}>{application.uploadStatus}</div>
            </div>
            <div>
              <a
                index={index}
                href="http://localhost:9091/webapply/api/v1/banks/RAK/prospects/MGHN43MD75/documents/MGHN43MD75_TL"
                className={classes.link}
              >
                Print / Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default withStyles(styles)(Documents);

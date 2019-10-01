import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import SectionTitle from "./../SectionTitle";
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
    marginTop: "20px",
    marginBottom: "20px"
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
    documentType: "Passport",
    documentTitle: "passportScannedCopy"
  },
  {
    documentType: "TradeLicenseNo",
    documentTitle: "tlNumberScannedCopy"
  }
];

export const mockSignatoriesDocData = [
  {
    documentType: "EMID",
    documentTitle: "emidScannedCopy"
  },
  {
    documentType: "Visa",
    documentTitle: "visaScannedCopy"
  }
];

const Documents = props => {
  const { classes } = props;
  return (
    <>
      <SectionTitle title="Company documents" className={classes.title} />
      <div className={classes.wrapper}>
        <div className={classes.applicationRow}>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Document Type</div>
          </div>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Document Title</div>
          </div>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Actions</div>
          </div>
        </div>
        {mockCompanyDocData.map((application, index) => (
          <div className={classes.applicationRow} key={index}>
            <div>
              <div className={classes.checkListData}>{application.documentType}</div>
            </div>
            <div>
              <div className={classes.checkListData}>{application.documentType}</div>
            </div>
            <div>
              <Link className={classes.link}>Print / Download</Link>
            </div>
          </div>
        ))}
      </div>
      <SectionTitle title="Signatories documents" className={classes.title} />
      <div className={classes.contentWrapper}>
        <Avatar firstName="Anjali" lastName="Tandon" />
        <div className={classes.userInfo}>
          <div className={classes.nameField}>Anjali Tandon</div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.applicationRow}>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Document Type</div>
          </div>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Document Title</div>
          </div>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Actions</div>
          </div>
        </div>
        {mockSignatoriesDocData.map((application, index) => (
          <div className={classes.applicationRow} key={index}>
            <div>
              <div className={classes.checkListData}>{application.documentType}</div>
            </div>
            <div>
              <div className={classes.checkListData}>{application.documentType}</div>
            </div>
            <div>
              <Link className={classes.link}>Print / Download</Link>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.contentWrapper}>
        <Avatar firstName="Aanchal" lastName="Tandon" />
        <div className={classes.userInfo}>
          <div className={classes.nameField}>Aanchal Tandon</div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.applicationRow}>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Document Type</div>
          </div>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Document Title</div>
          </div>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Actions</div>
          </div>
        </div>
        {mockSignatoriesDocData.map((application, index) => (
          <div className={classes.applicationRow} key={index}>
            <div>
              <div className={classes.checkListData}>{application.documentType}</div>
            </div>
            <div>
              <div className={classes.checkListData}>{application.documentType}</div>
            </div>
            <div>
              <Link className={classes.link}>Print / Download</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default withStyles(styles)(Documents);

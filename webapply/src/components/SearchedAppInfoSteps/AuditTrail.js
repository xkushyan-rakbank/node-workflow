import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
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
  }
};

export const mockAuditTrailData = [
  {
    fieldsModified: "Company Name",
    modifiedBy: "xyz",
    modifiedOn: "10/09/2019 11:30:00"
  },
  {
    fieldsModified: "PO Box Number",
    modifiedBy: "abc",
    modifiedOn: "12/09/2019 15:30:00"
  }
];

class AuditTrail extends React.Component {
  getIndustryMultiSelect() {
    return this.props.orgKYCDetails.industryMultiSelect || [];
  }

  getIndustryValueByIndex(index) {
    const { industry } = this.getIndustryMultiSelect()[index] || {
      industry: [""]
    };
    const [industryItem] = industry;
    return industryItem;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.applicationRow}>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Fields Modified</div>
          </div>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Modified By</div>
          </div>
          <div>
            <div className={classes.checkListData + " " + classes.heading}>Modified On</div>
          </div>
        </div>
        {mockAuditTrailData.map((application, index) => (
          <div className={classes.applicationRow} key={index}>
            <div>
              <div className={classes.checkListData}>{application.fieldsModified}</div>
            </div>
            <div>
              <div className={classes.checkListData}>{application.modifiedBy}</div>
            </div>
            <div>
              <div className={classes.checkListData}>{application.modifiedOn}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(style)(AuditTrail);

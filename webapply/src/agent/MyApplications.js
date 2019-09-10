import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AddButton from "../components/Buttons/AddButton";

const style = {
  wrapper: {
    marginTop: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff"
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      border: "none"
    },
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "center",
    padding: "24px 20px 19px 30px"
  },
  companyName: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: 1,
    color: "#263d4c"
  },
  account: {
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#86868b"
  },
  status: {
    borderRadius: "4px",
    backgroundColor: "#e9e9ed",
    fontSize: "12px",
    color: "#373737",
    padding: "0 5px"
  },
  action: {
    fontSize: "14px",
    fontStyle: "italic",
    lineHeight: 1.14,
    textAlign: "center",
    color: "#b5b5bb"
  }
};

class MyApplications extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <h2>My applications</h2>
        <AddButton title="New application" />
        <div className={classes.wrapper}>
          <div className={classes.applicationRow}>
            <div>
              <div className={classes.companyName}>Designit Arabia</div>
              <div className={classes.account}>Current Account Islamic</div>
            </div>
            <div>
              <span className={classes.status}>Incomplete application</span>
            </div>
            <div className={classes.action}>We will call you soon</div>
          </div>
          <div className={classes.applicationRow}>
            <div>
              <div className={classes.companyName}>Designit Arabia</div>
              <div className={classes.account}>Current Account Islamic</div>
            </div>
            <div>
              <span className={classes.status}>Assessing</span>
            </div>
            <div className={classes.action}>We will call you soon</div>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(style)(MyApplications);

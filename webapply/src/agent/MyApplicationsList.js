import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ContainedButton from "../components/Buttons/ContainedButton";

export const StyledWhiteContainedButton = props => {
  const Button = withStyles(() => ({
    buttonStyle: {
      boxShadow: "none",
      border: "solid 1px #373737",
      backgroundColor: "#fff",
      width: 160,
      height: 32,
      padding: "0 10px",
      "&:hover": {
        backgroundColor: "#000",
        "& span": {
          color: "#fff"
        }
      }
    },
    labelStyle: {
      color: "#373737",
      fontSize: 14,
      justifyContent: "center"
    }
  }))(ContainedButton);

  return <Button {...props} />;
};

const style = {
  wrapper: {
    marginTop: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    width: "100%"
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      border: "none"
    },
    display: "flex",
    alignItems: "center",
    padding: "24px 20px 19px 30px",
    "& > div": {
      flexGrow: 1
    }
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
    color: "#86868b",
    marginTop: 5
  },
  status: {
    borderRadius: "4px",
    backgroundColor: "#e9e9ed",
    fontSize: "12px",
    color: "#373737",
    padding: "3px 5px"
  },
  action: {
    fontSize: "14px",
    fontStyle: "italic",
    lineHeight: 1.14,
    textAlign: "center",
    color: "#b5b5bb"
  }
};

const MyApplicationsList = ({ classes, currentApplications }) => {
  return (
    <div className={classes.wrapper}>
      {currentApplications.map((application, index) => (
        <div className={classes.applicationRow} key={index}>
          <div>
            <div className={classes.companyName}>{application.companyName}</div>
            <div className={classes.account}>{application.account}</div>
          </div>
          <div>
            <span className={classes.status}>{application.status}</span>
          </div>
          <div className={classes.action}>
            {application.action.status ? (
              <StyledWhiteContainedButton label={application.action.text} />
            ) : (
              application.action.text
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default withStyles(style)(MyApplicationsList);

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as InfoIcon } from "../assets/icons/informationIcongrey.svg";
import { ReactComponent as VerifyEmail } from "../assets/icons/emailVerfication.svg";
import { ReactComponent as VerifyMobile } from "../assets/icons/phoneVerification.svg";
import { OtpChannel } from "../constants";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: "20px",
    color: "#1F1F1F",
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.75rem",
      margin: 0,
      marginBottom: "8px",
      lineHeight: "32px"
    }
  },
  info: {
    fontSize: "1rem",
    lineHeight: "24px",
    color: "#757575",
    display: "block",
    marginTop: 10,
    fontWeight: 400,
    [theme.breakpoints.only("xs")]: {
      fontSize: ({ smallInfo }) => (smallInfo ? "1rem" : "1.25rem"),
      marginTop: ({ smallInfo }) => (smallInfo ? 5 : 10)
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.25rem",
      margin: 0
    }
  },
  infoWithIcon: {
    fontSize: "20px",
    fontStyle: "normal",
    lineHeight: "28px",
    color: "#757575",
    display: "block",
    fontWeight: 400,
    fontFamily: "DM Sans",
    [theme.breakpoints.only("xs")]: {
      fontSize: ({ smallInfo }) => (smallInfo ? "1rem" : "1.25rem")
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px"
    }
  },
  changeLink: {
    display: "block",
    marginTop: 16,
    textDecorationLine: "underline",
    color: "#1F1F1F",
    fontSize: 14,
    lineHeight: "24px"
  },
  titleInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingBottom: "16px"
  },
  otpInfoMessage: {
    display: "flex",
    padding: "24px",
    alignItems: "center",
    gap: "24px",
    alignSelf: "strech",
    borderRadius: "10px",
    background: "#F7F8F9"
  },
  otpTypeIcon: {
    width: "54px",
    height: "54px",
    [theme.breakpoints.up("sm")]: {
      width: "72px",
      height: "72px"
    }
  },
  icon: {
    width: "20px",
    height: "20px",
    minWidth: "20px",
    minHeight: "20px",
    [theme.breakpoints.up("sm")]: {
      width: "20px",
      height: "20px"
    }
  }
}));

export const SectionTitleWithInfo = ({
  className,
  title,
  info,
  smallInfo = false,
  changeText,
  showInfoIcon = false,
  otpType
}) => {
  const classes = useStyles({ smallInfo });

  return (
    <div className={className}>
      {showInfoIcon && (
        <div className={classes.titleInfo}>
          {otpType === OtpChannel.Sms ? (
            <VerifyMobile className={classes.otpTypeIcon} />
          ) : (
            <VerifyEmail className={classes.otpTypeIcon} />
          )}
          <h3 className={classes.title}>{title}</h3>
        </div>
      )}
      {!showInfoIcon && <h3 className={classes.title}>{title}</h3>}
      {info && !showInfoIcon && <span className={classes.info}>{info}</span>}
      {showInfoIcon && info && (
        <div className={classes.otpInfoMessage}>
          <InfoIcon className={classes.icon} />
          <span className={classes.infoWithIcon}>{info}</span>
        </div>
      )}
      {changeText && <span className={classes.changeLink}>{changeText}</span>}
    </div>
  );
};

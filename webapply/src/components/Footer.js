import React from "react";
import cx from "classnames";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { VIEW_IDS } from "../constants";
import SaveAndClose from "./SaveAndClose";
import { theme } from "../theme";
import { checkIsShowSmallMenu } from "./FormNavigation/utils";
import {
  sideNavWidthCollapsed,
  sideNavWidthLG,
  sideNavWidthMD,
  sideNavWidthSM,
  sideNavWidthXL
} from "../constants/styles";

const useStyles = makeStyles({
  linkContainerNew: {
    position: "fixed",
    zIndex: 1,
    bottom: "0px",
    left: "0px",
    right: "0px",
    margin: "0px",
    padding: "14px 82px 14px 0px",
    background: "#FFF",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
    display: "flex",
    gap: "24px",
    alignItems: "center",
    justifyContent: "flex-end",

    "&.oneElement": {
      display: "block",
      alignItems: "center",
      justifyContent: "flex-end",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "space-between"
      }
    },

    "&.linkContainerBtn": {
      display: "flex",
      padding: "12px 47.516px 12px 45.078px",
      alignItems: "center",
      gap: "8px",
      borderRadius: "100px",
      border: "1px solid #3B3A3A",
      color: "#3B3A3A",
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "28px"
    },
    [theme.breakpoints.only("xs")]: {
      paddingLeft: "10px",
      paddingRight: "10px",
      justifyContent: "space-between"
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: sideNavWidthMD
    },
    [theme.breakpoints.only("sm")]: {
      paddingLeft: ({ smallMenu }) => (smallMenu ? sideNavWidthCollapsed : sideNavWidthSM),
      justifyContent: "flex-end",

      paddingRight: "10px"
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: sideNavWidthLG
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: sideNavWidthXL
    }
  },
  linkContainerWithSaveCloseBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  formActionButtons: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    "& > div": {
      width: "auto",
      margin: 0
    },
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    },
    "&.oneElement": {
      display: "block",
      alignItems: "center",
      justifyContent: "flex-end",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "space-between"
      }
    }
  },
  hideSaveCloseBtnFooterMobile: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
});

export const Footer = ({ children, extraClasses }) => {
  const classes = useStyles({
    smallMenu: checkIsShowSmallMenu(pathname)
  });
  const { pathname } = useLocation();
  const showSaveClose = Object.values(VIEW_IDS).some(screen => pathname.includes(screen));

  return (
    <div
      className={cx(classes.linkContainerNew, {
        [classes.linkContainerWithSaveCloseBtn]: showSaveClose
      })}
    >
      {showSaveClose && <SaveAndClose extraClasses={classes.hideSaveCloseBtnFooterMobile} />}
      <div className={cx(classes.formActionButtons, extraClasses)}>{children}</div>
    </div>
  );
};

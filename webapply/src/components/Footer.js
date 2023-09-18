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
  footerWrapper: {
    width: "100%",
    position: "fixed",
    zIndex: 1,
    bottom: "0px",
    right: "0px",
    margin: "0px",
    background: "#FFF",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)"
  },
  linkContainerNew: {
    padding: "14px 82px 14px 0px",
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
      paddingLeft: `calc((100vw - 1920px) / 2 + ${sideNavWidthXL}px)`,
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "1920px"
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
    alignItems: "baseline",
    width: "100%",
    justifyContent: "space-between",
    "& > div": {
      width: "auto",
      margin: 0
    },

    "& > :nth-child(1)": {
      order: 3,
      marginLeft: "-40px",

      [theme.breakpoints.up("sm")]: {
        order: 1,
        marginRight: "auto",
        marginLeft: "unset"
      }
    },

    "& > :nth-child(2)": {
      order: 2,
      marginLeft: "10px",

      [theme.breakpoints.up("sm")]: {
        order: 2
      }
    },

    "& > :nth-child(3)": {
      order: 1,
      marginRight: "-20px",

      [theme.breakpoints.up("sm")]: {
        order: 3
      }
    },

    [theme.breakpoints.up("sm")]: {
      width: "100%",
      alignItems: "center",
      marginRight: "unset"
    },

    "& > :nth-child(4)": {
      order: 4,
      [theme.breakpoints.up("sm")]: {
        paddingLeft: "24px"
      }
    },

    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
      marginRight: "unset",
      width: "100%"
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
  formNextButton: {
    display: "flex",
    gap: "24px",
    alignItems: "baseline",
    width: "100%",
    justifyContent: "space-between",
    "& > div": {
      margin: 0,
      [theme.breakpoints.up("sm")]: {
        width: "auto"
      }
    },

    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
      marginRight: "unset",
      width: "100%"
    },

    "&.oneElement": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "space-between"
      }
    }
  },
  formNavigationButton: {
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
  mobileSaveAndBackSeparator: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
});

export const Footer = ({ children, extraClasses, hideSaveClose = false }) => {
  const classes = useStyles({
    smallMenu: checkIsShowSmallMenu(pathname)
  });
  const { pathname } = useLocation();
  const showSaveClose = Object.values(VIEW_IDS).some(screen => pathname.includes(screen));
  const isOnlyNextButton = React.Children.toArray(children).length === 1;

  return (
    <div className={classes.footerWrapper}>
      <div
        className={cx(classes.linkContainerNew, {
          [classes.linkContainerWithSaveCloseBtn]: showSaveClose && !hideSaveClose
        })}
      >
        {showSaveClose && !hideSaveClose && isOnlyNextButton && (
          <div className={cx(classes.formNextButton, extraClasses)}>
            <SaveAndClose hideSaveCloseBtn={hideSaveClose} />
            {children}
          </div>
        )}
        {showSaveClose && !hideSaveClose && !isOnlyNextButton && (
          <div className={cx(classes.formActionButtons, extraClasses)}>
            <SaveAndClose hideSaveCloseBtn={hideSaveClose} />
            <div className={classes.mobileSaveAndBackSeparator}>|</div>
            {children}
          </div>
        )}
        {(!showSaveClose || hideSaveClose) && (
          <div className={cx(classes.formNavigationButton, extraClasses)}>{children}</div>
        )}
      </div>
    </div>
  );
};

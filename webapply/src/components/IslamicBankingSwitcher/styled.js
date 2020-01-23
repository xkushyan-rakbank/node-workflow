import { makeStyles } from "@material-ui/core";

import { mobileResolution } from "../../constants";

export const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "30px",
    right: "40px",
    zIndex: 21, // 20 still not visible
    width: "266px",
    borderRadius: "6px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.08)",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      padding: "30px 16px",
      left: 0,
      top: "100vh",
      transform: "translateY(-100%)",
      boxShadow: "none",
      width: "100%",
      flexWrap: "wrap",
      display: "flex",
      boxSizing: "border-box"
    }
  },
  buttonStyle: {
    width: "50%",
    padding: "2px 8px",
    outline: "none ",
    fontSize: "16px",
    textTransform: "none",
    textAlign: "center",
    backgroundColor: "#000",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.08)",
    "& svg": {
      display: "none"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      width: "100%",
      borderRadius: "8px!important",
      border: "0!important",
      height: 72,
      marginTop: 10,
      padding: "2px 20px",
      "& svg": {
        display: "inline-block",
        verticalAlign: "inline-block",
        marginRight: 20,
        width: 32,
        height: 32,
        "& path": {
          stroke: "currentColor"
        }
      },
      "& > span": {
        justifyContent: "flex-start",
        lineHeight: "32px"
      }
    }
  },
  active: {
    backgroundColor: "#fff",
    "& $labelStyle": {
      color: "#373737"
    }
  },
  labelStyle: {
    textAlign: "center",
    color: "#ffffff"
  }
});

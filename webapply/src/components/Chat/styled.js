import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution } from "../../constants";

export const useStyles = makeStyles({
  chat: {
    position: "absolute",
    left: "77px",
    bottom: "40px",
    color: "#fff",
    fontSize: "18px",
    "@media only screen and (max-width: 1220px)": {
      left: "15px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      position: "fixed"
    }
  },
  chatInner: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "@media only screen and (max-width: 991px)": {
      flexDirection: "column"
    },
    "& span": {
      width: "66px",
      height: "66px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: " #fff",
      borderRadius: "50%",
      boxShadow: "0 2px 14px 0 rgba(0, 0, 0, 0.18)",
      marginRight: "20px"
    },
    "& p": {
      margin: "0"
    },
    "& a": {
      textDecoration: "underline",
      fontWeight: "600",
      fontSize: "18px",
      color: "#fff",
      marginLeft: "5px"
    },
    "& a + a": {
      marginLeft: "0px"
    },
    "& img": {
      width: "30px",
      height: "30px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      display: "none",
      "& span": {
        width: "48px",
        height: "48px",
        margin: 0
      },
      "& img": {
        width: "26px",
        height: "26px"
      },
      "& a": {
        marginLeft: 0
      }
    }
  }
});

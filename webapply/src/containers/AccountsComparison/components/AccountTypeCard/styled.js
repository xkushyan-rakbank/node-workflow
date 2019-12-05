import { makeStyles } from "@material-ui/core/styles";
import { portraitOrientationQueryIPads } from "../../../../constants/styles";
import { mobileResolution } from "../../../../constants";

export const useStyles = makeStyles({
  container: {
    border: "solid 1px #e8e8e8",
    width: 247,
    height: 526,
    maxHeight: 526,
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    backgroundColor: "#fff",
    padding: "37px 15px 40px",
    boxSizing: "border-box",
    margin: "20px 0 0 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [portraitOrientationQueryIPads]: {
      padding: "5px 24px 11px",
      marginTop: "10px",
      width: "100%",
      height: "auto"
    }
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#373737",
    fontSize: "20px",
    fontWeight: 600,
    textAlign: "center",
    "& span": {
      display: "block",
      marginTop: 26,
      width: "100%"
    },
    "@media only screen and (max-width: 1220px)": {
      "& span": {
        margin: "13px"
      }
    },
    [portraitOrientationQueryIPads]: {
      flexDirection: "row",
      fontSize: "17px",
      "& span": {
        margin: "0px",
        textAlign: "left"
      }
    }
  },
  divider: {
    border: "solid 1px #e8e8e8",
    margin: "30px auto 0",
    [portraitOrientationQueryIPads]: {
      marginTop: "10px"
    }
  },
  differences: {
    margin: "28px 0 0 0",
    paddingLeft: "30px",
    "& li": {
      fontSize: "16px",
      color: "#373737",
      listStyle: "none",
      position: "relative",
      "& img": {
        position: "absolute",
        left: "-23px",
        top: 3
      },
      "& + li": {
        marginTop: "16px"
      }
    }
  },
  differencesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  buttonWrapper: {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    "& span": {
      fontSize: "16px"
    },
    "& .show-on-mobile": {
      display: "none"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      "& > button": {
        display: "none"
      },
      "& .show-on-mobile": {
        display: "block"
      }
    }
  },
  continueButtonRoot: {
    fontFamily: "Open Sans",
    fontWeight: "600",
    padding: "0 8px"
  }
});

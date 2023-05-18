import { makeStyles } from "@material-ui/core/styles";
import { portraitOrientationQueryIPads } from "../../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    border: "solid 1px #e8e8e8",
    minWidth: 247,
    height: "calc(100% - 20px)",
    width: "100%",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    backgroundColor: "#fff",
    padding: "37px 15px 40px",
    boxSizing: "border-box",
    margin: "20px 0 0 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& button": {
      minHeight: "40px",
      minWidth: "calc(100% - 16px)",
      padding: "8px 20px",
      "& span": { justifyContent: "center", textAlign: "center" }
    },
    [portraitOrientationQueryIPads]: {
      padding: "5px 24px 11px",
      marginTop: "10px",
      width: "100%",
      height: "auto",
      minWidth: "200px"
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
      width: "100%",
      whiteSpace: "pre-wrap"
    },
    [theme.breakpoints.down("sm")]: {
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
  buttonDivider: {
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
      whiteSpace: "pre-wrap",
      "& svg": {
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
    minHeight: "40px",
    marginTop: "20px",
    textAlign: "center",
    "& span": {
      fontSize: "16px"
    }
  },
  continueButtonRoot: {
    fontFamily: "Open Sans",
    fontWeight: "600",
    padding: "0 8px"
  }
}));

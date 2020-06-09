import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "16px"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0 0"
  },
  infoTitle: {
    color: "#86868b"
  },
  infoTitleWrap: {
    position: "relative",
    top: "65px"
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "40px 0"
  },
  continueButtonContainer: {
    margin: "20px 0 40px 0",
    flexWrap: "nowrap",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column"
    }
  },
  continueBtn: {
    [theme.breakpoints.only("xs")]: {
      alignSelf: "flex-end",
      marginTop: "10px"
    }
  }
}));

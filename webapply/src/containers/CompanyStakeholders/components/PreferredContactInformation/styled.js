import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  gridContainer: {
    marginBottom: "0"
  },
  relative: {
    position: "relative"
  },
  container: {
    top: "30px",
    right: "-110px"
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

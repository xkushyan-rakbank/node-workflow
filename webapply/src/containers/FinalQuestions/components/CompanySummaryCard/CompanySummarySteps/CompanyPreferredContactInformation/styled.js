import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
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
  relative: {
    position: "relative"
  },
  container: {
    top: "18px",
    right: "-110px",
    "@media only screen and (max-width: 959px)": {
      top: "63px",
      right: "12px"
    }
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
  hidden: {
    display: "none"
  }
});

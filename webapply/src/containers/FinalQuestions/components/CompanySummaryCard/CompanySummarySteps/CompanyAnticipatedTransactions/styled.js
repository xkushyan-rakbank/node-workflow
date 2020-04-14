import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  title: {
    fontSize: "16px"
  },
  groupLabel: {
    marginTop: "15px",
    marginBottom: "7px",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.9",
    color: "#373737"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  divider: {
    marginTop: "0px",
    borderBottom: "solid 1px rgba(230, 230, 230, 0.5)"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 0 0"
  },
  disabledInput: {
    backgroundColor: "rgba(242, 242, 242, 0.5)"
  },
  infoTitles: {
    color: "#86868b"
  },
  nonCashTitle: {
    position: "relative",
    top: "-10px",
    marginBottom: "10px"
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "40px 0"
  },
  formControl: {
    "& > div:last-child": {
      marginTop: "10px"
    }
  }
});

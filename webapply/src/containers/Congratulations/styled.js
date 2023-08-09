import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  congratulationIcon: {
    marginBottom: "40px",
    width: "85px",
    height: "90px",
    [theme.breakpoints.up("lg")]: {
      marginBottom: "60px",
      width: "120px",
      height: "125px"
    }
  },
  trackApplicationBtn: {
    backgroundColor: "#1F1F1F",
    // margin: "24px 0 40px",
    padding: "20px 40px",
    borderRadius: "100px",
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: "32px",
    alignSelf: "flex-start",
    marginBottom: "40px"
  },
  congratulationsTextWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    [theme.breakpoints.up("lg")]: {
      gap: "40px"
    }
  },
  applicationDetailWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
    [theme.breakpoints.up("lg")]: {
      padding: "24px",
    }
  },
  applicationNumber: {
    color: "#1F1F1F",
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: "28px",
    margin: 0,
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.25rem",
    }
  },
  applicationDesc: {
    color: "#757575",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "20px",
    margin: 0
  },
  horizontalLine: {
    backgroundColor: "#E6E6E6",
    height: "1px"
  },
  infoWrapper: {
    color: "#757575",
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "16px",
    "& span": {
      fontWeight: "400!important",
    }
  },
  infoIcon: {
    width: "16px !important",
    height: "16px !important"
  },
  successTextWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  }
}));

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
    marginBottom: "40px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "unset",
    },
    alignItems: "center",
    "& >span:nth-child(1)": {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  congratulationsTextWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    borderRadius: "20px",
    background: "#FFF",
    border: "#DEDEE2",
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
    height: "1px",
    marginTop: "16px"
  },
  infoWrapper: {
    alignItems: "start !important",
    "& svg": {
      marginTop: "5px",
      fill: "#757575",
      width: "14px",
      height: "14px"
    },
  },
  infoIcon: {
    width: "32px !important",
    height: "32px !important",

    [theme.breakpoints.up("sm")]: {
      width: "16px !important",
      height: "16px !important"
    }
  },
  successTextWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  customHeaderTitle: {
    "& >h3": {
      fontSize: "1.5rem",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "32px",
      color: "#1F1F1F",
      margin: 0,
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.75rem",
        margin: 0,
        marginBottom: "8px",
      },
    },
    "& > span:nth-child(2)": {
      fontSize: "1rem",
      lineHeight: "24px",
      color: "#757575",
      display: "block",
      marginTop: 10,
      fontWeight: 500,
      [theme.breakpoints.only("xs")]: {
        fontSize: "1rem",
        marginTop: 5,
        fontWeight: 400,
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.25rem",
        margin: 0,
        fontWeight: 400, 
      },
    },
  },
  sectionComponet: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "16px",
    alignSelf: "strech",
    paddingTop: "24px"
  },
  icon: {
    width: "42px",
    height: "42px",
    minWidth: "32px",
    minHeight: "32px",
    [theme.breakpoints.up("sm")]: {
      width: "38px",
      height: "38px",
    }
  }
}));

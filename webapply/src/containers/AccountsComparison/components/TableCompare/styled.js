import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  paperRoot: {
    marginTop: "5px",
    boxSizing: "border-box",
    boxShadow: "none",
    position: "relative"
  },
  tableContainer: {
    position: "relative",
    [theme.breakpoints.only("xs")]: {
      display: "none"
    }
  },
  tableMobileContainer: {
    display: "none",
    [theme.breakpoints.only("xs")]: {
      display: "block"
    }
  },
  selectedAccountContainer: {
    position: "absolute",
    zIndex: "1",
    top: "-15px",
    height: "calc(100% + 30px)",
    transition: "left .25s ease",
    [theme.breakpoints.only("xs")]: {
      height: "calc(100% + 30px)"
    },
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#fff",
    minWidth: "calc((100% - 217px)/3 - 12px)",
    [theme.breakpoints.only("md")]: {
      minWidth: "calc((100% - 256px)/3 - 12px)"
    },
    [theme.breakpoints.only("sm")]: {
      minWidth: "calc((100% - 240px)/3 - 12px)"
    }
  },
  tableRoot: {
    tableLayout: "fixed",
    width: "100%",
    borderRadius: "8px",
    position: "relative",
    margin: "40px 0 30px 0",
    [theme.breakpoints.only("xs")]: {
      marginTop: 20,
      marginBottom: -15
    },
    "& th, & td": {
      borderBottom: "none",
      zIndex: "1"
    },
    "& tr:nth-of-type(even) td": {
      "&:before": {
        bottom: "0px"
      }
    },
    "& tr:nth-of-type(odd) td": {
      "&:before": {
        bottom: "0px"
      }
    },
    "& th:last-child, & td:last-child": {
      paddingRight: "0"
    },
    "& th:first-child, & td:first-child": {
      paddingLeft: "0",
      width: "200px",
      [theme.breakpoints.only("xs")]: {
        width: "auto"
      }
    }
  }
}));

import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution } from "../../../../constants";

export const useStyles = makeStyles({
  paperRoot: {
    marginTop: "5px",
    boxSizing: "border-box",
    boxShadow: "none",
    position: "relative"
  },
  tableContainer: {
    position: "relative",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      display: "none"
    }
  },
  tableMobileContainer: {
    display: "none",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      display: "block"
    }
  },
  selectedAccountContainer: {
    position: "absolute",
    zIndex: "1",
    top: "-15px",
    height: "calc(100% + 30px)",
    transition: "left .25s ease",
    "@media only screen and (max-height: 900px)": {
      height: "calc(100% + 30px)"
    },
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#fff",
    minWidth: "calc(25% - 10px)"
  },
  tableRoot: {
    tableLayout: "fixed",
    width: "100%",
    borderRadius: "8px",
    position: "relative",
    margin: "40px 0 30px 0",
    "& th, & td": {
      borderBottom: "none",
      zIndex: "1"
    },
    "& tr:not(:last-child) td": {
      "&:before": {
        content: "''",
        position: "absolute",
        left: 0,
        right: 0,
        margin: "0 auto",
        width: "90%",
        height: 1,
        backgroundColor: "#f7f8f9",
        display: "block",
        top: 0
      }
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
      width: "200px"
    }
  }
});

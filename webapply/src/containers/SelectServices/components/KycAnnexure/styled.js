import { makeStyles } from "@material-ui/core/styles";
import { checkBrowserIsIE } from "../../../../utils/checkBrowserIsIE";

const isIE = checkBrowserIsIE();

export const useStyles = makeStyles({
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "30px 0 40px 0"
  },
  subtitleBranch: {
    marginBottom: "20px"
  },
  subtitleInterest: {
    marginBottom: "0"
  },
  formControl: {
    marginTop: "0"
  },
  radioButtonRoot: {
    width: "calc(50% - 20px)"
  },
  tableContainer: {
    maxHeight: isIE ? "725px" : "720.8px",
    width: "500px",
    overflowX: "hidden"
  },
  table: {
    "& tbody": {
      backgroundColor: "#F8F8F8",
      maxHeight: "666px",
      overflow: "auto"
    },
    "& th": {
      color: "#0B0B0B",
      padding: "10px 12px",
      background: "white"
    },
    "& td": {
      color: "#0B0B0B",
      padding: "10px 12px",
      borderRight: "1px solid #cccccc"
      //padding: "0px 12px"
    },
    "& td:nth-child(4)": {
      color: "#0B0B0B",
      padding: "13px 5px 13px 10px",
      minWidth: "100px"
    },
    "& td:nth-child(2), & td:nth-child(6)": {
      color: "#737373"
    },
    "& tbody .disabled": {
      opacity: 0.6,
      backgroundColor: "#EAEAEA"
      // "& th, & td": {
      //   color: "#808080"
      // }
    }
  }
});

import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { checkBrowserIsIE } from "../../../../utils/checkBrowserIsIE";

const isIE = checkBrowserIsIE();

export const useStyles = makeStyles(theme => ({
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
  confirmingTransaction: {
    position: "relative",
    "& + $confirmingTransaction": {
      paddingTop: "10px",
      marginTop: "10px",
      //borderTop: "1px solid #e6e6e680",#829ee5;
      borderTop: "1px solid #829ee5",
      "& $deleteContact": {
        top: "22px"
      },
      [theme.breakpoints.only("xs")]: {
        "& $deleteContact": {
          top: "unset"
        }
      }
    }
  },
  tableContainer: {
    maxHeight: isIE ? "725px" : "750px",
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
      background: "white",
      borderRight: "1px solid #cccccc"
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
  },
  historyTableHeader: {
    fontWeight: "bold",
    textAlign: "center"
  }
}));

export const BootstrapInput = withStyles(theme => ({
  root: {
    width: "100%"
  },
  input: {
    borderRadius: 4,
    width: "100%",
    position: "relative",
    fontSize: 14,
    textAlign: "left"
  }
}))(InputBase);

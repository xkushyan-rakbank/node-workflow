import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles({
  tableHead: {
    backgroundColor: "#f7f8f9"
  },
  tableHeaderCellRoot: {
    position: "relative",
    textAlign: "center"
  },
  tableHeaderCellHead: {
    color: "#373737",
    fontSize: "16px",
    fontFamily: "Open Sans",
    fontWeight: "600",
    height: "60px",
    padding: 0,
    borderBottom: "none",
    width: "190px",
    maxWidth: "190px",
    "@media only screen and (max-width: 1360px)": {
      width: "150px"
    }
  },
  tableCellActive: {
    fontWeight: "bold",
    "& span:first-child": {
      fontWeight: "600"
    },
    "& span:last-child": {
      fontWeight: "400"
    },
    "& button": {
      width: "150px",
      height: "40px",
      backgroundColor: "#000",
      "& span:first-child": {
        color: "#fff",
        fontSize: "16px"
      }
    }
  },
  relative: {
    position: "relative"
  }
});

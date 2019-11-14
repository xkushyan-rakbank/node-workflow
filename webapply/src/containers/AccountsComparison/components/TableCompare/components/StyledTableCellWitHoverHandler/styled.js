import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles({
  tableCellRoot: {
    fontSize: "16px",
    color: "#373737",
    textAlign: "center",
    "& span": {
      display: "block"
    },
    "& span + span": {
      fontSize: "12px",
      color: "#888"
    },
    "& button": {
      marginTop: "5px"
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
  }
});

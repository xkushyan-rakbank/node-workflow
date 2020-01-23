import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution } from "../../../../../../constants";

export const useStyles = makeStyles({
  tableCellRoot: {
    fontSize: "16px",
    color: "#373737",
    textAlign: "center",
    "& span": {
      display: "block"
    },
    "& span:first-child": {
      fontWeight: "600"
    },
    "& span + span": {
      fontSize: "12px",
      color: "#888",
      [`@media only screen and (max-width: ${mobileResolution}px)`]: {
        fontSize: 10
      }
    },
    "& div": {
      fontSize: "14px",
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

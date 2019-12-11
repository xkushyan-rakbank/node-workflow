import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution } from "../../constants";

export const useStyles = makeStyles({
  note: {
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    marginTop: "25px",
    display: "block",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      fontSize: "10px"
    }
  }
});

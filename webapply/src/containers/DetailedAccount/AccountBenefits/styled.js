import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution } from "../../../constants";

export const useStyles = makeStyles({
  indent: {
    marginBottom: "20px"
  },
  notification: {
    width: "100%",
    paddingTop: "20px",
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    top: "calc(100vh - 290px)",
    position: "absolute"
  },
  icon: {
    width: "64px",
    height: "64px",
    "@media only screen and (max-width: 1300px)": {
      width: "56px",
      height: "56px"
    }
  },
  styleInfoNotes: {
    margin: "0 auto",
    [`@media only screen and (min-width: ${mobileResolution + 1}px)`]: {
      position: "absolute",
      bottom: 65,
      left: 0,
      right: 0
    }
  }
});

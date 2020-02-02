import { makeStyles } from "@material-ui/core";
import { mobileResolution } from "../../constants";

export const useStyles = makeStyles({
  headerTitle: {
    backgroundColor: "#fff",
    marginBottom: "115px",
    "& span": {
      width: "100%",
      fontSize: "14px",
      color: "#86868b",
      "& span": {
        fontWeight: "600"
      }
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      display: "none"
    }
  },
  withoutMarginBottom: {
    marginBottom: 0
  },
  withMargin: {
    marginTop: "-130px"
  },
  headerTitleIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  logout: {
    float: "right",
    marginTop: "-20px",
    cursor: "pointer"
  }
});

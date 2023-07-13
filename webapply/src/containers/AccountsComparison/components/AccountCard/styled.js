/* eslint-disable no-dupe-keys */
import { makeStyles } from "@material-ui/core/styles";
//import { portraitOrientationQueryIPads } from "../../../../constants/styles";
export const useStyles = makeStyles(theme => ({
  accountTypeWrapper: {
    display: "flex",
    border: "1px solid #E6E6E6",
    background: "#FFF",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center"
  },
  accountType: {
    height: "260px",
    padding: "40px 24px"
  },
  accountTypeSticky: {
    height: "auto",
    padding: "24px 24px"
  }
}));

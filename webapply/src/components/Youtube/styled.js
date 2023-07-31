import { makeStyles } from "@material-ui/core";
import { theme } from "../../theme";

export const useStyles = makeStyles({
  videoBox: {
    "& iframe": {
      borderRadius: "10px",
      background: "rgba(0, 0, 0, 0.3)",
      [theme.breakpoints.only("xs")]: {
        width: "100%",
        height: "180px"
      },

      [theme.breakpoints.up("sm")]: {
        display: "block",
        height: "280px"
      }
    }
  }
});

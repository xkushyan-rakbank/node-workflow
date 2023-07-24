import { makeStyles } from "@material-ui/core";
import { theme } from "../../theme";

export const useStyles = makeStyles({
  videoBox: {
    "& iframe": {
      [theme.breakpoints.only("xs")]: {
        width: "100%",
        height: "180px",
      },

      [theme.breakpoints.up("sm")]: {
        display: "block",
        width: "100%",
        height: "315px",
      },
    },
  },
});

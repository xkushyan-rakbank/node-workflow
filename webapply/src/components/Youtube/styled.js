import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  videoBox: {
    marginTop: 50,
    "& iframe": {
      width: "100%",
      display: "block"
    }
  }
});

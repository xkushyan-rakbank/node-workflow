import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  gridContainer: {
    marginBottom: "0"
  },
  relative: {
    position: "relative"
  },
  container: {
    top: "30px",
    right: "-110px",
    "@media only screen and (max-width: 959px)": {
      top: "63px",
      right: "12px"
    }
  },
  hidden: {
    display: "none"
  }
});

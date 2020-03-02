import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  paperMenu: {
    maxHeight: "246px",
    borderRadius: "0px"
  },
  listGutters: {
    fontSize: "12px",
    paddingLeft: "12px",
    paddingRight: "8px"
  },
  listRoot: {
    minHeight: "40px",
    borderBottom: "1px solid #f3f3f3",
    "&:hover": {
      backgroundColor: "#f7f7f9"
    }
  },
  listMenu: {
    padding: "0"
  },
  root: {
    ".Mui-focused fieldset": {
      borderColor: "#373737 !important"
    },
    "& :after, & :before": {
      display: "none"
    }
  }
});

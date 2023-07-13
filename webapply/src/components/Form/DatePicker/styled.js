import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "#3b3a3a"
    },
    "& fieldset": {
      borderColor: "rgba(194, 194, 194, 0.56)"
    },
    "& .Mui-focused fieldset": {
      borderColor: "#373737 !important"
    }
  },
  filledInput: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "22px",
    letterSpacing: "0.08px",
    color: "#2C2C2C",
    backgroundColor: "#FFF",
    borderRadius: "12px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#BCBDC0",
    padding: 0,
    "&:hover": {
      backgroundColor: "#FFF"
    }
  },
  filledInputError: {
    borderColor: "#ea2b1e"
  },
  filledLabel: {
    color: "#585A61",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "22px",
    letterSpacing: "0.08px",
    whiteSpace: "nowrap",
    width: "80%",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  filledLabelShrink: {
    fontWeight: 500,
    fontSize: "0.875rem",
    color: "#585A61 !important",
    width: "100%"
  }
});

import { makeStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

export const useStyles = makeStyles(theme => ({
  input: {
    display: "flex",
    padding: 0,
    height: "56px",
    "& + fieldset": {
      borderRadius: "8px ",
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    }
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center"
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  menu: {
    marginTop: theme.spacing(1),
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  },
  indicator: {
    width: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    "& svg": {
      fontSize: "18px"
    }
  },
  indicatorSeparator: {
    width: 1,
    height: "100%",
    position: "absolute",
    top: 0,
    backgroundColor: "#ddd",
    left: 0
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

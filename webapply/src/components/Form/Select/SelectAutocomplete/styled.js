import { makeStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

export const useStyles = makeStyles(theme => ({
  formControlRoot: {
    zIndex: "auto",
    width: "100%",
    margin: "12px 0 24px",
    display: "flex",
    position: "relative",
    "& > div": {
      margin: 0
    }
  },
  input: {
    display: "flex",
    padding: 0,
    minHeight: "56px",
    height: "auto",
    backgroundColor: ({ disabled }) => (disabled ? "rgba(242, 242, 242, 0.5)" : "transparent"),
    "& > *": {
      minHeight: "56px"
    },
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
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
    border: "1px solid #000000",
    fontSize: "14px"
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
    minHeight: 48,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    whiteSpace: "normal",
    lineHeight: "normal",
    wordBreak: "break-word",
    "& .MuiCheckbox-root": {
      marginLeft: "auto"
    }
  },
  customMenuItem: {
    minHeight: 70,
    borderRadius: 10
  },
  customSeclectCheckbox: {
    marginRight: "0"
  }
}));

export const customStyles = {
  menu: provided => ({
    ...provided,
    zIndex: 2,
    marginTop: "6px",
    width: "100%"
  }),
  singleValue: provided => ({
    ...provided,
    whiteSpace: "nowrap",
    padding: "2px"
  })
};

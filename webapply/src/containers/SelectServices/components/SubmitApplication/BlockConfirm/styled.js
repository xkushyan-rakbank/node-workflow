import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  checkboxesWrapper: {
    "&>label": {
      marginBottom: "20px"
    },
    "& .formControlContainer": {
      margin: "0"
    }
  },
  checkbox: {
    "&.Mui-disabled svg path": {
      fill: "#000"
    }
  },
  label: {
    "&.Mui-disabled": {
      color: theme.palette.text.color
    }
  },
  listItem: {
    display: "block"
  },
  link: {
    color: "#888888",
    textDecoration: "underline"
  }
}));

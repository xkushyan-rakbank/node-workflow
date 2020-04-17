import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  signatoryLabel: {
    fontSize: "14px",
    fontWeight: 600,
    marginTop: "40px",
    color: theme.palette.text.text
  },
  rootInput: {
    fontWeight: "600"
  },
  signatoryNamesContainer: {
    marginTop: "12px",
    "& div + div": {
      marginTop: "20px"
    }
  },
  signatoryName: {
    display: "flex",
    "& span": {
      fontSize: "14px"
    }
  }
}));

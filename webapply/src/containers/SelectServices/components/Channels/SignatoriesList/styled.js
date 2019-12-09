import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  infoTitle: {
    marginTop: "0"
  },
  signatoryLabel: {
    fontSize: "14px",
    fontWeight: 600,
    marginTop: "40px",
    lineHeight: 2.14,
    color: "#373737"
  },
  rootInput: {
    fontWeight: "600",
    fontFamily: "Open Sans"
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
      fontSize: "14px",
      fontFamily: "Open Sans"
    }
  }
});

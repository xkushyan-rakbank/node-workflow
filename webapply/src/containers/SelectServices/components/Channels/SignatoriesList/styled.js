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
  signatoryNamesContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "12px",
    "& div + div": {
      marginTop: "20px"
    }
  },
  signatoryName: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& span": {
      fontSize: "14px",
      fontFamily: "Open Sans"
    }
  },
  selectCombined: {
    margin: "0 !important",
    width: "360px",
    "& input": {
      fontWeight: "600"
    }
  }
});

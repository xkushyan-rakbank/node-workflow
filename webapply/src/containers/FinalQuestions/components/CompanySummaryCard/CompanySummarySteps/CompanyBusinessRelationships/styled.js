import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  title: {
    fontSize: "16px"
  },
  groupLabel: {
    marginTop: "15px",
    marginBottom: "7px",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.9",
    color: "#373737"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  divider: {
    marginTop: "30px",
    borderBottom: "solid 1px rgba(230, 230, 230, 0.5)"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 0 0"
  },
  relative: {
    position: "relative"
  },
  tablet: {
    "@media only screen and (max-width: 959px)": {
      marginBottom: "20px"
    }
  },
  container: {
    top: "15px",
    right: "-100px",
    "@media only screen and (max-width: 959px)": {
      top: "70px",
      right: "12px"
    }
  },
  marginBottom: {
    "@media only screen and (max-width: 959px)": {
      marginBottom: "45px"
    }
  }
});

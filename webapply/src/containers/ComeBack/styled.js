import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  form: {
    width: "100%",
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media only screen and (max-height: 768px)": {
      height: 350
    }
  },
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%"
  },
  verificationForm: {
    width: "100%",
    height: 450,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media only screen and (max-height: 768px)": {
      height: 390
    }
  },
  goBackContainer: {
    marginRight: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  goBackArrow: {
    marginRight: 5,
    "& img": {
      marginRight: 5
    }
  },
  goBack: {
    color: "#373737",
    lineHeight: "1.29",
    fontWeight: "600",
    textDecoration: "underline",
    fontSize: "14px",
    "&:hover": {
      textDecoration: "none"
    }
  },
  link: {
    textDecoration: "underline",
    cursor: "pointer",
    opacity: 1,
    visibility: "visible"
  },
  linkDisabled: {
    opacity: "0.5",
    cursor: "not-allowed"
  },
  linkHide: {
    opacity: 0,
    visibility: "hidden"
  },
  error: {
    marginBottom: "10px"
  }
});

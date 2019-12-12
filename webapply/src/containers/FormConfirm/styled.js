import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  confirmForm: {
    maxWidth: "780px",
    width: "100%"
  },
  formDescription: {
    fontSize: "20px",
    color: "#373737",
    margin: "0px 0 18px",
    "& b": {
      fontWeight: "600"
    }
  },
  squareInput: {
    marginRight: "16px",
    "& div": {
      width: "88px",
      height: "88px",
      boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.01)",
      fontSize: "30px"
    },
    "& input": {
      textAlign: "center"
    }
  },
  link: {
    textDecoration: "underline",
    cursor: "pointer"
  },
  linkDisabled: {
    opacity: "0.5",
    cursor: "not-allowed"
  }
});

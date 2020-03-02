import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  buttonStyle: {
    width: "346px",
    height: "56px",
    borderRadius: "28px",
    textTransform: "none",
    fontSize: "18px",
    padding: "0 20px 0 32px",
    fontWeight: "normal",
    letterSpacing: "normal",
    justifyContent: "space-between"
  },
  buttonsWrapper: {
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    flexDirection: "column",
    marginTop: "24px"
  },
  stakeholdersTitleWrapper: {
    margin: "60px 0",
    display: "flex",
    alignItems: "center"
  },
  stakeholderTitle: {
    marginLeft: "10px",
    fontSize: "14px"
  },
  iconSize: {
    width: "24px",
    height: "24px"
  },
  submitButton: theme.submitButton
}));

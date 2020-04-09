import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  buttonStyle: {
    border: 0,
    color: "#000",
    display: "flex",
    height: "104px",
    width: "100%",
    justifyContent: "flex-start",
    textTransform: "inherit",
    fontSize: "20px",
    padding: "20px",
    "&:hover": {
      border: 0
    }
  },
  labelStyle: {
    margin: "0 14px"
  },
  icon: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
    opacity: ({ disabled }) => (disabled ? 0.3 : 1)
  }
});

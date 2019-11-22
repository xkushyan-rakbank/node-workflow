import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  textArea: {
    resize: "none",
    width: "328px",
    padding: "16px",
    height: "80px",
    borderRadius: "8px",
    border: "solid 1px rgba(194, 194, 194, 0.56)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "Open Sans",
    fontSize: "12px",
    color: "#000",
    "&::placeholder": {
      color: "#666"
    }
  },
  error: {
    borderColor: "red"
  }
});

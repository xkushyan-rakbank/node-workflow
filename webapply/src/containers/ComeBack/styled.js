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
  reCaptchaContainer: {
    display: "flex",
    paddingTop: "10px",
    justifyContent: "flex-end"
  },
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%"
  }
});

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  appStatus: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    maxWidth: 780,
    margin: "0 auto"
  },
  image: {
    "@media (max-width: 800px)": {
      height: "80%",
      display: "block"
    },
    "@media (max-width: 620px)": {
      height: "55%"
    },
    "@media (max-width: 450px)": {
      height: "43%"
    }
  }
});

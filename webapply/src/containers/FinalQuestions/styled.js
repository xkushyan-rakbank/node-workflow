import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  sectionContainer: {
    marginBottom: "20px"
  },
  description: {
    fontSize: "20px",
    color: "#373737",
    margin: "20px 0 30px",
    lineHeight: 1.5
  },
  smallMargin: {
    margin: "20px 0 40px"
  },
  buttonWrap: {
    marginTop: "0",
    justify: "flex-end"
  },
  linkContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "42px",
    marginBottom: "42px",
    "& > div": {
      width: "auto",
      margin: "0"
    }
  },
  startButton: {
    marginBottom: 60,
    width: "auto",
    padding: "8px 33px 12px 33px"
  }
});

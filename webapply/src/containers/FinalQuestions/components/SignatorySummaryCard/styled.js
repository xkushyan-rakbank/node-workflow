import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  card: {
    marginBottom: "20px"
  },
  contentBox: {
    display: "flex",
    flexGrow: "1",
    paddingLeft: "25px"
  },
  infoBox: {
    flexGrow: "1"
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.33",
    color: "#373737"
  },
  signatoryField: {
    fontSize: "14px",
    lineHeight: "1.71",
    color: "#517085"
  },
  shareholdingField: {
    opacity: 0.5,
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#263d4c"
  },
  controlsBox: {
    display: "flex",
    alignItems: "center"
  },
  hidden: {
    maxHeight: "0",
    overflow: "hidden"
  }
});

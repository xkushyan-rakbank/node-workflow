import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "40px 0"
  },
  title: {
    paddingTop: "20px",
    fontSize: "16px",
    "&>div": {
      width: "4px"
    }
  },
  stepTitleWrapper: {
    padding: "13px 16px",
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    cursor: "pointer",
    maxHeight: "52px"
  },
  linkTitle: {
    padding: 0
  },
  filledTitle: {
    display: "flex",
    justifyContent: "space-between"
  },
  disabledStep: {
    opacity: 0.5,
    fontSize: "16px",
    color: "#263d4c"
  },
  formWrapper: {
    margin: "0 20px"
  },
  doneIcon: {
    width: "24px",
    height: "22px",
    fill: "#39C4A5"
  }
});

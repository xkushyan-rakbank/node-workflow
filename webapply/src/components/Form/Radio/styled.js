import { makeStyles } from "@material-ui/core/styles";

export const useStyledRadioGroup = makeStyles({
  radioGroup: {
    flexDirection: "initial"
  },
  gridGroup: {
    alignItems: "start",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr"
  }
});

export const useStyleRadioButton = makeStyles({
  radio: {
    "& img": {
      width: "24px",
      height: "24px"
    }
  },
  radioLabel: {
    fontFamily: "Open Sans",
    fontSize: "14px"
  }
});
